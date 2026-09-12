# Specification: [Feature Name]

## 1. Overview & Context
Concise summary of requirements, target problem, and objectives.

## 2. API Contract & DTOs (Unified RESTful)

### Endpoints
- `METHOD /api/v1/resource-path` — Operation description.

### Request DTO
```typescript
export interface RequestDto {
  readonly id: string;
  readonly name: string;
}
```

### Response DTO
```typescript
export interface ResponseDto {
  readonly data: {
    readonly id: string;
    readonly status: string;
  };
}
```

## 3. Acceptance Criteria (Given-When-Then)

### Scenario 1: [Happy Path Execution]
- **Given**: Valid input parameters and active system state.
- **When**: User or service initiates the action.
- **Then**: Resource is processed, returning `200 OK` or `201 Created` with expected state transitions.

### Scenario 2: [Validation Error]
- **Given**: Invalid payload or missing required fields.
- **When**: Request is submitted to the API.
- **Then**: System returns `422 Unprocessable Entity` formatted per RFC 7807 Problem Details.

## 4. UI & Performance Requirements
- Uses existing components and design system tokens.
- Mandatory loop keying: `@for (...; track item.id)` or `*ngFor; trackBy: trackById`.
- Zero hardcoded styles, strings, or URLs in templates.
