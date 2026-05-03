# GulfHR Shield — Compliance Safety System

**Aesthetic**: Premium B2B SaaS compliance platform — corporate authority, urgency-driven, trust-focused. Inspired by Linear, Stripe, and enterprise compliance systems.

**Tone**: Refined, urgent, compliance-critical. Conveying security, risk management, and compliance mastery for HR managers and company owners across the Gulf region.

## Palette (OKLCH)

| Token | Light | Dark | Purpose |
| --- | --- | --- | --- |
| Primary (Navy) | `0.25 0.08 254` | `0.75 0.12 254` | Primary actions, sidebar, navigation |
| Accent (Gold) | `0.65 0.15 70` | `0.72 0.16 70` | Highlights, CTAs, alerts, Gulf warmth |
| Success (Emerald) | `0.5 0.15 130` | `0.68 0.16 130` | Valid documents, active status, compliance |
| Warning (Amber) | `0.6 0.15 30` | `0.7 0.16 30` | Expiring soon, caution, review needed |
| Destructive (Red) | `0.55 0.22 25` | `0.65 0.19 22` | Expired, critical alerts, deletions |
| Foreground | `0.15 0 0` / `0.95 0 0` | — | Text on light/dark |
| Background | `0.99 0 0` / `0.1 0 0` | — | Page background |
| Card | `1.0 0 0` / `0.16 0 0` | — | Elevated surfaces, KPI cards |
| Muted | `0.95 0 0` / `0.22 0 0` | — | Inactive, secondary |
| Border | `0.9 0 0` / `0.28 0 0` | — | Dividers, subtle separation |

## Typography

- **Display (Fraunces)**: Headlines, page titles — bold, distinctive serif for corporate authority
- **Body (GeneralSans)**: Content, tables, forms — clean geometric sans-serif, high readability at 14–16px
- **Mono (system)**: Code, employee IDs, amounts — fixed-width utility
- **Scale**: 12px (caption) → 14px (body) → 18px (heading) → 24px (title) → 32px (hero)

## Elevation & Depth

- **Surface 0**: Sidebar bg, navigation containers
- **Surface 1**: Cards (KPI, data), modals, elevated buttons — subtle shadow depth
- **Surface 2**: Hover/active states, focused inputs, drawers
- **Shadow Hierarchy**: `shadow-xs` (subtle borders), `shadow-md` (elevated cards), none for flat typography

## Structural Zones

| Zone | Treatment | Breakpoint |
| --- | --- | --- |
| Header | Light card bg, navy primary actions, gold accents, dark mode toggle | Full width, sticky |
| Sidebar | Navy primary bg, gold primary accent on hover, white text, collapses to icon-only on mobile | 64px (sm), 250px (md+), toggles <768px |
| Main Content | Light background, card-based layout, 2–3 column grid on desktop, single stack on mobile | Responsive grid |
| Alert Timeline | Right sidebar (md+), embedded in main on mobile, red/amber/blue status colors, compact list | Right gutter, flex on mobile |
| Footer | Optional, gray muted bg, links, legal — not always visible | Full width |

## Component Patterns

- **KPI Cards**: Icon (48px), label, value (24px), trend indicator, green/red/gray
- **Status Badges**: Valid=green, Expiring Soon=amber, Expired=red, Active=blue, Draft=muted, Approved=emerald
- **Data Tables**: Search row, filter row, sortable columns, horizontal scroll on mobile, pagination controls
- **Charts**: Recharts ResponsiveContainer, 5-color palette, no gradient fills, clean legend
- **Alert Panel**: Timestamp, severity color, action (archive, view), scrollable list
- **Modal/Dialog**: Dark overlay, white card body, action buttons at footer, close button top-right
- **Buttons**: Solid primary (navy), ghost secondary, outline tertiary, small/medium/large sizes, disabled state (muted)
- **Inputs**: Light border, focus ring (navy), placeholder muted text, error red outline

## Motion & Interaction

- **Base Transition**: `transition-smooth` (all 0.3s cubic-bezier) for color, bg, opacity
- **Hover States**: Background lighten/darken, shadow increase, 2px lift effect
- **Active States**: Border highlight (navy), slight compression
- **Loading**: Subtle pulse animation (opacity), spinner in primary color
- **Animations**: No bounce, no scale transforms on buttons — keep professional restraint

## Spacing & Rhythm

- **Base Unit**: 0.5rem (8px)
- **Density**: Compact in tables (4px–8px padding), breathing room in cards (16px–24px)
- **Margins**: Cards 16px–24px apart, sidebar items 8px vertical spacing
- **Gutters**: Page padding 16px (mobile), 24px (tablet), 32px (desktop)

## Constraints

- **Color**: No gradients, no opacity abuse (max 80% for hover), OKLCH only
- **Typography**: 2 font families maximum, 3 sizes in body (12, 14, 16px)
- **Shapes**: 10px radius (--radius), no micro-variations, full circle for avatars
- **Shadows**: Minimal, only on elevated surfaces, no glow effects
- **Animation**: Transition over animation, 300ms max duration
- **Icons**: Lucide React, 20–24px standard, 48px for KPI section

## New Components (Compliance Safety System)

| Component | Purpose | Styling |
| --- | --- | --- |
| Risk Score Badge | 0–100 compliance score with level indicator | Circular, color-coded (green/amber/orange/red), font-display |
| Penalty Exposure Card | Monthly fine estimates per risk factor | Left red border, destructive text, warning icon |
| HR Suggestion Widget | Actionable suggestions ("Run Payroll Now", "3 visas expiring") | Gold border accent, gradient bg, bold action button |
| WhatsApp Toggle | Per-employee notification preference | Toggle switch + description, hover states |
| ROI Card | Time saved, payroll processed, penalties avoided | Large metric value (font-display), positive/negative delta |
| Trust Badge | Security, encryption, activity log visibility | Emerald tone, checkmark icon, description text |
| Upsell Modal | Plan comparison, benefit highlights | Max-width modal, inline table, gold CTA button |
| Onboarding Wizard | 4-step setup flow with progress bar | Numbered step circles, accent-colored progress fill |

## Signature Detail

Urgency hierarchy: Compliance score prominent (top-center), penalty exposure cards with red left border for scanning speed. Business language CTAs ("Run Payroll", "Fix Now", "Download WPS") in gold + font-bold for rapid decision-making. Trust layer (bottom of dashboard) in subtle emerald tone to build confidence. Onboarding wizard uses 4 colored step indicators. WhatsApp toggle in settings with clear copy.

## Mobile Responsiveness

- Sidebar collapses to icons-only (<768px)
- KPI cards + compliance score stack single-column
- Penalty exposure cards stack full-width with left red border
- HR assistant suggestions: single column on mobile, grid on md+
- Data tables: horizontal scroll with sticky left column
- Upsell modal: full-screen on mobile with slide-up animation
- Onboarding wizard: full-width on mobile, centered on desktop
- WhatsApp toggles: full-width on mobile, inline on md+
- ROI charts scale to container width (ResponsiveContainer)

## Accessibility

- Contrast: AA+ on all text/button combinations
- Focus States: Navy ring (2px), keyboard tab order preserved
- ARIA: Buttons labeled, modals have focus trap, alerts announced
- Motion: Prefers reduced motion respected
- Dark Mode: Intentional, not inverted — tuned for eye comfort
- Compliance Priority: Risk badges announce severity; CTAs use clear business language; penalty amounts localized; skeleton loaders visible
