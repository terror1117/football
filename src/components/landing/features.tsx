"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Navigation,
  Brain,
  Eye,
  Accessibility,
  Bus,
  Leaf,
  Languages,
  Siren,
  Mic,
  ShieldCheck,
  TrendingUp,
  Map as MapIcon,
} from "lucide-react";
import { SectionHeading, Reveal } from "@/components/brand/glass";
import { cn } from "@/lib/utils";

interface Feat {
  id: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  gradient: string;
  tag: string;
  number: number; // squad / jersey number
}

const FEATURES: Feat[] = [
  {
    id: "nav",
    title: "Smart Navigation",
    desc: "AI route planning with indoor wayfinding, fastest paths, accessible routes, AR-ready architecture and dynamic rerouting as crowd conditions change.",
    icon: Navigation,
    gradient: "from-emerald/25 to-cyan/25",
    tag: "Wayfinding",
    number: 10,
  },
  {
    id: "crowd",
    title: "Crowd Intelligence",
    desc: "Predict density, wait times, entry delays, exit congestion and parking availability — visualised as live heatmaps across every zone.",
    icon: Brain,
    gradient: "from-cyan/25 to-royal/25",
    tag: "Predictive",
    number: 7,
  },
  {
    id: "decision",
    title: "AI Decision Support",
    desc: "Real-time recommendations for organizers: alerts, crowd prediction, staff allocation, emergency response and operational intelligence.",
    icon: TrendingUp,
    gradient: "from-emerald/25 to-gold/25",
    tag: "Ops",
    number: 9,
  },
  {
    id: "access",
    title: "Accessibility AI",
    desc: "Wheelchair routing, voice guidance, sign-language, screen-reader optimization, TTS/STT, high-contrast and large-text modes.",
    icon: Accessibility,
    gradient: "from-emerald/25 to-cyan/25",
    tag: "Inclusive",
    number: 5,
  },
  {
    id: "transport",
    title: "Transportation",
    desc: "Live traffic, metro, bus, parking, rideshare and walking — with best departure time and traffic prediction to beat the rush.",
    icon: Bus,
    gradient: "from-gold/25 to-cyan/25",
    tag: "Mobility",
    number: 6,
  },
  {
    id: "sustain",
    title: "Sustainability AI",
    desc: "Carbon calculator, green-route recommendations, energy & water optimization, waste prediction and CO₂ savings per fan.",
    icon: Leaf,
    gradient: "from-emerald/25 to-gold/25",
    tag: "Green",
    number: 4,
  },
  {
    id: "multi",
    title: "Multilingual AI",
    desc: "English, Spanish, French, Arabic, Hindi, Portuguese, Japanese, German, Chinese — automatic translation, voice translation and real-time assistance.",
    icon: Languages,
    gradient: "from-cyan/25 to-emerald/25",
    tag: "9 languages",
    number: 8,
  },
  {
    id: "emergency",
    title: "Emergency AI",
    desc: "One-tap SOS, medical response, security assistance, emergency routing, evacuation assistant and live broadcast alerts.",
    icon: Siren,
    gradient: "from-red-500/25 to-gold/25",
    tag: "Safety",
    number: 1,
  },
  {
    id: "voice",
    title: "Voice AI",
    desc: "Streaming speech recognition, natural speech synthesis, voice commands and hands-free navigation for every fan journey.",
    icon: Mic,
    gradient: "from-cyan/25 to-royal/25",
    tag: "Hands-free",
    number: 11,
  },
  {
    id: "vision",
    title: "Vision AI",
    desc: "Upload a stadium photo to recognize seats, gates, food stalls, exits, parking, accessibility paths, QR codes and tickets.",
    icon: Eye,
    gradient: "from-royal/25 to-cyan/25",
    tag: "See & understand",
    number: 22,
  },
  {
    id: "security",
    title: "Security Insights",
    desc: "Anomaly detection, perimeter awareness, steward coordination and AI-flagged incidents routed to the right team in seconds.",
    icon: ShieldCheck,
    gradient: "from-foreground/15 to-emerald/15",
    tag: "Protect",
    number: 3,
  },
  {
    id: "map",
    title: "Interactive Map",
    desc: "Zoomable stadium map with heatmaps, routes, crowd density, parking, entrances, food, restrooms and emergency exits.",
    icon: MapIcon,
    gradient: "from-gold/25 to-emerald/25",
    tag: "Spatial",
    number: 2,
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-grass opacity-40" />
      <div className="absolute inset-0 -z-10 bg-brand-gradient-soft opacity-40" />
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <SectionHeading
            eyebrow="The squad · core capabilities"
            title={
              <>
                Twelve AI superpowers,{" "}
                <span className="text-gradient-brand">one intelligent stadium</span>
              </>
            }
            subtitle="From the moment a fan plans their trip to the final whistle, ArenaMind AI orchestrates navigation, safety, accessibility and sustainability in real time — like a full squad, each with its own number."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.id} delay={i * 0.05}>
              <FeatureCard feat={f} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feat }: { feat: Feat }) {
  const [hover, setHover] = React.useState(false);
  return (
    <motion.div
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      whileHover={{ y: -6 }}
      className="group relative h-full overflow-hidden rounded-2xl glass p-5 shadow-soft transition-shadow hover:shadow-float"
    >
      {/* Jersey-stripe vertical accent on the left edge */}
      <div className="absolute inset-y-0 left-0 w-1.5 bg-brand-gradient opacity-70" />

      <div
        className={cn(
          "pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100",
          feat.gradient
        )}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={cn("grid size-12 place-items-center rounded-xl bg-gradient-to-br shadow-soft", feat.gradient)}>
            <feat.icon className="size-5 text-foreground" />
          </div>
          {/* Jersey squad number badge — like a player's shirt number */}
          <div className="flex flex-col items-center leading-none">
            <span className="font-display text-2xl font-extrabold tabular-nums text-gradient-brand">
              {feat.number}
            </span>
            <span className="text-[8px] font-semibold uppercase tracking-widest text-muted-foreground">squad</span>
          </div>
        </div>
        <span className="rounded-full glass px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {feat.tag}
        </span>
      </div>
      <h3 className="mt-4 font-display text-lg font-bold tracking-tight">{feat.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{feat.desc}</p>

      <motion.div
        className="mt-4 h-0.5 origin-left rounded-full bg-brand-gradient"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hover ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}
