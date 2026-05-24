# Anime Tracker — Project Documentation

> Last updated: 2026-05-24
> Status: Planning

---

## Table of Contents

1. [Overview](#1-overview)
2. [Tech Stack](#2-tech-stack)
3. [System Architecture](#3-system-architecture)
4. [Monorepo Structure](#4-monorepo-structure)
5. [Database Schema](#5-database-schema)
6. [API Design](#6-api-design)
7. [Development Workflow](#7-development-workflow)
8. [CI/CD Pipeline](#8-cicd-pipeline)
9. [Hosting & Infrastructure](#9-hosting--infrastructure)
10. [Project Management](#10-project-management)
11. [Phased Roadmap](#11-phased-roadmap)
12. [ADR Index](#12-adr-index)

---

## 1. Overview

### What It Is
A full-featured anime tracking web application with AI-powered features: semantic search, mood-based recommendations, a RAG knowledge chatbot, an autonomous research agent, and a personalized AI companion with persistent memory.

### Core Value Proposition
- Track anime library with episode-level progress
- Live countdowns to episode air dates and seasonal premieres
- AI that understands taste, not just keywords
- Chatbot grounded in real anime knowledge (no hallucinations)
- Agent that auto-fills anime details without manual entry

### Unique Features vs Competitors (MAL / AniList / Kitsu)
| Feature | This App | AniList | MAL |
|---|---|---|---|
| Semantic search ("cozy with melancholy") | Yes | No | No |
| Mood-based AI recommendations | Yes | No | No |
| RAG knowledge chatbot | Yes | No | No |
| Research agent (auto-fill) | Yes | No | No |
| Screenshot anime finder | Yes | No | No |
| Persistent AI memory | Yes | No | No |
| Tier list maker | Yes | Yes | No |
| Music vault (OP/ED tracker) | Yes | No | No |

---

## 2. Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| Next.js | 15 | Full-stack React framework (App Router) |
| TypeScript | 5.x | Type safety across the stack |
| Tailwind CSS | 4.x | Utility-first styling |
| Framer Motion | 11.x | Animations and transitions |
| Vercel AI SDK | 4.x | LLM streaming, useChat, useCompletion |
| tRPC | 11.x | End-to-end type-safe API |
| NextAuth.js | 5.x | Authentication (Google + Discord OAuth) |
| Zustand | 5.x | Lightweight client state |
| React Query | 5.x | Server state, caching, optimistic updates |

### Backend (Next.js API Routes + tRPC)
| Technology | Purpose |
|---|---|
| tRPC | Type-safe API layer |
| Prisma | ORM + migrations |
| Zod | Runtime schema validation |
| BullMQ | Background job queue (notifications, indexing) |

### AI Service (Python)
| Technology | Version | Purpose |
|---|---|---|
| FastAPI | 0.115.x | AI microservice API |
| LlamaIndex | 0.12.x | RAG orchestration |
| LangChain | 0.3.x | Agent framework |
| Anthropic SDK | Latest | Claude API client |
| OpenAI SDK | Latest | Embeddings, fallback LLM |
| Sentence Transformers | Latest | Local embedding option |
| Pydantic | 2.x | Data validation |
| Uvicorn | Latest | ASGI server |

### Data Layer
| Technology | Purpose |
|---|---|
| PostgreSQL 16 + pgvector | Primary database + vector similarity |
| Qdrant | Dedicated vector store for RAG |
| Redis | Session cache, countdown state, BullMQ |

### Observability
| Technology | Purpose |
|---|---|
| Langfuse | LLM tracing, evals, cost tracking |
| Sentry | Error tracking (frontend + ai-service) |

### Infrastructure
| Technology | Purpose |
|---|---|
| Docker + Docker Compose | Local development environment |
| GitHub Actions | CI/CD pipelines |
| GitHub Container Registry (GHCR) | Docker image registry |
| Vercel | Next.js hosting |
| Railway | AI service + Qdrant hosting |
| Supabase | Managed PostgreSQL |
| Upstash | Managed Redis |
| Doppler | Secrets management |
| Terraform | Infrastructure as Code (Phase 10) |

### External APIs
| API | Purpose |
|---|---|
| AniList GraphQL | Anime data, seasonal info, airing schedules |
| Jikan REST | Fallback, news, extra metadata |
| Anthropic API | Claude (LLM, Vision) |
| OpenAI API | text-embedding-3-small, fallback GPT |
| Cohere API | Re-ranking in RAG pipeline |
| Web Search API (Serper/Brave) | Agent research tool |

---

## 3. System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                          CLIENTS                                 │
│                  Browser / PWA (Mobile-first)                    │
└──────────────────────────────┬───────────────────────────────────┘
                               │ HTTPS
┌──────────────────────────────▼───────────────────────────────────┐
│                       NEXT.JS 15 APP                             │
│                App Router + tRPC + NextAuth                      │
│                      Hosted on Vercel                            │
│                                                                  │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────────────┐   │
│  │  UI Layer   │  │  tRPC API    │  │   Server Components   │   │
│  │  Tailwind   │  │  Auth        │  │   RSC + Streaming     │   │
│  │  Framer     │  │  Prisma      │  │   Suspense boundaries │   │
│  └─────────────┘  └──────┬───────┘  └───────────────────────┘   │
└─────────────────────────────┬────────────────────────────────────┘
                              │ Internal HTTP
┌─────────────────────────────▼────────────────────────────────────┐
│                     AI SERVICE (FastAPI)                         │
│                    Python 3.12 on Railway                        │
│                                                                  │
│  ┌──────────────┐  ┌────────────┐  ┌──────────┐  ┌──────────┐  │
│  │Recommendations│  │    RAG    │  │  Agents  │  │  Memory  │  │
│  │  (Phase 3)   │  │ (Phase 5)  │  │(Phase 6) │  │(Phase 7) │  │
│  └──────────────┘  └────────────┘  └──────────┘  └──────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │         LLM Router (Claude primary / GPT fallback)       │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────┬──────────────────┬───────────────────┬────────────────────┘
       │                  │                   │
┌──────▼──────┐  ┌────────▼───┐  ┌───────────▼──────┐
│  POSTGRES   │  │   REDIS    │  │     QDRANT       │
│  Supabase   │  │  Upstash   │  │  Vector Store    │
│  + pgvector │  │            │  │  Railway         │
│             │  │  Sessions  │  │                  │
│  User data  │  │  Cache     │  │  RAG embeddings  │
│  Library    │  │  Countdowns│  │  News embeddings │
│  History    │  │  Job queue │  │  User memory     │
└─────────────┘  └────────────┘  └──────────────────┘
                                          │
                               ┌──────────▼──────────┐
                               │      LANGFUSE        │
                               │   LLM Observability  │
                               │  Traces / Evals /    │
                               │  Cost tracking       │
                               └─────────────────────┘

EXTERNAL DATA SOURCES:
  AniList GraphQL  ──► Anime metadata, seasonal schedule, airing times
  Jikan REST       ──► News, additional metadata (fallback)
  Anthropic API    ──► Claude 3.5 Sonnet (LLM + Vision)
  OpenAI API       ──► text-embedding-3-small
  Web Search       ──► Agent research tool
```

### Data Flow: AI Request
```
Browser
  │ POST /api/ai/recommend {mood, history}
  ▼
Next.js API Route
  │ Forward to AI service
  ▼
FastAPI /recommendations
  │ Build prompt with user context
  │ Retrieve relevant memories (vector search)
  ▼
LLM Router
  │ Select model (Claude Sonnet for complex, Haiku for simple)
  ▼
Anthropic API (streaming)
  │ Stream tokens back
  ▼
Vercel AI SDK (useChat)
  │ Render tokens as they arrive
  ▼
Browser UI (streaming text)
```

### Data Flow: RAG Query
```
User question
  ▼
FastAPI /rag/query
  │ Embed question → vector
  ▼
Qdrant similarity search (top-10)
  │ Returns relevant chunks
  ▼
Cohere re-ranker (top-3)
  │ Best chunks selected
  ▼
Prompt augmentation (chunks injected into context)
  ▼
Claude API → grounded answer with citations
  ▼
Response with source references
```

---

## 4. Monorepo Structure

```
anime-tracker/
│
├── apps/
│   ├── web/                          # Next.js 15 application
│   │   ├── app/
│   │   │   ├── (auth)/               # Auth routes group
│   │   │   │   ├── login/
│   │   │   │   └── callback/
│   │   │   ├── (app)/                # Protected routes group
│   │   │   │   ├── library/          # Anime library
│   │   │   │   ├── seasonal/         # Seasonal chart
│   │   │   │   ├── countdown/        # Countdown dashboard
│   │   │   │   ├── discover/         # Search + recommendations
│   │   │   │   ├── chat/             # AI chatbot
│   │   │   │   └── profile/
│   │   │   ├── api/
│   │   │   │   ├── trpc/[trpc]/      # tRPC handler
│   │   │   │   ├── auth/[...nextauth]
│   │   │   │   └── webhooks/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   ├── ui/                   # Base components (Button, Card, etc.)
│   │   │   ├── anime/                # AnimeCard, EpisodeTracker, etc.
│   │   │   ├── ai/                   # ChatInterface, StreamingText, etc.
│   │   │   └── countdown/            # CountdownTimer, etc.
│   │   ├── lib/
│   │   │   ├── trpc/                 # tRPC client + router
│   │   │   ├── anilist/              # AniList GraphQL client
│   │   │   └── utils/
│   │   ├── Dockerfile
│   │   ├── next.config.ts
│   │   └── package.json
│   │
│   └── ai-service/                   # Python FastAPI — AI brain
│       ├── routers/
│       │   ├── recommendations.py    # Mood-based, semantic recs
│       │   ├── rag.py                # Knowledge chatbot
│       │   ├── agents.py             # Research + news agents
│       │   ├── embeddings.py         # Index + search endpoints
│       │   └── memory.py             # User memory CRUD
│       ├── pipelines/
│       │   ├── rag_pipeline.py       # Full RAG chain
│       │   ├── agent_pipeline.py     # ReAct agent setup
│       │   ├── embedding_pipeline.py # Batch indexing
│       │   └── memory_pipeline.py    # Memory retrieval
│       ├── prompts/                  # All prompts as versioned files
│       │   ├── recommendations/
│       │   │   ├── mood_v1.txt
│       │   │   └── mood_v2.txt
│       │   ├── rag/
│       │   │   └── system_v1.txt
│       │   └── agents/
│       │       └── research_v1.txt
│       ├── tools/                    # Agent tools
│       │   ├── web_search.py
│       │   ├── anilist_tool.py
│       │   └── news_tool.py
│       ├── evals/                    # Evaluation scripts
│       │   ├── datasets/
│       │   ├── run_evals.py
│       │   └── judge_prompts/
│       ├── tests/
│       ├── Dockerfile
│       ├── requirements.txt
│       └── main.py
│
├── packages/
│   ├── db/                           # Prisma schema + migrations
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   └── package.json
│   ├── ui/                           # Shared React components
│   │   ├── components/
│   │   └── package.json
│   └── config/                       # Shared ESLint, TS, Tailwind config
│       ├── eslint.js
│       ├── typescript.json
│       └── package.json
│
├── infra/
│   ├── docker-compose.yml            # Full local dev stack
│   ├── docker-compose.prod.yml       # Production overrides
│   └── terraform/                    # IaC (Phase 10)
│       ├── main.tf
│       ├── variables.tf
│       ├── outputs.tf
│       └── modules/
│           ├── railway/
│           └── supabase/
│
├── docs/
│   ├── PROJECT.md                    # This file
│   ├── LEARNING_ROADMAP.md           # Learning companion
│   └── adr/                          # Architecture Decision Records
│       ├── 000-template.md
│       └── 001-monorepo-turborepo.md
│
├── .github/
│   └── workflows/
│       ├── ci.yml                    # PR checks
│       ├── deploy-staging.yml        # develop branch → staging
│       └── deploy-production.yml     # main branch → production
│
├── turbo.json
├── package.json
├── .env.example
└── README.md
```

---

## 5. Database Schema

```sql
-- ─────────────────────────────────────
-- USERS
-- ─────────────────────────────────────
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  name          TEXT,
  avatar_url    TEXT,
  auth_provider TEXT NOT NULL,         -- 'google' | 'discord'
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_preferences (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               UUID REFERENCES users(id) ON DELETE CASCADE,
  preferred_genres      TEXT[],
  avoided_genres        TEXT[],
  preferred_studios     TEXT[],
  notification_settings JSONB DEFAULT '{}',
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────
-- ANIME LIBRARY
-- ─────────────────────────────────────
CREATE TABLE anime_entries (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID REFERENCES users(id) ON DELETE CASCADE,
  anilist_id       INTEGER NOT NULL,
  status           TEXT NOT NULL,       -- watching|completed|on_hold|dropped|plan_to_watch
  score            DECIMAL(3,1),        -- 0.0 - 10.0
  episodes_watched INTEGER DEFAULT 0,
  total_episodes   INTEGER,
  rewatch_count    INTEGER DEFAULT 0,
  notes            TEXT,
  is_favourite     BOOLEAN DEFAULT FALSE,
  started_at       DATE,
  completed_at     DATE,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, anilist_id)
);

CREATE TABLE watch_history (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id       UUID REFERENCES anime_entries(id) ON DELETE CASCADE,
  episode_number INTEGER NOT NULL,
  watched_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────
-- COUNTDOWNS
-- ─────────────────────────────────────
CREATE TABLE countdowns (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES users(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  type          TEXT NOT NULL,          -- 'episode' | 'season' | 'movie' | 'custom'
  target_date   TIMESTAMPTZ NOT NULL,
  anilist_id    INTEGER,
  episode_number INTEGER,
  notified      BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────
-- AI LAYER
-- ─────────────────────────────────────
CREATE TABLE ai_conversations (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES users(id) ON DELETE CASCADE,
  type       TEXT NOT NULL,             -- 'recommendation' | 'rag_chat' | 'research'
  messages   JSONB NOT NULL DEFAULT '[]',
  metadata   JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_memory (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  memory_key  TEXT NOT NULL,
  content     TEXT NOT NULL,
  embedding   vector(1536),             -- pgvector
  source      TEXT,                     -- 'conversation' | 'explicit' | 'inferred'
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────
-- EMBEDDINGS (for pgvector-based RAG)
-- ─────────────────────────────────────
CREATE TABLE anime_embeddings (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  anilist_id   INTEGER NOT NULL,
  content_type TEXT NOT NULL,           -- 'synopsis' | 'review' | 'theme' | 'genre'
  content      TEXT NOT NULL,
  embedding    vector(1536),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE news_embeddings (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source       TEXT NOT NULL,
  title        TEXT NOT NULL,
  content      TEXT NOT NULL,
  url          TEXT,
  published_at TIMESTAMPTZ,
  tags         TEXT[],
  embedding    vector(1536),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────
-- OBSERVABILITY
-- ─────────────────────────────────────
CREATE TABLE ai_eval_logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature         TEXT NOT NULL,        -- 'rag' | 'recommendation' | 'agent'
  input           JSONB NOT NULL,
  output          JSONB NOT NULL,
  quality_score   DECIMAL(3,2),         -- 0.00 - 1.00 from LLM judge
  judge_reasoning TEXT,
  latency_ms      INTEGER,
  cost_usd        DECIMAL(8,6),
  model_used      TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 6. API Design

### tRPC Routers (Next.js)

```
anime.*
  anime.search(query, filters)       → AniList search results
  anime.detail(anilistId)            → Full anime details
  anime.seasonal(season, year)       → Seasonal chart

library.*
  library.getAll(userId)             → User's full library
  library.add(anilistId, status)     → Add anime to library
  library.update(entryId, data)      → Update status/score/episodes
  library.remove(entryId)            → Remove from library
  library.trackEpisode(entryId, ep)  → Log episode watched

countdown.*
  countdown.getAll(userId)           → All user countdowns
  countdown.create(data)             → Create countdown
  countdown.delete(countdownId)      → Remove countdown

user.*
  user.getProfile()                  → Current user profile
  user.updatePreferences(prefs)      → Update notification/genre prefs
  user.getMemory()                   → View AI memory for user
  user.deleteMemory(memoryId)        → Delete specific memory
```

### FastAPI Endpoints (AI Service)

```
POST /recommendations
  Body: { user_id, mood, history[], filters }
  Returns: streaming text (SSE) with structured anime picks

POST /search/semantic
  Body: { query, limit, user_id }
  Returns: { results: AnimeResult[], scores: float[] }

POST /search/similar
  Body: { anilist_id, limit }
  Returns: { results: AnimeResult[] }

POST /chat
  Body: { user_id, conversation_id, message }
  Returns: streaming SSE (RAG-grounded answer with citations)

POST /agents/research
  Body: { anilist_id, fields_to_fill }
  Returns: streaming SSE (agent trace + final structured data)

POST /embeddings/index
  Body: { anilist_ids: int[] }
  Returns: { indexed: int, failed: int }

GET  /memory/{user_id}
  Returns: { memories: Memory[] }

POST /memory/{user_id}
  Body: { content, source }
  Returns: Memory

DELETE /memory/{user_id}/{memory_id}
  Returns: { success: bool }

GET  /health
  Returns: { status, version, model }
```

---

## 7. Development Workflow

### Branching Strategy
```
main         ──────────────────────────────► production (Vercel + Railway)
  └── develop ──────────────────────────────► staging
        ├── feature/phase-0-monorepo-setup
        ├── feature/phase-1-anime-library
        ├── feature/phase-3-mood-recommendations
        └── fix/countdown-timezone-bug

Rules:
  • Never push directly to main or develop
  • feature/* → PR into develop (triggers staging deploy)
  • develop   → PR into main (triggers production deploy)
  • PR requires: CI green + self-review checklist passed
```

### Commit Convention
```
feat(scope):    new feature
fix(scope):     bug fix
ai(scope):      AI pipeline change
devops(scope):  infra, CI, Docker change
chore(scope):   config, deps, tooling
docs(scope):    documentation
test(scope):    test additions

Examples:
  feat(library):    add episode progress tracking
  ai(rag):          implement semantic chunking with sentence splitter
  devops(docker):   add multi-stage production dockerfile for ai-service
  fix(countdown):   correct timezone offset for JST air times
```

### PR Checklist (self-review)
```
[ ] Feature works locally end-to-end
[ ] No hardcoded secrets or API keys
[ ] No console.logs left in production code
[ ] Types are correct (no `any` unless justified)
[ ] New prompts are in /prompts directory, not inline strings
[ ] Docker Compose still starts cleanly after changes
[ ] ADR written if an architectural decision was made
```

### Local Development Commands
```bash
# Start full stack (all services)
docker compose up

# Start only infrastructure (DB, Redis, Qdrant)
docker compose up postgres redis qdrant

# Run Next.js in dev mode (outside Docker for hot reload)
cd apps/web && npm run dev

# Run AI service in dev mode
cd apps/ai-service && uvicorn main:app --reload

# Run all tests
npx turbo test

# Run linting
npx turbo lint

# Generate Prisma client after schema change
cd packages/db && npx prisma generate

# Run database migrations
cd packages/db && npx prisma migrate dev
```

---

## 8. CI/CD Pipeline

### Environments
```
Branch        Environment    Auto-deploy    URL
──────────────────────────────────────────────────────────
feature/*     Local only     No             localhost:3000
develop       Staging        On merge       staging.animetracker.dev
main          Production     On merge       animetracker.dev
```

### GitHub Actions Workflows

#### `ci.yml` — Runs on every PR
```yaml
Triggers: pull_request → main, develop

Jobs:
  lint-typecheck:
    - npm ci
    - npx turbo lint typecheck

  test-web:
    - npm ci
    - npx turbo test --filter=web

  test-ai-service:
    - pip install -r requirements.txt
    - pytest apps/ai-service/tests/ --cov

  build-images:
    - docker build apps/web
    - docker build apps/ai-service

  eval-check (on prompt file changes only):
    - Run AI eval suite
    - Fail if quality score < threshold
```

#### `deploy-staging.yml` — On merge to develop
```yaml
Jobs:
  build-push:
    - Build Docker images
    - Push to ghcr.io/{repo}/web:{sha}
    - Push to ghcr.io/{repo}/ai-service:{sha}

  deploy:
    - railway up --service ai-service --environment staging
    - vercel deploy (preview URL)

  notify:
    - Post staging URL to PR comment
```

#### `deploy-production.yml` — On merge to main
```yaml
Jobs:
  build-push:
    - Build + push images tagged :latest + :{sha}

  deploy:
    - railway up --service ai-service --environment production
    - vercel deploy --prod

  post-deploy:
    - Run smoke tests against production
    - Notify on failure
```

### Docker Images
```
ghcr.io/{username}/anime-tracker/web:{sha}
ghcr.io/{username}/anime-tracker/ai-service:{sha}

Both use multi-stage builds:
  Stage 1 (deps):   install dependencies
  Stage 2 (build):  compile/bundle
  Stage 3 (prod):   minimal runtime image, non-root user
```

---

## 9. Hosting & Infrastructure

### Service Map
```
SERVICE         PROVIDER         TIER         WHEN TO UPGRADE
──────────────────────────────────────────────────────────────────
Next.js web     Vercel           Free         >100GB bandwidth/mo
AI Service      Railway          $5/mo        >500MB RAM needed
PostgreSQL      Supabase         Free         >500MB DB size
Vector DB       Qdrant Cloud     Free         >1M vectors
Redis           Upstash          Free         >10K cmd/day
LLM Observ.     Langfuse         Free (OSS)   Self-host on Railway
Error tracking  Sentry           Free         >5K errors/mo
Container Reg.  GHCR             Free         Always free
CI/CD           GitHub Actions   Free         >2000 min/mo
```

### Secrets Management
```
Local dev:     .env.local (never committed)
CI/CD:         GitHub Actions Secrets
Production:    Doppler (syncs to Railway + Vercel)

Required secrets:
  DATABASE_URL
  REDIS_URL
  QDRANT_URL + QDRANT_API_KEY
  ANTHROPIC_API_KEY
  OPENAI_API_KEY
  COHERE_API_KEY
  NEXTAUTH_SECRET
  GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET
  DISCORD_CLIENT_ID + DISCORD_CLIENT_SECRET
  LANGFUSE_PUBLIC_KEY + LANGFUSE_SECRET_KEY
```

### Docker Compose (Local Dev)
```yaml
Services started by docker compose up:
  web          → localhost:3000   (Next.js, hot reload via volume)
  ai-service   → localhost:8000   (FastAPI, hot reload via volume)
  postgres     → localhost:5432   (pgvector/pgvector:pg16)
  redis        → localhost:6379   (redis:7-alpine)
  qdrant       → localhost:6333   (qdrant/qdrant)
  langfuse     → localhost:3001   (langfuse/langfuse)
```

---

## 10. Project Management

### GitHub Projects Setup

**Views to create:**
1. **Roadmap** — Milestones on a timeline (10 phases)
2. **Kanban** — Backlog / In Progress / Review / Done
3. **AI Features** — Filter: `label:ai` — tracks the AI portfolio
4. **By Phase** — Group by milestone to see phase progress

**Issue Labels:**
```
feature      #0075ca    New product feature
ai           #7c3aed    AI/ML feature or pipeline
devops       #e11d48    Infrastructure, Docker, CI/CD
learning     #059669    Concept study, spike, experiment
bug          #d73a4a    Something broken
chore        #fef3c7    Config, deps, tooling
phase-0      #f0f9ff    Foundation
phase-1      #f0f9ff    Core App
...
phase-10     #f0f9ff    Production
```

**Milestones (10 total):**
```
Phase 0 — Foundation         Due: Week 2
Phase 1 — Core App           Due: Week 5
Phase 2 — Countdowns         Due: Week 6
Phase 3 — Prompt Engineering Due: Week 8
Phase 4 — Embeddings         Due: Week 10
Phase 5 — RAG Pipeline       Due: Week 13
Phase 6 — Agents             Due: Week 15
Phase 7 — Memory             Due: Week 16
Phase 8 — Evals              Due: Week 17
Phase 9 — Multimodal         Due: Week 19
Phase 10 — Production        Due: Week 20
```

### Weekly Ritual (30 min, every Sunday)
```
1. Review what shipped this week (close completed issues)
2. Write 3 bullet learning notes in Notion
3. Move next week's issues to "In Progress"
4. Write ADR if any architecture decision was made this week
5. Check LLM costs in Langfuse dashboard
```

---

## 11. Phased Roadmap

### Phase 0 — Foundation (Week 1–2)
**Goal:** Running local dev stack, CI skeleton, project infrastructure

```
Deliverables:
  ✦ Turborepo monorepo: apps/web + apps/ai-service + packages/db
  ✦ docker compose up → all services healthy
  ✦ GitHub repo + Projects board configured
  ✦ GitHub Actions CI: lint + typecheck + build on every PR
  ✦ Doppler secrets connected to Railway + Vercel
  ✦ .env.example documented
  ✦ First ADR written (001-monorepo-turborepo.md)

Success criteria:
  docker compose up → zero errors
  git push → CI runs green in under 3 minutes
```

### Phase 1 — Core App, No AI (Week 3–5)
**Goal:** A real working anime tracker before any AI is added

```
Deliverables:
  ✦ Auth: Google + Discord OAuth via NextAuth
  ✦ AniList GraphQL integration (search, anime detail, seasonal data)
  ✦ Library: add/update/remove anime with status + score
  ✦ Episode progress tracking with watch history
  ✦ Seasonal chart (current season airing grid, day-by-day)
  ✦ Basic responsive UI (dark theme)
  ✦ Prisma schema + migrations
  ✦ tRPC router for all library operations

Success criteria:
  Can search anime, add to library, track episodes, browse this season
```

### Phase 2 — Countdowns & Real-time (Week 6)
**Goal:** The feature users open the app for daily

```
Deliverables:
  ✦ Live countdown timers to next episode (timezone-aware)
  ✦ Seasonal premiere countdowns
  ✦ Custom personal countdowns
  ✦ Web Push notifications for episode drops
  ✦ Catch-up planner: "X eps/day to finish before S2 premiere"
  ✦ BullMQ job queue for scheduled notification triggers

Success criteria:
  Countdown ticks in real-time, push notification fires on schedule
```

### Phase 3 — Prompt Engineering (Week 7–8)
**Goal:** First AI feature; learn the raw LLM API before any frameworks

```
Deliverables:
  ✦ Mood-based recommendation endpoint (FastAPI)
  ✦ Streaming recommendation UI (Vercel AI SDK)
  ✦ Structured JSON output with Pydantic validation
  ✦ All prompts as versioned files in /prompts directory
  ✦ Token usage + cost logged per request to Langfuse

Success criteria:
  User picks mood → streams 5 recommendations with reasoning
  Cost per request visible in Langfuse
```

### Phase 4 — Embeddings & Semantic Search (Week 9–10)
**Goal:** Search that understands meaning, not just keywords

```
Deliverables:
  ✦ Batch embedding pipeline: index all AniList synopses into pgvector
  ✦ Semantic search endpoint
  ✦ "More like this" similarity endpoint
  ✦ Hybrid search (semantic + keyword with RRF scoring)
  ✦ Search UI: toggle between keyword and semantic mode

Success criteria:
  "cozy isekai with found family" returns better results than
  keyword search. Similarity finds genuinely related anime.
```

### Phase 5 — RAG Pipeline (Week 11–13)
**Goal:** AI chatbot grounded in real anime data

```
Deliverables:
  ✦ Qdrant setup + anime data indexed (synopsis + reviews + themes)
  ✦ LlamaIndex RAG chain: retrieve → re-rank → augment → generate
  ✦ Chat UI with source citations shown
  ✦ Franchise guide: "What order to watch Fate series?"
  ✦ Graceful fallback: refuses to answer what it doesn't know

Success criteria:
  Chatbot answers correctly with citations.
  Never hallucinates anime that doesn't exist.
```

### Phase 6 — Agents & Tool Use (Week 14–15)
**Goal:** LLMs that take actions, not just generate text

```
Deliverables:
  ✦ Research agent with tools: web_search, get_anime_details, get_reviews
  ✦ Given anime title → autonomously fills all metadata fields
  ✦ News aggregator agent: monitors sources, produces daily digest
  ✦ Agent trace visible in Langfuse (every think/act/observe step)

Success criteria:
  Agent populates an anime entry without any user manual input.
  Full ReAct trace visible in Langfuse.
```

### Phase 7 — Memory System (Week 16)
**Goal:** AI companion that remembers across sessions

```
Deliverables:
  ✦ Short-term: conversation history in context window
  ✦ Long-term: user preferences as embeddings in Qdrant
  ✦ Memory compression: summarize old conversations
  ✦ Memory viewer UI: user can see and delete what AI remembers

Success criteria:
  AI references past preferences unprompted.
  Memory viewer shows stored facts accurately.
```

### Phase 8 — Evals & Observability (Week 17)
**Goal:** Prove AI features work; build evaluation discipline

```
Deliverables:
  ✦ Langfuse fully integrated: all LLM calls traced with cost
  ✦ 50-item eval dataset for RAG chatbot
  ✦ LLM-as-judge pipeline scoring faithfulness + relevance
  ✦ Eval CI job: fails PR if RAG score drops below threshold
  ✦ Cost dashboard: cost per feature per day

Success criteria:
  Can state "RAG answers faithfully 87% of the time" with evidence.
  CI fails on prompt regression.
```

### Phase 9 — Multimodal (Week 18–19)
**Goal:** AI that sees, not just reads

```
Deliverables:
  ✦ Screenshot → find anime (Claude Vision)
  ✦ Cover art → visual similarity (CLIP embeddings)
  ✦ Anime art style description from image

Success criteria:
  Upload screenshot from unknown anime → AI identifies or finds similar.
```

### Phase 10 — Production Hardening (Week 20)
**Goal:** Shippable to real users

```
Deliverables:
  ✦ Full CI/CD: commit → test → build → staging → production
  ✦ GHCR: all images versioned by git SHA
  ✦ Terraform: Supabase + Railway + Upstash as code
  ✦ Sentry error tracking on both services
  ✦ Anthropic prompt caching enabled (up to 90% cost reduction)
  ✦ Model routing: Claude Haiku for simple tasks, Sonnet for complex
  ✦ Uptime monitoring with alerting

Success criteria:
  git push main → production updated in <5 min, zero downtime.
  Total LLM cost under $10/month with caching active.
```

---

## 12. ADR Index

Architecture Decision Records are stored in `docs/adr/`. Use the template below.

### Template (`docs/adr/000-template.md`)
```markdown
# ADR-000: Title

**Date:** YYYY-MM-DD
**Status:** Proposed | Accepted | Deprecated | Superseded by ADR-XXX

## Context
What situation or problem drove this decision?

## Decision
What was decided?

## Consequences
What are the trade-offs? What becomes easier? What becomes harder?
```

### Planned ADRs
```
001 - Monorepo with Turborepo (vs separate repos)
002 - AniList over Jikan as primary data source
003 - Qdrant over Pinecone for vector store
004 - LlamaIndex over LangChain for RAG orchestration
005 - pgvector for user memory (vs dedicated Qdrant collection)
006 - Claude as primary LLM (vs OpenAI)
007 - Railway over AWS for AI service hosting
008 - Doppler for secrets management
```
