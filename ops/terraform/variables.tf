variable "api_dbuser" {
  type        = string
  description = "api database user"
}

variable "api_dbpassword" {
  type        = string
  description = "api database password"
  sensitive   = true
}
