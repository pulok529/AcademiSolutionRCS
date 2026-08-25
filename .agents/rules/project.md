# AcademiSolutionRCS — AI Agent Enforcement Rules

## Project Identity
- **Project**: Academi School Management System
- **Repo**: https://github.com/pulok529/AcademiSolutionRCS
- **Tech Stack Reference**: `docs/architecture/tech_stack.md`
- **Project Rules Reference**: `docs/project_rules.md`

---

## CRITICAL RULE: Implementation Plan First

> **BEFORE writing any code or making any file changes for a development task:**
> 1. Create or update `implementation_plan.md` with a detailed plan
> 2. Present it to the user for review
> 3. Wait for explicit user approval
> 4. Only then begin execution
>
> Exception: Trivial fixes (typos, formatting, single-line changes) do not need a plan.

---

## Technology Constraints (ABSOLUTE — NO EXCEPTIONS)

### ✅ APPROVED TECHNOLOGIES ONLY

#### Frontend — Use ONLY:
- **React 18** + **TypeScript 5** (framework)
- **Vite v5+** (build tool) — NOT Webpack, Create React App, Next.js
- **shadcn/ui + Radix UI** (UI components) — NOT MUI, Ant Design, Chakra UI
- **Paces Template** (design theme converted to React) — NOT other admin templates
- **Tailwind CSS v4** (styling) — NOT plain CSS, SCSS, Bootstrap, Emotion, Styled Components
- **Zustand v4+** (client state) — NOT Redux, MobX, Jotai
- **TanStack Query v5** (server state) — NOT SWR, Apollo
- **React Hook Form + Zod** (forms & validation) — NOT Formik, Yup
- **React Router v7** (routing) — NOT TanStack Router, Next.js Router
- **Axios** (HTTP client) — NOT fetch directly, ky, got
- **TanStack Table v8** (tables) — NOT AG Grid, react-table v7
- **Recharts v2+** (charts) — NOT Chart.js, D3, Victory
- **@react-pdf-viewer/core** (PDF viewer) — NOT PDF.js directly
- **Sonner** (toasts) — NOT react-toastify, react-hot-toast
- **date-fns v3+** (dates) — NOT moment.js, dayjs, luxon
- **Lucide React** (icons) — NOT Font Awesome, Heroicons, react-icons

#### Backend — Use ONLY:
- **.NET 9 ASP.NET Core Web API** — NOT .NET 6/7/8, NancyFx, ServiceStack
- **Clean Architecture + CQRS pattern** — NOT MVC-only, minimal API-only without layers
- **MediatR v12+** (CQRS mediator) — NOT manual command buses
- **Entity Framework Core 9** (ORM) — NOT NHibernate, Dapper alone for EF work
- **Dapper v2+** (micro-queries & reports) — Used alongside EF, not replacing it
- **FluentValidation v11+** (validation) — NOT Data Annotations alone, not manual validation
- **Mapster v7+** (mapping) — NOT AutoMapper
- **Scalar** (API docs) — NOT Swagger UI / Swashbuckle
- **Serilog v4+** (logging) — NOT NLog, log4net, Microsoft.Extensions.Logging alone

#### Auth — Use ONLY:
- **Keycloak v24+** — NOT Duende IdentityServer, Auth0, custom JWT auth servers

#### Gateway — Use ONLY:
- **YARP v2+** (API Gateway) — NOT Ocelot, Kong, AWS API Gateway
- **Nginx** (reverse proxy / SSL) — NOT Apache, Caddy, Traefik

#### Messaging — Use ONLY:
- **RabbitMQ + MassTransit** — NOT Kafka, Azure Service Bus, NServiceBus

#### Database — Use ONLY:
- **Microsoft SQL Server 2022** (MSSQL) — NOT PostgreSQL, MySQL, MongoDB, SQLite
- **EF Core Migrations** (schema management) — NOT Flyway, Liquibase, raw SQL scripts alone
- **Redis v7+** (caching) — NOT Memcached, in-memory cache alone

#### Reporting — Use ONLY:
- **QuestPDF** (PDF generation) — NOT Crystal Reports, SSRS, RDLC, iTextSharp, FastReport
- **ClosedXML** (Excel export) — NOT NPOI, EPPlus
- **CsvHelper** (CSV export) — NOT manual CSV string building
- **@react-pdf-viewer/core** (frontend PDF view) — NOT PDF.js directly

