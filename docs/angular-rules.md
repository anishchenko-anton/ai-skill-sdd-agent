# Angular Best Practices & Architectural Rules (`docs/angular-rules.md`)

These rules are loaded **on-demand** by the agent when developing, refactoring, or generating Angular codebase components.

---

## 1. Template & Styles Isolation
Component templates (HTML) must reside in separate files (e.g., `name.component.html`), never inline in `.ts` files. The `@Component` decorator must use `templateUrl` and external styles (`styleUrls` or `styleUrl`).
- **Exception**: Microscopic wrappers consisting of 1-2 text lines.

## 2. Maximum Reusability (DRY)
Repeated UI elements (cards, buttons, panels, toolbars) must be encapsulated in dedicated presentational ("dumb") Angular components or global CSS utilities (`@apply`), eliminating HTML markup duplication.

## 3. Centralized Design Tokens
Style constants (colors, border-radii, shadows, border widths) must never be hardcoded in arbitrary classes (e.g., `rounded-[20px]`). They must be declared in the theme configuration (Tailwind / CSS Variables) as semantic design tokens.

## 4. SVG Sprites
Inline SVG dumps in templates are strictly prohibited. Interface icons must be defined in a centralized SVG sprite (`assets/icons.svg`) using `<symbol>` tags, referenced via:
```html
<svg class="w-5 h-5"><use href="assets/icons.svg#icon-name"></use></svg>
```

## 5. Localization (i18n & Transloco)
Use **Transloco** (`@ngneat/transloco`) for dynamic runtime language switching without page reloads. All translations reside in structured JSON files.

## 6. Modal Backdrop & Escape Handling
All modals must support closing on backdrop click (`event.target === event.currentTarget`) and pressing the `Escape` key.

## 7. Mandatory Operation Feedback (Toasts)
All user actions modifying server state (HTTP POST, PATCH, PUT, DELETE) MUST be visually confirmed with feedback toasts/banners indicating operation outcome: `success` or `error`. Users must never be left wondering about action status.

## 8. Translation Reusability (i18n DRY)
Avoid duplicate translation keys for generic terms ("Save", "Delete", "Cancel", "Status"). Common terms must be referenced from the top-level `COMMON.*` translation block. Feature blocks define domain-specific terms only.

## 9. Angular Signals for Reactivity
All component and service reactivity must use native **Angular Signals** (`signal()`, `computed()`, `input()`, `output()`).
- Do not introduce new `BehaviorSubject` or `Subject` instances for state management.
- RxJS is reserved strictly for async network communication (HTTP / WebSockets), converted to signals via `toSignal()`.
- Access reactive state in HTML templates via signal invocation: `{{ myValue() }}`.

## 10. No Mocks in Production Services & Components
- **Strictly Prohibited**: Hardcoding mock domain data inside component or service signals.
- **Service Layer (Data Access)**: Components are presentation units. All data MUST originate from Angular Services via `HttpClient` / backend REST APIs.
- **Pending Backend APIs**: If backend endpoints are pending, implement a backend mock controller or a dedicated `HttpInterceptor` fixture contract.
- **Initial State**: Signals must initialize to empty/loading state (`signal<DataModel | null>(null)`).

## 11. Unified Card & Widget Wrapper
All dashboard cards and widgets must be wrapped in a shared reusable container (e.g., `<app-dashboard-card>`), providing standardized headers, icons, action slots (`card-header-actions`), and collapse/close triggers.

## 12. Unified Modal Wrapper
Duplicating modal overlay markup (`fixed inset-0`) in feature components is prohibited. All dialogs must use a shared modal shell (`<app-modal>` / `<app-confirm-modal>`) to centralize backdrop event handling, keyboard listeners, and animation states.

## 13. Frontend Version Increment
On meaningful frontend releases, increment patch version or build number across:
- `frontend/package.json`
- `frontend/src/environments/environment.ts` and `environment.prod.ts`

## 14. Method & Function Documentation (TSDoc "Why/What/For What")
Public and private methods across services, components, pipes, and guards must include concise TSDoc comments covering:
- **Purpose (For What)**: The UI or business state problem solved.
- **Logic (What)**: Parameters, transformations, and return types.
- **Rationale (Why)**: Architectural justifications (e.g., why `untracked()`, why 300ms debounce, why `takeUntilDestroyed`).

## 15. Path Aliases (@-Imports / No Relative Hell)
Relative path chains (`../../environments`, `../../../core/services/...`) are strictly prohibited. Configure and use TypeScript path aliases:
- `@env/*` — Environment configs (`@env/environment`).
- `@app/*` — App root (`src/app/*`).
- `@core/*` — Singleton services, interceptors, guards (`src/app/core/*`).
- `@shared/*` — Reusable components, modals, pipes, types (`src/app/shared/*`).
- `@features/*` — Feature modules and pages (`src/app/features/*`).
- `@layout/*` — Structural layout components (`src/app/layout/*`).
- `@auth/*` — Authentication and session state (`src/app/auth/*`).
- **Exception**: Relative imports (`./child.component`, `./name.model`) are permitted exclusively within the exact same directory for closely coupled sibling files. Any upward traversal (`../`) must use `@`-aliases.
