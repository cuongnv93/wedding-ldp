# Design System

## Stack
- framework: Next.js 15 (App Router, React 19)
- styling: Tailwind CSS v4
- components: Radix UI primitives / shadcn-compatible
- animation: Framer Motion
- icons: Lucide React
- i18n: next-intl

## Tokens
- brand / primary: hsl(var(--primary))
- bg-base: hsl(var(--background))
- text-primary: hsl(var(--foreground))
- radius: var(--radius, 0.5rem)
- shadow: layered tailwind shadows

## Decisions
- 2026-10-25 — init: Next.js 15 + Tailwind CSS v4 + Radix UI detected. `next-shadcn` preset applied.
- 2026-10-25 — blog: Static SSG blog architecture with zero backend, markdown/TS data layer, Schema.org Article, and responsive SEO layouts.

## Components
- Navbar
- Footer
- HeroSectionOptimized
- ProductCard
- Benefits
- LatestNews
- QuestionLazy / FAQSection
- ProductDetails

## Non-Goals
- No external CMS or backend server dependencies
- No runtime database requirements
