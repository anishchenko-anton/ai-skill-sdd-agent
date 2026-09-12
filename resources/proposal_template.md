# Proposal: [Feature / Task Name]

> **Date**: YYYY-MM-DD  
> **Status**: Pending Review / Approved  
> **Target Module**: `src/app/modules/[module_name]`

---

## 1. Conceptual Filter (`docs/ABSTRACT.md` Alignment)
- **Domain Entities**: *List affected entities (e.g., Room, User, Device, StreamSession, DeviceShadow)*
- **Permission Matrix $P(S, A, R, C)$**:
  - **Subject ($S$)**: *Initiating actor (Guest, Operator, Admin, System)*
  - **Action ($A$)**: *Operation type (Read, Control, Takeover, Modify)*
  - **Resource ($R$)**: *Target resource entity*
  - **Context ($C$)**: *Required conditions (active session, valid token, device status)*
- **System Invariants**: *Compliance with SSOT, Fail-Safe, On-Demand, Device Shadow, and concurrency rules*

---

## 2. Physical Tracing (`docs/ARCHITECTURE.md` Alignment)
- **E2E Data Flow**: `UI / Client -> Network Transport -> Gateway / Controller -> Guard / Policy -> Application Service -> Port / Adapter -> Storage / Broker / Edge Device`
- **Involved Protocols**: *(REST, WebSocket/WSS, WebRTC/WHEP, message broker, UDP MAVLink/CRSF)*
- **Failure Modes & Degradation**: *(timeouts, link loss, exponential retry)*

---

## 3. Goals
*Explicitly what WILL be delivered in this task:*
- [ ] Goal 1: ...
- [ ] Goal 2: ...

---

## 4. Non-Goals
*Explicitly what is OUT OF SCOPE (guard against scope creep):*
- ❌ Non-Goal 1: ...
- ❌ Non-Goal 2: ...

---

## 5. Reference Donors & Zero Novelty Invariant
*Mandatory existing components/services for mirroring layout, styling, and state management:*
- **UI Donor**: `src/app/.../example.component.html` (layout structure, CSS classes, theme design tokens, typography, padding, icons)
- **Architecture Donor**: `src/app/.../example.service.ts` (service architecture, Signals/RxJS, error handling, DTO mapping)
- **Compliance Guarantee**: New UI and service components mirror established donors 1-to-1 without introducing novel styling or divergent paradigms.

---

## 6. Decoupling & Abstraction Layer
*Mandatory isolation layer for future scaling:*
- **Interface / Port**: `I[EntityName]Port` / `I[EntityName]Repository` / `I[DriverName]Adapter`
- **Default Implementation**: e.g., current local adapter / default driver.
- **Future Scale Point**: Ability to swap transport, database, or device protocol without modifying domain business logic.

---

## 7. Risks & Alternatives
*Potential failure risks, backwards compatibility impacts, and considered alternatives.*
