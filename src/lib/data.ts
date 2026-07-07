/**
 * ArenaMind AI — in-memory operational dataset for the demo.
 * Mirrors the Prisma schema so the UI feels alive without heavy seeding.
 */
import type {
  ActivityItem,
  AISuggestion,
  Incident,
  MatchInfo,
  StadiumPOI,
  SustainabilityMetric,
  TransportOption,
} from "./types";

export const STADIUM = {
  id: "azteca-2026",
  name: "Estadio Azteca · MetLife Arena",
  city: "Mexico City",
  country: "Mexico",
  capacity: 87000,
  liveAttendance: 79432,
  liveDensity: 71,
  avgQueueMin: 9,
  gates: 8,
} as const;

/** POIs laid out on a 0–100 coordinate grid over the stadium SVG. */
export const STADIUM_POIS: StadiumPOI[] = [
  { id: "g-a", name: "Gate A", type: "gate", x: 18, y: 30, density: 64, note: "Sections 100–112" },
  { id: "g-b", name: "Gate B", type: "gate", x: 38, y: 18, density: 82, note: "Heaviest entry" },
  { id: "g-c", name: "Gate C", type: "gate", x: 62, y: 18, density: 58 },
  { id: "g-d", name: "Gate D", type: "gate", x: 82, y: 30, density: 47 },
  { id: "g-e", name: "Gate E", type: "gate", x: 82, y: 70, density: 41 },
  { id: "g-f", name: "Gate F", type: "gate", x: 62, y: 86, density: 55 },
  { id: "g-g", name: "Gate G", type: "gate", x: 38, y: 86, density: 73 },
  { id: "g-h", name: "Gate H", type: "gate", x: 18, y: 70, density: 39 },

  { id: "f-1", name: "Concourse Food Hall", type: "food", x: 28, y: 42, density: 88, note: "9 min wait" },
  { id: "f-2", name: "Taqueria Norte", type: "food", x: 50, y: 32, density: 34, note: "2 min wait" },
  { id: "f-3", name: "Halal Grill", type: "food", x: 72, y: 42, density: 61, note: "5 min wait" },
  { id: "f-4", name: "Poutine & Co", type: "food", x: 28, y: 58, density: 28, note: "1 min wait" },
  { id: "f-5", name: "Matchday Pub", type: "food", x: 72, y: 58, density: 72, note: "7 min wait" },

  { id: "r-1", name: "Restrooms N", type: "restroom", x: 44, y: 26, density: 45 },
  { id: "r-2", name: "Restrooms S", type: "restroom", x: 56, y: 78, density: 52 },
  { id: "r-3", name: "Accessible Restroom", type: "restroom", x: 50, y: 50, density: 18, note: "Step-free" },

  { id: "e-1", name: "Emergency Exit N1", type: "exit", x: 50, y: 8, density: 12 },
  { id: "e-2", name: "Emergency Exit S1", type: "exit", x: 50, y: 94, density: 9 },
  { id: "e-3", name: "Emergency Exit E1", type: "exit", x: 94, y: 50, density: 16 },
  { id: "e-4", name: "Emergency Exit W1", type: "exit", x: 6, y: 50, density: 14 },

  { id: "fa-1", name: "First Aid · Level 1", type: "firstaid", x: 50, y: 50, density: 0, note: "Open 24/7" },
  { id: "p-1", name: "Parking P1 · VIP", type: "parking", x: 10, y: 14, density: 91, note: "Full" },
  { id: "p-2", name: "Parking P2 · General", type: "parking", x: 90, y: 14, density: 67, note: "32% free" },
  { id: "p-3", name: "Parking P3 · Accessible", type: "parking", x: 10, y: 90, density: 33, note: "Step-free" },

  { id: "s-1", name: "Section 214 · Your Seat", type: "seat", x: 50, y: 44, density: 70, note: "Row 12 · Seat 7" },
  { id: "sh-1", name: "Fan Shop", type: "shop", x: 60, y: 64, density: 49 },
];

