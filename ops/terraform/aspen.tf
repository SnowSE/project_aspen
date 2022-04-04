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
  administrator_login              = var.keycloak_dbuser
  administrator_login_password     = var.keycloak_dbpassword
  sku_name                         = "B_Gen5_1"
  ssl_enforcement_enabled          = true
  ssl_minimal_tls_version_enforced = "TLS1_2"
}

resource "azurerm_postgresql_firewall_rule" "api_db_access" {
  name = "api_db_access-${random_id.id.hex}"
  resource_group_name = azurerm_resource_group.aspenrg.name
  server_name = azurerm_postgresql_server.api.name
  start_ip_address = "0.0.0.0"
  end_ip_address = "0.0.0.0"
}

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
    app_command_line = ""
    always_on        = true
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
  name = "warmup"
  app_service_id = azurerm_linux_web_app.api_appservice.id
  site_config {
    auto_swap_slot_name = "production"
    health_check_path = "/health"
  }
  app_settings = azurerm_linux_web_app.api_appservice.app_settings
}
