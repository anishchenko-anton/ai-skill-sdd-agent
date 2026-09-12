# Database, Migrations & Type Integrity Protocol

This protocol governs database schema migrations, transactional mutations, and cross-layer type consistency.

---

## 1. Database Migration Protocol

1. **Mandatory Migration Files**: Any addition, alteration, or deletion of tables, columns, indexes, or relationships in the database **MUST** be committed via a dedicated migration script (Prisma, TypeORM, Alembic, Flyway, Knex, etc.).
2. **Bidirectional Migrations (Up / Down)**:
   - Migrations should declare an apply (`up`) and a safe rollback (`down`) routine where supported by the ORM/tooling.
3. **Data Safety (Zero Data Loss)**:
   - Destructive operations (`DROP TABLE`, `DROP COLUMN`) on tables containing active data are strictly prohibited without an explicit migration plan.
   - Column type mutations must include safe data casting/transformation routines.

---

## 2. Cross-Layer Type Synchronization

1. **Single Source of Truth (SSOT)**:
   - Backend DTOs and frontend client models must derive from or strictly match the database schema and OpenAPI specification.
2. **Atomicity & Transactions**:
   - Multi-step writes across multiple tables must execute within an explicit database transaction to guarantee ACID consistency.

---

## 3. Database Verification Checklist

- [ ] Dedicated migration script generated for schema changes.
- [ ] Safe rollback logic specified.
- [ ] DTOs, domain models, and frontend interfaces synchronized with new schema.
- [ ] Multi-table mutations wrapped in atomic transactions.
