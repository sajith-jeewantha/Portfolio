variable "region" {
  type        = string
  default     = "asia-south1"
  description = "Set Region"
}

variable "google_project" {
  type        = string
  default     = "sajith-jeewantha"
  description = "Google Cloud Project"
}

variable "image_tag" {
  type        = string
  description = "Version of Docker Image"
}

# DB

variable "db_name" {
  type = string
}

variable "db_user" {
  type = string
}

variable "db_password" {
  type      = string
  sensitive = true
}

variable "instance_connection_name" {
  type = string
}