import { NextRequest, NextResponse } from "next/server";
import { getAI, AI_SYSTEM_PROMPT, buildContextPreamble } from "@/lib/ai";
import type { ChatMessage } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ChatBody {
  messages: { role: "user" | "assistant" | "system"; content: string }[];
  role?: string;
  lang?: string;
  stadium?: string;
  section?: string;
  liveDensity?: number;
  liveQueue?: number;
}

/**
 * POST /api/chat
 * Streaming-friendly LLM endpoint for the ArenaMind AI assistant.
 * Returns the assistant reply as plain text + metadata.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ChatBody;
    const {
      messages = [],
      role = "fan",
      lang = "en",
      stadium = "Estadio Azteca",
      section,
      liveDensity,
      liveQueue,
    } = body;

    if (!messages.length) {
      return NextResponse.json({ error: "messages[] is required" }, { status: 400 });
    }

    const zai = await getAI();
    const preamble = buildContextPreamble({
      role,
      lang,
      stadium,
      section,
      liveDensity,
      liveQueue,
    });

    const finalMessages = [
      { role: "assistant" as const, content: AI_SYSTEM_PROMPT },
      { role: "assistant" as const, content: preamble },
      ...messages.map((m) => ({
        role: m.role === "system" ? ("assistant" as const) : m.role,
        content: m.content,
      })),
    ];

    const completion = await zai.chat.completions.create({
      messages: finalMessages,
      thinking: { type: "disabled" },
    });

    const reply = completion.choices[0]?.message?.content?.trim() ?? "";

    const outgoing: ChatMessage = {
      id: `ai_${Date.now()}`,
      role: "assistant",
      content: reply || "I'm here to help — could you rephrase that?",
      createdAt: Date.now(),
      lang,
    };

    return NextResponse.json({ message: outgoing });
  } catch (err) {
    console.error("[/api/chat] error", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "AI assistant unavailable" },
      { status: 500 }
    );
  }
}
