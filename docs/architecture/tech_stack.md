# Academi Solution — Finalized Technology Stack

**Version**: 1.0.0
**Date**: 2025
**Status**: ✅ Approved & Locked

> This document is the **single source of truth** for all technology decisions.
> No technology may be added, removed, or substituted without a new approved implementation plan.

---

## 🖥️ Frontend

| Category | Technology | Version | Usage |
|---|---|---|---|
| Framework | React + TypeScript | React 18, TS 5.x | All UI components |
| Build Tool | Vite | v5+ | Dev server & production build |
| UI Component Library | shadcn/ui + Radix UI | Latest | All UI primitives & components |
| UI Theme / Design Base | Paces Template (converted to React) | — | Layout, sidebar, topbar, page shells |
| Styling | Tailwind CSS | v4 | All styling — no plain CSS or other frameworks |
| Client State | Zustand | v4+ | Global UI state (auth user, sidebar, modals) |
| Server State / API Cache | TanStack Query (React Query) | v5 | All API calls, loading states, caching |
| Forms | React Hook Form + Zod | Latest | All forms with schema-based validation |
| Routing | React Router | v7 | All client-side routing |
| HTTP Client | Axios (with interceptors) | v1+ | All HTTP requests — JWT auto-attached |
| Tables | TanStack Table | v8 | All data tables — sortable, filterable, virtual |
| Charts | Recharts | v2+ | Dashboards, attendance, fee, academic charts |
| Report Viewer (in-browser) | @react-pdf-viewer/core | v3+ | View generated PDFs inside the portal |
| Notifications / Toast | Sonner | Latest | All toast / notification messages |
| Date Utility | date-fns | v3+ | All date formatting & manipulation |
| Icons | Lucide React | Latest | All icons throughout the application |

---

## ⚙️ Backend Microservices

| Category | Technology | Version | Usage |
|---|---|---|---|
| Framework | ASP.NET Core Web API | .NET 9 | All microservices |
| Architecture Pattern | Clean Architecture + CQRS | — | Domain / Application / Infrastructure / Presentation |
| CQRS Mediator | MediatR | v12+ | All Commands, Queries, and Domain Events |
| ORM | Entity Framework Core | EF 9 | Primary data access, all DB migrations |
| Micro-queries | Dapper | v2+ | Complex reports, raw SQL, stored procedure calls |
| Validation | FluentValidation (MediatR Pipeline) | v11+ | All request validation — never in controllers |
| Object Mapping | Mapster | v7+ | All DTO ↔ Domain object mapping |
| API Documentation | Scalar | Latest | Interactive API docs per service |
| Logging | Serilog | v4+ | Structured logs — sinks to Console & Seq |
| Error Handling | Custom Middleware + Result Pattern | — | Consistent RFC 7807 error responses |
| Health Checks | ASP.NET Core Health Checks | Built-in | `/health` endpoint on every service |

---

## 🔐 Identity & Security

| Category | Technology | Version | Usage |
|---|---|---|---|
| Auth Server | Keycloak | v24+ | OAuth2, OpenID Connect, SSO — self-hosted Docker |
| Token Format | JWT Bearer Tokens | — | Stateless auth across all microservices |
| Authorization | ASP.NET Core Policy-Based Auth | Built-in | Role & permission enforcement per endpoint |
| Roles | SuperAdmin, Admin, Teacher, Accountant, HR, Parent | Custom | Defined in Keycloak, enforced in services |
| SSL / HTTPS | Nginx SSL Termination | — | TLS at reverse proxy — services are HTTP internally |

---

## 🌐 API Gateway & Communication

| Category | Technology | Version | Usage |
|---|---|---|---|
| API Gateway | YARP (Yet Another Reverse Proxy) | v2+ | Single entry point — routes, rate limits, validates JWT |
| Reverse Proxy / SSL | Nginx | Latest | Sits in front of YARP — SSL termination |
| Sync Communication | REST HTTP/JSON | — | Standard request/response between services |
| Async Messaging | RabbitMQ + MassTransit | RMQ 3.x, MT 8+ | Event-driven async — fee posted, enrollment, notifications |
| Service Discovery | Docker Compose internal DNS | — | Container names as hostnames within network |

---

## 🗄️ Data & Caching

| Category | Technology | Version | Usage |
|---|---|---|---|
| Primary Database | Microsoft SQL Server | 2022 | All persistent data — one DB per microservice |
| Database Pattern | Database-Per-Service | — | Each service owns its schema — no cross-DB joins |
| DB Migrations | EF Core Migrations (code-first) | — | All schema changes versioned in code |
| Caching | Redis | v7+ | Session tokens, lookup data, rate limiting counters |
| Search | MSSQL Full-Text Search | Built-in | Student/staff name search |

---

## 📊 Reporting Stack

| Purpose | Technology | Version | Usage |
|---|---|---|---|
| PDF Report Generation | QuestPDF | v2024+ | All transactional PDF reports |
| Excel Export | ClosedXML | v0.102+ | All Excel data exports |
| CSV Export | CsvHelper | v33+ | All CSV data exports |
| In-Browser PDF Viewer | @react-pdf-viewer/core | v3+ | View reports inside portal without download |
| Report Delivery | Dedicated `report-service` (.NET 9 API) | — | All report generation goes through this service |

