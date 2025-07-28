# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]
### Added
- Continuous Deployment (CD) pipeline setup (in progress).
- Security scanning with Trivy and npm audit (planned).
- Monitoring and observability setup (planned).

---

## [v1.0.0] - 2025-07-27
### Added
- Initial backend API with Express, MongoDB, and JWT authentication.
- Product CRUD API endpoints with authentication.
- React frontend with product listing, creation, and UI components.
- Dockerfiles for backend and frontend, enabling containerized deployments.
- Manual deployment to Azure Web Apps (via Docker).
- GitHub Actions CI pipeline for build, test, and lint checks.

### Fixed
- Port configuration issues during container deployment.
- Environment variable misconfigurations for Azure deployment.

---

## [v0.1.0] - 2025-07-20
### Added
- Project scaffolding for ShopLite (backend and frontend).
- Initial setup for Docker-based development environment.

