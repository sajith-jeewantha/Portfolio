locals {
  docker_image_url = "${var.region}-docker.pkg.dev/${var.google_project}/${var.registry_name}/${var.image_name}"
}