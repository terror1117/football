"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mic, Eye, MessageSquare, Sparkles, Image as ImageIcon, Volume2 } from "lucide-react";
import { SectionHeading, Reveal, GlassCard } from "@/components/brand/glass";
import { ChatPanel } from "@/components/chat/chat-panel";
import { useAppStore } from "@/lib/store";

const TABS = [
  { id: "chat", label: "AI Chat", icon: MessageSquare },
  { id: "voice", label: "Voice Assistant", icon: Mic },
  { id: "vision", label: "Vision AI", icon: Eye },
] as const;

type Tab = (typeof TABS)[number]["id"];

export function AiDemo() {
  const [tab, setTab] = React.useState<Tab>("chat");
  const setChatOpen = useAppStore((s) => s.setChatOpen);

  return (
    <section id="assistant" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <SectionHeading
            eyebrow="Live AI demo"
            title={
              <>
                Talk, speak, or snap —{" "}
                <span className="text-gradient-cyan">the arena understands</span>
              </>
            }
            subtitle="A single conversational surface that sees the stadium, hears the fan, and speaks nine languages. Try it below — fully wired to live LLM, speech and vision models."
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.2fr]">
          {/* Left — tabs + pitch */}
          <Reveal>
            <div className="flex h-full flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition ${
                      tab === t.id
                        ? "bg-brand-gradient text-white shadow-glow"
                        : "glass text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <t.icon className="size-4" />
                    {t.label}
                  </button>
                ))}
              </div>

              {tab === "chat" && (
                <GlassCard glow="float" className="flex-1">
                  <DemoCopy
                    title="Natural-language assistance"
                    points={[
                      "Ask “Where is Gate B?” and get a precise, crowd-aware answer",
                      "“Shortest food queue?” → live wait-time routing",
                      "“Wheelchair route to Section 214” → step-free path + lifts",
                      "Multilingual replies — the model matches your language",
                    ]}
                  />
                </GlassCard>
              )}
              {tab === "voice" && (
                <GlassCard glow="cyan" className="flex-1">
                  <DemoCopy
                    title="Voice AI, hands-free"
                    points={[
                      "Tap the mic and speak — speech-to-text transcribes you",
                      "Answers are spoken back with natural TTS",
                      "Optimised for noisy concourses and 9 languages",
                      "Ideal for accessibility and on-the-move fans",
                    ]}
                  />
                  <VoiceWave />
                </GlassCard>
              )}
              {tab === "vision" && (
                <GlassCard glow="purple" className="flex-1">
                  <DemoCopy
                    title="Vision AI — see the stadium"
                    points={[
                      "Upload a photo of your view, a sign or a ticket",
                      "Recognizes seats, gates, food stalls, exits, QR codes",
                      "Returns a landmark + a helpful next step",
                      "Great for first-time visitors and lost fans",
                    ]}
                  />
                  <div className="mt-4 flex items-center gap-3 rounded-xl glass p-3">
                    <ImageIcon className="size-5 text-purple" />
                    <span className="text-xs text-muted-foreground">
                      Try the image button in the chat →
                    </span>
                  </div>
                </GlassCard>
              )}
            </div>
          </Reveal>

          {/* Right — live chat */}
          <Reveal delay={0.1}>
            <div className="h-[560px] overflow-hidden rounded-2xl glass-strong shadow-float">
              <ChatPanel variant="full" title="Try the assistant — fully live" />
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-6">
          <button
            onClick={() => setChatOpen(true)}
            className="mx-auto flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium transition hover:scale-105"
          >
            <Sparkles className="size-4 text-cyan" />
            Or open the assistant as a floating panel
          </button>
        </Reveal>
      </div>
    </section>
  );
}

function DemoCopy({ title, points }: { title: string; points: string[] }) {
  return (
    <div>
      <h3 className="font-display text-lg font-bold">{title}</h3>
      <ul className="mt-3 space-y-2">
        {points.map((p) => (
          <li key={p} className="flex gap-2 text-sm text-muted-foreground">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gradient-to-r from-cyan to-emerald" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

function VoiceWave() {
  return (
    <div className="mt-5 flex h-16 items-center justify-center gap-1 rounded-xl glass">
      {Array.from({ length: 28 }).map((_, i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full bg-gradient-to-t from-cyan to-emerald"
          animate={{ height: [6, 8 + ((i * 7) % 28), 6] }}
          transition={{
            duration: 0.9 + (i % 5) * 0.12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: (i % 8) * 0.06,
          }}
        />
      ))}
      <Volume2 className="ml-2 size-4 text-cyan" />
    </div>
  );
}