export const LIVE_MATCHES: MatchInfo[] = [
  {
    id: "m-live",
    home: "Mexico",
    away: "Canada",
    homeFlag: "🇲🇽",
    awayFlag: "🇨🇦",
    stage: "Group A",
    venue: "Estadio Azteca",
    city: "Mexico City",
    kickoff: "LIVE",
    status: "live",
    score: "2 - 1",
  },
  {
    id: "m-next",
    home: "USA",
    away: "Brazil",
    homeFlag: "🇺🇸",
    awayFlag: "🇧🇷",
    stage: "Group B",
    venue: "MetLife Stadium",
    city: "New York",
    kickoff: "Today · 20:00",
    status: "scheduled",
  },
  {
    id: "m-up1",
    home: "Argentina",
    away: "France",
    homeFlag: "🇦🇷",
    awayFlag: "🇫🇷",
    stage: "Quarter-Final",
    venue: "SoFi Stadium",
    city: "Los Angeles",
    kickoff: "Jun 28 · 17:00",
    status: "scheduled",
  },
  {
    id: "m-up2",
    home: "Spain",
    away: "Germany",
    homeFlag: "🇪🇸",
    awayFlag: "🇩🇪",
    stage: "Round of 16",
    venue: "BMO Field",
    city: "Toronto",
    kickoff: "Jun 24 · 14:00",
    status: "scheduled",
  },
];

export const INCIDENTS: Incident[] = [
  { id: "i1", severity: "high", title: "Congestion at Gate B", zone: "Entry · Gate B", status: "active", time: "2m ago" },
  { id: "i2", severity: "medium", title: "Spill on Concourse L2", zone: "Concourse North", status: "monitoring", time: "6m ago" },
  { id: "i3", severity: "low", title: "Low stock · Halal Grill", zone: "Food · F3", status: "monitoring", time: "11m ago" },
  { id: "i4", severity: "critical", title: "Medical assist · Section 110", zone: "West Stand", status: "active", time: "just now" },
];

export const ACTIVITY: ActivityItem[] = [
  { id: "a1", type: "ai", title: "AI rerouted 1,240 fans from Gate B → Gate C", detail: "Crowd prediction: Gate B would hit 95% in 6 min", time: "just now" },
  { id: "a2", type: "alert", title: "First-aid dispatched to Section 110", detail: "ETA 90s · medic unit M-3", time: "1m ago" },
  { id: "a3", type: "staff", title: "8 volunteers redeployed to Concourse North", detail: "Spill cleanup + flow control", time: "5m ago" },
  { id: "a4", type: "system", title: "Energy mix shifted to 78% renewable", detail: "Solar + grid battery coverage", time: "8m ago" },
  { id: "a5", type: "fan", title: "4,200 accessibility routes requested", detail: "Avg response 1.4s across 9 languages", time: "12m ago" },
  { id: "a6", type: "ai", title: "Spanish translation cache hit-rate 94%", detail: "Latency ↓ 38% vs last match", time: "18m ago" },
];

export const AI_SUGGESTIONS: AISuggestion[] = [
  {
    id: "s1",
    priority: "critical",
    title: "Open Gate D as overflow now",
    detail: "Gate B density 82% and rising. Reroute buses 22 & 41 to Gate D — projected wait drop from 14m to 4m.",
    action: "Dispatch 6 stewards",
    confidence: 0.94,
  },
  {
    id: "s2",
    priority: "warning",
    title: "Concourse Food Hall nearing capacity",
    detail: "Predicted 95% density in 8 min. Promote Taqueria Norte (2m wait) via app push in 3 languages.",
    action: "Send targeted push",
    confidence: 0.88,
  },
  {
    id: "s3",
    priority: "info",
    title: "Green route available for post-match exit",
    detail: "Metro Line 1 + 6-min walk saves 3.2 kg CO₂ vs parking exit. Recommend to 12k fans in P2.",
    action: "Queue green-exit notification",
    confidence: 0.91,
  },
];

