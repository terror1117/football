"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SectionHeading, Reveal, GlassCard, Badge } from "@/components/brand/glass";

interface T {
  name: string;
  role: string;
  text: string;
  avatar: string;
  tone: "cyan" | "purple" | "gold" | "emerald";
}

const TESTIMONIALS: T[] = [
  {
    name: "Sofia Ramírez",
    role: "Fan · Mexico City",
    text: "I asked the AI in Spanish for the shortest food queue and it walked me to a 2-minute line I'd never have found. Felt like having a local friend in my pocket.",
    avatar: "SR",
    tone: "gold",
  },
  {
    name: "James Okafor",
    role: "Stadium Operations Lead",
    text: "The crowd prediction caught a Gate B bottleneck six minutes before it happened. We rerouted 1,200 fans automatically. That used to take a radio call and luck.",
    avatar: "JO",
    tone: "cyan",
  },
  {
    name: "Amélie Laurent",
    role: "Accessibility Volunteer",
    text: "Wheelchair routing with live lift status is a game-changer. Every accessible guest I helped reached their seat stress-free — in their own language.",
    avatar: "AL",
    tone: "purple",
  },
  {
    name: "Hiroshi Tanaka",
    role: "Security Team Lead",
    text: "AI-flagged incidents route to the right unit in seconds. The SOS flow alone cut our medical response time by 40% on the first match.",
    avatar: "HT",
    tone: "emerald",
  },
  {
    name: "Priya Nair",
    role: "Sustainability Officer",
    text: "Real-time carbon + waste dashboards let us hit 78% renewable energy mid-match. The board saw the numbers live. That never happened before.",
    avatar: "PN",
    tone: "emerald",
  },
  {
    name: "Marcus Bennett",
    role: "Transport Coordinator",
    text: "Departure predictions told us exactly when to surge metro Line 1. Fans left 18 minutes faster than last tournament. The data spoke for itself.",
    avatar: "MB",
    tone: "cyan",
  },
];

const TONE_COLORS: Record<T["tone"], string> = {
  cyan: "#0891b2",
  purple: "#a855f7",
  gold: "#f59e0b",
  emerald: "#10b981",
};

export function Testimonials() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-brand-gradient-soft opacity-40" />
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <SectionHeading
            eyebrow="Loved by every audience"
            title={
              <>
                Fans, staff and organizers —{" "}
                <span className="text-gradient-brand">all on the same side</span>
              </>
            }
            subtitle="ArenaMind AI serves six audiences at once. Here's what they say after matchday."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <GlassCard glow="soft" hover className="relative h-full overflow-hidden">
                <Quote className="absolute -right-2 -top-2 size-16 opacity-5" style={{ color: TONE_COLORS[t.tone] }} />
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-foreground/90">“{t.text}”</p>
                <div className="mt-4 flex items-center gap-3">
                  <div
                    className="grid size-10 place-items-center rounded-full text-sm font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${TONE_COLORS[t.tone]}, ${TONE_COLORS[t.tone]}99)` }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold leading-tight">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10" delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl glass p-5">
            {[
              ["87,000", "fans / match"],
              ["16", "smart venues"],
              ["9", "languages"],
              ["1.4s", "avg AI response"],
              ["94%", "translation hit-rate"],
              ["40%", "faster medical response"],
            ].map(([v, l]) => (
              <div key={l} className="text-center">
                <div className="font-display text-xl font-bold text-gradient-cyan">{v}</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
