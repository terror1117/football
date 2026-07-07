"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChatMessage, LangCode, Role } from "./types";
import { BRAND } from "./constants";

export type View = "landing" | "dashboard";

interface AppState {
  // Navigation
  view: View;
  setView: (v: View) => void;

  // Language
  lang: LangCode;
  setLang: (l: LangCode) => void;

  // Role persona
  role: Role;
  setRole: (r: Role) => void;

  // Accessibility
  highContrast: boolean;
  toggleHighContrast: () => void;
  largeText: boolean;
  toggleLargeText: () => void;
  reduceMotion: boolean;
  toggleReduceMotion: () => void;

  // Chat (shared across landing + dashboard)
  messages: ChatMessage[];
  addMessage: (m: ChatMessage) => void;
  updateMessage: (id: string, patch: Partial<ChatMessage>) => void;
  clearMessages: () => void;

  // Emergency
  emergencyOpen: boolean;
  setEmergencyOpen: (o: boolean) => void;

  // Chat panel open (landing)
  chatOpen: boolean;
  setChatOpen: (o: boolean) => void;
}

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: `Welcome to ${BRAND.name}. I'm your AI stadium co-pilot for FIFA World Cup 2026™. Ask me about gates, seats, the shortest food queue, wheelchair-accessible routes, parking, or live crowd conditions. How can I make your matchday effortless?`,
  createdAt: Date.now(),
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      view: "landing",
      setView: (view) => set({ view }),

      lang: "en",
      setLang: (lang) => set({ lang }),

      role: "fan",
      setRole: (role) => set({ role }),

      highContrast: false,
      toggleHighContrast: () => set((s) => ({ highContrast: !s.highContrast })),
      largeText: false,
      toggleLargeText: () => set((s) => ({ largeText: !s.largeText })),
      reduceMotion: false,
      toggleReduceMotion: () => set((s) => ({ reduceMotion: !s.reduceMotion })),

      messages: [WELCOME],
      addMessage: (m) => set((s) => ({ messages: [...s.messages, m] })),
      updateMessage: (id, patch) =>
        set((s) => ({
          messages: s.messages.map((m) => (m.id === id ? { ...m, ...patch } : m)),
        })),
      clearMessages: () => set({ messages: [WELCOME] }),

      emergencyOpen: false,
      setEmergencyOpen: (emergencyOpen) => set({ emergencyOpen }),

      chatOpen: false,
      setChatOpen: (chatOpen) => set({ chatOpen }),
    }),
    {
      name: "arenamind-store",
      partialize: (s) => ({
        lang: s.lang,
        role: s.role,
        highContrast: s.highContrast,
        largeText: s.largeText,
        reduceMotion: s.reduceMotion,
        messages: s.messages,
      }),
    }
  )
);
