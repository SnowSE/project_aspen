terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
    }
  }
required_version = ">= 1.1.0"
}

provider "azurerm" {
  features {}
}

##############################################################################

resource "random_id" "id" {
  byte_length = 4
}

resource "azurerm_resource_group" "aspenrg" {
  name     = "aspen-${random_id.id.hex}"
  location = "centralus"
}

resource "azurerm_postgresql_server" "keycloak" {
  name                         = "keycloak-db-${random_id.id.hex}"
  resource_group_name          = azurerm_resource_group.aspenrg.name
  location                     = azurerm_resource_group.aspenrg.location
  version                      = "11"
  administrator_login          = "adm1n157r470r"
  administrator_login_password = "4-v3ry-53cr37-p455w0rd"
  sku_name                     = "B_Gen5_1"
  ssl_enforcement_enabled      = true
  ssl_minimal_tls_version_enforced = "TLS1_2"
}

resource "azurerm_postgresql_server" "api" {
  name                         = "api-db-${random_id.id.hex}"
  resource_group_name          = azurerm_resource_group.aspenrg.name
  location                     = azurerm_resource_group.aspenrg.location
  version                      = "11"
  administrator_login          = "adm1n157r470r"
  administrator_login_password = "4-v3ry-53cr37-p455w0rd"
  sku_name                     = "B_Gen5_1"
  ssl_enforcement_enabled      = true
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
    image  = "quay.io/keycloak/keycloak:17.0.1"
    cpu    = "0.5"
    memory = "1.5"
    ports {
        port     = 8080
        protocol = "TCP"
    }
    environment_variables = {
        KEYCLOAK_ADMIN = "keycloakadmin"
        KEYCLOAK_ADMIN_PASSWORD = "-${random_id.id.hex}-admin-${random_id.id.hex}"
    }
  }

  container {
      name = "caddy"
      image = "caddy:latest"
      cpu = "0.5"
      memory = "1.5"
      ports {
          port = 443
          protocol = "TCP"
      }
      commands = ["caddy reverse-proxy --from aspen-keycloak-${random_id.id.hex}.${azurerm_resource_group.aspenrg.location}.azurecontainer.io --to localhost:8080 "]
  }
 }

 