**Reports covered:**
- Student result cards / mark sheets (QuestPDF → PDF)
- Fee slips / payment receipts (QuestPDF → PDF)
- Salary / payroll slips (QuestPDF → PDF)
- Attendance registers (QuestPDF → PDF / ClosedXML → Excel)
- Admission letters & certificates (QuestPDF → PDF)
- Student ID cards (QuestPDF → PDF)
- Financial collection reports (ClosedXML → Excel)
- Payroll registers (ClosedXML → Excel)
- Any tabular data (CsvHelper → CSV)

---

## 🐳 Infrastructure & DevOps

| Category | Technology | Version | Usage |
|---|---|---|---|
| Containerization | Docker | v26+ | Every service runs in a container |
| Orchestration | Docker Compose | v2+ | Dev & production on single server |
| Reverse Proxy | Nginx | Latest | SSL termination, static frontend files |
| CI/CD | Jenkins (self-hosted) | LTS | Automated build, test, Docker push, deploy |
| Container Registry | Docker Hub (private) | — | Store all Docker images |
| Secret Management | Jenkins Credentials + Docker Secrets | — | Never hardcode secrets |
| Log Aggregation | Serilog → Seq (self-hosted Docker) | Latest | Searchable structured logs |
| Monitoring | Prometheus + Grafana | Latest | Container & service health dashboards |
| Distributed Tracing | OpenTelemetry | Latest | Trace requests across microservices |

---

## 📧 Notifications

| Category | Technology | Usage |
|---|---|---|
| Email | MailKit (SMTP) | Fee reminders, result slips, admission letters |
| Real-time (in-portal) | SignalR (ASP.NET Core) | Live notifications inside the app |
| SMS | Pluggable — future phase | Not in current scope |

---

## 🧪 Testing

| Category | Technology | Usage |
|---|---|---|
| Unit Tests (.NET) | xUnit + Moq | Per microservice unit tests |
| Integration Tests | WebApplicationFactory + Testcontainers | Real DB tests in Docker containers |
| Frontend Unit | Vitest + React Testing Library | Component and hook testing |
| E2E Tests | Playwright | Full browser automation tests |
| API Testing | Bruno (open source REST client) | Team-shareable API collections |

---

## 📦 Microservices & Port Allocation

| Service | Container Name | Internal Port | External Port |
|---|---|---|---|
| Nginx | `academi-nginx` | 80, 443 | 80, 443 |
| YARP API Gateway | `academi-gateway` | 5000 | 5000 |
| Keycloak | `academi-keycloak` | 8080 | 8080 |
| Academic Service | `academi-academic` | 5001 | 5001 |
| Accounts Service | `academi-accounts` | 5002 | 5002 |
| HRM Service | `academi-hrm` | 5003 | 5003 |
| Notification Service | `academi-notification` | 5004 | 5004 |
| Report Service | `academi-report` | 5005 | 5005 |
| MSSQL Server | `academi-mssql` | 1433 | 1433 |
| Redis | `academi-redis` | 6379 | 6379 |
| RabbitMQ (AMQP) | `academi-rabbitmq` | 5672 | 5672 |
| RabbitMQ (Management UI) | `academi-rabbitmq` | 15672 | 15672 |
| Seq (Log UI) | `academi-seq` | 80 | 8081 |
| Seq (Ingestion) | `academi-seq` | 5341 | 5341 |
| Prometheus | `academi-prometheus` | 9090 | 9090 |
| Grafana | `academi-grafana` | 3000 | 3001 |

---

## 📋 NuGet Packages (Per .NET Service)

```xml
<!-- Core -->
<PackageReference Include="MediatR" Version="12.*" />
<PackageReference Include="FluentValidation.AspNetCore" Version="11.*" />
<PackageReference Include="Mapster" Version="7.*" />
<PackageReference Include="Scalar.AspNetCore" Version="*" />

<!-- Data -->
<PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="9.*" />
<PackageReference Include="Dapper" Version="2.*" />

<!-- Logging -->
<PackageReference Include="Serilog.AspNetCore" Version="8.*" />
<PackageReference Include="Serilog.Sinks.Seq" Version="*" />

<!-- Reporting (report-service only) -->
<PackageReference Include="QuestPDF" Version="2024.*" />
<PackageReference Include="ClosedXML" Version="0.102.*" />
<PackageReference Include="CsvHelper" Version="33.*" />

<!-- Messaging -->
<PackageReference Include="MassTransit.RabbitMQ" Version="8.*" />

<!-- Caching -->
<PackageReference Include="StackExchange.Redis" Version="*" />

<!-- Testing -->
<PackageReference Include="xunit" Version="*" />
<PackageReference Include="Moq" Version="*" />
<PackageReference Include="Testcontainers.MsSql" Version="*" />
```

---

## 📋 NPM Packages (Frontend)

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-router-dom": "^7.0.0",
    "axios": "^1.0.0",
    "@tanstack/react-query": "^5.0.0",
    "@tanstack/react-table": "^8.0.0",
    "zustand": "^4.0.0",
    "react-hook-form": "^7.0.0",
    "zod": "^3.0.0",
    "@hookform/resolvers": "^3.0.0",
    "recharts": "^2.0.0",
    "@react-pdf-viewer/core": "^3.0.0",
    "sonner": "^1.0.0",
    "date-fns": "^3.0.0",
    "lucide-react": "^0.400.0",
    "tailwindcss": "^4.0.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.0.0",
    "@playwright/test": "^1.0.0"
  }
}
```
