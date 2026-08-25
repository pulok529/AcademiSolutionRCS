# AcademiSolutionRCS — Documentation Index

This folder contains all project documentation for the **Academi School Management System**.

## Rule
> **Every document, diagram, specification, SRS, analysis, architecture reference, or any non-code file MUST live inside `docs/`.
> Rule/agent files go in `.agents/rules/` — never inside `docs/`.
> Source code files never go inside `docs/`.**

---

## Folder Structure

```
docs/
├── architecture/           ← System design & technology decisions
├── analysis/               ← Legacy system analysis (Phase 2)
├── database/               ← Database design & schema (Phase 3)
├── requirements/           ← SRS and user requirements
├── devops/                 ← Jenkins, Docker, server setup guides
└── project_rules.md        ← Coding standards, naming, Git conventions
```

## Documents

### Architecture
| File | Description | Status |
|---|---|---|
| [tech_stack.md](architecture/tech_stack.md) | Full finalized technology stack with versions | ✅ Ready |
| [microservices_map.md](architecture/microservices_map.md) | Service boundaries, responsibilities, ports | ✅ Ready |
| [system_architecture.md](architecture/system_architecture.md) | High-level architecture overview | ✅ Ready |

### Analysis (Legacy System)
| File | Description | Status |
|---|---|---|
| [legacy_functional_overview.md](analysis/legacy_functional_overview.md) | Business modules & features in plain language | ⏳ Phase 2 |
| [legacy_technical_specification.md](analysis/legacy_technical_specification.md) | Technical deep-dive with pseudocode | ⏳ Phase 2 |
| [legacy_ui_action_flow.md](analysis/legacy_ui_action_flow.md) | UI-to-UI and action-to-action flow maps | ⏳ Phase 2 |

### Database
| File | Description | Status |
|---|---|---|
| [database_design.md](database/database_design.md) | New database schema design per service | ⏳ Phase 3 |

### Requirements
| File | Description | Status |
|---|---|---|
| [srs.md](requirements/srs.md) | Software Requirements Specification | ⏳ Pending |
| [user_requirements.md](requirements/user_requirements.md) | Non-technical user requirements | ⏳ Pending |

### DevOps
| File | Description | Status |
|---|---|---|
| [jenkins_pipeline.md](devops/jenkins_pipeline.md) | Jenkins setup & pipeline docs | ⏳ Pending |
| [docker_setup.md](devops/docker_setup.md) | Docker Compose usage guide | ⏳ Pending |
| [server_setup.md](devops/server_setup.md) | Server configuration guide | ⏳ Pending |

### Project Standards
| File | Description | Status |
|---|---|---|
| [project_rules.md](project_rules.md) | Coding standards, naming, Git workflow | ✅ Ready |
