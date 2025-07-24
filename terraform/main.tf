provider "azurerm" {
  features {}
  subscription_id = "3f715fdb-d22d-4b98-a04b-2472beaba7a7"
}

resource "azurerm_resource_group" "main" {
  name     = "shoplist-resources"
  location = "East US"
}

resource "azurerm_container_registry" "acr" {
  name                = "shoplistacr123"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "Basic"
  admin_enabled       = true
}

resource "azurerm_service_plan" "app_plan" {
  name                = "shoplist-app-plan"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  os_type             = "Linux"
  sku_name            = "B1"
}

resource "azurerm_linux_web_app" "frontend" {
  name                = "shoplite-frontend"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  service_plan_id     = azurerm_service_plan.app_plan.id

  app_settings = {
    WEBSITES_ENABLE_APP_SERVICE_STORAGE = "false"
    WEBSITES_PORT                       = var.frontend_port
  }

  site_config {
    application_stack {
      docker_image_name        = "shop-lite-frontend:latest"
      docker_registry_url = "https://${azurerm_container_registry.acr.login_server}"
      docker_registry_username = azurerm_container_registry.acr.admin_username
      docker_registry_password = azurerm_container_registry.acr.admin_password
    }
  }

  https_only = true
}


resource "azurerm_linux_web_app" "backend" {
  name                = "shoplite-backend"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  service_plan_id     = azurerm_service_plan.app_plan.id

  app_settings = {
    WEBSITES_ENABLE_APP_SERVICE_STORAGE = "false"
    WEBSITES_PORT                       = var.backend_port
  }

  site_config {
    application_stack {
      docker_image_name        = "shop-lite-backend:latest"
      docker_registry_url = "https://${azurerm_container_registry.acr.login_server}"
      docker_registry_username = azurerm_container_registry.acr.admin_username
      docker_registry_password = azurerm_container_registry.acr.admin_password
    }
  }

  https_only = true
}
