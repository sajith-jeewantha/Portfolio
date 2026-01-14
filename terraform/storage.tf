resource "google_storage_bucket" "portfolio-bucket" {
  name          = "portfolio_storage_bucket"
  location      = var.region
  force_destroy = true

  soft_delete_policy {
    retention_duration_seconds = 0
  }
}

resource "google_storage_bucket_object" "demo-object" {
  bucket     = google_storage_bucket.portfolio-bucket.name
  name       = "portfolio-object"
  content    = module.app1.url
  depends_on = [module.app1]
}