#### DevOps — Use ONLY:
- **Docker + Docker Compose** (containerization) — NOT Kubernetes, Docker Swarm
- **Jenkins** (CI/CD) — NOT GitHub Actions, GitLab CI, CircleCI, Azure DevOps
- **Prometheus + Grafana** (monitoring) — NOT Datadog, New Relic, CloudWatch
- **Seq** (log aggregation) — NOT ELK Stack, Splunk, Loki
- **OpenTelemetry** (distributed tracing) — NOT Jaeger standalone, Zipkin

#### Testing — Use ONLY:
- **xUnit** (unit tests) — NOT NUnit, MSTest
- **Moq** (mocking) — NOT NSubstitute, FakeItEasy
- **Testcontainers** (integration tests) — NOT SQLite for integration testing
- **Vitest + React Testing Library** (frontend tests) — NOT Jest
- **Playwright** (E2E) — NOT Cypress, Selenium
- **Bruno** (API testing) — NOT Postman, Insomnia

---

## Folder & File Rules

- **ALL documentation** → `docs/` folder (architecture, SRS, analysis, database design, devops guides)
- **ALL AI/agent rules** → `.agents/rules/` folder — NEVER inside `docs/`
- **ALL source code** → `src/{service-name}/` or `apps/academi-web/`
- **NO code files** inside `docs/`
- **NO documentation files** inside `src/` or `apps/`
- **NO secrets or .env files** committed to Git — only `.env.example`

---

## Architecture Rules (NEVER Violate)

1. **Clean Architecture boundaries are sacred** — no cross-layer violations
   - Presentation → Application only
   - Application → Domain interfaces only
   - Domain → zero external dependencies
   - Infrastructure → implements Domain interfaces

2. **Database-Per-Service** — each microservice has its own database
   - NEVER join across service databases
   - Cross-service data = API call or RabbitMQ event

3. **No business logic in Controllers** — only MediatR calls + return responses

4. **No direct DbContext in Application layer** — use repository interfaces

5. **All validation via FluentValidation** as MediatR pipeline behavior

6. **All errors** must use RFC 7807 Problem Details format

7. **All API endpoints** must be authenticated unless explicitly `[AllowAnonymous]`

---

## Naming Convention Rules

- C# classes: PascalCase
- C# private fields: _camelCase
- Request DTOs: `{Action}{Entity}Request` (e.g., `CreateStudentRequest`)
- Response DTOs: `{Entity}Response` (e.g., `StudentResponse`)
- Commands: `{Action}{Entity}Command` (e.g., `CreateStudentCommand`)
- Queries: `Get{Entity}{By...}Query` (e.g., `GetStudentByIdQuery`)
- React components: PascalCase `.tsx`
- React hooks: `use` prefix camelCase `.ts`
- React pages: PascalCase + `Page` suffix (e.g., `StudentListPage.tsx`)
- API folders in React: `{entity}Service.ts` (e.g., `studentService.ts`)
- Zustand stores: `use{Name}Store.ts` (e.g., `useAuthStore.ts`)

---

## Git Rules

- Commit format: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`)
- Branch strategy: `main` / `develop` / `feature/*` / `bugfix/*` / `hotfix/*` / `release/*`
- NEVER commit directly to `main` or `develop`
- NEVER commit secrets, `.env` files, or `appsettings.Production.json`

---

## Docker Rules

- Image naming: `academi/{service-name}:{version}`
- Every service must have a `Dockerfile`
- Every service must have a `/health` endpoint
- All config via environment variables — never hardcoded in Dockerfiles

---

## What You Must NEVER Do

- ❌ Suggest or use any technology not listed in `docs/architecture/tech_stack.md`
- ❌ Write business logic in controllers
- ❌ Cross service database boundaries
- ❌ Hardcode secrets, passwords, or connection strings
- ❌ Use Bootstrap, jQuery, or any non-approved UI library
- ❌ Use PostgreSQL, MongoDB, or any non-MSSQL database
- ❌ Use GitHub Actions for CI/CD (Jenkins only)
- ❌ Use SSRS, Crystal Reports, RDLC, or FastReport for reporting
- ❌ Skip the Implementation Plan approval step for development tasks
- ❌ Put documentation inside `src/` or `apps/`
- ❌ Put code inside `docs/`
- ❌ Put rule files inside `docs/`
