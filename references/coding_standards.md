# Engineering Standards & Clean Code Protocol

This protocol defines the standards for generating, modifying, and reviewing source code.

---

## 1. Few-Shot Demonstration
Before generating complex classes or multi-file modules, the agent must locate or produce a canonical **Few-Shot Example** aligned with project conventions:
- Identify an established reference implementation in the codebase.
- Align method signatures, error handling, dependency injection, and naming conventions.
- When introducing a new pattern, present a minimal working prototype first.

---

## 2. "Code Only" Principle
When generating code, creating artifacts, and editing files:
- **Zero Conversational Fluff**: Deliver complete, production-ready code without lengthy introductions.
- **Zero Placeholders**: Never write `// TODO: implement later` or `/* ... rest of code ... */`. Every file must be complete and compilable.
- **English Code Comments**: Docstrings, type annotations, and code comments must be written strictly in English.

---

## 3. Zero Hardcoding Principle
Hardcoding literal values inside UI components, services, or business logic is **strictly prohibited**.

### Value Extraction Rules:
1. **API Endpoints & URLs**: Extract to environment configuration or centralized API route constants.
2. **User-Facing Copy & Error Messages**: Extract to localization dictionaries (i18n), message catalogs, or string constants.
3. **Magic Numbers & Thresholds**: Extract to named constants or configuration objects (`MAX_RETRY_ATTEMPTS = 3`, `DEFAULT_PAGE_SIZE = 20`).
4. **Statuses & Domain Types**: Model as `enum`, string literal union types, or strongly typed Value Objects.

```typescript
// ❌ WRONG (Hardcoded magic strings and numbers):
if (user.status === 'act' && list.length > 50) {
  fetch('http://api.backend.com/users/save', { ... });
}

// ✅ CORRECT (Configured, typed, and decoupled):
if (user.status === UserStatus.Active && list.length > AppConfig.PAGINATION.MAX_ITEMS) {
  this.userService.saveUser(user);
}
```

---

## 4. SOLID & Clean Code Rules
- **Function Length**: Functions must stay under 20 lines.
- **Class Length**: Classes should generally stay under 50-70 lines.
- **Early Returns (Guard Clauses)**: Eliminate `else` and nested `else if` ladders using early return statements.
- **Value Objects**: Wrap primitive domain concepts (Email, UUID, Amount, Coordinates) in self-validating Value Object classes.
