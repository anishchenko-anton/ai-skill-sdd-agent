# Testing Standards & Coverage Protocol (TDD & Branch Coverage)

This protocol defines the standards for unit and integration testing, test-driven development (TDD), and test coverage requirements.

---

## 1. Test-Driven Development (TDD) Workflow

1. **Test First (Red Phase)**: When authoring new features, write failing tests **prior to or alongside** writing implementation code, deriving test cases directly from specifications (`specs.md`).
2. **Given-When-Then / Arrange-Act-Assert (AAA)**:
   - **Arrange / Given**: Initialize input parameters, mock dependencies, and establish preconditions.
   - **Act / When**: Execute the target method or dispatch an event.
   - **Assert / Then**: Verify return values, side effects, and state mutations.
3. **Test Isolation**:
   - Unit tests must never depend on live network connections, filesystem state, or production databases.
   - External dependencies must be mocked via interfaces (Mocks, Stubs, Spies).
   - Test public observable contracts (Public API), never private implementation details.

---

## 2. Code Coverage Standards

- **Branch Coverage Threshold**: **Minimum 80% branch coverage**.
- **Mandatory Test Cases**:
  - **Happy Path**: Expected successful execution flow.
  - **Edge Cases**: Boundary conditions (empty arrays, `null` / `undefined`, zero or max numeric bounds, special characters).
  - **Error Cases**: Invalid inputs, network failure simulations, service timeouts (asserting RFC 7807 error structures).
  - **State Transitions**: Correct state transitions across entity lifecycles (`idle` -> `loading` -> `success` / `error`).

---

## 3. Bug Regression Test Guarantee

1. For EVERY identified and resolved defect, the agent **MUST** author an automated test reproducing the defect.
2. The regression test must fail on the unfixed code and pass cleanly once the fix is applied.
3. The regression test is committed permanently to the project's test suite.

---

## 4. Testing Verification Checklist

- [ ] Tests authored for all specification scenarios (Given-When-Then).
- [ ] All test suites pass 100% (Green status).
- [ ] Branch coverage reaches or exceeds 80%.
- [ ] Unit tests are decoupled and mock all external ports.
- [ ] Explicit readiness status declared (Local Build & Unit Tests Passed vs Deployed & Live Runtime Verified).
