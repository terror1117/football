"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading, Reveal, GlassCard } from "@/components/brand/glass";

const FAQS = [
  {
    q: "What exactly is ArenaMind AI?",
    a: "ArenaMind AI is a generative-AI platform that acts as the intelligent nervous system for FIFA World Cup 2026 stadiums. It unifies navigation, crowd intelligence, accessibility, transportation, sustainability, multilingual assistance, emergency response and operational decision-support into one conversational and dashboard surface — serving fans, staff, volunteers, security and transport teams simultaneously.",
  },
  {
    q: "Which AI models power the assistant?",
    a: "The assistant uses a hosted large language model for natural conversation and operational reasoning, a vision-language model for image understanding (seat, gate, exit, QR and ticket recognition), speech-to-text for voice input, and text-to-speech for spoken replies. All AI runs server-side — no model credentials ever reach the browser.",
  },
  {
    q: "How does the crowd intelligence work?",
    a: "Live density sensors and historical patterns feed a prediction model that forecasts crowd density, queue times, entry delays and exit congestion per zone. The output is rendered as heatmaps and timeline charts, and the AI uses it to proactively recommend reroutes, staff allocation and gate openings before congestion peaks.",
  },
  {
    q: "Is it accessible for disabled fans?",
    a: "Yes. Accessibility is a first-class capability — wheelchair routing with step-free paths and live lift status, voice guidance, sign-language-ready content, screen-reader-optimized markup, high-contrast and large-text modes, plus TTS/STT in 9 languages. There's also a dedicated emergency-assistance flow for accessibility needs.",
  },
  {
    q: "Which languages are supported?",
    a: "Nine languages are supported end-to-end: English, Spanish, French, Arabic, Hindi, Portuguese, Japanese, German and Chinese. The assistant automatically replies in the fan's chosen language and can translate any phrase on demand — written or spoken.",
  },
  {
    q: "How does the Emergency AI work?",
    a: "A one-tap SOS button opens an emergency modal that captures the fan's location, offers one-tap medical, security and evacuation options, and routes the request to the nearest responder unit. The AI simultaneously plans the fastest emergency route, broadcasts live alerts and coordinates with staff — cutting response times dramatically.",
  },
  {
    q: "Can organizers see live operational intelligence?",
    a: "Yes. The dashboard provides a real-time pane of glass: attendance, density heatmaps, queue predictions, weather, transportation load, match schedule, active incidents, an AI-driven activity timeline and prioritized recommendations with confidence scores. It's designed for the command center as much as the concourse.",
  },
  {
    q: "How is sustainability measured?",
    a: "Sustainability AI tracks renewable energy mix, water reuse, waste diversion and CO₂ saved per fan in real time. It recommends green routes (e.g. metro + walk vs. driving), optimizes energy and water usage operationally, and quantifies CO₂ savings so organizers can hit and report on tournament-wide green targets.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4">
        <Reveal>
          <SectionHeading
            eyebrow="Questions, answered"
            title={
              <>
                Everything you want to{" "}
                <span className="text-gradient-cyan">know</span>
              </>
            }
            subtitle="Still curious? Ask the assistant directly — it knows the platform inside out."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10">
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="overflow-hidden rounded-2xl glass px-4 data-[state=open]:shadow-soft"
                >
                  <AccordionTrigger className="py-4 text-left text-sm font-semibold hover:no-underline sm:text-base">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
