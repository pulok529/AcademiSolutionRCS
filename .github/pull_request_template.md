## Pull Request Checklist

### Description
<!-- Describe what this PR does and why -->

### Type of Change
- [ ] feat: New feature
- [ ] fix: Bug fix
- [ ] chore: Build/config/tooling
- [ ] docs: Documentation update
- [ ] refactor: Code restructure
- [ ] test: Test additions/changes

### Checklist
- [ ] Follows Clean Architecture layer boundaries
- [ ] Naming conventions followed (see `docs/project_rules.md`)
- [ ] No secrets or hardcoded values committed
- [ ] All validation done via FluentValidation
- [ ] Unit tests written for new business logic
- [ ] All tests pass (`dotnet test` / `vitest`)
- [ ] API follows REST conventions with correct HTTP status codes
- [ ] Error responses use RFC 7807 Problem Details format
- [ ] Docker compatible — no hardcoded ports or paths
- [ ] No commented-out code
- [ ] No unresolved TODOs

### Related Issues
<!-- Link any related GitHub issues: Closes #123 -->

### Screenshots (if UI changes)
<!-- Add before/after screenshots for any UI changes -->
