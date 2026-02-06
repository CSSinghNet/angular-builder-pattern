# Angular Profile Wizard – Multi-Step Reactive Form + Builder Pattern

Modern Angular application demonstrating a **multi-step profile creation wizard** using:

- **Reactive Forms** (FormBuilder, FormArray, validation)
- **Angular Signals** for lightweight reactive state (step navigation)
- **Builder Design Pattern** for clean, fluent, immutable object construction
- **New Angular control flow** syntax (`@if`, `@for`, `@empty`)
- Standalone components (Angular 17+ style)

Ideal for learning / portfolio / job portal / freelance onboarding flows.

## Features

- 4-step wizard + beautiful final profile summary card
- Fully **reactive forms** (no `ngModel` two-way binding anywhere)
- Dynamic **FormArray** for skills & work experience (add/remove entries)
- Temporary reactive `FormControl`s for "add new" inputs
- **Signal-based** step navigation (`currentStep` signal)
- **Fluent Builder Pattern** (`UserProfileBuilder`) with chainable API
- Immutable final `UserProfile` object (readonly properties + array copies)
- Real-time validation & error messages
- Nice profile summary card with sections (About, Skills tags, Experience list)
- Basic responsive SCSS styling
- Strict TypeScript mode (fixed common issues: property init, readonly assignments)

## Tech Stack

| Technology              | Version / Note                          | Purpose                              |
|-------------------------|-----------------------------------------|--------------------------------------|
| Angular                 | 17+ (standalone components)             | Core framework                       |
| Reactive Forms          | `@angular/forms`                        | Complex form handling                |
| Signals                 | Built-in (signal, update)               | Step tracking & reactivity           |
| TypeScript              | Strict mode                             | Type safety                          |
| SCSS                    | Component-scoped                        | Styling                              |
| New Control Flow        | `@if`, `@for`, `@empty`                 | Modern template syntax               |
| No external libraries   | Pure Angular                            | Minimal dependencies                 |

## Why Signals?

We use Angular Signals for simple reactive state (current step tracking):

```ts
currentStep = signal(1);

nextStep() {
  this.currentStep.update(v => v + 1);
}

```
## Benefits:
- Fine-grained reactivity → only affected parts re-render
- No RxJS boilerplate for simple cases
- Cleaner than BehaviorSubject + async pipe
- Aligns with Angular's future direction (signal inputs/outputs)
- Perfect for wizard/stepper-like flows

## Why Builder Pattern?
- The UserProfile has many optional + array fields.

Without Builder (telescoping constructor nightmare):

```ts
new UserProfile(name, email, undefined, headline, bio, location, skills, experiences, isOpenToWork, …);

```

With Builder (clean & readable):

```ts
new UserProfileBuilder(name, email)
  .setHeadline("Senior Angular Developer")
  .setBio("Building scalable apps since 2018")
  .addSkill("RxJS")
  .addSkill("NgRx")
  .addExperience("XYZ Corp", "Frontend Lead", 4)
  .setOpenToWork(true)
  .build();

```

## Key Advantages:
- Readable fluent API
- Skip optional fields easily
- Enforce mandatory fields in constructor
- Add validation/defaults in setters
- Internal mutable state → final immutable object
- Easy to extend (add new fields without breaking old code)
- Great for testing (partial builds)
- Separation of concerns (form → builder → API payload)

## Project Structure
```text

src/app/
├── models/
│   └── user-profile.model.ts             # UserProfile interface (readonly) + types
├── builders/
│   └── user-profile.builder.ts           # Fluent Builder with mutable internal state
├── components/
│   ├── profile-wizard/
│   │   ├── profile-wizard.component.ts
│   │   ├── profile-wizard.component.html   # New control flow + reactive form
│   │   └── profile-wizard.component.scss
│   └── profile-summary/
│       ├── profile-summary.component.ts
│       ├── profile-summary.component.html  # Nice profile card
│       └── profile-summary.component.scss
├── app.component.ts                      # Root (hosts wizard)
└── main.ts

```

