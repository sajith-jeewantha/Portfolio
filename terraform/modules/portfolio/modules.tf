terraform {
  required_version = "1.14.3"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "7.16.0"
    }
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.6.2"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "6.38.0"
    }
  }
}

resource "docker_image" "local_docker_image" {
  # Local image
  name = local.docker_image_url
  build {
    context  = abspath("${path.root}/../portfolio/")
    platform = "linux/amd64"
    //Mac running with M chip but google doesn't
  }
}

resource "docker_registry_image" "docker_image_portfolio" {
  name          = docker_image.local_docker_image.name
  keep_remotely = true
  depends_on    = [docker_image.local_docker_image]
}

resource "google_cloud_run_service" "docker_service" {
  name     = var.service_name
  location = var.region

  template {
    spec {
      containers {
        image = docker_registry_image.docker_image_portfolio.name
        ports {
          container_port = var.port
        }
      }
    }
    metadata {
      annotations = {
        "run.googleapis.com/cloudsql-instances" = var.instance_connection_name
      }
    }
  }
  depends_on = [docker_registry_image.docker_image_portfolio]
}

