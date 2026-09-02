---
name: sdd-agent
description: Автономный агент Spec-Driven Development. Обеспечивает разработку на основе спецификаций (Spec-First), TDD, чистоту кода, безопасность, слоистую архитектуру, диагностику первопричин, единообразие UI, управление версиями и Conventional Commits.
---

# Навык: SDD Агент (`sdd-agent`)

Автономный инженерный агент разработки на основе спецификаций (Spec-Driven Development — SDD). Работает строго по 6-фазной нисходящей воронке (**Architecture-First Development Pipeline**): первичное изучение `docs/ABSTRACT.md` и `docs/ARCHITECTURE.md`, спецификация со слоем абстракции, нулевой хардкод, безопасность, TDD с покрытием $\ge 80\%$, реактивное управление состоянием, диагностика первопричин, единообразие UI и жесткий релизный шлюз.

---

## 0. Обязательный входной контроль и контекстная дисциплина

1. **Шлюз непрерывного обучения (Continuous Learning)**: В начале КАЖДОГО взаимодействия агент обязан прочитать `docs/user_remarks.md` для загрузки замечаний пользователя, обратной связи и проектных предпочтений.
2. **Инвариант отсутствия догадок (No-Guessing Invariant)**: Перед составлением любого плана или написанием кода агент ОБЯЗАН изучить концептуальную модель в `docs/ABSTRACT.md` и физическую трассировку в `docs/ARCHITECTURE.md`.
3. **Устойчивость к сжатию контекста**: При компактизации контекста правила из `docs/user_remarks.md` и этот навигационный индекс сохраняются в новом контексте в первую очередь.
4. **Паттерн ленивой загрузки (Lazy-Loading)**: В активной памяти держится только этот индекс. Полные справочники (`references/`) загружаются ТОЛЬКО при активации соответствующей фазы или триггера.
5. **Фиксация самокоррекции**: При любом исправлении от пользователя или появлении нового требования агент обязан немедленно зафиксировать его в `docs/user_remarks.md`.

---

## 1. Навигационный индекс 6-фазного пайплайна (Architecture-First Index)

| Фаза / Триггер | Ключевой принцип | Файлы основы / Справочники |
| :--- | :--- | :--- |
| **0. Обратная связь** | Чтение замечаний пользователя и запись уроков | `docs/user_remarks.md` |
| **ФАЗА 1. Концептуальный фильтр** | Доменные сущности, роли $P(S, A, R, C)$, инварианты (SSOT, Fail-Safe, On-Demand, Device Shadow) | `docs/ABSTRACT.md`<br/>`references/spec_and_api_design.md` |
| **ФАЗА 2. Физическая трассировка** | E2E Data Flow (Front ➔ Gateway ➔ Guard ➔ Service ➔ Protocol/DB ➔ Hardware), WSS, WHEP, REST, MAVLink | `docs/ARCHITECTURE.md`<br/>`references/architecture_and_state.md` |
| **ФАЗА 3. Спецификация и Абстракция** | Proposal (Goals/Non-Goals), Design, слой абстракции (порты/адаптеры), RESTful / OpenAPI | `references/spec_and_api_design.md`<br/>`references/architecture_and_state.md` |
| **ФАЗА 4. План и Согласование** | Scope Control (список затронутых файлов), Human-in-the-Loop Gate, ожидание текстового 'ОК' | `resources/proposal_template.md`<br/>`resources/design_template.md` |
| **ФАЗА 5. TDD и Реализация** | Падающий тест ➔ чистый код ➔ Green, SOLID, Value Objects, покрытие $\ge 80\%$, UI consistency | `references/testing_and_coverage.md`<br/>`references/coding_standards.md`<br/>`references/ui_consistency.md`<br/>`references/security_standards.md` |
| **ФАЗА 6. Верификация и Релиз** | Эмпирический факт-чек, шлюз Pre-Completion Checklist Gate (`verify_release_gate.py`), синхронная триада версий | `references/after_work_release.md`<br/>`scripts/verify_release_gate.py` |
| **Диагностика и Баги** | Анализ логов/фактов (без догадок), сверка спек с кодом (Docs-to-Code Reality Check), регрессионный тест | `references/root_cause_debugging.md` |
| **Цикл самоисправления** | Автономная правка ошибок компиляции/тестов, предохранитель (Circuit Breaker 3x) | `references/circuit_breaker_protocol.md` |
| **Базы данных** | Двунаправленные миграции, синхронизация схем и DTO | `references/database_and_migrations.md` |

