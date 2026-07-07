import { NextRequest, NextResponse } from "next/server";
import { getAI, AI_SYSTEM_PROMPT } from "@/lib/ai";
import { AI_SUGGESTIONS, STADIUM } from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/insights
 * Generates live, AI-driven operational recommendations for organizers.
 * Falls back to curated insights if the model is unavailable.
 */
export async function GET(req: NextRequest) {
  const role = req.nextUrl.searchParams.get("role") ?? "organizer";
  const lang = req.nextUrl.searchParams.get("lang") ?? "en";

  const context = `Live stadium snapshot:
- Stadium: ${STADIUM.name}, capacity ${STADIUM.capacity}, live attendance ${STADIUM.liveAttendance}
- Overall density: ${STADIUM.liveDensity}%
- Average food-queue wait: ${STADIUM.avgQueueMin} min
- ${AI_SUGGESTIONS.length} active AI recommendations queued
Produce 3 fresh, prioritized operational recommendations for a ${role} right now.`;

  try {
    const zai = await getAI();
    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: AI_SYSTEM_PROMPT },
        { role: "assistant", content: `[Reply language: ${lang}] [Operational intelligence mode]` },
        { role: "assistant", content: context },
        {
          role: "user",
          content:
            "Return exactly 3 concise recommendations. Format each as: <TITLE> — <one-sentence detail> (recommended action: <action>, confidence: <0-1>). Number them 1·2·3.",
        },
      ],
      thinking: { type: "disabled" },
    });

    const text = completion.choices[0]?.message?.content?.trim() ?? "";
    return NextResponse.json({ insights: text, source: "ai", suggestions: AI_SUGGESTIONS });
  } catch (err) {
    console.error("[/api/insights] error", err);
    return NextResponse.json({
      insights: AI_SUGGESTIONS.map(
        (s, i) => `${i + 1}. ${s.title} — ${s.detail} (recommended action: ${s.action}, confidence: ${s.confidence})`
      ).join("\n"),
      source: "fallback",
      suggestions: AI_SUGGESTIONS,
    });
  }
}
