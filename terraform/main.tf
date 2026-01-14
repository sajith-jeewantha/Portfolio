terraform {
  required_version = ">= 1.0.0" # Ensure that the Terraform version is 1.0.0 or higher

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "7.16.0"
    }

    docker = {
      source  = "kreuzwerker/docker"
      version = "3.6.2"
    }
  }
}

terraform {
  backend "gcs" {
    bucket = "terraform-portfolio-tf-state"
    prefix = "terraform/state"
  }
}

provider "google" {
  project = var.google_project
  region  = var.region
}

data "google_client_config" "default" {

}

provider "docker" {
  registry_auth {
    address  = "${var.region}-docker.pkg.dev"
    username = "oauth2accesstoken"
    password = data.google_client_config.default.access_token
  }
}

resource "google_artifact_registry_repository" "registry" {
  location      = var.region
  repository_id = "docker-portfolio-repository"
  format        = "DOCKER"
}

module "app1" {
  source         = "./modules"
  region         = var.region
  google_project = var.google_project
  service_name   = "portfolioservice"
  image_name     = "docker-portfolio-image"
  port           = 8000
  registry_name  = google_artifact_registry_repository.registry.name
  depends_on     = [google_artifact_registry_repository.registry]
}