# UI Consistency, Zero Novelty & Loop Optimization Protocol

This protocol defines standards for creating UI components, matching visual design systems, and optimizing template rendering performance.

---

## 1. UI Consistency & Architectural Pattern Mirroring

Every new UI element, button, modal dialog, input field, table, or card **MUST** be styled and structured strictly by mirroring existing components on the target page and the project's design system.

### The "Zero Novelty" Invariant:
1. **No Design Invention**: Inventing new colors, fonts, border radii, arbitrary padding/margin scales, custom button variants, or bespoke modal wrappers is strictly prohibited when established elements exist in the project.
2. **Mandatory Component / Style Donor (Reference Donor)**:
   - Before authoring or updating any UI, the agent MUST **physically read** the source code of an adjacent component on the same or sibling page.
   - Replicate directly from the donor:
     - Markup layout structure (flex, grid, container hierarchy).
     - CSS classes, theme design tokens (background, text colors, borders).
     - Spacing metrics (`padding`, `margin`, `gap`) strictly aligned to the donor's grid.
     - Typography (`text-sm` vs `text-base`, `font-medium` vs `font-semibold`, muted caption colors).
     - Iconography: use the exact same icon set, symbol syntax, and sizing conventions.
     - Interactive states (hover, active, focus, disabled, loading skeletons).
3. **Architectural Pattern Mirroring**:
   - Component logic (Signals, Observables, service invocation, error boundaries) must mirror the architectural pattern of the donor rather than introducing foreign state-management paradigms.
4. **Composition from Established Primitives**: If a pre-built compound component is unavailable, compose it solely from established design system atoms. Any custom styling requires explicit justification in the proposal.

---

## 2. Mandatory Loop Keying (`trackBy` / `@for track`)

To eliminate wasteful DOM re-renders, memory leaks, and UI flickering, **ALL template iteration loops MUST specify an explicit unique tracking expression**.

### Modern Control Flow (Angular 17+ / Modern Templates):
```html
<!-- ✅ CORRECT: Modern @for with track on unique identifier -->
@for (item of items(); track item.id) {
  <app-user-card [user]="item" />
}

@for (device of devices(); track device.macAddress) {
  <app-device-row [device]="device" />
}
```

### Classic Template Syntax (`*ngFor`):
```html
<!-- ✅ CORRECT: *ngFor with trackBy function -->
<li *ngFor="let item of items; trackBy: trackById">
  {{ item.name }}
</li>
```
```typescript
// Inside component class:
trackById(index: number, item: IdentifiableItem): string | number {
  return item.id;
}
```

### Prohibitions:
- ❌ **PROHIBITED**: Rendering list loops via `*ngFor` without a `trackBy` function.
- ❌ **PROHIBITED**: Tracking by array index (`track $index` or `trackByIndex`) when entities possess a unique identifier (`id`, `uuid`, `code`).

---

## 3. UI Quality Verification Checklist

- [ ] Physically inspected and recorded the Reference Donor component.
- [ ] Verified alignment with existing page components (colors, fonts, padding, icons).
- [ ] Zero unapproved custom colors, arbitrary fonts, or ad-hoc CSS classes.
- [ ] No hardcoded inline styles, static strings, or absolute API links in templates.
- [ ] Every list iteration loop specifies `track item.id` or `trackBy`.
- [ ] Loading, Empty, and Error states mirror established application patterns.
