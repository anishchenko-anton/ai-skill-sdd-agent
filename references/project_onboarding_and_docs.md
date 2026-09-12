# Protocol: Project Onboarding & Architectural Documentation

This protocol defines the step-by-step procedure for initializing or synchronizing core project documentation: `docs/ABSTRACT.md` and `docs/ARCHITECTURE.md`.

---

## 1. Activation Triggers

1. **New Project / Missing Documentation**: The repository lacks `docs/ABSTRACT.md` or `docs/ARCHITECTURE.md`.
2. **Explicit User Request**: User requests: *"Initialize project documentation"*, *"Create ABSTRACT and ARCHITECTURE"*, or *"Audit current architecture"*.
3. **Documentation Drift**: Existing architecture documents are outdated or contradict actual codebase behavior.

---

## 2. Discovery & Fact-Check Phase

The agent MUST NEVER guess architecture. Analysis must be grounded in physical codebase artifacts:

### 2.1. Stack & Configuration Audit
- Inspect dependency manifests:
  - Node.js: `package.json`, `pnpm-workspace.yaml`, `tsconfig.json`
  - Python: `pyproject.toml`, `requirements.txt`, `Pipfile`
  - Go / Rust / C++: `go.mod`, `Cargo.toml`, `CMakeLists.txt`, `platformio.ini`
- Inspect infrastructure configs:
  - `docker-compose.yml`, `Dockerfile`, Kubernetes manifests, Nginx / Traefik configs.

### 2.2. Subsystem Boundaries & Data Flows
- Identify boundaries: client UI, API gateways, backend services, async workers, hardware controllers.
- Identify Entrypoints: `main.ts`, `app.py`, `server.go`, routers, controllers, WebSocket handlers.
- Identify DB schemas & models: ORM/ODM entities, SQL migrations, Proto files, OpenAPI schemas.
- Identify physical transports: REST, WebSocket (WSS), WebRTC (WHEP), gRPC, message queues (RabbitMQ/Kafka), hardware buses (UART, CAN, UDP MAVLink/CRSF).

---

## 3. Authoring `docs/ABSTRACT.md` (Conceptual Level)

Reference Template: `resources/abstract_template.md`.

### Mandatory Requirements:
1. **Bounded Contexts**: Clear boundaries for functional zones (e.g., Identity, Device Control, Telemetry).
2. **Domain Entities & Value Objects**: Comprehensive table with types, constraints, and relationships.
3. **$P(S, A, R, C)$ Matrix**: Detailed permissions mapping Subjects to Actions over Resources under Context conditions.
4. **System Invariants**:
   - **SSOT**: Canonical data store for each entity.
   - **Fail-Safe & Graceful Degradation**: System behavior during network partition or failure.
   - **On-Demand**: Allocation of compute or streaming channels strictly on-demand when consumers are active.
   - **Device Shadow**: Synchronized state mirror for physical devices with intermittent connectivity.
   - **Concurrency & Ownership**: Locking, mutexes, and single-operator ownership rules.
5. **State Machines**: Lifecycle state machine diagram (Mermaid) for primary domain entities.

---

## 4. Authoring `docs/ARCHITECTURE.md` (Physical Level)

Reference Template: `resources/architecture_template.md`.

### Mandatory Requirements:
1. **Component Topology**: Mermaid diagram of physical nodes (UI ➔ Gateway ➔ Services ➔ DB / Broker / Hardware).
2. **End-to-End Tracing (E2E Flow)**: Step-by-step path of a mutation request from user click to DB commit or hardware dispatch.
3. **Network Protocols Matrix**: Protocols, ports, and payload formats (REST JSON, WSS, WebRTC WHEP, UDP MAVLink/CRSF).
4. **Decoupling Points (Ports & Adapters)**: Interfaces abstracting external systems, storage, and drivers.
5. **Failure Modes & Resiliency**: Timeouts, retries with exponential backoff, rate limiting, and circuit breakers.

---

## 5. Human-in-the-Loop Gate

1. Present created or updated `docs/ABSTRACT.md` and `docs/ARCHITECTURE.md` to the user in chat.
2. Highlight key architectural findings and request clarification on ambiguous items.
3. Code implementation and feature work may begin **ONLY after explicit user approval** of the architecture documents.
