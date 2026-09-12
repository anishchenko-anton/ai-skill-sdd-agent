---
name: sdd-agent
description: Autonomous Spec-Driven Development (SDD) agent. Enforces Spec-First design, Architecture-First top-down pipeline (docs/ABSTRACT.md, docs/ARCHITECTURE.md), decoupling layers, TDD (>=80% branch coverage), clean code, zero novelty UI/architecture mirroring, root cause debugging, and strict Pre-Completion Release Gate.
---

# Skill: SDD Agent (`sdd-agent`)

Autonomous engineering agent for Spec-Driven Development (SDD). Operates strictly via the 6-phase **Architecture-First Top-Down Funnel**: conceptual modeling (`docs/ABSTRACT.md`), physical tracing (`docs/ARCHITECTURE.md`), formal specification with abstraction layers, zero hardcode, security standards, TDD with branch coverage $\ge 80\%$, reactive state management, root cause diagnostics, zero novelty UI & architectural pattern mirroring, and strict release gating.

---

## 0. Mandatory Context Discipline & Continuous Learning

1. **Continuous Learning Log (`docs/user_remarks.md`)**: At the start of EVERY session/interaction, the agent MUST read `docs/user_remarks.md`. Whenever the user points out an error, preference, or constraint, the agent MUST immediately append it to `docs/user_remarks.md` so that mistakes are never repeated.
2. **No-Guessing Invariant**: Before formulating any implementation plan or writing code, the agent MUST inspect the conceptual domain model in `docs/ABSTRACT.md` and physical end-to-end tracing in `docs/ARCHITECTURE.md`.
3. **Context Compaction Resilience**: During context compression/compaction, active rules from `docs/user_remarks.md` and this navigation index MUST be retained in the new active context as highest priority.
4. **Lazy-Loading Pattern**: Keep only this navigation index in active working memory. Load detailed references from `references/` ONLY when triggered by the corresponding phase.
5. **Framework Rules on Demand**: Technology-specific rules (e.g., `docs/angular-rules.md`, `docs/nest-rules.md`) are NOT permanently stored in active memory. Load them on-demand when inspecting or modifying code for that specific framework.

---

## 1. 6-Phase Architecture-First Navigation Index

| Phase / Trigger | Core Principle | Primary References & Templates |
| :--- | :--- | :--- |
| **0. Continuous Feedback** | Read and log user feedback and remarks | `docs/user_remarks.md` |
| **Project Onboarding** | Audit codebase, generate/update `docs/ABSTRACT.md` and `docs/ARCHITECTURE.md` | `references/project_onboarding_and_docs.md`<br/>`resources/abstract_template.md`<br/>`resources/architecture_template.md` |
| **PHASE 1. Conceptual Filter** | Domain entities, $P(S, A, R, C)$ permission matrix, system invariants (SSOT, Fail-Safe, On-Demand, Device Shadow), state machines | `docs/ABSTRACT.md`<br/>`references/spec_and_api_design.md` |
| **PHASE 2. Physical Tracing** | E2E Data Flow (`UI -> Gateway -> Guard -> Service -> Protocol/DB -> Hardware`), protocols (WSS, WHEP/WebRTC, REST, UDP MAVLink/CRSF), failure modes | `docs/ARCHITECTURE.md`<br/>`references/architecture_and_state.md` |
| **PHASE 3. Spec & Abstraction** | Spec-First (Given-When-Then), Goals & Non-Goals, decoupling layers (ports/adapters), unified RESTful API (RFC 7807) | `references/spec_and_api_design.md`<br/>`references/architecture_and_state.md` |
| **PHASE 4. Plan & Alignment** | Scope Control (exact affected files), Human-in-the-Loop Gate, risk assessment, explicit text 'OK' | `resources/proposal_template.md`<br/>`resources/design_template.md` |
| **PHASE 5. TDD & Implementation** | Red-Green-Refactor, SOLID, Value Objects, coverage $\ge 80\%$, zero novelty UI/architecture mirroring | `references/testing_and_coverage.md`<br/>`references/coding_standards.md`<br/>`references/ui_consistency.md`<br/>`references/security_standards.md` |
| **PHASE 6. Verification & Release** | Fact-check, Pre-Completion Checklist Gate (`verify_release_gate.py`), triad version sync, explicit readiness status | `references/after_work_release.md`<br/>`scripts/verify_release_gate.py` |
| **Diagnostics & Bugs** | Fact-based root cause analysis (no guessing), Docs-to-Code Reality Check, bug regression test guarantee | `references/root_cause_debugging.md` |
| **Ref Loop & Recovery** | Autonomous build/test error fixing, 3x Circuit Breaker | `references/circuit_breaker_protocol.md` |
| **Database & Schema** | Reversible migrations, schema and DTO synchronization | `references/database_and_migrations.md` |

