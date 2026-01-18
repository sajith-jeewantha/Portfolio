variable "region" {
  type    = string
  description = "Set Region"
}

variable "google_project" {
  type        = string
  description = "Google Cloud Project"
}

variable "bucket_tf_state" {
  type = string
  description = "bucket for tf state"
}