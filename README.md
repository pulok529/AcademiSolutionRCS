# Academi School Management System

> A modern, scalable, microservice-based school management system built with React, .NET 9, and MSSQL — containerized with Docker.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Vite + Tailwind CSS v4 + shadcn/ui |
| Backend | .NET 9 ASP.NET Core Web API (Clean Architecture + CQRS) |
| Auth | Keycloak (OAuth2 / OpenID Connect) |
| Gateway | YARP API Gateway + Nginx |
| Database | Microsoft SQL Server 2022 (per service) |
| Messaging | RabbitMQ + MassTransit |
| Cache | Redis |
| Reporting | QuestPDF + ClosedXML + CsvHelper |
| CI/CD | Jenkins (self-hosted) |
| Monitoring | Prometheus + Grafana + Seq + OpenTelemetry |

Full tech stack: [docs/architecture/tech_stack.md](docs/architecture/tech_stack.md)

---

## Microservices

| Service | Responsibility | Port |
|---|---|---|
| `api-gateway` | YARP routing, rate limiting, JWT validation | 5000 |
| `academic-service` | Students, classes, exams, results, attendance | 5001 |
| `accounts-service` | Fees, payments, invoices, finance | 5002 |
| `hrm-service` | Staff, payroll, leave, departments | 5003 |
| `notification-service` | Email, SignalR real-time notifications | 5004 |
| `report-service` | PDF, Excel, CSV report generation | 5005 |
| `keycloak` | Identity & auth server | 8080 |

---

## Project Structure

```
AcademiSolutionRCS/
├── src/                    ← Microservices (.NET 9)
│   ├── api-gateway/
│   ├── academic-service/
│   ├── accounts-service/
│   ├── hrm-service/
│   ├── notification-service/
│   ├── report-service/
│   └── shared/
├── apps/
│   └── academi-web/        ← React + TypeScript frontend
├── docs/                   ← All project documentation
│   ├── architecture/
│   ├── analysis/
│   ├── database/
│   ├── requirements/
│   └── devops/
├── infra/                  ← Nginx, Prometheus, Grafana config
├── .agents/rules/          ← AI development rules
├── docker-compose.yml
├── .gitignore
├── .editorconfig
├── .env.example
└── LICENSE
```

---

## Getting Started

### Prerequisites
- Docker Desktop / Docker Engine v26+
- Docker Compose v2+
- Git

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/pulok529/AcademiSolutionRCS
cd AcademiSolutionRCS

# 2. Create your environment file
cp .env.example .env
# → Edit .env and fill in all required values

# 3. Start all services
docker compose up -d

# 4. Access the application
#    Frontend:         http://localhost
#    API Gateway:      http://localhost:5000
#    Keycloak:         http://localhost:8080
#    RabbitMQ UI:      http://localhost:15672
#    Grafana:          http://localhost:3001
#    Seq Logs:         http://localhost:8081
```

---

## Documentation

- [Tech Stack](docs/architecture/tech_stack.md)
- [Project Rules & Standards](docs/project_rules.md)
- [Architecture Overview](docs/architecture/system_architecture.md)
- [Microservices Map](docs/architecture/microservices_map.md)

---

## License

This software is proprietary and confidential. See [LICENSE](LICENSE) for details.
