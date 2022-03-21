terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>2.31.1"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "resourcegroup" {
  name     = "Terraform_Practice"
  location = "centralus"
  tags = {
    environment = "dev"
    source      = "Terraform"
    owner       = "sergio"
  }
}

resource "azurerm_app_service_plan" "ASP-TerraformPractice-9a01" {
  name                = "appserviceplan"
  location            = azurerm_resource_group.resourcegroup.location
  resource_group_name = azurerm_resource_group.resourcegroup.name
  sku {
    tier = "Free"
    size = "F1"
  }
}

resource "azurerm_app_service" "TerraformAPI" {
  name                = "TerraformAPI"
  location            = azurerm_resource_group.resourcegroup.location
  resource_group_name = azurerm_resource_group.resourcegroup.name
  app_service_plan_id = azurerm_app_service_plan.ASP-TerraformPractice-9a01.id
  source_control {
    repo_url = "https://github.com/sergio-ayala123/Terraform"
    branch   = "main"
  }
}

# resource "azurerm_mysql_server" "mysql_example" {
#   name                = "examplemysql"
#   location            = azurerm_resource_group.resourcegroup.location
#   resource_group_name = azurerm_resource_group.resourcegroup.name

#   administrator_login          = "sergio123"
#   administrator_login_password = "Sergio123$"

#   sku_name   = "B_Gen4_1"
#   storage_mb = 5120
#   version    = 5.7

#   public_network_access_enabled = true
#   ssl_enforcement_enabled       = false
# }
