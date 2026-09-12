# Security Standards & Defensive Programming Protocol

This protocol defines mandatory information security and defensive engineering rules across all codebase modifications.

---

## 1. Secrets & Credentials Protection (Zero Hardcoded Secrets)

1. **Strict Secrets Ban**: Never hardcode passwords, API keys, private tokens, JWT secrets, or cryptographic private keys in source code files.
2. **Environment Variable Configuration**:
   - Confidential data must load strictly via environment variables (`process.env` / `os.environ`).
   - Maintain a synchronized `.env.example` template documenting variable names without real values.
   - Ensure `.env*` local secret files are explicitly present in `.gitignore`.

---

## 2. Defensive Boundary Validation (Zero Trust)

1. **Never Trust External Input**: All data arriving across system boundaries (URL queries, HTTP bodies, headers, multipart uploads, WebSocket frames) must be treated as untrusted.
2. **Strict DTO Schema Validation**:
   - Enforce schema validation libraries (Zod, Pydantic, class-validator) at the gateway, controller, and ingress boundaries.
   - Reject malformed payloads immediately with HTTP `400 Bad Request` or `422 Unprocessable Entity` formatted via RFC 7807 Problem Details.

---

## 3. Basic Security Hygiene (OWASP Top 10)

- **XSS Prevention**: Never interpolate unescaped user input into DOM trees (`innerHTML`, `[innerHTML]`) without explicit sanitization (DOMPurify or framework built-ins).
- **Injection Prevention (SQL / NoSQL / Command)**: Use parameterized queries, ORMs, or query builders. Never concatenate raw user input into SQL or shell command strings.
- **Server-Side Authorization**:
   - Enforce permissions and resource ownership ($P(S, A, R, C)$ matrix) on the backend for every incoming request.
   - Never rely solely on client-side button hiding or UI guards.

---

## 4. Security Verification Checklist

- [ ] Zero real passwords, tokens, or private keys committed to source control.
- [ ] Inbound DTOs strictly validated against schema validators.
- [ ] User input sanitized and escaped prior to rendering.
- [ ] Database interactions utilize parameterized queries exclusively.
