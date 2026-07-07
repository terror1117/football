/**
 * ArenaMind AI — Brand & product constants
 * FIFA World Cup 2026 · GenAI Stadium Assistant
 */

export const BRAND = {
  name: "ArenaMind AI",
  short: "ArenaMind",
  slogan: "Every fan. Every moment. One intelligent arena.",
  tagline: "The intelligent nervous system for the FIFA World Cup 2026™",
  edition: "FIFA World Cup 2026™",
  hostCities: ["USA", "Canada", "Mexico"],
  version: "v1.0 — Tournament Edition",
} as const;

export const BRAND_COLORS = {
  royal: "#2563eb",
  royalDeep: "#1e3a8a",
  purple: "#6d28d9",
  cyan: "#0891b2",
  emerald: "#059669",
  gold: "#d97706",
} as const;

/** Target kickoff — FIFA World Cup 2026 opening match, June 11 2026, Mexico City */
export const WORLD_CUP_KICKOFF = "2026-06-11T20:00:00-06:00";

export const NAV_LINKS = [
  { id: "features", label: "Features" },
  { id: "assistant", label: "AI Assistant" },
  { id: "stadium", label: "Stadium Map" },
  { id: "dashboard", label: "Dashboard" },
  { id: "sustainability", label: "Sustainability" },
  { id: "faq", label: "FAQ" },
] as const;

export const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧", native: "English" },
  { code: "es", label: "Spanish", flag: "🇪🇸", native: "Español" },
  { code: "fr", label: "French", flag: "🇫🇷", native: "Français" },
  { code: "ar", label: "Arabic", flag: "🇸🇦", native: "العربية" },
  { code: "hi", label: "Hindi", flag: "🇮🇳", native: "हिन्दी" },
  { code: "pt", label: "Portuguese", flag: "🇧🇷", native: "Português" },
  { code: "ja", label: "Japanese", flag: "🇯🇵", native: "日本語" },
  { code: "de", label: "German", flag: "🇩🇪", native: "Deutsch" },
  { code: "zh", label: "Chinese", flag: "🇨🇳", native: "中文" },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];
