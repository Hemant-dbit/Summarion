import { NextRequest, NextResponse } from "next/server";
import { uploadAndExtractAction } from "@/app/actions/upload-actions";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    // Parse multipart form data
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    // Call the server action
    const result = await uploadAndExtractAction(file);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in upload-and-extract API:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
} 