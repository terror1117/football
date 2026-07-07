import { NextRequest, NextResponse } from "next/server";
import { getAI } from "@/lib/ai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/translate
 * Body: { text: string, target: string }
 * Returns: { translation: string }
 */
export async function POST(req: NextRequest) {
  try {
    const { text, target = "es" } = (await req.json()) as { text?: string; target?: string };

    if (!text) return NextResponse.json({ error: "text is required" }, { status: 400 });

    const zai = await getAI();
    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: "assistant",
          content:
            "You are ArenaMind AI's multilingual engine for the FIFA World Cup 2026. Translate the user's text into the requested language naturally and idiomatically. Output the translation ONLY — no explanations, no quotes.",
        },
        { role: "assistant", content: `Target language ISO code: ${target}` },
        { role: "user", content: text },
      ],
      thinking: { type: "disabled" },
    });

    const translation = completion.choices[0]?.message?.content?.trim() ?? "";
    return NextResponse.json({ translation });
  } catch (err) {
    console.error("[/api/translate] error", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Translation failed" },
      { status: 500 }
    );
  }
}
