"use client";

import * as React from "react";
import { motion } from "framer-motion";

/* ============================================================
   FootballMatch — text-free auto-playing top-down match.
   Brazil 🇧🇷 (yellow, attacks left) vs Argentina 🇦🇷
   (light-blue/white stripes, attacks right). Real flag +
   jersey identity. Pure SVG + Framer Motion. No words.
   ============================================================ */

interface Vec { x: number; y: number; }

const PITCH_W = 100;
const PITCH_H = 62;

/** Brazil — attacks LEFT this half. */
const BRA = {
  shirt: "#ffd400",
  trim: "#009c3b",
  shorts: "#1d4ed8",
  socks: "#ffffff",
  skin: "#c68642",
  glow: "#ffd400",
  flagA: "#009c3b",
  flagB: "#ffd400",
};
/** Argentina — attacks RIGHT this half. */
const ARG = {
  shirt: "#6cb4e4",
  shirtB: "#ffffff",
  trim: "#0b3d91",
  shorts: "#0b1220",
  socks: "#0b3d91",
  skin: "#e8b88a",
  glow: "#75a9d9",
  flagA: "#75a9d9",
  flagB: "#ffffff",
};

/** Scripted ball path — Argentina builds right, scores in the LEFT goal. */
const BALL: Vec[] = [
  { x: 50, y: 31 }, // 0 · kickoff
  { x: 43, y: 19 }, // 1 · pass to the wing
  { x: 35, y: 45 }, // 2 · switch flank
  { x: 21, y: 27 }, // 3 · through-ball to the striker
  { x: 5, y: 31 },  // 4 · SHOT — into Brazil's goal
  { x: 50, y: 31 }, // 5 · reset
];

const TIMES = [0, 0.16, 0.34, 0.52, 0.66, 1];
const DURATION = 9;

type Role = "gk" | "def" | "mid" | "fwd";
interface PlayerDef { id: string; team: "bra" | "arg"; role: Role; base: Vec; }

// Brazil defends LEFT (x small), Argentina defends RIGHT (x large).
const PLAYERS: PlayerDef[] = [
  { id: "bgk", team: "bra", role: "gk",  base: { x: 5,  y: 31 } },
  { id: "bd1", team: "bra", role: "def", base: { x: 20, y: 13 } },
  { id: "bd2", team: "bra", role: "def", base: { x: 20, y: 49 } },
  { id: "bm1", team: "bra", role: "mid", base: { x: 36, y: 22 } },
  { id: "bm2", team: "bra", role: "mid", base: { x: 36, y: 40 } },
  { id: "bf",  team: "bra", role: "fwd", base: { x: 52, y: 31 } },
  { id: "agk", team: "arg", role: "gk",  base: { x: 95, y: 31 } },
  { id: "ad1", team: "arg", role: "def", base: { x: 80, y: 13 } },
  { id: "ad2", team: "arg", role: "def", base: { x: 80, y: 49 } },
  { id: "am1", team: "arg", role: "mid", base: { x: 64, y: 22 } },
  { id: "am2", team: "arg", role: "mid", base: { x: 64, y: 40 } },
  { id: "af",  team: "arg", role: "fwd", base: { x: 48, y: 31 } },
];

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

function target(p: PlayerDef, b: Vec): Vec {
  if (p.role === "gk") return p.base;
  const left = p.team === "bra"; // brazil attacks left, arg attacks right
  if (p.role === "def") {
    const x = left ? clamp(b.x - 16, 8, 32) : clamp(b.x + 16, 68, 92);
    const y = clamp(p.base.y * 0.6 + b.y * 0.4, 5, 57);
    return { x, y };
  }
  if (p.role === "mid") {
    const x = left ? clamp(b.x - 5, 18, 58) : clamp(b.x + 5, 42, 82);
    const y = clamp(p.base.y * 0.5 + b.y * 0.5, 5, 57);
    return { x, y };
  }
  const x = left ? clamp(b.x - 7, 22, 70) : clamp(b.x + 7, 30, 78);
  const y = clamp(p.base.y * 0.4 + b.y * 0.6, 5, 57);
  return { x, y };
}

function kframes(p: PlayerDef) {
  const xs: number[] = [], ys: number[] = [];
  for (const b of BALL) {
    const t = target(p, b);
    xs.push(t.x); ys.push(t.y);
  }
  return { xs, ys };
}