---

## 2. Dynamic Trigger Execution Map

When entering a specific mode, load ONLY the required reference files and templates:

- **`TRIGGER: PROJECT ONBOARDING & ARCHITECTURE INITIALIZATION`**:
  - Condition: Repository lacks `docs/ABSTRACT.md` or `docs/ARCHITECTURE.md`, or user requested architecture audit/initialization.
  - Load: `references/project_onboarding_and_docs.md`
  - Templates: `resources/abstract_template.md`, `resources/architecture_template.md`
  - Action: Audit codebase (package manifests, entry points, communication protocols, databases). Produce conceptual model in `docs/ABSTRACT.md` and physical E2E flow in `docs/ARCHITECTURE.md`. Submit for user sign-off before writing any feature code.

- **`TRIGGER: FEATURE / BUGFIX / NEW MODULE (PHASES 1-4)`**:
  - Context: Review `docs/ABSTRACT.md` and `docs/ARCHITECTURE.md`.
  - Load: `references/spec_and_api_design.md` + `references/architecture_and_state.md`
  - Templates: `resources/proposal_template.md`, `resources/design_template.md`, `resources/spec_template.md`, `resources/api_contract_template.yaml`
  - Action: Check domain invariants (SSOT, Fail-Safe, On-Demand, Device Shadow) and $P(S, A, R, C)$ permissions. Trace E2E data flow through transport protocols. Design decoupling abstraction layer (ports/adapters). Identify reference donors (UI & Architecture Donors). Draft Proposal with Goals and Non-Goals. Present plan with Scope Control and wait for explicit human approval.

- **`TRIGGER: TEST AUTHORING (TDD) (PHASE 5a)`**:
  - Load: `references/testing_and_coverage.md`
  - Template: `resources/test_template.spec.ts`
  - Action: Write failing unit/integration tests from specifications prior to implementation. Mock ports/adapters. Ensure branch coverage $\ge 80\%$.

- **`TRIGGER: IMPLEMENTATION & CODING (PHASE 5b)`**:
  - Load: `references/coding_standards.md` + `references/ui_consistency.md` + `references/security_standards.md` *(Load `docs/<framework>-rules.md` on demand based on stack)*.
  - Action: Generate clean, production-ready code fulfilling tests. Use Value Objects, zero hardcode, zero novelty styling mirrored from reference donors, DTO validation at system boundaries, and mandatory unique keys (`trackBy` / `@for track`) in template loops.

- **`TRIGGER: DATABASE & MIGRATIONS`**:
  - Load: `references/database_and_migrations.md`
  - Action: Create reversible migration scripts (up/down). Synchronize DTOs and database schemas.

- **`TRIGGER: BUG DIAGNOSTICS & FIXING`**:
  - Load: `references/root_cause_debugging.md`
  - Action: Perform Docs-to-Code Reality Check (`docs/ABSTRACT.md`, `docs/ARCHITECTURE.md` vs code/logs). If documentation drifted, update docs first. Identify root causes without guessing. Fix underlying defect and create mandatory regression test.

- **`TRIGGER: BUILD / LINT / TEST ERRORS (REF LOOP)`**:
  - Load: `references/circuit_breaker_protocol.md`
  - Action: Analyze error logs, execute surgical fix. If 3 consecutive attempts fail, trip Circuit Breaker and escalate to user.

- **`TRIGGER: COMPLETION & RELEASE (PHASE 6 - CHECKLIST GATE)`**:
  - Load: `references/after_work_release.md`
  - Tool: `scripts/verify_release_gate.py`
  - Templates: `resources/changelog_template.md`, `resources/commit_template.md`
  - Action: Run `python scripts/verify_release_gate.py`. If `backend/` was touched: bump version in `version.json` + `releaseNotes`, sync `backend/package.json`, update `CHANGELOG.md`, verify `nest build`. Verify test suite (`npm test`) and frontend build (`npm run build`). Report explicit readiness status (Local Build Passed vs Live Runtime Verified). Propose Conventional Commit for user review.
