import { NextRequest, NextResponse } from "next/server";
import { getAI } from "@/lib/ai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/tts
 * Body: { text: string, voice?: string, speed?: number }
 * Returns: audio/wav binary. Client can play directly via <audio>.
 */
export async function POST(req: NextRequest) {
  try {
    const { text, voice = "tongtong", speed = 1.0 } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "text is required" }, { status: 400 });
    }

    const clean = text.replace(/\s+/g, " ").trim();
    if (!clean) return NextResponse.json({ error: "empty text" }, { status: 400 });

    // TTS limit is 1024 chars — chunk if needed, but for UI we cap + take the first slice.
    const capped = clean.slice(0, 1000);

    const zai = await getAI();
    const response = await zai.audio.tts.create({
      input: capped,
      voice: voice as "tongtong" | "chuichui" | "xiaochen" | "jam" | "kazi" | "douji" | "luodo",
      speed: Math.min(2, Math.max(0.5, Number(speed) || 1)),
      response_format: "wav",
      stream: false,
    });

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(new Uint8Array(arrayBuffer));

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/wav",
        "Content-Length": buffer.length.toString(),
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[/api/tts] error", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "TTS failed" },
      { status: 500 }
    );
  }
}
