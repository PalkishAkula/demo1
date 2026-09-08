# Project: Local Business Website Templates

## What this is
A multi-tenant Next.js template that renders complete marketing websites for
local Indian businesses (Vijayawada, Andhra Pradesh). One codebase, many sites.
The site rendered is chosen by the `NEXT_PUBLIC_SITE_ID` env var, which selects
a JSON config from `/config/`.

These are DEMO sites for a sales portfolio. All business names, doctors,
reviews, and numbers are fictional but must read as completely real.

## Non-negotiable design rules
These sites must NOT look AI-generated. Violating any of these is a bug:
- NO purple/indigo/violet gradients anywhere
- NO emoji used as icons
- NO glassmorphism, NO neon glow, NO animated gradient blobs
- NO everything-centered layouts. Heroes are asymmetric
- NO repeating the same 3-card grid down the whole page — vary the rhythm
  (2-col, 4-col, list, slider, table, full-bleed)
- NO generic marketing copy. Banned words: unlock, elevate, seamless,
  journey, empower, transform, revolutionize, cutting-edge, holistic
- NO exclamation marks in body copy
- NO border-radius above 12px. Buttons are 8px, cards are 8px
- NO icons inside colored circles
- Prices must appear on services. Indian local businesses publish prices
- Every stat must be a specific odd number (18,240 not "20,000+")

## Copy voice
Short declarative sentences. Second person. Active voice. Rupee symbol always.
Mention Vijayawada localities by name (Benz Circle, Governorpet, Patamata,
Gunadala, Poranki, Ramavarappadu, Auto Nagar, Labbipet).
Write like a clinic receptionist explaining things, not like a brand.

## Tech constraints
- Next.js App Router, TypeScript, Tailwind CSS
- Static export friendly. No database, no auth, no API routes needed
- All content comes from `/config/<site>.json` — components NEVER hardcode
  business content
- Forms POST to Web3Forms. Access key from env var
- Images: next/image, all local in /public/images/<site>/
- No UI component library. Hand-build with Tailwind

## Mobile is the priority
80% of real traffic is mobile. Every page gets built mobile-first.
A sticky bottom action bar (Call / WhatsApp / Directions) is present on all
pages on mobile.

## Commands
- `npm run dev` — local dev
- `npm run build` — production build, must pass with zero errors
