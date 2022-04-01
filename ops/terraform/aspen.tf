terraform {
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

##############################################################################

resource "random_id" "id" {
  byte_length = 4
}



resource "azurerm_postgresql_server" "keycloak" {
  name                             = "keycloak-db-${random_id.id.hex}"
  resource_group_name              = azurerm_resource_group.aspenrg.name
  location                         = azurerm_resource_group.aspenrg.location
  version                          = "11"
  administrator_login              = var.api_dbuser
  administrator_login_password     = var.api_dbpassword
  sku_name                         = "B_Gen5_1"
  ssl_enforcement_enabled          = true
  ssl_minimal_tls_version_enforced = "TLS1_2"
}

resource "azurerm_postgresql_server" "api" {
  name                             = "api-db-${random_id.id.hex}"
  resource_group_name              = azurerm_resource_group.aspenrg.name
  location                         = azurerm_resource_group.aspenrg.location
  version                          = "11"
  administrator_login              = var.keycloak_dbuser
  administrator_login_password     = var.keycloak_dbpassword
  sku_name                         = "B_Gen5_1"
  ssl_enforcement_enabled          = true
  ssl_minimal_tls_version_enforced = "TLS1_2"
}

##############################################################################

resource "azurerm_container_group" "keycloak" {
  name                = "aspen-keycloak-${random_id.id.hex}"
  location            = azurerm_resource_group.aspenrg.location
  resource_group_name = azurerm_resource_group.aspenrg.name
  ip_address_type     = "Public"
  dns_name_label      = "aspen-keycloak-${random_id.id.hex}"
  os_type             = "Linux"

  container {
    name   = "keycloakapi"
    image  = "snowjallen/keycloak"
    cpu    = "0.5"
    memory = "1.5"
    ports {
        port     = 443
        protocol = "TCP"
    }
    environment_variables = {
        KEYCLOAK_ADMIN = "admin"
        KEYCLOAK_ADMIN_PASSWORD = "change_me"
        KC_HOSTNAME = "aspen-keycloak-${random_id.id.hex}.${azurerm_resource_group.aspenrg.location}.azurecontainer.io:443"
    }
  }
 }

resource "azurerm_container_group" "api" {
  name                = "aspen-api-${random_id.id.hex}"
  location            = azurerm_resource_group.aspenrg.location
  resource_group_name = azurerm_resource_group.aspenrg.name
  ip_address_type     = "Public"
  dns_name_label      = "aspen-api-${random_id.id.hex}"
  os_type             = "Linux"

  container {
    name   = "aspenapi"
    image  = "sanpetepantry/web:beta"
    cpu    = "0.5"
    memory = "1.5"
    ports {
      port     = 80
      protocol = "TCP"
    }
    environment_variables = {
      ASPNETCOREURLS = "http://aspen-api-${random_id.id.hex}.${azurerm_resource_group.aspenrg.location}.azurecontainer.io"
    }
  }
}

resource "azurerm_app_service_plan" "main" {
  name                = "appservice-${random_id.id.hex}"
  location            = azurerm_resource_group.aspenrg.location
  resource_group_name = azurerm_resource_group.aspenrg.name
  kind                = "Linux"
  reserved            = true

  sku {
    tier = "Standard"
    size = "S1"
  }
}

resource "azurerm_app_service" "testappservice" {
  name                = "appservice-${random_id.id.hex}"
  location            = azurerm_resource_group.aspenrg.location
  resource_group_name = azurerm_resource_group.aspenrg.name
  app_service_plan_id = azurerm_app_service_plan.main.id

  site_config {
    app_command_line = ""
    linux_fx_version = "DOCKER|snowjallen/keycloak"
  }

  app_settings = {
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
    "DOCKER_REGISTRY_SERVER_URL"          = "https://index.docker.io"
    KEYCLOAK_ADMIN = "admin"
    KEYCLOAK_ADMIN_PASSWORD = "change_me"
    KC_HOSTNAME = "appservice-${random_id.id.hex}.azurewebsites.net:443"
  }
}
