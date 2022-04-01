variable "api_dbuser" {
  type        = string
  description = "api database user"
}

variable "api_dbpassword" {
  type        = string
  description = "api database user"
  sensitive   = true
}

variable "keycloak_dbuser" {
  type        = string
  description = "api database user"
}

variable "keycloak_dbpassword" {
  type        = string
  description = "api database user"
  sensitive   = true
}

variable "keycloak_admin_username" {
  type        = string
  description = "api database user"
}

variable "keycloak_admin_password" {
  type        = string
  description = "api database user"
  sensitive   = true
}
