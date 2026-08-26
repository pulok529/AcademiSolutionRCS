# Academi Solution — Project Rules & Coding Standards

**Version**: 1.0.0
**Status**: ✅ Enforced on all development tasks

> These rules apply to **every developer and every AI-assisted task** on this project.
> Violations must be corrected before any code is merged.

---

## 1. Documentation Rules

- **ALL** documents, diagrams, SRS, analysis files, architecture specs, and user requirements go inside `docs/`
- Rule files and AI agent files go in `.agents/rules/` — **never** inside `docs/`
- Source code files **never** go inside `docs/`
- Every placeholder doc must have a `Status` header: `⏳ Pending`, `🔄 In Progress`, or `✅ Ready`
- Tech stack changes require a new approved Implementation Plan — cannot be changed unilaterally

---

## 1.1. AI Agent Implementation Plan Governance

- **BUILD & FILE CHANGE REQUESTS (Build, Edit, Refactor, Delete)**:
  - Create or update `implementation_plan.md` with a detailed technical plan.
  - Present it to the user for review.
  - **STOP and wait** for explicit user approval (*"yes"*, *"start working"*, or explicit approval).
  - Only begin file edits and execution after approval is received.

- **INFORMATIONAL QUESTIONS & INQUIRIES (Questions, Status, Explanations)**:
  - Answer the user **directly in chat** without creating an `implementation_plan.md` artifact or waiting for approval.

---

## 2. Git Workflow

### Branch Strategy
```
main          → Production-ready only. Protected. No direct commits.
develop       → Integration branch. All features merge here first.
feature/*     → One feature per branch. e.g., feature/student-enrollment
bugfix/*      → Bug fixes on develop. e.g., bugfix/fee-calculation-error
hotfix/*      → Emergency production fixes. e.g., hotfix/login-crash
release/*     → Release preparation. e.g., release/v1.2.0
```

### Branch Rules
- Branch from `develop` for features and bugfixes
- Branch from `main` for hotfixes only
- Delete branches after merge
- Never commit directly to `main` or `develop`
- PR required for all merges — at least 1 reviewer

### Commit Message Format (Conventional Commits)
```
<type>(<scope>): <short description>

Types:
  feat      → New feature
  fix       → Bug fix
  chore     → Build, config, tooling
  docs      → Documentation only
  test      → Test files
  refactor  → Code restructure (no feature/fix)
  perf      → Performance improvement
  style     → Formatting (no logic change)
  ci        → Jenkins / CI config

Examples:
  feat(academic): add student enrollment endpoint
  fix(accounts): correct fee calculation for partial payments
  docs(arch): update microservices map with report service
  chore(docker): add healthcheck to mssql container
```

---

## 3. Folder Structure — Per Microservice (Clean Architecture)

```
src/{service-name}/
├── {ServiceName}.Api/              ← Presentation Layer
│   ├── Controllers/
│   ├── Middleware/
│   ├── Extensions/
│   ├── Program.cs
│   └── appsettings.json
├── {ServiceName}.Application/      ← Application Layer (CQRS)
│   ├── Commands/
│   │   └── CreateStudent/
│   │       ├── CreateStudentCommand.cs
│   │       ├── CreateStudentCommandHandler.cs
│   │       └── CreateStudentCommandValidator.cs
│   ├── Queries/
│   │   └── GetStudentById/
│   │       ├── GetStudentByIdQuery.cs
│   │       └── GetStudentByIdQueryHandler.cs
│   ├── DTOs/
│   ├── Interfaces/
│   ├── Mappings/
│   └── Behaviors/               ← MediatR pipeline behaviors
├── {ServiceName}.Domain/           ← Domain Layer
│   ├── Entities/
│   ├── ValueObjects/
│   ├── Events/
│   ├── Exceptions/
│   └── Enums/
├── {ServiceName}.Infrastructure/   ← Infrastructure Layer
│   ├── Persistence/
│   │   ├── {ServiceName}DbContext.cs
│   │   ├── Configurations/      ← EF entity configs
│   │   ├── Migrations/
│   │   └── Repositories/
│   ├── Messaging/               ← RabbitMQ consumers/publishers
│   ├── Caching/                 ← Redis
│   └── ExternalServices/
└── Dockerfile
```

---

## 4. Naming Conventions

### C# / .NET
| Element | Convention | Example |
|---|---|---|
| Namespaces | PascalCase | `Academi.Academic.Application.Commands` |
| Classes | PascalCase | `StudentEnrollmentHandler` |
| Interfaces | IPascalCase | `IStudentRepository` |
| Methods | PascalCase | `GetStudentByIdAsync()` |
| Properties | PascalCase | `FirstName` |
| Private fields | _camelCase | `_studentRepository` |
| Local variables | camelCase | `studentId` |
| Constants | UPPER_SNAKE_CASE | `MAX_STUDENTS_PER_CLASS` |
| Enums | PascalCase | `StudentStatus.Active` |
| Command DTOs | `Create{Entity}Command` | `CreateStudentCommand` |
| Query DTOs | `Get{Entity}Query` | `GetStudentByIdQuery` |
| Request DTOs | `{Action}{Entity}Request` | `CreateStudentRequest` |
| Response DTOs | `{Entity}Response` | `StudentResponse` |
| Handlers | `{Command/Query}Handler` | `CreateStudentCommandHandler` |
| Validators | `{Command/Query}Validator` | `CreateStudentCommandValidator` |

