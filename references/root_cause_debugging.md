# Root Cause Diagnostics & Docs-to-Code Reality Check Protocol

This protocol defines the investigation procedure for defects, crashes, failing tests, and unexpected runtime behavior.

---

## 1. Fact-Based Diagnostics (No Guessing Invariant)

1. **No Guessing**: Guessing or hypothesizing without concrete evidence from log outputs, stack traces, diffs, or terminal execution is strictly prohibited.
2. **First Action — Direct Inspection**:
   - Locate the exact file and line number triggering the failure.
   - Inspect recent changes (`git diff`), environment configuration, and request/response payloads.
   - If telemetry is insufficient, add targeted diagnostic logs to inspect state before applying modifications.

---

## 2. Docs-to-Code Reality Check & Drift Detection

1. **Inspect Expected State**:
   - Review specifications, architecture docs (`docs/ABSTRACT.md`, `docs/ARCHITECTURE.md`, `.openspec/`), and contracts to understand intended behavior.
2. **Verify Actual State**:
   - Inspect active source code, configuration files, test fixtures, and runtime logs.
3. **Drift Detection**:
   - If documentation contradicts code reality (code changed or docs decayed), masking or bypassing the drift is strictly prohibited.
   - The agent MUST:
     1. Highlight the discrepancy in chat with specific files and line numbers.
     2. Propose updating the documentation/specification first to maintain Single Source of Truth (SSOT).
     3. Implement fixes strictly based on verified facts and updated specifications.

---

## 3. Root Cause Resolution vs Symptom Masking

Resolve structural and logical defects at their root source. Never apply superficial workarounds:

| Symptom Masking (Anti-Pattern) ❌ | Root Cause Resolution (Engineering Standard) ✅ |
| :--- | :--- |
| Adding `if (obj != null)` to conceal uninitialized state | Guarantee deterministic state initialization and strict typing |
| Suppressing TypeScript compiler errors via `as any` or `@ts-ignore` | Correct DTO definitions, interfaces, and boundary contracts |
| Adding `setTimeout()` to bypass race conditions | Leverage promises, RxJS operators, signals, or proper lifecycle hooks |
| Hardcoding branch exceptions for edge values | Adjust domain validation and invariant enforcement |

---

## 4. Bug Regression Test Guarantee

For EVERY bug investigated and resolved:
1. Author an automated test reproducing the defect **PRIOR TO or IN PARALLEL WITH** the fix.
2. Verify the test fails on unfixed code and passes cleanly after the fix.
3. Commit the regression test permanently to the project's test suite.

---

## 5. Debugging & Reality Check Checklist

- [ ] Inspected documentation and specifications (Expected State).
- [ ] Verified physical code, logs, and configs (Actual State).
- [ ] Highlighted and resolved Documentation Drift (if detected).
- [ ] Reproducible failure captured with exact log/stack trace evidence.
- [ ] Identified root cause with exact file, line, and technical explanation.
- [ ] Formulated structural fix targeting the root cause.
- [ ] Authored permanent regression test.
- [ ] Verified all test suites pass 100%.
