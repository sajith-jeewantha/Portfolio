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
      timeout_seconds = 900
      containers {
        image = docker_registry_image.docker_image_portfolio.name
        ports {
          container_port = var.port
        }
        env {
          name  = "DB_NAME"
          value = var.db_name
        }
        env {
          name  = "DB_USER"
          value = var.db_user
        }
        env {
          name  = "DB_PASSWORD"
          value = var.db_password
        }
        env {
          name  = "INSTANCE_CONNECTION_NAME"
          value = var.instance_connection_name
        }
        env {
          name  = "DB_PORT"
          value = "3306"
        }
        env {
          name  = "DJANGO_SECRET_KEY"
          value = var.secret_key
        }
        env {
          name  = "ALLOWED_HOSTS"
          value = "*.asia-south1.run.app"
        }
        env {
          name  = "CSRF_TRUSTED_ORIGINS"
          value = "https://*.asia-south1.run.app"
        }
      }
    }
    revision_retention_limit = 3
    metadata {
      annotations = {
        "run.googleapis.com/cloudsql-instances" = var.instance_connection_name
      }
    }
  }
  depends_on = [docker_registry_image.docker_image_portfolio]
}