export function FootballMatch() {
  return (
    <section className="relative w-full overflow-hidden py-6 sm:py-10" aria-hidden>
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-border/60 shadow-float"
        >
          {/* Team-color end-zone glows */}
          <div
            className="absolute inset-y-0 left-0 z-0 w-1/3 opacity-40 blur-2xl"
            style={{ background: `radial-gradient(circle at 0% 50%, ${BRA.glow}, transparent 70%)` }}
          />
          <div
            className="absolute inset-y-0 right-0 z-0 w-1/3 opacity-40 blur-2xl"
            style={{ background: `radial-gradient(circle at 100% 50%, ${ARG.glow}, transparent 70%)` }}
          />

          {/* Pitch */}
          <div className="relative aspect-[100/62] w-full bg-[#0b5e42]">
            <svg
              viewBox={`0 0 ${PITCH_W} ${PITCH_H}`}
              className="absolute inset-0 size-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#11835f" />
                  <stop offset="100%" stopColor="#0a5a3e" />
                </linearGradient>
                <radialGradient id="vignette" cx="50%" cy="50%" r="75%">
                  <stop offset="60%" stopColor="#000" stopOpacity="0" />
                  <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
                </radialGradient>
                <radialGradient id="goalflash" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="40%" stopColor="#6cb4e4" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#6cb4e4" stopOpacity="0" />
                </radialGradient>
                <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="0.4" />
                </filter>

                {/* Argentina striped jersey pattern */}
                <pattern id="argStripe" patternUnits="userSpaceOnUse" width="0.7" height="2">
                  <rect x="0" y="0" width="0.35" height="2" fill={ARG.shirt} />
                  <rect x="0.35" y="0" width="0.35" height="2" fill={ARG.shirtB} />
                </pattern>
              </defs>

              {/* Grass + mowing stripes */}
              <rect x="0" y="0" width={PITCH_W} height={PITCH_H} fill="url(#grass)" />
              {Array.from({ length: 10 }).map((_, i) => (
                <rect
                  key={i}
                  x={i * 10}
                  y="0"
                  width="10"
                  height={PITCH_H}
                  fill={i % 2 === 0 ? "#13906a" : "#0e7352"}
                  opacity={0.5}
                />
              ))}

              {/* Pitch markings */}
              <g stroke="#ffffff" strokeOpacity="0.55" strokeWidth="0.35" fill="none">
                <rect x="2" y="2" width={PITCH_W - 4} height={PITCH_H - 4} rx="0.5" />
                <line x1={PITCH_W / 2} y1="2" x2={PITCH_W / 2} y2={PITCH_H - 2} />
                <circle cx={PITCH_W / 2} cy={PITCH_H / 2} r="8" />
                <circle cx={PITCH_W / 2} cy={PITCH_H / 2} r="0.6" fill="#fff" stroke="none" />
                <rect x="2" y="16" width="14" height="30" />
                <rect x="2" y="24" width="6" height="14" />
                <circle cx="12" cy="31" r="0.5" fill="#fff" stroke="none" />
                <rect x={PITCH_W - 16} y="16" width="14" height="30" />
                <rect x={PITCH_W - 8} y="24" width="6" height="14" />
                <circle cx={PITCH_W - 12} cy="31" r="0.5" fill="#fff" stroke="none" />
                <path d="M2 4 A 2 2 0 0 1 4 2" />
                <path d={`M${PITCH_W - 2} 4 A 2 2 0 0 0 ${PITCH_W - 4} 2`} />
                <path d={`M2 ${PITCH_H - 4} A 2 2 0 0 0 4 ${PITCH_H - 2}`} />
                <path d={`M${PITCH_W - 2} ${PITCH_H - 4} A 2 2 0 0 1 ${PITCH_W - 4} ${PITCH_H - 2}`} />
              </g>

              {/* Goals */}
              <g stroke="#ffffff" strokeWidth="0.6" strokeLinecap="round">
                <line x1="2" y1="27" x2="2" y2="35" />
                <line x1="0.5" y1="27" x2="2" y2="27" />
                <line x1="0.5" y1="35" x2="2" y2="35" />
                <line x1={PITCH_W - 2} y1="27" x2={PITCH_W - 2} y2="35" />
                <line x1={PITCH_W - 0.5} y1="27" x2={PITCH_W - 2} y2="27" />
                <line x1={PITCH_W - 0.5} y1="35" x2={PITCH_W - 2} y2="35" />
              </g>

              {/* Net texture — LEFT goal (where the goal goes in) */}
              <g stroke="#ffffff" strokeOpacity="0.25" strokeWidth="0.12">
                {Array.from({ length: 7 }).map((_, i) => (
                  <line key={`nv${i}`} x1="0.4" y1={27 + i * 1.3} x2="1.6" y2={27 + i * 1.3} />
                ))}
                {Array.from({ length: 3 }).map((_, i) => (
                  <line key={`nh${i}`} x1={0.4 + i * 0.5} y1="27" x2={0.4 + i * 0.5} y2="35" />
                ))}
              </g>

              {/* Corner flags — Brazil (green/yellow) bottom-left, Argentina (blue/white) top-right */}
              <CornerFlag x={4} y={PITCH_H - 2} colors={[BRA.flagA, BRA.flagB]} />
              <CornerFlag x={PITCH_W - 4} y={2} colors={[ARG.flagA, ARG.flagB]} flip />

              {/* Goal flash at the LEFT goal (Argentina scores) */}
              <motion.circle
                cx="1"
                cy="31"
                r="14"
                fill="url(#goalflash)"
                animate={{ opacity: [0, 0, 0, 0, 1, 0], scale: [0.6, 0.6, 0.6, 0.6, 1.6, 2.2] }}
                transition={{ duration: DURATION, times: TIMES, repeat: Infinity, ease: "easeOut" }}
                style={{ transformOrigin: "1px 31px" }}
              />

              {/* Goal confetti — Argentina blue + white + gold */}
              {Array.from({ length: 10 }).map((_, i) => {
                const ang = (i / 10) * Math.PI * 2;
                const dx = Math.cos(ang) * 9;
                const dy = Math.sin(ang) * 6;
                const col = i % 3 === 0 ? ARG.shirt : i % 3 === 1 ? ARG.shirtB : "#ffd400";
                return (
                  <motion.circle
                    key={`c${i}`}
                    r="0.5"
                    fill={col}
                    animate={{
                      cx: [1, 1, 1, 1, 1 + dx * 0.4, 1 + dx],
                      cy: [31, 31, 31, 31, 31 + dy * 0.4, 31 + dy],
                      opacity: [0, 0, 0, 0, 1, 0],
                      r: [0.3, 0.3, 0.3, 0.3, 0.7, 0.2],
                    }}
                    transition={{ duration: DURATION, times: TIMES, repeat: Infinity, ease: "easeOut" }}
                  />
                );
              })}

              {/* Players */}
              {PLAYERS.map((p) => {
                const { xs, ys } = kframes(p);
                return (
                  <motion.g
                    key={p.id}
                    initial={{ x: xs[0], y: ys[0] }}
                    animate={{ x: xs, y: ys }}
                    transition={{ duration: DURATION, times: TIMES, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <PlayerToken p={p} />
                  </motion.g>
                );
              })}

              {/* Ball glow */}
              <motion.circle
                r="2.4"
                fill={ARG.shirt}
                animate={{
                  cx: BALL.map((b) => b.x),
                  cy: BALL.map((b) => b.y),
                  opacity: [0.25, 0.25, 0.3, 0.6, 0.9, 0.25],
                  r: [1.8, 1.8, 2, 2.4, 3, 1.8],
                }}
                transition={{ duration: DURATION, times: TIMES, repeat: Infinity, ease: "easeInOut" }}
                filter="url(#soft)"
              />

              {/* Ball */}
              <motion.g
                initial={{ x: BALL[0].x, y: BALL[0].y }}
                animate={{ x: BALL.map((b) => b.x), y: BALL.map((b) => b.y) }}
                transition={{ duration: DURATION, times: TIMES, repeat: Infinity, ease: "easeInOut" }}
              >
                <circle r="1.15" fill="#ffffff" stroke="#0b1220" strokeWidth="0.25" />
                <path d="M0 -0.6 L0.57 -0.18 L0.35 0.49 L-0.35 0.49 L-0.57 -0.18 Z" fill="#0b1220" />
              </motion.g>

              {/* Vignette */}
              <rect x="0" y="0" width={PITCH_W} height={PITCH_H} fill="url(#vignette)" pointerEvents="none" />
            </svg>

            {/* Team badges — flags in each team's attacking half (no text) */}
            <div className="pointer-events-none absolute inset-0">
              {/* Brazil flag badge (left side — Brazil's attacking half) */}
              <div className="absolute left-2.5 top-2.5">
                <FlagBadge country="bra" />
              </div>
              {/* Argentina flag badge (right side — Argentina's attacking half) */}
              <div className="absolute right-2.5 top-2.5">
                <FlagBadge country="arg" />
              </div>

              {/* Team-color end-zone strips */}
              <div
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: `linear-gradient(to right, ${BRA.shirt} 0%, ${BRA.shirt} 50%, ${ARG.shirt} 50%, ${ARG.shirt} 100%)` }}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-1"
                style={{ background: `linear-gradient(to right, ${BRA.shorts} 0%, ${BRA.shorts} 50%, ${ARG.shorts} 50%, ${ARG.shorts} 100%)` }}
              />

              {/* Game-style corner accents */}
              <span className="absolute left-3 top-7 size-3 border-l-2 border-t-2 border-white/40" />
              <span className="absolute right-3 top-7 size-3 border-r-2 border-t-2 border-white/40" />
              <span className="absolute bottom-3 left-3 size-3 border-b-2 border-l-2 border-white/40" />
              <span className="absolute bottom-3 right-3 size-3 border-b-2 border-r-2 border-white/40" />

              {/* live pulse */}
              <span className="absolute left-1/2 top-5 -translate-x-1/2 flex items-center gap-1.5">
                <motion.span
                  className="size-2 rounded-full bg-red-500"
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Player token with real jersey ---------- */
function PlayerToken({ p }: { p: PlayerDef }) {
  const isArg = p.team === "arg";
  const skin = isArg ? ARG.skin : BRA.skin;
  const shorts = isArg ? ARG.shorts : BRA.shorts;

  // Goalkeepers wear a distinct kit.
  const gk = p.role === "gk";
  const shirtFill = gk ? (isArg ? "#0b1220" : "#111827") : isArg ? "url(#argStripe)" : BRA.shirt;
  const trim = isArg ? ARG.trim : BRA.trim;

  return (
    <g>
      {/* shadow */}
      <ellipse cx="0" cy="1.6" rx="1.6" ry="0.5" fill="#000" opacity="0.3" />
      {/* body / jersey */}
      <circle r="1.7" fill={shirtFill} stroke="#0b1220" strokeWidth="0.25" />
      {/* collar / trim */}
      <circle r="1.7" fill="none" stroke={trim} strokeOpacity="0.9" strokeWidth="0.35" />
      {/* facing dot */}
      <circle cx="0.7" cy="0" r="0.35" fill="#0b1220" opacity="0.55" />
      {/* tiny head */}
      <circle cx="0" cy="-0.1" r="0.55" fill={skin} opacity="0.0" />
    </g>
  );
}

/* ---------- Corner flag (rotating pennant in team colors) ---------- */
function CornerFlag({ x, y, colors, flip = false }: { x: number; y: number; colors: [string, string]; flip?: boolean }) {
  const s = flip ? -1 : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${s} 1)`}>
      <line x1="0" y1="0" x2="0" y2="-2.4" stroke="#ffffff" strokeWidth="0.18" />
      <motion.g
        animate={{ rotate: [0, 6, 0, -6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "0px -2.4px" }}
      >
        <polygon points="0,-2.4 2.4,-2 0,-1.6" fill={colors[0]} stroke="#0b1220" strokeWidth="0.12" />
        <polygon points="0,-2.2 1.4,-2 0,-1.8" fill={colors[1]} opacity="0.9" />
      </motion.g>
    </g>
  );
}

/* ---------- Flag badge (small recognisable national flag) ---------- */
function FlagBadge({ country }: { country: "bra" | "arg" }) {
  if (country === "bra") {
    // Brazil: green field, yellow rhombus, blue circle.
    return (
      <div className="relative overflow-hidden rounded-md shadow-soft ring-1 ring-black/20" style={{ width: 30, height: 21 }}>
        <div className="absolute inset-0" style={{ background: BRA.flagA }} />
        <div
          className="absolute"
          style={{
            left: "50%", top: "50%", width: 24, height: 14,
            background: BRA.flagB, transform: "translate(-50%,-50%) rotate(0deg)",
            clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{ left: "50%", top: "50%", width: 11, height: 11, background: "#002776", transform: "translate(-50%,-50%)" }}
        />
        <div
          className="absolute"
          style={{ left: "50%", top: "50%", width: 11, height: 3, background: "none", borderTop: "1px solid #fff", transform: "translate(-50%,-50%) rotate(-15deg)", opacity: 0.7 }}
        />
      </div>
    );
  }
  // Argentina: light blue / white / light blue horizontal stripes.
  return (
    <div className="relative overflow-hidden rounded-md shadow-soft ring-1 ring-black/20" style={{ width: 30, height: 21 }}>
      <div className="absolute inset-x-0 top-0 h-1/3" style={{ background: ARG.flagA }} />
      <div className="absolute inset-x-0 top-1/3 h-1/3" style={{ background: ARG.flagB }} />
      <div className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: ARG.flagA }} />
      <div
        className="absolute grid place-items-center rounded-full"
        style={{ left: "50%", top: "50%", width: 8, height: 8, background: ARG.flagB, transform: "translate(-50%,-50%)", boxShadow: "0 0 0 1px rgba(0,0,0,0.15)" }}
      >
        <span style={{ fontSize: 5, lineHeight: 1 }}>☀</span>
      </div>
    </div>
  );
}
