# Phases 1-3: Conceptual Filter, Architecture Tracing & Spec-First Protocol

This protocol defines the top-down preparation funnel (Architecture-First Top-Down Funnel): from abstract conceptual domain model to end-to-end physical pipeline and formal specifications.

---

## 1. PHASE 1: Conceptual Filter (`docs/ABSTRACT.md`)

Before drafting a proposal or modifying code, the agent MUST verify alignment against `docs/ABSTRACT.md`:

1. **Domain Entities & Bounded Contexts**:
   - Identify entities affected by the task (per entity table in `docs/ABSTRACT.md`).
   - Validate that bounded context boundaries remain uncompromised.
2. **Permission Matrix $P(S, A, R, C)$**:
   - $S$ (Subject / Actor): Who initiates the action (Guest, User, Operator, Admin, System).
   - $A$ (Action): Exact operation (Read, Create, Update, Delete, Execute, Stream).
   - $R$ (Resource): Target domain entity/resource.
   - $C$ (Context / Conditions): Required criteria (roles, entity state, resource ownership).
3. **System Invariants**:
   - **Single Source of Truth (SSOT)**: Canonical state location; eliminate duplication and state desynchronization.
   - **Fail-Safe**: Safe system state during network disconnect, timeout, or dependency crash.
   - **On-Demand**: Resources, hardware feeds, and media streams allocate only while active consumers exist.
   - **Device Shadow**: Persistent state synchronization for physical devices with intermittent connectivity.
   - **Concurrency & Ownership**: Single-operator control, optimistic locks, and race-condition guards.

---

## 2. PHASE 2: Physical Chain Tracing (`docs/ARCHITECTURE.md`)

Following conceptual validation, trace the end-to-end data route through `docs/ARCHITECTURE.md`:

1. **End-to-End Data Flow (E2E)**:
   - Full route: `UI / Client -> Network Transport -> Gateway / Controller -> Guard / Policy -> Application Service -> Domain Model -> Port / Adapter / Repository -> Storage / Bus / Hardware Controller`.
2. **Transports & Protocols**:
   - Match calls against project protocol specifications (REST, WebSocket/WSS, WebRTC/WHEP, gRPC, UDP MAVLink/CRSF).
   - Verify serialization schemas (JSON RFC 8259, Protobuf, binary telemetry frames).
3. **Failure Domains & Resiliency**:
   - Handle timeouts, disconnections, backpressure, and retries.
   - Ensure boundary validation guards, pipes, and DTO validators filter incoming payloads.

---

## 3. PHASE 3: Specification & Unified RESTful API (Spec-First)

1. **Zero-Code Rule**: Modifying or creating source code files is strictly prohibited until specifications are documented in `.openspec/` and explicitly approved.
2. **Specification Artifacts**:
   - Location: Module-level `.openspec/specs.md` or root `.openspec/specs.md`.
   - Format: Given-When-Then / State Behavior / DTO contracts.
   - **No Implementation Code**: Specifications describe business behavior and contracts, not language syntax.

### Unified RESTful API Standards
- **URL**: Plural nouns, kebab-case (`/api/v1/devices/{id}/telemetry-sessions`).
- **HTTP Verbs**: `GET` (read), `POST` (create), `PATCH` (partial update), `PUT` (replace), `DELETE` (remove).
- **RFC 7807 Problem Details for HTTP APIs**:
```json
{
  "type": "https://api.domain.com/errors/validation-error",
  "title": "Invalid Request Payload",
  "status": 422,
  "detail": "Field 'roomId' is invalid.",
  "errors": [{ "field": "roomId", "message": "Room not found or inactive" }]
}
```

---

## 4. Decoupling & Abstraction Layer Design

Every proposal and design document for new entities or services MUST incorporate an abstraction layer:

1. **Port Interfaces**: Domain logic depends on abstractions (`IDataRepositoryPort`, `IDriverCommunicationPort`), never on concrete third-party SDKs or ORM drivers.
2. **Isolated Adapters**: Protocol drivers and database connectors are isolated in adapter implementations (`PostgresAdapter`, `CustomProtocolAdapter`), enabling frictionless replacement.

---

## 5. Pre-Planning Verification Checklist

1. [ ] Inspected `docs/ABSTRACT.md`: verified actors $P(S, A, R, C)$ and invariants (SSOT, Fail-Safe, On-Demand, Device Shadow).
2. [ ] Inspected `docs/ARCHITECTURE.md`: traced end-to-end data route and physical transport protocols.
3. [ ] Designed decoupling abstraction layer (ports and adapters).
4. [ ] Specified behavioral scenarios (Given-When-Then) and DTO schemas.
5. [ ] Formulated plan with strict Scope Control and awaited explicit user approval.
