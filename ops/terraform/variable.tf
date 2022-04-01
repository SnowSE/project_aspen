variable "api_dbuser" {
  default     = "adm1n157r470r"
  type        = string
  description = "api database user"
}

variable "api_dbpassword" {
  default     = "4-v3ry-53cr37-p455w0rd"
  type        = string
  description = "api database user"
  sensitive   = true
}

variable "keycloak_dbuser" {
  default     = "adm1n157r470r"
  type        = string
  description = "api database user"
}

variable "keycloak_dbpassword" {
  default     = "4-v3ry-53cr37-p455w0rd"
  type        = string
  description = "api database user"
  sensitive   = true
}

variable "keycloak_admin_username" {
  default     = "admin"
  type        = string
  description = "api database user"
}

variable "keycloak_admin_password" {
  default     = "keycloakPassword"
  type        = string
  description = "api database user"
  sensitive   = true
}
