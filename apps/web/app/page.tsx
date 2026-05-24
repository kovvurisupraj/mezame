const phases = [
  { n: 0,  name: "Foundation — Monorepo, Docker, CI",     status: "active"   },
  { n: 1,  name: "Core App — Auth, Library, AniList",     status: "pending"  },
  { n: 2,  name: "Countdowns & Real-time",                status: "pending"  },
  { n: 3,  name: "Prompt Engineering",                    status: "pending"  },
  { n: 4,  name: "Embeddings & Semantic Search",          status: "pending"  },
  { n: 5,  name: "RAG Pipeline",                         status: "pending"  },
  { n: 6,  name: "Agents & Tool Use",                    status: "pending"  },
  { n: 7,  name: "Memory System",                        status: "pending"  },
  { n: 8,  name: "Evals & Observability",                status: "pending"  },
  { n: 9,  name: "Multimodal",                           status: "pending"  },
  { n: 10, name: "Production Hardening",                 status: "pending"  },
] as const;

const icon = { complete: "✅", active: "🔨", pending: "⏳" } as const;

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-xl w-full space-y-8">

        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-sakura-400 bg-clip-text text-transparent">
            Anime Tracker
          </h1>
          <p className="text-gray-400">
            AI-powered tracking · RAG chatbot · Semantic search · Research agents
          </p>
        </div>

        <div className="space-y-2">
          {phases.map((p) => (
            <div
              key={p.n}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-sm ${
                p.status === "complete"
                  ? "border-green-800/60 bg-green-950/20 text-green-300"
                  : p.status === "active"
                  ? "border-purple-700/60 bg-purple-950/20 text-purple-200"
                  : "border-gray-800/60 bg-gray-900/20 text-gray-500"
              }`}
            >
              <span className="w-5 text-center">{icon[p.status]}</span>
              <span className="text-gray-600 tabular-nums w-6">
                {String(p.n).padStart(2, "0")}
              </span>
              <span>{p.name}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-600">
          See{" "}
          <code className="text-gray-500">docs/PROJECT.md</code>
          {" "}and{" "}
          <code className="text-gray-500">docs/LEARNING_ROADMAP.md</code>
        </p>
      </div>
    </main>
  );
}
