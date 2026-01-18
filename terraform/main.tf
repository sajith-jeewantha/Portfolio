terraform {
  required_version = "1.14.3"
  backend "gcs" {
    bucket = "sj-portfolio-tf-state2"
    prefix = "terraform/state"
  }
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

provider "google" {
  project = var.google_project
  region  = var.region
}


data "google_project" "project" {}

data "google_client_config" "default" {
  depends_on = [data.google_project.project]
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

module "portfolio" {
  source         = "./modules/portfolio"
  region         = var.region
  google_project = var.google_project
  service_name   = "portfolioservice"
  image_name     = "docker-portfolio-image"
  port           = 8000
  registry_name  = google_artifact_registry_repository.registry.name
  depends_on     = [google_artifact_registry_repository.registry]
}


resource "google_project_service" "enable_api" {
  for_each = toset([
    "logging.googleapis.com",
    "artifactregistry.googleapis.com",
    "run.googleapis.com",
    "iamcredentials.googleapis.com",
    "cloudbuild.googleapis.com"
  ])

  service = each.key

  timeouts {
    create = "30m"
    update = "40m"
  }

  disable_on_destroy = false
  depends_on         = [data.google_client_config.default]
}