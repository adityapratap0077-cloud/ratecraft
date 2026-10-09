# Aegis audit report — RateCraft (freelancer rate calculator)

**Scanned:** ~/workspace/freelancer-rate-calculator (index.html, styles.css, app.js)
**Date:** 2026-10-09

## Scanner results

| Scanner | Result |
|---|---|
| semgrep (project rules: DOM XSS, eval) | 0 findings |
| npm audit | skipped — no package.json (no dependencies, nothing to audit) |
| pa11y | not installed in this environment — incomplete coverage, rerun where installed |

## Manual checks (reproducible)

- No `innerHTML`, no `eval`, no inline event handlers. All DOM writes use `textContent`.
- All numeric inputs pass through a guard: non-finite, negative, and empty values fall back to safe defaults. Tax and platform fee are clamped below 100% so no division by zero.
- Labels are associated with inputs (`for`/`id`). Results region uses `aria-live="polite"`.
- Contrast pairs all clear WCAG AA (ink 14.6, muted 5.9, accent 4.6, accent-dark 6.6, white-on-accent 5.0).
- No network calls, no cookies, no storage. Calculation is fully client-side.

## Design QA (phase 1)

- Desktop and mobile screenshots reviewed. Clean hierarchy, no template tells, no placeholder text.
- Type floor respected: body 17px, smallest functional text ~14px.

## Findings

None. No fixes proposed.

**Phase 4:** nothing to apply. The site is shippable as built.
