# ⚽ ArenaMind AI

> **Every fan. Every moment. One intelligent stadium.**
>
> The generative-AI nervous system for the **FIFA World Cup 2026™** — a
> football-themed, hackathon-grade Stadium Assistant for fans, staff,
> organizers, volunteers, security and transportation teams.

![Tech](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TS](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-6-2d3748?logo=prisma)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🏆 What it is

ArenaMind AI is a single-page GenAI web app that reimagines the matchday
experience. It unifies **navigation, crowd intelligence, accessibility,
sustainability, multilingual assistance, emergency response and
operational decision-support** into one conversational + dashboard
surface — wrapped in a football-themed UI (pitch-green, Brazil-yellow,
Argentina-blue).

Built to feel like Apple × Vercel × Linear × FIFA branding.

## ✨ Highlights

- **AI Stadium Assistant** — live LLM chat (`/api/chat`) with role-aware
  context, 9-language replies, quick prompts.
- **Voice AI** — speech-to-text input (`/api/asr`) + text-to-speech
  replies (`/api/tts`).
- **Vision AI** — upload a stadium photo (`/api/vision`) to recognise
  seats, gates, food stalls, exits, QR codes.
- **Interactive Stadium Map** — zoomable pitch, POI filters, live crowd
  heatmaps, AI route planning (`/api/navigation`).
- **Operations Dashboard** — KPIs, crowd-prediction charts, density
  heatmap, weather, transport, matches, incidents, activity timeline,
  and **live LLM operational recommendations** (`/api/insights`).
- **Emergency SOS** — one-tap medical / security / evacuation with an
  animated dispatch flow and AI evacuation route.
- **Animated football match** — a text-free, looping Brazil 🇧🇷 vs
  Argentina 🇦🇷 top-down match with real flag + jersey identity.
- **Football theme everywhere** — mowed-grass textures, pitch-line
  grids, stadium floodlights, goalpost logo, jersey-numbered "squad"
  feature cards.

## 🛠 Tech stack

| Layer | Tech |
|------|------|
| Framework | **Next.js 16** (App Router), **React 19**, **TypeScript 5** |
| Styling | **Tailwind CSS 4**, **shadcn/ui** (New York), **Framer Motion** |
| State | **Zustand** (client), **TanStack Query** (server) |
| Charts | **Recharts** |
| DB | **Prisma ORM** (SQLite) — 16 models |
| AI | **z-ai-web-dev-sdk** — LLM, VLM, TTS, ASR (server-side only) |

## 🚀 Quick start

```bash
# install
bun install

# dev server (port 3000)
bun run dev

# lint
bun run lint

# push the prisma schema to the local DB
bun run db:push
```

Then open the **Preview Panel** (the app runs on port 3000 internally).

## 📁 Project structure

```
src/
├── app/                  # Next.js App Router
│   ├── api/              # chat, tts, asr, vision, dashboard, insights, translate, navigation
│   ├── globals.css       # football brand design system
│   ├── layout.tsx
│   └── page.tsx          # landing ⇄ dashboard view switch
├── components/
│   ├── brand/            # logo, glass, theme toggle, language selector, animated counter
│   ├── chat/             # AI chat panel (LLM + voice + vision)
│   ├── dashboard/        # operations command center
│   ├── emergency/        # SOS modal
│   └── landing/          # hero, football match, features, ai-demo, stadium map, ...
├── lib/                  # constants, types, store, ai, i18n, data, db
prisma/
└── schema.prisma         # 16-model production schema
```

## 🔌 API routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/chat` | POST | LLM assistant (multilingual, role-aware) |
| `/api/tts` | POST | Text → speech (WAV) |
| `/api/asr` | POST | Speech → text |
| `/api/vision` | POST | VLM image analysis (seats/gates/exits/QR) |
| `/api/dashboard` | GET | Aggregated live snapshot |
| `/api/insights` | GET | Live LLM operational recommendations |
| `/api/translate` | POST | Multilingual translation |
| `/api/navigation` | POST | AI route planning |

## 🎨 Brand

- **Slogan:** *Every fan. Every moment. One intelligent stadium.*
- **Palette:** pitch green · Brazil yellow · Brazil green · Argentina
  light-blue · Argentina navy · gold
- **Logo:** a goalpost frame forming an "A" with a football at the base.

## 📄 License

[MIT](./LICENSE) — free to use, fork, and remix for your own hackathons.

---

> Not affiliated with FIFA. Built as a demonstration of generative-AI
> stadium operations for the FIFA World Cup 2026™.
