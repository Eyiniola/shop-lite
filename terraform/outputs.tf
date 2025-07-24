output "resource_group_name" {
  value = var.resource_group_name
}

output "acr_login_server" {
  value = azurerm_container_registry.acr.login_server
}

output "frontend_app_url" {
  value = "https://${azurerm_linux_web_app.frontend.default_hostname}"
}

output "backend_app_url" {
  value = "https://${azurerm_linux_web_app.backend.default_hostname}"
}
