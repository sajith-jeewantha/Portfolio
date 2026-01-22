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

variable "instance_connection_name" {
  type = string
}