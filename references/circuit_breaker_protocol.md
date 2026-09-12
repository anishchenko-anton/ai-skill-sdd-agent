# Autonomous Ref Loop & 3x Circuit Breaker Protocol

This protocol defines the guidelines for autonomous build/test remediation and the guardrails preventing infinite execution loops.

---

## 1. Autonomous Remediation (Ref Loop & Backpressure)

When the compiler (`tsc`, `ng build`, `cargo check`), linter (`eslint`, `flake8`), or test runner (`jest`, `karma`, `pytest`) exits with failure:

1. **Log Analysis**: The agent MUST inspect the console output, locating the exact file, line number, and error code.
2. **Root Cause Localization**: Avoid blind, speculative edits. Understand the defect category (type mismatch, missing import, syntax defect, logic bug).
3. **Targeted Fix**: Apply a surgical modification to source code or test fixtures.
4. **Re-Verification**: Re-run the verification command to confirm resolution.

---

## 2. Loop Guardrail: 3x Circuit Breaker

> [!CAUTION]
> **Attempt Limit**:
> If the agent makes **3 consecutive unsuccessful attempts** to resolve the same compiler, lint, or test failure:
> 1. **STOP IMMEDIATELY**. Continuing random speculative edits is strictly prohibited.
> 2. **Acknowledge the Impasse in Chat**: Transparently report the roadblock to the user.
> 3. **Deliver an Impasse Report**:
>    - Exact error message and stack trace.
>    - The 3 hypotheses/fixes attempted and why they failed.
>    - Recommended alternative architectural approaches or missing technical requirements.

---

## 3. Autonomous Ref Loop Checklist

- [ ] Defect isolated from build/test telemetry.
- [ ] Root cause resolved rather than compiler warnings suppressed.
- [ ] Attempt count does not exceed 3.
- [ ] Verification suite runs cleanly with zero errors.
