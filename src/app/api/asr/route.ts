import { NextRequest, NextResponse } from "next/server";
import { getAI } from "@/lib/ai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * POST /api/asr
 * Body: { base64: string }  (audio data URL or raw base64)
 * Returns: { text: string }
 */
export async function POST(req: NextRequest) {
  try {
    const { base64 } = (await req.json()) as { base64?: string };

    if (!base64) {
      return NextResponse.json({ error: "base64 audio is required" }, { status: 400 });
    }

    // strip data URI prefix if present
    const cleaned = base64.replace(/^data:audio\/[a-zA-Z0-9.]+;base64,/, "");

    const zai = await getAI();
    const response = await zai.audio.asr.create({ file_base64: cleaned });
    const text = (response.text ?? "").trim();

    return NextResponse.json({ text });
  } catch (err) {
    console.error("[/api/asr] error", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Speech recognition failed" },
      { status: 500 }
    );
  }
}
