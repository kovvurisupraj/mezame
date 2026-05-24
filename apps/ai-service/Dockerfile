FROM python:3.12-slim AS base
WORKDIR /app

# ── deps ──────────────────────────────────────────────────────────
FROM base AS deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ── development ───────────────────────────────────────────────────
# Source code mounted as volume by docker-compose for hot reload
FROM deps AS development
ENV ENVIRONMENT=development
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

# ── production ────────────────────────────────────────────────────
FROM deps AS production
COPY . .
RUN useradd -m appuser && chown -R appuser /app
USER appuser
ENV ENVIRONMENT=production
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]
