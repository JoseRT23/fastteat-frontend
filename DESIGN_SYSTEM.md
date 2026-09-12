# FastTeat Design System

Version: 0.1

## 1. Purpose

This document is the visual and interaction contract for the FastTeat frontend. It keeps the business dashboard and customer experience consistent while allowing each flow to have its own layout density.

The system is built with React, Tailwind CSS 4 and CSS custom properties. New UI should use semantic tokens and shared components instead of page-specific hex values or repeated utility combinations.

## 2. Visual direction

- **Primary:** blue, used for actions, links, focus and active navigation.
- **Secondary:** deep slate, used for business navigation, strong headings and high-contrast actions.
- **Neutrals:** slate scale, used for page backgrounds, surfaces, borders and supporting text.
- **Semantic colors:** green for success, amber for attention, red for errors and blue for informational feedback.
- **Tone:** clear, trustworthy and operational. Customer flows may feel lighter; business flows should remain dense and scannable.

## 3. Foundations

### 3.1 Color tokens

Tokens are defined in `src/index.css` and are exposed as Tailwind classes through `@theme`.

| Purpose | Tokens | Typical use |
| --- | --- | --- |
| Primary | `primary-50`, `primary-100`, `primary-500`, `primary-600`, `primary-700` | Buttons, links, focus, active states |
| Secondary | `secondary-900`, `secondary-950` | Sidebar, strong actions, headings |
| Neutral | `neutral-0`, `neutral-50`, `neutral-100`, `neutral-200`, `neutral-300`, `neutral-500`, `neutral-700`, `neutral-900` | Backgrounds, surfaces, borders and text |
| Success | `success-50`, `success-100`, `success-700` | Active, open, completed |
| Warning | `warning-50`, `warning-100`, `warning-700` | Pending, attention required |
| Danger | `danger-50`, `danger-100`, `danger-600` | Errors, destructive actions |
| Info | `info-50`, `info-100`, `info-700` | Explanatory feedback |

Prefer semantic aliases when styling shared components: `--color-background`, `--color-surface`, `--color-border`, `--color-text` and `--color-text-muted`.

### 3.2 Typography

- Font family: `Inter`, with `Segoe UI` as the local fallback.
- Body: `16px`, line-height `1.5`, weight `400`.
- Page title: `text-2xl` or `text-3xl`, weight `700`.
- Section title: `text-lg`, weight `600`.
- Body small: `text-sm`, weight `400`.
- Caption: `text-xs`, weight `400`.
- Eyebrow: `text-xs`, weight `800`, uppercase, letter spacing `0.2em`.
- Use `text-neutral-900` for primary text and `text-neutral-500` for supporting text.

Avoid using font size as decoration. Hierarchy should come from role, weight and spacing.

### 3.3 Spacing and layout

Use Tailwind's spacing scale. The most common composition values are:

| Context | Value |
| --- | --- |
| Inline icon gap | `gap-2` |
| Form field gap | `gap-2` |
| Card content gap | `gap-4` |
| Page section gap | `gap-6` |
| Page padding | `p-6`, `lg:p-8` |
| Customer content width | `max-w-6xl` |

Use responsive grids instead of fixed widths. Preserve a minimum viewport width of `320px`.

### 3.4 Shape and elevation

- `radius-sm` (`8px`): controls and compact list items.
- `radius-md` (`12px`): buttons, inputs and standard cards.
- `radius-lg` (`16px`): feature panels and page blocks.
- `radius-xl` (`24px`): customer-facing hero or prominent surfaces only.
- `radius-pill`: badges, status pills and compact navigation controls.
- `shadow-sm`: resting cards and list items.
- `shadow-md`: elevated panels and login surfaces.
- `shadow-lg`: modal dialogs and temporary overlays.

Do not nest cards inside cards. Use spacing and dividers to create hierarchy inside a surface.

### 3.5 Interaction states

Every interactive element must define default, hover, focus-visible, active and disabled behavior where relevant. Focus uses the shared blue ring from `--focus-ring`. Disabled controls reduce contrast and must not rely on color alone to communicate state.

## 4. Atomic Design

### Atoms

Small, context-light elements with one visual responsibility:

- `Button`: primary, secondary, ghost and danger variants; `sm`, `md` and `lg` sizes.
- `Input`, `Select`, `Textarea`: consistent borders, padding, focus and error state.
- `Badge`: neutral and semantic status variants.
- `IconButton`: icon-only action with an accessible label and tooltip when needed.
- Typography primitives and loading indicators when repetition justifies them.

Atoms do not fetch data or know business rules.

### Molecules

Small compositions of atoms:

- `FormField`: label, control, hint and error message.
- `PageHeader`: eyebrow, title, supporting text and actions.
- `StatCard`: metric, label and optional trend/status.
- `ProductCard`: product image, name, description, price and status.
- `StatusBadge`: maps a domain status to a semantic badge variant.

### Organisms

Feature-level compositions that coordinate multiple molecules:

- Business sidebar and customer header.
- Modal dialog and form sections.
- Product catalog grid.
- User and invitation panels.

Organisms may receive domain data through props, but API calls and page-level decisions stay outside the visual component.

### Pages

Pages compose organisms and own routing, data loading and user actions. A page should not define one-off versions of an existing atom or molecule.

## 5. Component rules

1. Use a semantic variant prop instead of accepting arbitrary color classes.
2. Keep visual components controlled by props and events.
3. Preserve native HTML semantics and keyboard behavior.
4. Associate every form control with a visible label or an accessible name.
5. Use `aria-live` for asynchronous errors and status feedback when needed.
6. Add a new component only when the pattern appears in at least two places or has meaningful interaction logic.
7. Keep business terms and data mapping in pages or feature components, not atoms.

## 6. Migration rules

During migration, existing Tailwind classes may remain in pages, but new code must use the tokens above. Replace repeated combinations first: buttons, form controls, cards, badges, modal actions and page headers. Remove legacy selectors from `App.css` only after a source search confirms they are unused.

## 7. Definition of done

A component is ready when it has:

- A documented purpose and level in the atomic hierarchy.
- Typed props and named variants.
- Keyboard and focus-visible behavior.
- Responsive behavior for mobile and desktop.
- No page-specific data fetching.
- Validation through `npm run lint` and `npm run build`.