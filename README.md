# Anime Tracker

AI-powered anime tracker with semantic search, mood recommendations, RAG chatbot, research agents, and persistent AI memory.

## Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [Python 3.12+](https://python.org/)
- [Docker Desktop](https://docker.com/products/docker-desktop/)
- [GitHub CLI](https://cli.github.com/) (for repo management)

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment

```bash
cp .env.example .env.local
# Open .env.local and fill in values
```

### 3. Start infrastructure (PostgreSQL, Redis, Qdrant)

```bash
docker compose -f infra/docker-compose.yml up postgres redis qdrant -d
```

### 4. Run database migrations

```bash
cd packages/db && npx prisma migrate dev
```

### 5. Start the apps (two terminals)

```bash
# Terminal 1 — Next.js web app
cd apps/web && npm run dev

# Terminal 2 — AI service
cd apps/ai-service
pip install -r requirements.txt
uvicorn main:app --reload
```

**Or run everything in Docker:**

```bash
docker compose -f infra/docker-compose.yml --profile full up
```

---

## Development URLs

| Service | URL |
|---|---|
| Web app | http://localhost:3000 |
| AI service | http://localhost:8000 |
| AI service docs | http://localhost:8000/docs |
| Langfuse (Phase 8) | http://localhost:3001 |
| Qdrant dashboard | http://localhost:6333/dashboard |

## Common Commands

```bash
# Run all linting
npx turbo lint

# Run all type checks
npx turbo typecheck

# Run all tests
npx turbo test

# Prisma commands (run from packages/db)
npx prisma migrate dev      # create + apply migration
npx prisma studio           # open DB GUI
npx prisma generate         # regenerate client after schema change

# Python AI service tests
cd apps/ai-service && python -m pytest tests/ -v
```

## Documentation

- [Project Documentation](docs/PROJECT.md) — architecture, schema, API design, CI/CD
- [Learning Roadmap](docs/LEARNING_ROADMAP.md) — phase-by-phase learning guide with resources

## Roadmap

| Phase | Focus | Status |
|---|---|---|
| 0 | Foundation — Monorepo, Docker, CI | 🔨 Active |
| 1 | Core App — Auth, Library, AniList | ⏳ |
| 2 | Countdowns & Real-time | ⏳ |
| 3 | Prompt Engineering | ⏳ |
| 4 | Embeddings & Semantic Search | ⏳ |
| 5 | RAG Pipeline | ⏳ |
| 6 | Agents & Tool Use | ⏳ |
| 7 | Memory System | ⏳ |
| 8 | Evals & Observability | ⏳ |
| 9 | Multimodal | ⏳ |
| 10 | Production Hardening | ⏳ |
