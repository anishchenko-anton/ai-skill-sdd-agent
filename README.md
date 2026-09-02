# Скилл SDD Агента (`sdd-agent`)

Автономный инженерный агент разработки на основе спецификаций (Spec-Driven Development — SDD) для модульной разработки и поддержки кодовой базы.

---

## Ключевые принципы и 6-фазный Architecture-First пайплайн

1. **Непрерывное обучение**: Чтение `docs/user_remarks.md` на каждом шаге. Обратная связь и предпочтения пользователя сохраняются навсегда.
2. **ФАЗА 1: Концептуальный фильтр (`docs/ABSTRACT.md`)**: Доменные сущности, модель прав $P(S, A, R, C)$, стейт-машины, инварианты (SSOT, Fail-Safe, On-Demand, Device Shadow). Никакой разработки без доменного контекста.
3. **ФАЗА 2: Физическая трассировка (`docs/ARCHITECTURE.md`)**: Сквозной E2E Data Flow (`UI -> Gateway -> Guard -> Service -> Protocol/DB -> Hardware`), протоколы WSS Socket.IO, WebRTC WHEP, REST, MAVLink/CRSF.
4. **ФАЗА 3: Спецификация и слой абстракции (Spec-First & Decoupling)**:
   - Proposal с целями (Goals) и не-целями (Non-Goals).
   - Обязательный слой абстракции (интерфейсы портов/адаптеров для независимости и масштабируемости).
   - Формат поведения Given-When-Then (без исходного кода в спеках), унифицированный RESTful API.
5. **ФАЗА 4: План и согласование (Human-in-the-Loop Gate)**: Scope Control (список затронутых файлов), оценка рисков, строгое ожидание текстового подтверждения от пользователя в чате.
6. **ФАЗА 5: TDD & Реализация (Red-Green-Refactor)**:
   - Написание падающих тестов до кода по спецификации.
   - Порог покрытия ветвлений (**Branch Coverage $\ge 80\%$**).
   - SOLID, Value Objects, чистый код без хардкода, единообразие UI и `trackBy`.
7. **ФАЗА 6: Эмпирическая верификация и жесткий релизный шлюз (Pre-Completion Checklist Gate)**:
   - Реальный факт-чек (HTTP 200 / WS ack).
   - Автоматическая проверка `python scripts/verify_release_gate.py`: при правках `backend/` синхронно обновляется триада (`version.json` + `backend/package.json` + `CHANGELOG.md`).
   - Успешная сборка `nest build`, тесты и Conventional Commits.
8. **Диагностика первопричин (Root Cause)**: Сверка спек с реальным кодом/логами (Docs-to-Code Reality Check), устранение первопричин без костылей, регрессионный тест на каждый баг, предохранитель 3x (Circuit Breaker).

---

## Структура директории

```
src/sdd-agent/
├── SKILL.md                          # Навигационный индекс и правила маршрутизации (Lazy-Loading)
├── README.md                         # Документация скилла
├── docs/
│   └── user_remarks.md               # Журнал непрерывного обучения и предпочтений
├── scripts/                          # Утилиты автоматизации и проверки
│   └── verify_release_gate.py        # Скрипт проверки передрелизного шлюза (Gatekeeper)
├── references/                       # Справочники глубоких протоколов (Lazy-Loaded)
│   ├── spec_and_api_design.md        # Spec-first процесс и RESTful стандарты
│   ├── architecture_and_state.md     # Слоистая архитектура, Signals/Store, Zero-Config
│   ├── testing_and_coverage.md       # TDD, стандарты тестов, покрытие >= 80%
│   ├── coding_standards.md           # Few-Shot, чистый код, SOLID, нулевой хардкод
│   ├── security_standards.md         # Безопасность, защита секретов, валидация DTO
│   ├── ui_consistency.md             # Единообразие UI и обязательный trackBy
│   ├── database_and_migrations.md    # Миграции БД и целостность типов
│   ├── root_cause_debugging.md       # Диагностика фактов и устранение первопричин
│   ├── circuit_breaker_protocol.md   # Автономный цикл (Ref Loop) и предохранитель 3x
│   └── after_work_release.md         # Регламент релиза, Pre-Completion Checklist Gate
└── resources/                        # Готовые шаблоны артефактов
    ├── proposal_template.md          # Шаблон Proposal (Goals / Non-Goals)
    ├── design_template.md            # Шаблон Design-документа
    ├── spec_template.md              # Шаблон детальной спецификации
    ├── api_contract_template.yaml    # Шаблон OpenAPI 3.0 контракта
    ├── test_template.spec.ts         # Шаблон модульного теста (Given-When-Then)
    ├── changelog_template.md         # Шаблон записи в CHANGELOG
    └── commit_template.md            # Шаблон сообщения коммита
```

