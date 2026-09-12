# SDD Agent Skill (`sdd-agent`)

Autonomous engineering agent for Spec-Driven Development (SDD) dedicated to modular development, code quality, and maintainable software systems.

---

## Core Principles & 6-Phase Architecture-First Pipeline

1. **Continuous Learning (`docs/user_remarks.md`)**: Read `docs/user_remarks.md` at session start. Whenever the user points out an error, preference, or constraint, log it into `docs/user_remarks.md` to prevent recurring mistakes.
2. **PHASE 1: Conceptual Filter (`docs/ABSTRACT.md`)**: Domain entities, $P(S, A, R, C)$ authorization matrix, lifecycle state machines, and system invariants (SSOT, Fail-Safe, On-Demand, Device Shadow). No coding without domain context.
3. **PHASE 2: Physical Tracing (`docs/ARCHITECTURE.md`)**: End-to-end data flow (`UI -> Gateway -> Guard -> Service -> Protocol/DB -> Hardware`), streaming protocols (WebSocket/WSS, WebRTC/WHEP, REST, UDP MAVLink/CRSF), and failure boundaries.
4. **PHASE 3: Spec-First & Decoupling Layer**:
   - Proposal with explicit Goals and Non-Goals.
   - Mandatory decoupling abstraction layer (interfaces, ports, and adapters for future scale and provider isolation).
   - Behavior specifications written in Given-When-Then format (no implementation code in specs), unified RESTful APIs (RFC 7807 problem details).
5. **PHASE 4: Plan & Alignment (Human-in-the-Loop Gate)**: Scope Control (explicit list of affected files), risk assessment, and waiting for explicit user confirmation in chat.
6. **PHASE 5: TDD & Implementation (Red-Green-Refactor)**:
   - Specification-based failing tests written prior to implementation.
   - Strict branch coverage threshold: **Branch Coverage $\ge 80\%$**.
   - SOLID, Value Objects, clean code ("Code Only"), zero hardcoding, zero novelty UI/architecture mirroring from reference donors, and mandatory unique keys (`trackBy` / `@for track`) in loops.
7. **PHASE 6: Empirical Verification & Strict Release Gate (Pre-Completion Checklist Gate)**:
   - Real-world empirical fact-checking (HTTP 200 / WS ack).
   - Automated verification with `python scripts/verify_release_gate.py`: whenever `backend/` files are touched, synchronize the version triad (`version.json` + `backend/package.json` + `CHANGELOG.md`).
   - Successful build verification (`nest build`), passing tests (`npm test`), and frontend build (`npm run build`).
   - Explicit readiness status reporting: `Local Build & Unit Tests Passed` vs `Deployed & Live Runtime Verified`.
8. **Root Cause Diagnostics**: Fact-based debugging (Docs-to-Code Reality Check), addressing underlying causes without workarounds, regression tests on every bug, and 3x Circuit Breaker.

---

## Directory Structure

```
src/sdd-agent/
├── SKILL.md                          # Lazy-loading navigation index and trigger routing
├── README.md                         # Skill documentation and architecture overview
├── docs/
│   ├── user_remarks.md               # User remarks log & continuous learning feedback
│   └── angular-rules.md              # Angular architecture rules and guidelines
├── scripts/                          # Automation and verification utilities
│   └── verify_release_gate.py        # Release gatekeeper script
├── references/                       # Deep protocol references (loaded on demand)
│   ├── project_onboarding_and_docs.md # Onboarding, ABSTRACT.md and ARCHITECTURE.md creation
│   ├── spec_and_api_design.md        # Spec-first workflow, RESTful standards & RFC 7807
│   ├── architecture_and_state.md     # Layered architecture, reactive state & abstraction layers
│   ├── coding_standards.md           # Clean code, SOLID, Value Objects, zero hardcoding
│   ├── security_standards.md         # Secrets protection, DTO boundary validation, OWASP
│   ├── ui_consistency.md             # Zero novelty, UI donor mirroring, trackBy invariant
│   ├── database_and_migrations.md    # Reversible migrations and schema/DTO integrity
│   ├── root_cause_debugging.md       # Docs-to-Code reality checks and root cause analysis
│   ├── circuit_breaker_protocol.md   # Autonomous ref loop and 3x Circuit Breaker
│   ├── testing_and_coverage.md       # TDD protocol, test fixtures, coverage >= 80%
│   └── after_work_release.md         # Release protocol, Checklist Gate & version triad
└── resources/                        # Ready-to-use artifact templates
    ├── abstract_template.md          # Conceptual specification template
    ├── architecture_template.md      # Physical architecture and E2E tracing template
    ├── proposal_template.md          # Proposal template (Goals / Non-Goals)
    ├── design_template.md            # Design document template
    ├── spec_template.md              # Detailed behavioral specification template
    ├── api_contract_template.yaml    # OpenAPI 3.0 contract template
    ├── test_template.spec.ts         # Unit test template (Given-When-Then)
    ├── changelog_template.md         # CHANGELOG release block template
    └── commit_template.md            # Conventional commit template
```
