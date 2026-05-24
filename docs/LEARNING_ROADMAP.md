# Anime Tracker — Learning Roadmap

> Goal: Reach mid-level Full-Stack AI / GenAI Engineer through project-based learning
> Timeline: ~20 weeks building 1–2 hours/day
> Last updated: 2026-05-24

---

## Table of Contents

1. [Goal & Vision](#1-goal--vision)
2. [Full Skills Map](#2-full-skills-map)
3. [How to Use This Document](#3-how-to-use-this-document)
4. [Phase Learning Plans](#4-phase-learning-plans)
5. [AI/ML Concept Reference](#5-aiml-concept-reference)
6. [DevOps Concept Reference](#6-devops-concept-reference)
7. [Portfolio Outcomes](#7-portfolio-outcomes)
8. [Interview Preparation](#8-interview-preparation)
9. [Progress Tracker](#9-progress-tracker)

---

## 1. Goal & Vision

### Target Role
**Mid-level Full-Stack AI Engineer** — someone who can:
- Design and build end-to-end AI features (not just call an API)
- Own the full lifecycle: prompt → pipeline → eval → deploy → monitor
- Debug when AI fails (not just retry the same prompt)
- Make cost-vs-quality tradeoffs with evidence
- Ship AI features in production with observability

### Why This Project
Most AI tutorials teach concepts in isolation (a PDF chatbot, a toy agent). This project teaches every concept in context — you are solving real problems for a real app you care about. Every concept compounds: you use Phase 2 embeddings inside Phase 5 RAG inside Phase 7 memory. By the end, you have one cohesive project that demonstrates the full AI stack.

### What Mid-Level Means in AI Engineering
```
Junior:     Calls LLM APIs, copies prompt patterns, no evals
Mid-level:  Designs pipelines, writes evals, debugs failures,
            understands cost/quality tradeoffs, ships to prod
Senior:     Trains/fine-tunes models, designs eval frameworks,
            sets architectural direction for AI systems
```
This roadmap takes you from zero to mid-level.

---

## 2. Full Skills Map

### AI / ML Skills
```
CONCEPT                    LEARNED IN    PROJECT FEATURE
──────────────────────────────────────────────────────────────────
LLM APIs & basics          Phase 3       Mood recommendations
Prompt engineering         Phase 3       All AI features
Structured output          Phase 3       Typed AI responses
LLM streaming              Phase 3       Streaming UI
Text embeddings            Phase 4       Semantic search
Vector similarity          Phase 4       "More like this"
Vector databases           Phase 4→5     pgvector → Qdrant
Hybrid search              Phase 4       Search toggle
RAG fundamentals           Phase 5       Knowledge chatbot
Chunking strategies        Phase 5       Anime data indexing
Retrieval & re-ranking     Phase 5       RAG pipeline
LlamaIndex                 Phase 5       RAG orchestration
Tool use / Function calling Phase 6      Research agent
Agentic loops (ReAct)      Phase 6       Autonomous research
Multi-step reasoning       Phase 6       News aggregator
Short-term memory          Phase 7       Chat history
Long-term memory           Phase 7       AI companion
Memory compression         Phase 7       Token management
LLM-as-judge               Phase 8       RAG evaluation
Eval frameworks (RAGAS)    Phase 8       Quality measurement
LLM observability          Phase 8       Langfuse tracing
Cost optimization          Phase 10      Prompt caching
Model routing              Phase 10      Haiku vs Sonnet
Multimodal / Vision        Phase 9       Screenshot finder
Image embeddings (CLIP)    Phase 9       Visual similarity
```

### DevOps / Infrastructure Skills
```
CONCEPT                    LEARNED IN    PROJECT FEATURE
──────────────────────────────────────────────────────────────────
Docker fundamentals        Phase 0       Local dev stack
docker-compose             Phase 0       Multi-service local env
Multi-stage Dockerfiles    Phase 10      Lean prod images
Monorepo tooling           Phase 0       Turborepo
GitHub Actions             Phase 0→10    CI/CD pipelines
Container registries       Phase 10      GHCR image publishing
Environment management     Phase 0       Doppler secrets
Infrastructure as Code     Phase 10      Terraform
Cloud hosting              Phase 10      Vercel + Railway
Database migrations        Phase 1       Prisma migrations
Background jobs            Phase 2       BullMQ queues
Caching strategies         Phase 10      Redis + prompt caching
Monitoring & alerting      Phase 10      Sentry + uptime
```

### Full-Stack Skills (supporting AI)
```
CONCEPT                    LEARNED IN    PROJECT FEATURE
──────────────────────────────────────────────────────────────────
Next.js App Router         Phase 1       Full web app
tRPC type-safe API         Phase 1       All backend calls
Prisma ORM                 Phase 1       Database layer
NextAuth OAuth             Phase 1       Auth system
GraphQL consumption        Phase 1       AniList integration
Server-Sent Events         Phase 2       Streaming AI output
Web Push API               Phase 2       Episode notifications
FastAPI                    Phase 3       AI microservice
Python async patterns      Phase 3→6     AI service endpoints
Pydantic validation        Phase 3       Structured AI output
```

---

## 3. How to Use This Document

### Weekly Workflow
```
START OF PHASE:
  1. Read the phase section fully
  2. Open the recommended resources (don't study everything, pick 1-2)
  3. Create GitHub issues for all deliverables
  4. Set the milestone

DURING THE PHASE:
  1. Build the feature first — get something working
  2. When you hit a concept you don't understand, STOP and study it
  3. Come back and apply what you learned immediately
  4. Write one learning note in Notion per session

END OF PHASE:
  1. Answer the checkpoint questions without looking at notes
  2. Check off completed items in Section 9 (Progress Tracker)
  3. Write the relevant ADR if a decision was made
  4. Write 3 portfolio bullet points about what you built
```

### Learning Principle
> Build first, study second. A concept you encountered while debugging
> sticks 10x better than one you read about cold.

---

## 4. Phase Learning Plans

---

### Phase 0 — Foundation (Week 1–2)

#### What You're Building
Monorepo skeleton, Docker local dev stack, CI pipeline. Nothing visible to users — but everything else depends on getting this right.

#### Core Concepts

**Docker & Containers**
- A container is a lightweight, isolated process with its own filesystem
- `docker build` creates an image from a Dockerfile
- `docker run` starts a container from an image
- `docker compose up` starts multiple containers as a system

**Monorepo**
- One Git repo containing multiple apps and shared packages
- Turborepo adds caching: unchanged packages skip build/test
- `packages/db` is shared by both `apps/web` and `apps/ai-service`

**Environment Variables**
- Never commit secrets to Git
- `.env.example` documents what variables exist (no values)
- Different values for local / staging / production

#### Resources
```
Docker:
  → Official "Get Started" guide: docs.docker.com/get-started/
  → "Docker in 100 seconds" (Fireship YouTube)
  → docker-compose.yml reference: docs.docker.com/compose/

Monorepo:
  → Turborepo quickstart: turbo.build/repo/docs
  → "Why monorepos?" — Nrwl blog

Secrets:
  → Doppler quickstart: docs.doppler.com/docs/getting-started
```

#### Checkpoint Questions
```
1. What is the difference between a Docker image and a container?
2. What does the `depends_on` key do in docker-compose.yml?
3. Why do we use multi-stage Dockerfiles in production?
4. What is a Turborepo pipeline and why does caching matter?
5. Where should API keys live in local dev vs CI/CD vs production?
```

#### Portfolio Note
> "Set up a Turborepo monorepo with Docker Compose orchestrating
> 5 services (Next.js, FastAPI, PostgreSQL, Redis, Qdrant) for
> local development with a single command."

---

### Phase 1 — Core App, No AI (Week 3–5)

#### What You're Building
A fully working anime tracker: auth, library management, episode tracking, seasonal chart. No AI yet — this is the foundation the AI features plug into.

#### Core Concepts

**Next.js App Router**
- `app/` directory: folders become routes, `page.tsx` renders the route
- Server Components run on server (can fetch data, no JS sent to client)
- Client Components (`"use client"`) run in browser (state, events)
- Route Groups `(app)/` organize routes without affecting URLs

**tRPC**
- Type safety from database to browser with zero code generation
- Define a procedure on the server → call it from client with full autocomplete
- Replaces REST + manual typing of request/response shapes

**Prisma**
- ORM that generates a type-safe client from your schema
- `prisma migrate dev` creates SQL migration from schema changes
- Schema changes → migrate → regenerate client (3 steps every time)

**AniList GraphQL**
- GraphQL: request exactly the fields you need (vs REST returning everything)
- AniList has a public GraphQL API with no auth for read operations
- Rate limited — cache responses in Redis to avoid hitting limits

#### Resources
```
Next.js:
  → nextjs.org/docs (App Router section)
  → "Next.js 15 Full Course" (Jack Herrington YouTube)

tRPC:
  → trpc.io/docs/quickstart
  → "tRPC in 10 minutes" (Theo YouTube)

Prisma:
  → prisma.io/docs/getting-started
  → Schema reference for all field types

GraphQL:
  → graphql.org/learn (30 min read)
  → AniList API explorer: anilist.co/graphiql
```

#### Checkpoint Questions
```
1. When should you use a Server Component vs a Client Component?
2. What does tRPC's `publicProcedure` vs `protectedProcedure` mean?
3. What happens if you change a Prisma schema without running migrate?
4. What is the N+1 query problem and how does Prisma's `include` help?
5. Why do we cache AniList responses in Redis?
```

#### Portfolio Note
> "Built a full anime library tracker with OAuth authentication,
> episode-level progress tracking, and AniList API integration
> using Next.js 15 App Router and tRPC for end-to-end type safety."

---

### Phase 2 — Countdowns & Real-time (Week 6)

#### What You're Building
Live countdown timers, push notifications for episode drops, catch-up planner. The sticky daily-use feature.

#### Core Concepts

**Server-Sent Events (SSE)**
- One-way stream from server to browser (server pushes, client listens)
- Simpler than WebSockets for one-directional data (countdown ticks, AI streaming)
- Browser reconnects automatically if connection drops

**Web Push API**
- Push notifications to browsers even when the tab is closed
- Requires a service worker (background script in the browser)
- Needs VAPID keys (public/private pair identifying your server)
- Flow: user grants permission → browser registers → server sends push

**BullMQ (Job Queues)**
- Queue background jobs to run asynchronously (don't block the HTTP request)
- Scheduled jobs: "run this at 8pm JST every Wednesday"
- Retry logic: if a job fails, retry with exponential backoff
- Redis is the backing store for BullMQ

#### Resources
```
SSE:
  → MDN: developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
  → "SSE vs WebSockets" — comparison article

Web Push:
  → web.dev/notifications (Google guide)
  → web-push npm package README

BullMQ:
  → docs.bullmq.io/guide/queues
  → "Background jobs with BullMQ" (LogRocket blog)
```

#### Checkpoint Questions
```
1. When would you choose SSE over WebSockets?
2. What is a service worker and why does Web Push need one?
3. What are VAPID keys and which one goes in the browser?
4. Why use a job queue instead of just using setTimeout?
5. What happens to queued jobs if the server restarts?
```

---

### Phase 3 — Prompt Engineering (Week 7–8)

#### What You're Building
Mood-based anime recommendations with streaming output. Your first real AI feature — built against the raw API before any frameworks.

#### Core Concepts

**How LLMs Work (conceptually)**
- LLMs predict the next token based on all previous tokens
- "Temperature" controls randomness: 0.0 = deterministic, 1.0 = creative
- "Context window" = how many tokens the model can see at once
- Tokens ≈ 0.75 words; 1000 tokens ≈ $0.001–$0.015 depending on model

**Prompt Engineering**
- **System prompt**: sets model behavior and persona (processed first)
- **Zero-shot**: just ask the question
- **Few-shot**: give 2–3 examples before asking
- **Chain-of-thought (CoT)**: ask model to "think step by step" before answering
- **Structured output**: instruct model to respond in JSON with a specific schema

**Streaming**
- Without streaming: wait 5–10s for full response, then show it all at once
- With streaming: tokens appear as they're generated (instant perceived response)
- Vercel AI SDK's `streamText` handles this cleanly in Next.js

**Prompt Versioning**
- Prompts are code — they should be version controlled
- Store prompts as `.txt` files in `/prompts/feature/version.txt`
- Never hardcode prompts inline in application code
- Test prompt changes like code changes (see Phase 8)

#### Resources
```
Fundamentals:
  → Anthropic docs: docs.anthropic.com/en/docs/intro-to-claude
  → "Prompt Engineering Guide": promptingguide.ai (free, comprehensive)
  → DeepLearning.AI "ChatGPT Prompt Engineering for Developers" (free, 1hr)

Claude-specific:
  → Anthropic Cookbook: github.com/anthropics/anthropic-cookbook
  → Claude API messages reference: docs.anthropic.com/en/api/messages

Streaming:
  → Vercel AI SDK docs: sdk.vercel.ai/docs/ai-sdk-core/streaming

Papers to know (skim abstracts):
  → "Chain-of-Thought Prompting" (Wei et al. 2022) — why CoT works
```

#### Checkpoint Questions
```
1. What is the difference between a system prompt and a user message?
2. Why does few-shot prompting work better than zero-shot for structured output?
3. What is "temperature" and when would you set it to 0?
4. Why should you never hardcode prompts inline in application code?
5. What are the token costs for Claude Sonnet vs Haiku? When do you use each?
6. What is "hallucination" and what causes it in LLMs?
```

#### Portfolio Note
> "Implemented streaming AI recommendations using Claude's API with
> structured JSON output, few-shot prompting, and prompt versioning.
> Built a mood-to-anime pipeline that streams results token-by-token
> with Vercel AI SDK, with cost tracking via Langfuse."

---

### Phase 4 — Embeddings & Semantic Search (Week 9–10)

#### What You're Building
Semantic search ("cozy isekai with found family") and "more like this" recommendations. Search that understands meaning.

#### Core Concepts

**Text Embeddings**
- An embedding is a list of numbers (vector) that represents the meaning of text
- Similar meanings → similar vectors (close in vector space)
- "cozy isekai" and "relaxing fantasy world" will have similar vectors
- OpenAI `text-embedding-3-small` produces 1536-dimensional vectors

**Vector Similarity**
- **Cosine similarity**: angle between vectors (1.0 = identical, 0.0 = unrelated)
- **Dot product**: faster, works well when vectors are normalized
- **L2 / Euclidean distance**: actual distance in space (further = less similar)
- For text embeddings, cosine similarity is the standard choice

**pgvector**
- PostgreSQL extension that adds a `vector` column type
- Index types:
  - `ivfflat`: approximate, faster, good for most cases
  - `hnsw`: more accurate, slower to build, better recall
- Query: `ORDER BY embedding <-> '[0.1, 0.2, ...]'::vector LIMIT 10`

**Hybrid Search**
- Pure semantic: "I know what I mean but can't describe it" → semantic wins
- Pure keyword: exact title/character name search → keyword wins
- Hybrid: run both, combine results with Reciprocal Rank Fusion (RRF)
- RRF score: `1/(rank_semantic + 60) + 1/(rank_keyword + 60)`

#### Resources
```
Embeddings:
  → "What are embeddings?" — Vicki Boykis blog (excellent visual explainer)
  → OpenAI embeddings guide: platform.openai.com/docs/guides/embeddings
  → "Embedding models compared" — MTEB leaderboard

pgvector:
  → github.com/pgvector/pgvector (README is the best reference)
  → Supabase pgvector guide: supabase.com/docs/guides/ai/vector-columns

Hybrid search:
  → "Hybrid Search Explained" — Weaviate blog
  → "Reciprocal Rank Fusion" — original paper (short, accessible)
```

#### Checkpoint Questions
```
1. What does a 1536-dimensional vector actually represent?
2. Why is cosine similarity preferred over Euclidean distance for text?
3. What is the difference between ivfflat and hnsw indexes?
4. If semantic search returns irrelevant results, what are 3 things to debug?
5. When does hybrid search outperform pure semantic search?
6. What is "embedding drift" and why does it matter for long-term systems?
```

#### Portfolio Note
> "Built a semantic search pipeline over 15,000+ anime synopses using
> OpenAI text-embedding-3-small and pgvector. Implemented hybrid search
> combining BM25 keyword ranking with vector similarity via RRF, improving
> search quality for abstract queries by ~40% over keyword-only."

---

### Phase 5 — RAG Pipeline (Week 11–13)

#### What You're Building
An anime knowledge chatbot that answers questions about shows, franchise watch orders, and themes — grounded in real data with source citations.

#### Core Concepts

**RAG (Retrieval Augmented Generation)**
- The fundamental problem RAG solves: LLMs have a knowledge cutoff and don't know your private data
- Pipeline: User query → embed query → search vector DB → retrieve relevant chunks → inject into prompt → LLM generates grounded answer
- The LLM's job: synthesize retrieved information, NOT recall from training

**Chunking**
- You can't embed an entire anime wiki page as one chunk — it's too long and loses precision
- **Fixed-size**: split every N tokens (simple, loses sentence boundaries)
- **Sentence splitting**: split on sentence boundaries (better for Q&A)
- **Semantic chunking**: split where meaning changes (best quality, slower)
- Chunk overlap: last 20% of chunk A starts chunk B (preserves context across boundaries)

**Retrieval**
- **Top-k**: return k most similar chunks (simplest)
- **MMR (Maximum Marginal Relevance)**: maximize relevance AND diversity (avoids returning 5 nearly identical chunks)
- **Re-ranking**: use a separate model (Cohere rerank) to score chunks for actual relevance, not just vector similarity

**LlamaIndex**
- Orchestration framework for RAG pipelines
- Key concepts: Document → Node (chunk) → VectorIndex → QueryEngine
- Higher-level than raw API calls, but learn the API first then use LlamaIndex

**RAG Failure Modes**
- Wrong chunks retrieved → answer is off-topic
- Right chunks retrieved but LLM ignores them → "faithfulness" failure
- Chunks retrieved but answer is still vague → chunk size too large
- Model makes up citations → need output validation

#### Resources
```
RAG fundamentals:
  → "RAG from Scratch" — LangChain YouTube series (free, 15 videos)
  → "Advanced RAG Techniques" — Pinecone blog series
  → DeepLearning.AI "Building and Evaluating Advanced RAG" (free)

LlamaIndex:
  → docs.llamaindex.ai/en/stable/getting_started/starter_example/
  → LlamaIndex Cookbook: github.com/run-llama/llama_index/tree/main/docs/docs/examples

Chunking:
  → "Chunking Strategies for LLM Applications" — Pinecone blog
  → "5 Levels of Text Splitting" (Greg Kamradt YouTube)

Papers to know:
  → "REALM: Retrieval-Augmented Language Model Pre-Training" (original RAG concept)
  → "Lost in the Middle" (Liu et al.) — why position of context matters
```

#### Checkpoint Questions
```
1. What problem does RAG solve that fine-tuning does not?
2. What is the difference between retrieval and re-ranking?
3. What is chunk overlap and why does it improve retrieval?
4. How do you debug when a RAG pipeline returns wrong answers?
5. What is "faithfulness" in RAG evaluation?
6. When would you use MMR instead of top-k retrieval?
7. What is the difference between pgvector and Qdrant as vector stores?
```

#### Portfolio Note
> "Built a RAG pipeline for anime knowledge queries using LlamaIndex,
> Qdrant, and Cohere re-ranking. Indexed 50,000+ chunks from anime
> synopses, reviews, and wiki data. Implemented faithfulness evaluation
> achieving 87% on a 50-item test set. All answers include source citations."

---

### Phase 6 — Agents & Tool Use (Week 14–15)

#### What You're Building
A research agent that autonomously gathers all metadata for an anime given just its title — using real web search, AniList API, and review aggregation.

#### Core Concepts

**Function Calling / Tool Use**
- Instead of answering in text, the LLM can call a function
- You define tools: `{ name, description, parameters_schema }`
- The LLM decides WHEN to call a tool and WHAT arguments to pass
- You execute the tool, return the result, the LLM continues

**ReAct Pattern (Reason + Act)**
- Think → Act → Observe → Think → Act → Observe → ... → Final answer
- Each iteration: model reasons about what to do next, calls a tool, observes result
- This is how autonomous agents work
- Traces in Langfuse show every think/act/observe step

**Tool Design Principles**
- Tools should be small and single-purpose (Unix philosophy)
- Description is critical — the LLM reads it to decide when to use the tool
- Always validate tool inputs and handle errors gracefully
- Idempotent tools are safer (calling twice = same result)

**Agent Failure Modes**
- **Loops**: agent keeps calling the same tool repeatedly — add iteration limit
- **Hallucinated tool calls**: model calls a tool that doesn't exist — validate tool names
- **Wrong arguments**: model passes wrong types — Pydantic validation catches these
- **Infinite reasoning**: model overthinks simple tasks — set max_iterations

#### Resources
```
Tool use:
  → Anthropic tool use guide: docs.anthropic.com/en/docs/tool-use
  → "Tool Use / Function Calling" — Anthropic Cookbook examples

Agents:
  → "Building Agents" — LangChain docs
  → DeepLearning.AI "AI Agents in LangGraph" (free, excellent)
  → "ReAct: Synergizing Reasoning and Acting in Language Models" (paper — read abstract + examples)

LangGraph (for complex agents):
  → langchain-ai.github.io/langgraph/
```

#### Checkpoint Questions
```
1. What is the difference between tool use and RAG?
2. How does the LLM decide which tool to call?
3. What is the ReAct pattern and why does it improve agent reasoning?
4. How do you prevent an agent from looping infinitely?
5. Why should tool descriptions be written carefully?
6. When would you use multiple specialized agents vs one agent with many tools?
```

#### Portfolio Note
> "Built a ReAct research agent using Claude's tool use API with 4 tools:
> web search, AniList API, review aggregation, and structured data extraction.
> Agent autonomously fills 15+ metadata fields with zero user input.
> Full reasoning traces visible in Langfuse."

---

### Phase 7 — Memory System (Week 16)

#### What You're Building
An AI companion that knows your taste, remembers past conversations, and makes references to what you've discussed before.

#### Core Concepts

**Short-Term Memory (In-Context)**
- The conversation history passed to the LLM in each request
- Limited by context window (e.g., 200K tokens for Claude)
- As conversation grows, older messages push out of context
- Solution: keep recent messages + a running summary of older ones

**Long-Term Memory (External Storage)**
- Key preferences stored in a database, retrieved per session
- Stored as embeddings → retrieved by semantic similarity to current query
- "User avoids mecha" is relevant to an anime recommendation query
- This is essentially RAG applied to user data

**Memory Compression**
- Summarize old conversation turns into concise facts
- "In our last 10 conversations, user expressed preference for..." (1 message)
- Replaces 10 individual conversation turns (saves tokens)
- Requires a separate summarization LLM call

**Memory Types**
- **Episodic**: what happened ("User dropped Attack on Titan S2 at episode 4")
- **Semantic**: what is known ("User prefers slice-of-life and dislikes gore")
- **Procedural**: how user likes things done ("Always give 5 recommendations, not 3")

#### Resources
```
Memory:
  → "Memory in AI Agents" — LangChain blog
  → "MemGPT: Towards LLMs as Operating Systems" (paper — skim concepts)
  → "Generative Agents" (Park et al. 2023) — memory architecture in agents

Context management:
  → Anthropic "Long context tips": docs.anthropic.com/en/docs/build-with-claude/context-windows
```

#### Checkpoint Questions
```
1. What is the difference between in-context and external memory?
2. How do you decide what goes into long-term memory vs stays in context?
3. What is memory compression and when is it needed?
4. How is long-term memory retrieval similar to RAG?
5. What are the privacy implications of storing user memory?
```

---

### Phase 8 — Evals & Observability (Week 17)

#### What You're Building
A measurement system for your AI features: quality scores, cost dashboards, trace analysis, and a CI gate that catches prompt regressions.

#### Core Concepts

**Why Evals Are Critical**
- AI behavior is non-deterministic — you can't just read the code
- "It works" is not measurable; "87% faithfulness on test set" is
- Evals are how you confidently make prompt changes without breaking things
- This is the #1 skill gap between junior and mid-level AI engineers

**LLM-as-Judge**
- Use a stronger/same LLM to score another LLM's output
- Define scoring criteria: faithfulness (did it use the retrieved context?), relevance (did it answer the question?), coherence (is it well-written?)
- Example: "Score this answer 1-5 for faithfulness. Give a reason."
- Calibrate your judge: does it agree with human ratings?

**RAGAS Metrics**
- **Faithfulness**: is every claim in the answer supported by context?
- **Answer Relevance**: does the answer address the question asked?
- **Context Precision**: are the retrieved chunks actually relevant?
- **Context Recall**: did retrieval find all relevant information?

**Langfuse**
- Open-source LLM observability: trace, score, and analyze every LLM call
- Each call gets a trace → see the full prompt, response, cost, latency
- Add custom scores to traces (your eval scores)
- Dashboard: cost/day per feature, P95 latency, quality over time

**Eval-Driven Development**
- Build eval dataset BEFORE changing prompts (baseline)
- Change prompt → run evals → compare to baseline
- If score drops → revert or iterate
- Add eval run to CI so prompt file changes trigger automatic evaluation

#### Resources
```
Evals:
  → "How to Evaluate LLM Applications" — Hamel Husain blog (must read)
  → DeepLearning.AI "Evaluating and Debugging Generative AI" (free)
  → RAGAS docs: docs.ragas.io

Langfuse:
  → langfuse.com/docs/get-started
  → "LLM Observability" — Langfuse blog

Prompt testing:
  → "PromptBench" — survey of prompt evaluation methods
  → "Evals" by OpenAI: github.com/openai/evals (reference framework)
```

#### Checkpoint Questions
```
1. What is the difference between offline and online evaluation?
2. What are 3 things that LLM-as-judge can fail at?
3. What is "faithfulness" and how is it different from "accuracy"?
4. How do you build a good eval dataset for a RAG chatbot?
5. What should happen in CI when a prompt file is changed?
6. How do you calculate cost per feature per day in Langfuse?
```

#### Portfolio Note
> "Built a full evaluation pipeline using LLM-as-judge with RAGAS metrics.
> Maintained a 50-item golden dataset for the RAG chatbot. Integrated eval
> runs into CI (GitHub Actions) to catch prompt regressions automatically.
> Reduced average cost per recommendation request by 60% using prompt caching."

---

### Phase 9 — Multimodal (Week 18–19)

#### What You're Building
Screenshot-to-anime identification and cover art visual similarity search.

#### Core Concepts

**Vision Models**
- LLMs that accept both text AND images as input
- Images are converted to tokens (expensive — a 1080p image can be 2000+ tokens)
- Claude Vision, GPT-4o, Gemini Pro Vision
- Prompt engineering changes: describe what to look for, where to look in the image

**CLIP (Contrastive Language-Image Pre-training)**
- OpenAI model that creates embeddings in a shared text-image vector space
- "A girl with blue hair in an anime school setting" → similar vector to an image matching that description
- Enables visual similarity search: embed cover art → find similar art

**Multimodal Prompt Engineering**
- Tell the model where to focus in the image
- Describe what information you need extracted
- Chain: vision model extracts info → text model reasons about it

**Token Cost with Images**
- Low detail: 85 tokens per image (lower quality)
- High detail: up to 2000+ tokens per image (full quality)
- Resize images before sending to control costs
- Cache image analysis results — don't re-analyze the same image

#### Resources
```
Vision:
  → Anthropic vision guide: docs.anthropic.com/en/docs/vision
  → "Multimodal Prompting Guide" — promptingguide.ai/techniques/multimodal

CLIP:
  → "CLIP: Connecting Text and Images" — OpenAI blog (accessible overview)
  → Hugging Face CLIP docs: huggingface.co/openai/clip-vit-base-patch32

Papers:
  → "Learning Transferable Visual Models From Natural Language" (CLIP paper) — read intro + examples
```

#### Checkpoint Questions
```
1. How do images get tokenized for vision models?
2. What is CLIP and how does it enable cross-modal search?
3. When would you use Claude Vision vs a traditional computer vision model?
4. How do you manage token costs when processing many images?
5. What is "grounding" in multimodal models?
```

---

### Phase 10 — Production Hardening (Week 20)

#### What You're Building
Full CI/CD pipeline, infrastructure as code, prompt caching, model routing, monitoring.

#### Core Concepts

**Terraform (IaC)**
- Define cloud infrastructure as `.tf` files
- `terraform plan` shows what will change, `terraform apply` makes it real
- State file tracks what Terraform has created (store in S3/remote, not local)
- Why it matters: infrastructure is reproducible, version-controlled, reviewable

**Anthropic Prompt Caching**
- Cache the system prompt and repeated context between requests
- Cached tokens cost ~10% of normal input tokens
- For RAG: cache the retrieved context if it's the same across requests
- Can reduce costs by 60–90% for high-traffic features

**Model Routing**
- Not every request needs Claude Sonnet (expensive, slow)
- Route by complexity: simple tasks → Haiku, complex reasoning → Sonnet
- Route by latency: user-facing streaming → Haiku for speed
- Route by cost budget: batch offline jobs → cheapest model

**Zero-Downtime Deployment**
- Railway rolling deploys: new containers start before old ones stop
- Health checks: `/health` endpoint → deployment waits for green
- Never take down the service to deploy

#### Resources
```
Terraform:
  → "Terraform in 100 seconds" (Fireship YouTube)
  → HashiCorp Learn: learn.hashicorp.com/terraform (free, hands-on)

Prompt caching:
  → Anthropic prompt caching docs: docs.anthropic.com/en/docs/build-with-claude/prompt-caching
  → "Reducing LLM costs with caching" — Anthropic blog

Production ML:
  → "Designing Machine Learning Systems" (Chip Huyen) — chapters 7-9
  → "MLOps Community" YouTube channel
```

#### Checkpoint Questions
```
1. What is the difference between terraform plan and terraform apply?
2. Where should Terraform state be stored in production and why?
3. How does prompt caching work and what is eligible to be cached?
4. Design a model routing strategy for this app. Which requests use which model?
5. What is a health check and why does deployment need it?
6. How do you roll back a bad deployment on Railway?
```

#### Portfolio Note
> "Set up end-to-end CI/CD with GitHub Actions deploying to Vercel
> and Railway on every merge to main. Implemented Anthropic prompt caching
> reducing RAG costs by 72%. Built Terraform IaC for all cloud resources.
> Achieved <5 minute deploy time with zero-downtime rolling updates."

---

## 5. AI/ML Concept Reference

Quick lookup for terms you'll encounter throughout the project.

```
TERM                    PLAIN ENGLISH EXPLANATION
──────────────────────────────────────────────────────────────────────
Token                   Roughly 0.75 words. Models are billed per token.
Context window          Max tokens a model can process in one call.
Temperature             0.0 = deterministic, 1.0 = creative/random.
Embedding               A vector (list of floats) encoding text meaning.
Vector similarity       How close two embeddings are (0=unrelated, 1=same).
Vector database         Database optimized for similarity search on vectors.
RAG                     Retrieve relevant chunks, inject into prompt context.
Chunk                   A piece of text extracted from a larger document.
Re-ranking              Second-pass scoring of retrieved chunks for relevance.
Hallucination           Model generating confident but false information.
Grounding               Connecting model output to real retrieved evidence.
Tool use                Model calling external functions during generation.
Agent                   LLM that loops: reason → act → observe → repeat.
ReAct                   Agent pattern: Reason + Act interleaved.
LLM-as-judge            Using an LLM to evaluate another LLM's output.
Faithfulness            Is every claim in the answer backed by sources?
Prompt caching          Reusing expensive prompt prefixes across API calls.
Fine-tuning             Training a model further on task-specific examples.
RLHF                    Reinforcement Learning from Human Feedback (training technique).
Cosine similarity       Angle between vectors (1=identical, 0=perpendicular).
HNSW                    Hierarchical Navigable Small World — vector index algorithm.
MRR                     Mean Reciprocal Rank — retrieval quality metric.
RAGAS                   RAG evaluation framework (faithfulness, relevance, etc).
```

---

## 6. DevOps Concept Reference

```
TERM                    PLAIN ENGLISH EXPLANATION
──────────────────────────────────────────────────────────────────────
Container               Isolated process with its own filesystem and deps.
Image                   Blueprint for a container (built from Dockerfile).
Docker layer caching    Unchanged Dockerfile lines reuse cached layers = faster builds.
Multi-stage build       Multiple FROM stages; final image only has runtime files.
docker compose          Tool for running multiple containers as a system.
Monorepo                One Git repo containing multiple apps and packages.
Turborepo               Monorepo build system with smart caching.
GitHub Actions          CI/CD automation triggered by Git events.
GHCR                    GitHub Container Registry — where Docker images live.
CI (Continuous Integration)     Auto-test every code change.
CD (Continuous Delivery)        Auto-deploy every passing change.
IaC (Infrastructure as Code)    Define cloud resources in version-controlled files.
Terraform               IaC tool for provisioning cloud resources.
Zero-downtime deploy    New version starts before old one stops.
Health check            Endpoint that returns 200 if service is healthy.
Rolling deploy          Replace instances one at a time (no downtime).
Secret                  Sensitive config value (API key, password). Never in code.
Environment variable    Runtime config injected into a process at startup.
Blue/green deploy       Run two prod environments, switch traffic (advanced).
Observability           Ability to understand system state from its outputs.
```

---

## 7. Portfolio Outcomes

After completing all 10 phases, you can honestly claim the following on a resume and defend them in an interview.

### What to Write on Resume
```
Full-Stack AI Engineer | Anime Tracker Project

• Built end-to-end RAG pipeline (LlamaIndex + Qdrant + Cohere re-ranking)
  achieving 87% faithfulness on 50-item eval set

• Implemented ReAct research agent using Claude tool use; autonomously
  populates 15+ metadata fields with full trace logging in Langfuse

• Designed persistent AI memory system using embedding-based retrieval
  (short-term: context window; long-term: Qdrant vector store)

• Reduced LLM costs by 72% via Anthropic prompt caching + Haiku/Sonnet
  model routing based on task complexity

• Built eval-driven development workflow: LLM-as-judge pipeline integrated
  into CI; prompt changes automatically tested against golden dataset

• Set up full CI/CD pipeline (GitHub Actions → GHCR → Vercel + Railway)
  with zero-downtime deploys and Terraform IaC for all cloud resources

• Implemented multimodal anime identification using Claude Vision and
  CLIP-based visual similarity search over cover art embeddings
```

### Skills You Can Claim
```
AI/ML:   Prompt Engineering, RAG, LLM Agents, Embeddings, Vector Search,
         LLM Evaluation, Multimodal AI, AI Memory Systems, Observability

Tools:   Claude API, OpenAI API, LlamaIndex, LangChain, Qdrant, pgvector,
         Langfuse, Vercel AI SDK, RAGAS

DevOps:  Docker, docker-compose, GitHub Actions, Terraform, Railway,
         Vercel, Supabase, Doppler

Stack:   Next.js 15, FastAPI, PostgreSQL, Redis, TypeScript, Python,
         tRPC, Prisma
```

---

## 8. Interview Preparation

### Common Mid-Level AI Engineer Questions (mapped to your project)

**Prompt Engineering**
```
Q: How do you prevent prompt injection?
A: Sanitize user input, use system prompt to define scope, validate output

Q: How do you version and test prompts?
A: Store as files in /prompts/, run eval suite on changes in CI

Q: When would you use few-shot vs zero-shot?
A: Few-shot when output format is complex or domain-specific
```

**RAG**
```
Q: Walk me through a RAG pipeline you built.
A: Describe Phase 5 — chunking strategy, Qdrant, re-ranking, evals

Q: How do you handle when RAG retrieves wrong context?
A: Improve chunking, adjust k, add re-ranking, improve query embedding

Q: What is the difference between RAG and fine-tuning?
A: RAG adds knowledge at inference time; fine-tuning changes model weights
```

**Agents**
```
Q: How do you prevent agents from looping?
A: max_iterations, loop detection, explicit stopping conditions

Q: How do you debug an agent that gives wrong answers?
A: Trace in Langfuse — find where reasoning went wrong
```

**Evals**
```
Q: How do you measure if your AI feature is working?
A: Describe your eval pipeline — dataset, judge, metrics, CI integration

Q: What is faithfulness and how do you measure it?
A: Whether answer claims are supported by retrieved context; LLM-as-judge
```

**System Design**
```
Q: Design an AI feature that recommends anime based on mood.
A: Walk through: prompt design → streaming → structured output → cost optimization

Q: How would you reduce LLM API costs by 50%?
A: Prompt caching, model routing (Haiku for simple), response caching in Redis
```

---

## 9. Progress Tracker

### Phase Completion
```
[ ] Phase 0  — Foundation        (Week 1-2)
[ ] Phase 1  — Core App          (Week 3-5)
[ ] Phase 2  — Countdowns        (Week 6)
[ ] Phase 3  — Prompt Engineering (Week 7-8)
[ ] Phase 4  — Embeddings        (Week 9-10)
[ ] Phase 5  — RAG Pipeline      (Week 11-13)
[ ] Phase 6  — Agents            (Week 14-15)
[ ] Phase 7  — Memory            (Week 16)
[ ] Phase 8  — Evals             (Week 17)
[ ] Phase 9  — Multimodal        (Week 18-19)
[ ] Phase 10 — Production        (Week 20)
```

### Concept Checkpoints
```
Prompt Engineering:
  [ ] Can explain system prompt vs user message
  [ ] Can write few-shot prompt that reliably returns structured JSON
  [ ] Can explain why temperature matters and set it appropriately
  [ ] Prompts are versioned as files, not inline strings

Embeddings:
  [ ] Can explain what a vector embedding represents
  [ ] Can explain cosine similarity vs dot product
  [ ] Built working semantic search with pgvector
  [ ] Implemented hybrid search with RRF

RAG:
  [ ] Can explain the full RAG pipeline in one minute
  [ ] Can debug poor RAG quality (identify which step failed)
  [ ] Implemented re-ranking
  [ ] RAG pipeline cites sources accurately

Agents:
  [ ] Can explain the ReAct pattern with an example
  [ ] Built working tool use with 3+ tools
  [ ] Can prevent agent loops
  [ ] Agent traces visible in Langfuse

Evals:
  [ ] Built a golden dataset with 50+ examples
  [ ] Implemented LLM-as-judge pipeline
  [ ] Eval run in CI on prompt file changes
  [ ] Can state eval scores with confidence

DevOps:
  [ ] Can run full local stack with one command
  [ ] CI runs on every PR
  [ ] Staging deploys automatically on merge to develop
  [ ] Production deploys automatically on merge to main
  [ ] All secrets managed in Doppler (none in .env files in CI)
  [ ] Terraform manages cloud resources

Production:
  [ ] Prompt caching enabled for relevant endpoints
  [ ] Model routing implemented (Haiku vs Sonnet)
  [ ] Cost per feature tracked in Langfuse
  [ ] Sentry error tracking active on both services
```

### Learning Notes (update weekly)
```
Week 1:  _______________________________________________
Week 2:  _______________________________________________
Week 3:  _______________________________________________
Week 4:  _______________________________________________
Week 5:  _______________________________________________
Week 6:  _______________________________________________
Week 7:  _______________________________________________
Week 8:  _______________________________________________
Week 9:  _______________________________________________
Week 10: _______________________________________________
Week 11: _______________________________________________
Week 12: _______________________________________________
Week 13: _______________________________________________
Week 14: _______________________________________________
Week 15: _______________________________________________
Week 16: _______________________________________________
Week 17: _______________________________________________
Week 18: _______________________________________________
Week 19: _______________________________________________
Week 20: _______________________________________________
```
