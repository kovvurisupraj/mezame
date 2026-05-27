# Mezame

An AI-powered anime tracker built as a structured 20-week learning project. The goal is to go from fundamentals to a production-ready full-stack AI application — covering RAG, agents, embeddings, memory systems, and observability — using anime as the domain.

## What it does (planned)

| Feature | AI Technique |
|---|---|
| Semantic search across anime library | Embeddings + vector search (Qdrant) |
| Mood-based recommendations | Embedding similarity |
| RAG chatbot about anime lore | LlamaIndex + Qdrant knowledge base |
| Research agents | LangChain ReAct agents with tool use |
| Persistent AI memory | pgvector for long-term user memory |
| LLM observability | Langfuse traces and cost tracking |

## AI Architecture

```
apps/ai-service (FastAPI · Python 3.12)
│
├── LLM          Claude (Anthropic) — primary model for all text generation
├── Embeddings   text-embedding-3-small (OpenAI) — vector representations
├── RAG          LlamaIndex — indexing + retrieval pipeline (Phase 5)
├── Agents       LangChain ReAct — tool-using agents (Phase 6)
├── Memory       pgvector (PostgreSQL) — long-term user memory vectors
│                Qdrant — RAG knowledge base (dedicated vector store)
└── Observability Langfuse — LLM traces, latency, cost per call (Phase 8)
```

Two vector stores are used intentionally: **pgvector** co-locates user memory with relational user data (PostgreSQL), while **Qdrant** is a purpose-built store for the anime knowledge base with better performance at scale.

## Tech Stack

| Layer | Technology |
|---|---|
| AI service | FastAPI (Python 3.12) |
| Web app | Next.js 15 |
| Database | PostgreSQL 16 + pgvector |
| Vector store | Qdrant |
| Cache / Queue | Redis + BullMQ |
| Monorepo | Turborepo |
| Infrastructure | Docker Compose |
| CI | GitHub Actions |

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment

```bash
cp .env.example .env.local
# Fill in ANTHROPIC_API_KEY, OPENAI_API_KEY, and database credentials
```

### 3. Start infrastructure

```bash
docker compose -f infra/docker-compose.yml up postgres redis qdrant -d
```

### 4. Run database migrations

```bash
cd packages/db && npx prisma migrate dev
```

### 5. Start apps

```bash
# Terminal 1 — Next.js
cd apps/web && npm run dev

# Terminal 2 — AI service
cd apps/ai-service
pip install -r requirements.txt
uvicorn main:app --reload
```

Or run everything in Docker:

```bash
docker compose -f infra/docker-compose.yml --profile full up
```

## Dev URLs

| Service | URL |
|---|---|
| Web app | http://localhost:3000 |
| AI service | http://localhost:8000 |
| AI service docs | http://localhost:8000/docs |
| Qdrant dashboard | http://localhost:6333/dashboard |
| Langfuse (Phase 8) | http://localhost:3001 |

## Common Commands

```bash
npx turbo lint        # lint all packages
npx turbo typecheck   # TypeScript check all packages
npx turbo test        # run all tests

# Database (from packages/db)
npx prisma migrate dev   # apply migrations
npx prisma studio        # open DB GUI

# AI service tests
cd apps/ai-service && python -m pytest tests/ -v
```

## Monorepo Structure

```
apps/
├── web/              # Next.js 15 frontend
└── ai-service/       # FastAPI AI microservice (main focus)
packages/
├── db/               # Prisma schema + migrations (shared)
├── ui/               # Shared React components
└── config/           # Shared ESLint / TypeScript / Tailwind config
infra/
└── docker-compose.yml
docs/
├── PROJECT.md         # Architecture, schema, API design, CI/CD
└── LEARNING_ROADMAP.md
```

## Roadmap

| Phase | Focus | Status |
|---|---|---|
| 0 | Foundation — monorepo, Docker, CI | 🔨 In progress |
| 1 | Core app — auth, anime library, AniList API | ⏳ |
| 2 | Countdowns and real-time updates | ⏳ |
| 3 | Prompt engineering | ⏳ |
| 4 | Embeddings and semantic search | ⏳ |
| 5 | RAG pipeline | ⏳ |
| 6 | Agents and tool use | ⏳ |
| 7 | Memory system | ⏳ |
| 8 | Evals and observability | ⏳ |
| 9 | Multimodal | ⏳ |
| 10 | Production hardening | ⏳ |
