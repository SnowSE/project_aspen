terraform {
  backend "azurerm" {
    resource_group_name = "terraform-resources"
    storage_account_name = "jallenaspenstorage"
    container_name = "terraform"
    key = "aspen.tfstate"
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

##############################################################################
# Databases
##############################################################################

resource "random_id" "id" {
  byte_length = 3
}

resource "azurerm_resource_group" "aspenrg" {
  name     = "aspen-${random_id.id.hex}"
  location = "centralus"
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
# App Services
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
    app_command_line = ""
    always_on        = true
  }
  app_settings = {
    ASPNETCOREURLS = "http://aspen-api-${random_id.id.hex}.azurewebsites.net"
  }
}

resource "azurerm_linux_web_app" "keycloak_appservice" {
  name                = "keycloak-${random_id.id.hex}"
  location            = azurerm_resource_group.aspenrg.location
  resource_group_name = azurerm_resource_group.aspenrg.name
  service_plan_id     = azurerm_service_plan.main.id
  site_config {
    app_command_line = ""
    always_on        = true
    #linux_fx_version = "DOCKER|snowjallen/keycloak"
  }
  app_settings = {
    WEBSITES_ENABLE_APP_SERVICE_STORAGE = "false"
    DOCKER_REGISTRY_SERVER_URL          = "https://index.docker.io"
    KEYCLOAK_ADMIN                      = var.keycloak_admin_username
    KEYCLOAK_ADMIN_PASSWORD             = var.keycloak_admin_password
    KC_HOSTNAME                         = "appservice-${random_id.id.hex}.azurewebsites.net:443"
  }
}
