variable "region" {
  type        = string
  description = "Google asia-south1"
}

variable "registry_name" {
  type        = string
  description = "google_artifact_registry_repository"
}

variable "service_name" {
  type        = string
  description = "Name for Service"
}

variable "image_name" {
  type        = string
  description = "Name for image"
}

variable "port" {
  type        = number
  description = "Port to expose"
}

variable "google_project" {
  type        = string
  description = "Project in Google Cloud"
}

variable "image_version" {
  type        = string
  description = "Version of Docker Image"
}

variable "instance_connection_name" {
  type = string
}

