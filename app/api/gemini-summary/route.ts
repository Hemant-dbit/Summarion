import { NextRequest, NextResponse } from "next/server";
import { createGeminiSummaryAction } from "@/app/actions/upload-actions";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json({ error: "Missing text" }, { status: 400 });
    }
    const summary = await createGeminiSummaryAction(text);
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Error in gemini-summary API:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
} 