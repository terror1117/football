"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SectionHeading, Reveal } from "@/components/brand/glass";

/**
 * Cartoon star players — Messi, Ronaldo, Neymar — as playful animated SVG
 * figures with minimal text. Each has a signature animation: juggle,
 * siuu celebration, and rainbow flick. Built in brand colors.
 */

type Player = {
  id: string;
  name: string;
  team: string;
  emoji: string;
  accent: string;
  accent2: string;
};

const PLAYERS: Player[] = [
  { id: "messi", name: "Messi", team: "Argentina", emoji: "🇦🇷", accent: "#75a9d9", accent2: "#ffffff" },
  { id: "ronaldo", name: "Ronaldo", team: "Portugal", emoji: "🇵🇹", accent: "#c8102e", accent2: "#006600" },
  { id: "neymar", name: "Neymar", team: "Brazil", emoji: "🇧🇷", accent: "#ffd700", accent2: "#009c3b" },
];

export function CartoonStars() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0 -z-10 bg-brand-gradient-soft opacity-50" />
      {/* Floating ball confetti */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute text-xl sm:text-2xl"
          style={{ left: `${8 + i * 11}%`, top: `${10 + (i % 4) * 18}%` }}
          animate={{ y: [0, -18, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        >
          ⚽
        </motion.span>
      ))}

      <div className="mx-auto max-w-5xl px-4">
        <Reveal>
          <SectionHeading
            eyebrow="Legends of the game"
            title={
              <>
                The beautiful game,{" "}
                <span className="text-gradient-gold">animated</span>
              </>
            }
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PLAYERS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <PlayerCard player={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlayerCard({ player }: { player: Player }) {
  return (
    <motion.div
      whileHover={{ y: -6, rotate: player.id === "neymar" ? 1 : 0 }}
      className="group relative overflow-hidden rounded-3xl glass-strong p-5 text-center shadow-soft transition-shadow hover:shadow-float"
    >
      {/* glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
        style={{ background: `radial-gradient(circle at 50% 30%, ${player.accent}, transparent 60%)` }}
      />

      {/* Pitch disc */}
      <div className="relative mx-auto aspect-square w-44 sm:w-48">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: `conic-gradient(from 0deg, ${player.accent}33, ${player.accent2}33, ${player.accent}33)` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-2 rounded-full bg-brand-gradient-soft" />
        <div className="absolute inset-0 grid place-items-center">
          {player.id === "messi" && <MessiFigure accent={player.accent} />}
          {player.id === "ronaldo" && <RonaldoFigure accent={player.accent} />}
          {player.id === "neymar" && <NeymarFigure accent={player.accent} accent2={player.accent2} />}
        </div>
      </div>

      {/* Name + team — minimal text */}
      <div className="relative mt-4">
        <div className="font-display text-xl font-bold tracking-tight">{player.name}</div>
        <div className="text-xs font-medium text-muted-foreground">
          {player.emoji} {player.team}
        </div>
      </div>

      {/* Signature move chip */}
      <div className="relative mt-3 inline-flex items-center gap-1.5 rounded-full glass px-3 py-1 text-[11px] font-semibold">
        <span className="size-1.5 rounded-full" style={{ background: player.accent }} />
        {player.id === "messi" && "⚡ Dribble"}
        {player.id === "ronaldo" && "⚡ Siuuu"}
        {player.id === "neymar" && "⚡ Flick"}
      </div>
    </motion.div>
  );
}

/* ---------- Cartoon figures (SVG) ---------- */

function Ball({ x, y, r = 6, delay = 0 }: { x: number; y: number; r?: number; delay?: number }) {
  return (
    <motion.g
      animate={{ y: [0, -8, 0], rotate: [0, 180, 360] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <circle cx={x} cy={y} r={r} fill="#ffffff" stroke="#1f2937" strokeWidth="1" />
      <path
        d={`M${x} ${y - r * 0.5} L${x + r * 0.5} ${y} L${x} ${y + r * 0.5} L${x - r * 0.5} ${y} Z`}
        fill="#1f2937"
      />
    </motion.g>
  );
}

/** Messi — short, bearded, Argentina light-blue/white stripes, #10 */
function MessiFigure({ accent }: { accent: string }) {
  return (
    <motion.svg
      viewBox="0 0 120 140"
      className="size-full"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* legs */}
      <rect x="46" y="92" width="10" height="30" rx="4" fill="#1f2937" />
      <rect x="64" y="92" width="10" height="30" rx="4" fill="#1f2937" />
      {/* shoes */}
      <ellipse cx="51" cy="124" rx="8" ry="4" fill="#111827" />
      <ellipse cx="69" cy="124" rx="8" ry="4" fill="#111827" />

      {/* jersey — Argentina stripes */}
      <path d="M40 58 Q60 50 80 58 L84 96 Q60 104 36 96 Z" fill={accent} />
      <rect x="46" y="58" width="6" height="42" fill="#ffffff" />
      <rect x="60" y="58" width="6" height="42" fill="#ffffff" />
      <rect x="74" y="58" width="6" height="42" fill="#ffffff" />
      {/* #10 */}
      <text x="60" y="80" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0b1f33" fontFamily="sans-serif">10</text>

      {/* arms */}
      <motion.g
        animate={{ rotate: [0, -12, 0] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "44px 62px" }}
      >
        <rect x="32" y="60" width="9" height="26" rx="4" fill={accent} transform="rotate(-10 36 64)" />
      </motion.g>
      <motion.g
        animate={{ rotate: [0, 14, 0] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        style={{ transformOrigin: "76px 62px" }}
      >
        <rect x="79" y="60" width="9" height="26" rx="4" fill={accent} transform="rotate(10 84 64)" />
      </motion.g>

      {/* neck + head */}
      <rect x="56" y="50" width="8" height="10" fill="#e8b88a" />
      <circle cx="60" cy="38" r="16" fill="#e8b88a" />
      {/* hair */}
      <path d="M44 36 Q48 22 60 22 Q72 22 76 36 Q72 28 60 28 Q48 28 44 36 Z" fill="#3b2417" />
      {/* beard */}
      <path d="M48 42 Q52 50 60 50 Q68 50 72 42 Q68 46 60 46 Q52 46 48 42 Z" fill="#3b2417" opacity="0.85" />
      {/* eyes */}
      <circle cx="55" cy="36" r="1.6" fill="#1f2937" />
      <circle cx="65" cy="36" r="1.6" fill="#1f2937" />
      {/* smile */}
      <path d="M56 42 Q60 45 64 42" stroke="#1f2937" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* juggling ball */}
      <Ball x={88} y={20} r={6} />
    </motion.svg>
  );
}

/** Ronaldo — tall, cropped hair, Portugal red, CR7, siuuu pose */
function RonaldoFigure({ accent }: { accent: string }) {
  return (
    <motion.svg
      viewBox="0 0 120 150"
      className="size-full"
      animate={{ y: [0, -4, 0], scale: [1, 1.02, 1] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* legs */}
      <rect x="44" y="96" width="10" height="32" rx="4" fill="#1f2937" />
      <rect x="66" y="96" width="10" height="32" rx="4" fill="#1f2937" />
      <ellipse cx="49" cy="130" rx="8" ry="4" fill="#111827" />
      <ellipse cx="71" cy="130" rx="8" ry="4" fill="#111827" />

      {/* jersey — Portugal red */}
      <path d="M38 60 Q60 52 82 60 L86 100 Q60 108 34 100 Z" fill={accent} />
      <rect x="54" y="60" width="12" height="40" fill="#006600" opacity="0.5" />
      <text x="60" y="84" textAnchor="middle" fontSize="11" fontWeight="800" fill="#ffe600" fontFamily="sans-serif">7</text>

      {/* arms — Siuuu pose (both up) */}
      <motion.g
        animate={{ rotate: [0, -18, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "40px 64px" }}
      >
        <rect x="26" y="50" width="9" height="22" rx="4" fill={accent} transform="rotate(-35 30 62)" />
      </motion.g>
      <motion.g
        animate={{ rotate: [0, 18, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
        style={{ transformOrigin: "80px 64px" }}
      >
        <rect x="85" y="50" width="9" height="22" rx="4" fill={accent} transform="rotate(35 90 62)" />
      </motion.g>

      {/* neck + head */}
      <rect x="56" y="52" width="8" height="10" fill="#d9a574" />
      <circle cx="60" cy="38" r="16" fill="#d9a574" />
      {/* cropped hair */}
      <path d="M44 34 Q48 20 60 20 Q72 20 76 34 Q72 26 60 26 Q48 26 44 34 Z" fill="#1a1a1a" />
      <rect x="44" y="32" width="32" height="3" fill="#1a1a1a" opacity="0.5" />
      {/* eyes */}
      <circle cx="55" cy="36" r="1.6" fill="#1f2937" />
      <circle cx="65" cy="36" r="1.6" fill="#1f2937" />
      {/* determined mouth */}
      <path d="M55 44 L65 44" stroke="#1f2937" strokeWidth="1.4" strokeLinecap="round" />

      {/* Siuuu sparkles */}
      {[
        { x: 16, y: 30 },
        { x: 104, y: 28 },
        { x: 100, y: 60 },
      ].map((s, i) => (
        <motion.text
          key={i}
          x={s.x}
          y={s.y}
          fontSize="10"
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1.2, 0.6] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.3 }}
        >
          ✨
        </motion.text>
      ))}
    </motion.svg>
  );
}

/** Neymar — mohawk with blonde streak, Brazil yellow, rainbow flick */
function NeymarFigure({ accent, accent2 }: { accent: string; accent2: string }) {
  return (
    <motion.svg
      viewBox="0 0 120 140"
      className="size-full"
      animate={{ y: [0, -3, 0], rotate: [0, -2, 2, 0] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* legs */}
      <rect x="46" y="92" width="10" height="30" rx="4" fill={accent2} />
      <rect x="64" y="92" width="10" height="30" rx="4" fill={accent2} />
      <ellipse cx="51" cy="124" rx="8" ry="4" fill="#111827" />
      <ellipse cx="69" cy="124" rx="8" ry="4" fill="#111827" />

      {/* jersey — Brazil yellow with green collar */}
      <path d="M40 58 Q60 50 80 58 L84 96 Q60 104 36 96 Z" fill={accent} />
      <path d="M54 56 Q60 60 66 56" stroke={accent2} strokeWidth="3" fill="none" />
      <text x="60" y="80" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0b3d1f" fontFamily="sans-serif">10</text>

      {/* arms — flick pose */}
      <motion.g
        animate={{ rotate: [0, -25, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "44px 62px" }}
      >
        <rect x="30" y="56" width="9" height="26" rx="4" fill={accent} transform="rotate(-20 36 64)" />
      </motion.g>
      <motion.g
        animate={{ rotate: [0, 25, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
        style={{ transformOrigin: "76px 62px" }}
      >
        <rect x="81" y="56" width="9" height="26" rx="4" fill={accent} transform="rotate(20 84 64)" />
      </motion.g>

      {/* neck + head */}
      <rect x="56" y="50" width="8" height="10" fill="#c68642" />
      <circle cx="60" cy="38" r="16" fill="#c68642" />
      {/* mohawk with blonde streak */}
      <path d="M52 28 Q56 12 60 14 Q64 12 68 28 Q64 22 60 22 Q56 22 52 28 Z" fill="#1a1a1a" />
      <path d="M58 26 Q60 16 62 26 Z" fill="#fbbf24" />
      {/* sides shaved */}
      <path d="M44 36 Q46 28 52 28 L52 36 Z" fill="#1a1a1a" opacity="0.6" />
      <path d="M68 28 Q74 28 76 36 L68 36 Z" fill="#1a1a1a" opacity="0.6" />
      {/* eyes */}
      <circle cx="55" cy="36" r="1.6" fill="#1f2937" />
      <circle cx="65" cy="36" r="1.6" fill="#1f2937" />
      {/* grin */}
      <path d="M55 42 Q60 46 65 42" stroke="#1f2937" strokeWidth="1.3" fill="none" strokeLinecap="round" />

      {/* rainbow flick ball arc */}
      <motion.g
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        <path d="M20 70 Q40 40 88 60" stroke={accent2} strokeWidth="1.5" strokeDasharray="2 2" fill="none" opacity="0.6" />
        <Ball x={88} y={60} r={5} delay={0.2} />
      </motion.g>
    </motion.svg>
  );
}
