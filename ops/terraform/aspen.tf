terraform {
  backend "azurerm" {
    resource_group_name = "terraform-resources"
    container_name      = "terraform"
    key                 = "aspen.tfstate"
  }
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
    }
  }
  required_version = ">= 1.1.0"
}

provider "azurerm" {
  features {
    resource_group {
      prevent_deletion_if_contains_resources = false
    }
  }
}

resource "random_id" "id" {
  byte_length = 3
}

resource "azurerm_resource_group" "aspenrg" {
  name     = "aspen-${random_id.id.hex}"
  location = "centralus"
}

##############################################################################
# Database
##############################################################################

resource "azurerm_postgresql_server" "api" {
  name                             = "api-db-${random_id.id.hex}"
  resource_group_name              = azurerm_resource_group.aspenrg.name
  location                         = azurerm_resource_group.aspenrg.location
  version                          = "11"
  administrator_login              = var.api_dbuser
  administrator_login_password     = var.api_dbpassword
  sku_name                         = "B_Gen5_1"
  ssl_enforcement_enabled          = true
  ssl_minimal_tls_version_enforced = "TLS1_2"
}

resource "azurerm_postgresql_firewall_rule" "api_db_access" {
  name                = "api_db_access-${random_id.id.hex}"
  resource_group_name = azurerm_resource_group.aspenrg.name
  server_name         = azurerm_postgresql_server.api.name
  start_ip_address    = "0.0.0.0"
  end_ip_address      = "0.0.0.0"
}

##############################################################################
# ElasticSearch and Kibana VM
##############################################################################

# Create virtual network
resource "azurerm_virtual_network" "myterraformnetwork" {
  name                = "myVnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.aspenrg.location
  resource_group_name = azurerm_resource_group.aspenrg.name
}

# Create subnet
resource "azurerm_subnet" "myterraformsubnet" {
  name                 = "mySubnet"
  resource_group_name  = azurerm_resource_group.aspenrg.name
  virtual_network_name = azurerm_virtual_network.myterraformnetwork.name
  address_prefixes     = ["10.0.1.0/24"]
}

# Create public IPs
resource "azurerm_public_ip" "myterraformpublicip" {
  name                = "myPublicIP"
  location            = azurerm_resource_group.aspenrg.location
  resource_group_name = azurerm_resource_group.aspenrg.name
  allocation_method   = "Dynamic"
}

# Create Network Security Group and rule
resource "azurerm_network_security_group" "myterraformnsg" {
  name                = "myNetworkSecurityGroup"
  location            = azurerm_resource_group.aspenrg.location
  resource_group_name = azurerm_resource_group.aspenrg.name

  security_rule {
    name                       = "SSH"
    priority                   = 1001
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "ElasticSearch"
    priority                   = 1002
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "9200"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "Kibana"
    priority                   = 1003
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "5601"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

# Create network interface
resource "azurerm_network_interface" "myterraformnic" {
  name                = "myNIC"
  location            = azurerm_resource_group.aspenrg.location
  resource_group_name = azurerm_resource_group.aspenrg.name

  ip_configuration {
    name                          = "myNicConfiguration"
    subnet_id                     = azurerm_subnet.myterraformsubnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.myterraformpublicip.id
  }
}

# Connect the security group to the network interface
resource "azurerm_network_interface_security_group_association" "example" {
  network_interface_id      = azurerm_network_interface.myterraformnic.id
  network_security_group_id = azurerm_network_security_group.myterraformnsg.id
}

# Create storage account for boot diagnostics
resource "azurerm_storage_account" "mystorageaccount" {
  name                     = "diag${random_id.id.hex}"
  location                 = azurerm_resource_group.aspenrg.location
  resource_group_name      = azurerm_resource_group.aspenrg.name
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

# Create virtual machine
resource "azurerm_linux_virtual_machine" "myterraformvm" {
  name                  = "Aspen-Telemetry${random_id.id.hex}"
  location              = azurerm_resource_group.aspenrg.location
  resource_group_name   = azurerm_resource_group.aspenrg.name
  network_interface_ids = [azurerm_network_interface.myterraformnic.id]
  size                  = "Standard_B2s"

  os_disk {
    name                 = "myOsDisk${random_id.id.hex}"
    caching              = "ReadWrite"
    disk_size_gb         = "30"
    storage_account_type = "StandardSSD_LRS"
  }

  source_image_reference {
    publisher = "canonical"
    offer     = "0001-com-ubuntu-server-focal"
    sku       = "20_04-lts-gen2"
    version   = "latest"
  }

  computer_name  = "aspen-telemetry-vm"
  admin_username = "azureuser"
  admin_password = "Password1234!"
  # custom_data                     = file("scripts/install.sh")

  disable_password_authentication = false

  boot_diagnostics {
    storage_account_uri = azurerm_storage_account.mystorageaccount.primary_blob_endpoint
  }

  provisioner "file" {
    source      = "/scripts/install.sh"
    destination = "/tmp/install.sh"

    connection {
      type     = "ssh"
      user     = "azureuser"
      password = "Password1234!"
      host     = azurerm_public_ip.myterraformpublicip.name
    }
  }

  provisioner "remote-exec" {
    inline = [
      "/tmp/install.sh"
    ]

  }
}

##https://github.com/pershoot/terraform_azure_myweb/blob/master/vm.tf

##############################################################################
# App Service
##############################################################################

resource "azurerm_service_plan" "main" {
  name                = "appserviceplan-${random_id.id.hex}"
  location            = azurerm_resource_group.aspenrg.location
  resource_group_name = azurerm_resource_group.aspenrg.name
  os_type             = "Linux"
  sku_name            = "S1"
}

resource "azurerm_linux_web_app" "api_appservice" {
  name                = "aspen-api-${random_id.id.hex}"
  location            = azurerm_resource_group.aspenrg.location
  resource_group_name = azurerm_resource_group.aspenrg.name
  service_plan_id     = azurerm_service_plan.main.id
  site_config {
    app_command_line  = ""
    always_on         = true
    health_check_path = "/health"
    application_stack {
      dotnet_version = "6.0"
    }
  }
  app_settings = {
    ASPNETCOREURLS            = "http://aspen-api-${random_id.id.hex}.azurewebsites.net"
    WEBSITE_WEBDEPLOY_USE_SCM = true
    SwaggerBasePath           = ""
    ASPEN_CONNECTION_STRING   = "server=${azurerm_postgresql_server.api.name}.postgres.database.azure.com; database=postgres; user id=${var.api_dbuser}@${azurerm_postgresql_server.api.name}.postgres.database.azure.com; password=${var.api_dbpassword};SSL Mode=Require; Trust Server Certificate=true;"
  }
  logs {
    detailed_error_messages = false
    failed_request_tracing  = false

    http_logs {
      file_system {
        retention_in_days = 5
        retention_in_mb   = 35
      }
    }
  }
}

resource "azurerm_linux_web_app_slot" "api_appservice_slot" {
  name           = "warmup"
  app_service_id = azurerm_linux_web_app.api_appservice.id
  site_config {
    auto_swap_slot_name = "production"
    health_check_path   = "/health"
  }
  app_settings = azurerm_linux_web_app.api_appservice.app_settings
}