---

## 2. Динамическая карта триггеров выполнения

При переходе в соответствующий режим агент загружает ТОЛЬКО необходимые файлы справочников и шаблонов:

- **`ТРИГГЕР: СТАРТ ФИЧИ / ФИКСА / НОВОГО МОДУЛЯ (ФАЗЫ 1-4)`**:
  - Первичный контекст: Изучить `docs/ABSTRACT.md` и `docs/ARCHITECTURE.md`.
  - Загрузить: `references/spec_and_api_design.md` + `references/architecture_and_state.md`
  - Шаблоны: `resources/proposal_template.md`, `resources/design_template.md`, `resources/spec_template.md`, `resources/api_contract_template.yaml`
  - Действие: Проверить доменные инварианты и права доступа, протрассировать сквозной E2E поток данных, заложить слой абстракции (порты/адаптеры), оформить Proposal с целями и не-целями, составить план и дождаться явного подтверждения пользователя.

- **`ТРИГГЕР: НАПИСАНИЕ ТЕСТОВ (TDD) (ФАЗА 5a)`**:
  - Загрузить: `references/testing_and_coverage.md`
  - Шаблон: `resources/test_template.spec.ts`
  - Действие: Написать падающие модульные/интеграционные тесты по спецификации до кода, настроить моки портов/адаптеров, проверить покрытие $\ge 80\%$.

- **`ТРИГГЕР: ИМПЛЕМЕНТАЦИЯ / КОД (ФАЗА 5b)`**:
  - Загрузить: `references/coding_standards.md` + `references/ui_consistency.md` + `references/security_standards.md`
  - Действие: Сгенерировать чистый код по спецификациям, применить Value Objects, нулевой хардкод, валидацию DTO и `trackBy` в циклах шаблонов.

- **`ТРИГГЕР: БАЗА ДАННЫХ И МИГРАЦИИ`**:
  - Загрузить: `references/database_and_migrations.md`
  - Действие: Создать файл миграции с возможностью отката, синхронизировать DTO и схемы.

- **`ТРИГГЕР: ДИАГНОСТИКА БАГА / ИСПРАВЛЕНИЕ`**:
  - Загрузить: `references/root_cause_debugging.md`
  - Действие: Сверить документацию (`docs/ABSTRACT.md`, `docs/ARCHITECTURE.md`) с реальным кодом/логами (Fact Check). При расхождении (Docs Drift) предложить обновление доков. Найти первопричину, устранить источник дефекта, написать регрессионный тест.

- **`ТРИГГЕР: ОШИБКА СБОРКИ / ЛИНТЕРА (REF LOOP)`**:
  - Загрузить: `references/circuit_breaker_protocol.md`
  - Действие: Проанализировать ошибку, внести точечную правку. При 3 неудачных попытках сработать предохранителем и остановиться.

- **`ТРИГГЕР: ЗАВЕРШЕНИЕ РАБОТЫ / РЕЛИЗ (ФАЗА 6 - CHECKLIST GATE)`**:
  - Загрузить: `references/after_work_release.md`
  - Утилита: `scripts/verify_release_gate.py`
  - Шаблоны: `resources/changelog_template.md`, `resources/commit_template.md`
  - Действие: Пройти контрольный шлюз (запуск `python scripts/verify_release_gate.py`): при правках `backend/` синхронно обновить триаду (`version.json` + `backend/package.json` + `CHANGELOG.md`), выполнить `nest build`, проверить тесты и сборку фронтенда, сформировать Conventional Commit сообщение.


