from contextlib import asynccontextmanager
import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import health

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("AI service starting up...")
    yield
    logger.info("AI service shutting down...")


app = FastAPI(
    title="Anime Tracker AI Service",
    description="AI pipeline: recommendations, RAG, agents, embeddings, memory",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)

# Routers are added per phase — uncomment as you build:
# Phase 3: from routers import recommendations; app.include_router(recommendations.router)
# Phase 4: from routers import embeddings;     app.include_router(embeddings.router)
# Phase 5: from routers import rag;            app.include_router(rag.router)
# Phase 6: from routers import agents;         app.include_router(agents.router)
# Phase 7: from routers import memory;         app.include_router(memory.router)
