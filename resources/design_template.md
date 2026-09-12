# Design Document: [Feature / Task Name]

> **Linked Proposal**: `.openspec/proposal.md`  
> **Target Module**: `src/app/modules/[module_name]`

---

## 1. Architectural Interaction Schema (E2E per `docs/ARCHITECTURE.md`)

```mermaid
flowchart TD
    subgraph Frontend [UI Layer]
        UI[UI Component] --> Signals[Signals State Store]
    end
    subgraph Backend_App [Application & Gateways]
        Signals -->|Transport: WSS / REST| Gateway[Gateway / Controller]
        Gateway -->|Guard P(S,A,R,C)| Service[Application Service Facade]
    end
    subgraph Domain_Layer [Domain Model]
        Service --> Domain[Domain Entity & Invariants]
    end
    subgraph Infrastructure [Adapters & Drivers]
        Service -->|Interface Port| Port[<< Interface >> ITransportPort / IAdapter]
        Port -.->|Default Implementation| Adapter[Primary Driver Adapter]
        Port -.->|Scalable Provider| CloudAdapter[Future Provider Adapter]
        Adapter --> Target[(DB / Hardware Device)]
    end
```

### Decoupling Layer:
- **Interface Contract (Port)**: `I[ModuleName]Port` / `I[ModuleName]Repository`
- **Default Adapter**: `Default[ModuleName]Adapter`
- **Extensibility Strategy**: Isolation of external transports, APIs, and drivers behind interfaces guarantees painless swapping without impacting domain or presentation logic.

---

## 2. Reference Donors & Zero Novelty Invariant

- **UI Donor (Layout & Styles)**: `src/app/.../[existing-card/modal].component.html`
  - *Borrowed Structure*: (grid, padding, typography, button variants)
  - *Design Tokens*: (strictly matching donor, 0 novel colors)
- **Architecture Donor (Logic & State)**: `src/app/.../[existing].service.ts`
  - *Pattern*: (Signals / RxJS, error boundaries, DTO mapping)

---

## 3. Scope Control & Affected Files

### New Files:
- `[NEW] src/app/modules/.../feature.component.ts`
- `[NEW] src/app/modules/.../feature.service.ts`
- `[NEW] src/app/modules/.../feature.service.spec.ts`

### Modified Files:
- `[MODIFY] src/app/modules/.../existing-module.ts`

---

## 4. Domain Models, Interfaces & DTOs

```typescript
export interface ExampleDto {
  readonly id: string;
  readonly name: string;
  readonly status: ExampleStatus;
}
```

---

## 5. Method Specifications & Behavior

### `FeatureService.executeAction(dto: ExampleDto): Observable<ResultDto>`
- **Input**: Validated DTO payload.
- **Output**: Operation result payload.
- **Error Handling**: Formatted RFC 7807 problem details on failure.

---

## 6. Validation & Testing Plan

1. Unit tests for `FeatureService` (branch coverage $\ge 80\%$).
2. Integration test for component-service interaction.
3. Edge case and boundary DTO validation assertions.