export const TRANSPORT: TransportOption[] = [
  { id: "t1", mode: "metro", label: "Metro Line 1 → Stadium", eta: "12 min", load: 62, green: 96, cost: "$2" },
  { id: "t2", mode: "bus", label: "Express Bus 41", eta: "18 min", load: 48, green: 88, cost: "$1.5" },
  { id: "t3", mode: "walk", label: "Walk from Zócalo", eta: "24 min", load: 12, green: 100, cost: "Free" },
  { id: "t4", mode: "rideshare", label: "Rideshare drop-off P2", eta: "9 min", load: 71, green: 54, cost: "$8" },
  { id: "t5", mode: "car", label: "Drive + Park P2", eta: "16 min", load: 67, green: 38, cost: "$20" },
];

export const SUSTAINABILITY: SustainabilityMetric[] = [
  { label: "Renewable energy", value: 78, unit: "%", target: 80, trend: [62, 68, 71, 74, 76, 78] },
  { label: "Water reused", value: 41, unit: "%", target: 50, trend: [28, 32, 36, 38, 40, 41] },
  { label: "Waste diverted", value: 86, unit: "%", target: 90, trend: [70, 74, 79, 82, 84, 86] },
  { label: "CO₂ saved / fan", value: 3.2, unit: "kg", target: 4, trend: [1.1, 1.8, 2.3, 2.7, 3.0, 3.2] },
];

/** Crowd-density heatmap grid (rows × cols) for the dashboard mini-map. */
export const HEATMAP_GRID: number[][] = [
  [12, 22, 34, 41, 52, 41, 34, 22, 12],
  [28, 48, 62, 71, 78, 71, 62, 48, 28],
  [34, 58, 76, 84, 91, 84, 76, 58, 34],
  [30, 52, 68, 74, 80, 74, 68, 52, 30],
  [24, 44, 58, 64, 70, 64, 58, 44, 24],
  [18, 34, 46, 52, 56, 52, 46, 34, 18],
  [12, 22, 30, 36, 40, 36, 30, 22, 12],
];

/** 12-point crowd-density timeline (last 2 hours, 10-min buckets). */
export const CROWD_TIMELINE = Array.from({ length: 12 }, (_, i) => ({
  t: `${i * 10}m`,
  concourse: Math.round(40 + 30 * Math.sin(i / 2.2) + i * 1.6),
  gates: Math.round(35 + 26 * Math.cos(i / 1.8) + i * 1.4),
  food: Math.round(30 + 22 * Math.sin(i / 1.5 + 1) + i * 1.8),
}));

export const QUEUE_TIMELINE = Array.from({ length: 12 }, (_, i) => ({
  t: `${i * 10}m`,
  food: Math.max(1, Math.round(3 + 4 * Math.sin(i / 1.7 + 0.5) + i * 0.4)),
  restroom: Math.max(1, Math.round(2 + 2 * Math.cos(i / 2) + i * 0.2)),
  entry: Math.max(1, Math.round(5 + 6 * Math.sin(i / 2.3) + i * 0.5)),
}));

export const HOURLY_ATTENDANCE = Array.from({ length: 24 }, (_, h) => {
  const base = h >= 16 && h <= 22 ? 1 : 0.3;
  return {
    h: `${String(h).padStart(2, "0")}:00`,
    fans: Math.round(STADIUM.capacity * base * (0.7 + 0.3 * Math.sin(h / 3))),
  };
});

export const LANG_USAGE = [
  { lang: "English", value: 38, color: "#2563eb" },
  { lang: "Spanish", value: 28, color: "#fbbf24" },
  { lang: "French", value: 9, color: "#22d3ee" },
  { lang: "Portuguese", value: 8, color: "#10b981" },
  { lang: "Arabic", value: 7, color: "#a855f7" },
  { lang: "Other", value: 10, color: "#64748b" },
];

export const WEATHER = {
  temp: 22,
  condition: "Clear",
  humidity: 54,
  wind: 12,
  uv: 6,
  rainChance: 8,
  icon: "sun",
};
