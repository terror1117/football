/**
 * ArenaMind AI — lightweight i18n dictionary (client-safe).
 * Covers UI chrome; AI replies are translated server-side.
 */
import type { LangCode } from "./constants";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.features": "Features",
  "nav.assistant": "AI Assistant",
  "nav.stadium": "Stadium Map",
  "nav.dashboard": "Dashboard",
  "nav.sustainability": "Sustainability",
  "nav.faq": "FAQ",
  "cta.launch": "Launch Dashboard",
  "cta.tryAssistant": "Try the Assistant",
  "cta.sos": "Emergency SOS",
  "hero.badge": "FIFA World Cup 2026™ · Now boarding",
  "hero.title1": "Every fan.",
  "hero.title2": "Every moment.",
  "hero.title3": "One intelligent arena.",
  "hero.subtitle":
    "ArenaMind AI is the generative-AI nervous system for the world's biggest tournament — navigation, crowd intelligence, accessibility, sustainability and emergency response, in 9 languages.",
  "hero.stat.fans": "Fans served / match",
  "hero.stat.venues": "Smart venues",
  "hero.stat.languages": "Languages",
  "hero.stat.response": "Avg AI response",
  "hero.kickoff": "Opening kickoff",
  "common.getStarted": "Get started",
  "common.learnMore": "Learn more",
  "common.close": "Close",
  "common.send": "Send",
  "common.listening": "Listening…",
  "common.speak": "Speak",
  "common.upload": "Upload image",
  "common.online": "Live",
};

const es: Dict = {
  ...en,
  "nav.features": "Funciones",
  "nav.assistant": "Asistente IA",
  "nav.stadium": "Mapa del estadio",
  "nav.dashboard": "Panel",
  "nav.sustainability": "Sostenibilidad",
  "cta.launch": "Abrir panel",
  "cta.tryAssistant": "Probar el asistente",
  "cta.sos": "Emergencias SOS",
  "hero.badge": "Copa Mundial 2026™ · Embarque abierto",
  "hero.title1": "Cada aficionado.",
  "hero.title2": "Cada momento.",
  "hero.title3": "Un estadio inteligente.",
  "hero.subtitle":
    "ArenaMind AI es el sistema nervioso de IA generativa para el torneo más grande del mundo: navegación, inteligencia de multitudes, accesibilidad, sostenibilidad y respuesta de emergencia, en 9 idiomas.",
  "common.getStarted": "Empezar",
  "common.learnMore": "Saber más",
  "common.online": "En vivo",
};

const fr: Dict = {
  ...en,
  "nav.features": "Fonctions",
  "nav.assistant": "Assistant IA",
  "nav.stadium": "Plan du stade",
  "nav.dashboard": "Tableau de bord",
  "nav.sustainability": "Durabilité",
  "cta.launch": "Ouvrir le tableau",
  "cta.tryAssistant": "Essayer l'assistant",
  "cta.sos": "Urgence SOS",
  "hero.badge": "Coupe du Monde 2026™ · Embarquement",
  "hero.title1": "Chaque fan.",
  "hero.title2": "Chaque instant.",
  "hero.title3": "Une arène intelligente.",
  "hero.subtitle":
    "ArenaMind AI est le système nerveur d'IA générative du plus grand tournoi du monde — navigation, intelligence de foule, accessibilité, durabilité et réponse d'urgence, en 9 langues.",
};

const ar: Dict = {
  ...en,
  "nav.features": "الميزات",
  "nav.assistant": "المساعد الذكي",
  "nav.stadium": "خريطة الملعب",
  "nav.dashboard": "لوحة التحكم",
  "nav.sustainability": "الاستدامة",
  "cta.launch": "فتح لوحة التحكم",
  "cta.tryAssistant": "جرّب المساعد",
  "cta.sos": "طوارئ SOS",
  "hero.badge": "كأس العالم 2026™ · الصعود الآن",
  "hero.title1": "كل مشجع.",
  "hero.title2": "كل لحظة.",
  "hero.title3": "ملعب ذكي واحد.",
};

const hi: Dict = { ...en, "nav.dashboard": "डैशबोर्ड", "cta.launch": "डैशबोर्ड खोलें", "cta.sos": "आपातकालीन SOS" };
const pt: Dict = { ...en, "nav.dashboard": "Painel", "cta.launch": "Abrir painel", "cta.sos": "Emergência SOS" };
const ja: Dict = { ...en, "nav.dashboard": "ダッシュボード", "cta.launch": "ダッシュボードを開く", "cta.sos": "緊急SOS" };
const de: Dict = { ...en, "nav.dashboard": "Dashboard", "cta.launch": "Dashboard öffnen", "cta.sos": "Notfall-SOS" };
const zh: Dict = { ...en, "nav.dashboard": "仪表盘", "cta.launch": "打开仪表盘", "cta.sos": "紧急求助" };

const DICTS: Record<LangCode, Dict> = { en, es, fr, ar, hi, pt, ja, de, zh };

export function t(lang: LangCode, key: string): string {
  return DICTS[lang]?.[key] ?? en[key] ?? key;
}