### React / TypeScript
| Element | Convention | Example |
|---|---|---|
| Components | PascalCase | `StudentCard.tsx` |
| Hooks | camelCase with `use` prefix | `useStudentList.ts` |
| Stores (Zustand) | camelCase with `use` prefix | `useAuthStore.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL` |
| Types / Interfaces | PascalCase | `StudentResponse` |
| Folders | kebab-case | `student-management/` |
| Page components | PascalCase + `Page` suffix | `StudentListPage.tsx` |
| API service files | camelCase + `.service.ts` | `studentService.ts` |

---

## 5. API Design Rules

### URL Structure
```
/api/v1/{resource}              ← Collection
/api/v1/{resource}/{id}         ← Single item
/api/v1/{resource}/{id}/{sub}   ← Sub-resource

Examples:
  GET    /api/v1/students
  GET    /api/v1/students/{id}
  POST   /api/v1/students
  PUT    /api/v1/students/{id}
  DELETE /api/v1/students/{id}
  GET    /api/v1/students/{id}/enrollments
```

### Rules
- Resources are always **plural nouns** — never verbs
- Always versioned: `/api/v1/`
- Use standard HTTP verbs: GET, POST, PUT, PATCH, DELETE
- Return HTTP 200 (OK), 201 (Created), 204 (No Content), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Server Error)
- All error responses use **RFC 7807 Problem Details** format:
```json
{
  "type": "https://academi.app/errors/validation",
  "title": "Validation Error",
  "status": 400,
  "detail": "Student first name is required.",
  "instance": "/api/v1/students",
  "errors": { "firstName": ["First name is required."] }
}
```
- Pagination on all list endpoints: `?page=1&pageSize=20`
- Filtering: `?search=John&status=Active`
- Sorting: `?sortBy=createdAt&sortOrder=desc`

---

## 6. Architecture Rules

### Layer Boundaries (MUST NOT be violated)
```
Presentation (API) → can call → Application (CQRS)
Application        → can call → Domain interfaces + Infrastructure interfaces
Domain             → ZERO external dependencies
Infrastructure     → implements Domain interfaces
```

- **No business logic in Controllers** — controllers only receive requests and call MediatR
- **No direct DB calls from Application layer** — use repository interfaces
- **No EF DbContext in Application layer** — only in Infrastructure
- **No cross-service DB joins** — services communicate via API or RabbitMQ events
- **No magic strings** — use constants, enums, or config keys
- Every public method in Application/Domain must be **async** where I/O is involved

### Validation Rules
- All request validation via **FluentValidation** as a MediatR pipeline behavior
- No manual `ModelState` checks in controllers
- Validate at the boundary — never deep inside domain logic

---

## 7. Docker & Runtime Rules

### Docker-Only Runtime & Publishing Rule (STRICT)
- **ALL** microservices, databases (MSSQL), API gateways (YARP), auth servers (Keycloak), message brokers (RabbitMQ), caches (Redis), and frontend applications (React/Nginx) MUST be executed, published, and served strictly inside Docker containers.
- **Zero Host Machine Execution**: No application service or database runs directly on the host server OS outside of Docker.
- **Orchestration**: All multi-service running, testing, and deployment MUST be orchestrated via Docker Compose (`docker compose up -d`).

### Image Naming
```
academi/{service-name}:{version}

Examples:
  academi/api-gateway:1.0.0
  academi/academic-service:1.0.0
  academi/academi-web:1.0.0
```

### Docker Rules
- Every microservice must have a `Dockerfile` in its root
- All services must run as **non-root** user in containers
- Every service must have a **health check** defined in `docker-compose.yml`
- No secrets in `Dockerfile` or `docker-compose.yml` — use `.env` and Docker secrets
- `docker-compose.override.yml` is for local dev overrides — always gitignored

---

## 8. Security Rules

- **ZERO** secrets, passwords, API keys, or connection strings in code or committed files
- All sensitive config via environment variables or Docker secrets
- Only `.env.example` with empty values is committed to Git
- `appsettings.Production.json` is always gitignored
- Every API endpoint must be authenticated (JWT) unless explicitly marked `[AllowAnonymous]`
- CORS must be explicitly configured — no wildcard `*` in production

---

## 9. Testing Rules

- Every Command handler must have at least 1 unit test
- Every Query handler must have at least 1 unit test
- Integration tests use **Testcontainers** — real MSSQL in Docker, not mocks
- All tests must pass before any PR is merged
- Test projects follow naming: `{ServiceName}.{Layer}.Tests`

---

## 10. Jenkins Pipeline Stages

Every service CI/CD pipeline must follow these stages in order:
```
Stage 1: Checkout       → Pull code from Git
Stage 2: Restore        → dotnet restore / npm install
Stage 3: Build          → dotnet build / vite build
Stage 4: Test           → dotnet test / vitest
Stage 5: Docker Build   → docker build -t academi/{service}:{version}
Stage 6: Docker Push    → docker push to registry
Stage 7: Deploy         → docker compose pull + up -d on server
Stage 8: Health Check   → verify /health endpoint responds 200
```

- Pipeline defined in `Jenkinsfile` at root of each service
- No manual deployments — all deploys go through Jenkins
- Failed tests = pipeline stops = no deployment

---

## 11. Code Review Checklist

Before approving any PR:
- [ ] Follows Clean Architecture layer boundaries
- [ ] Naming conventions followed
- [ ] No secrets or hardcoded values
- [ ] All validation via FluentValidation
- [ ] Unit tests present for new logic
- [ ] API follows REST conventions with correct HTTP status codes
- [ ] Error responses use RFC 7807 Problem Details
- [ ] Docker-compatible (no hardcoded ports/paths)
- [ ] No commented-out code
- [ ] No TODOs left without a linked issue
