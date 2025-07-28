resource "azurerm_linux_web_app" "frontend_staging" {
  name                = "shoplite-frontend-staging"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  service_plan_id     = azurerm_service_plan.app_plan.id

  app_settings = {
    WEBSITES_ENABLE_APP_SERVICE_STORAGE = "false"
    WEBSITES_PORT                       = var.frontend_port_staging
  }

  site_config {
    application_stack {
      docker_image_name         = "shop-lite-frontend:staging"
      docker_registry_url       = "https://${azurerm_container_registry.acr.login_server}"
      docker_registry_username  = azurerm_container_registry.acr.admin_username
      docker_registry_password  = azurerm_container_registry.acr.admin_password
    }
  }

  https_only = true
}

resource "azurerm_linux_web_app" "backend_staging" {
  name                = "shoplite-backend-staging"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  service_plan_id     = azurerm_service_plan.app_plan.id

  app_settings = {
    WEBSITES_ENABLE_APP_SERVICE_STORAGE = "false"
    WEBSITES_PORT                       = var.backend_port_staging
  }

  site_config {
    application_stack {
      docker_image_name         = "shop-lite-backend:staging"
      docker_registry_url       = "https://${azurerm_container_registry.acr.login_server}"
      docker_registry_username  = azurerm_container_registry.acr.admin_username
      docker_registry_password  = azurerm_container_registry.acr.admin_password
    }
  }

  https_only = true
}
