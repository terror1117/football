import { NextRequest, NextResponse } from "next/server";
import { getAI } from "@/lib/ai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * POST /api/vision
 * Body: { image: string (data URL or http URL), prompt?: string, role?: string, lang?: string }
 * Returns: { analysis: string }
 *
 * Uses the VLM to recognize seats, gates, food stalls, exits, parking,
 * accessibility paths, QR codes and tickets from a stadium photo.
 */
export async function POST(req: NextRequest) {
  try {
    const {
      image,
      prompt,
      role = "fan",
      lang = "en",
    } = (await req.json()) as {
      image?: string;
      prompt?: string;
      role?: string;
      lang?: string;
    };

    if (!image) {
      return NextResponse.json({ error: "image is required" }, { status: 400 });
    }

    const question =
      prompt?.trim() ||
      `You are ArenaMind AI's Vision module for the FIFA World Cup 2026. Analyze this stadium image and identify anything visible that helps a ${role}: seats, gates (A-H), food stalls, restrooms, emergency exits, parking, accessibility paths, QR codes or tickets. Reply concisely in language code "${lang}" with: (1) what you see, (2) the nearest landmark, (3) one helpful next step.`;

    const zai = await getAI();
    const response = await zai.chat.completions.createVision({
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: question },
            { type: "image_url", image_url: { url: image } },
          ],
        },
      ],
      thinking: { type: "disabled" },
    });

    const analysis = response.choices[0]?.message?.content?.trim() ?? "";
    return NextResponse.json({ analysis });
  } catch (err) {
    console.error("[/api/vision] error", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Vision analysis failed" },
      { status: 500 }
    );
  }
}
