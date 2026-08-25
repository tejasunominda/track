# Dev environment root module.
# Wires together the reusable modules under infra/terraform/modules/*
# (vpc, rds, eks, elasticsearch, kafka, s3) per Technical Architecture
# Document §6. Populate provider/backend config before first `terraform init`.

terraform {
  required_version = ">= 1.7"
}

# module "vpc" {
#   source = "../../modules/vpc"
# }
#
# module "rds" {
#   source = "../../modules/rds"
# }
