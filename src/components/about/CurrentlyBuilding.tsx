"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface FocusArea {
  id: string;
  label: string;
  description: string;
  tech: string[];
}

const FOCUS_AREAS: FocusArea[] = [
  {
    id: "aiml",
    label: "AI/ML",
    description: "Building production-grade retrieval augmented generation (RAG) and intelligent pipelines with grounded data.",
    tech: ["FAISS", "Sentence Transformers", "FastAPI", "Groq"]
  },
  {
    id: "swe",
    label: "Software Engineering",
    description: "Designing reliable backend APIs, typed full-stack interfaces, and maintainable application architectures.",
    tech: ["Python", "TypeScript", "Next.js", "Supabase"]
  },
  {
    id: "llm",
    label: "LLM Applications",
    description: "Developing context-aware conversational assistants and browser tools that synthesize complex data in real time.",
    tech: ["Prompt Engineering", "Chrome APIs", "Embeddings", "Vector DB"]
  }
];

export function CurrentlyBuilding() {
  const [activeId, setActiveId] = useState<string>("aiml");
  const activeFocus = FOCUS_AREAS.find((f) => f.id === activeId) || FOCUS_AREAS[0];

  return (
    <div className="w-full rounded-[var(--radius-md)] border border-border/80 bg-surface/30 backdrop-blur-md p-5 sm:p-6 transition-all duration-300 hover:border-accent/40 shadow-lg">
      {/* Minimal Header */}
      <div className="pb-3 border-b border-border/60">
        <p className="text-eyebrow text-muted">CURRENT FOCUS</p>
      </div>

      {/* Focus Area Switcher Tabs */}
      <div className="flex flex-wrap gap-2 pt-4">
        {FOCUS_AREAS.map((area) => {
          const isActive = area.id === activeId;
          return (
            <button
              key={area.id}
              type="button"
              onClick={() => setActiveId(area.id)}
              className={`px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-accent text-white shadow-[0_0_12px_rgba(51,85,255,0.3)]"
                  : "bg-surface/50 text-muted hover:text-foreground hover:bg-surface border border-border/40"
              }`}
            >
              {area.label}
            </button>
          );
        })}
      </div>

      {/* Description & Tech Tags */}
      <div className="pt-4 min-h-[80px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFocus.id}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
          >
            <p className="text-small text-muted leading-relaxed">
              {activeFocus.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {activeFocus.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 text-[10px] font-mono text-muted/90 rounded bg-white/5 border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
