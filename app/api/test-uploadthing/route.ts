// app/api/test-uploadthing/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "UploadThing test endpoint working",
    token: process.env.UPLOADTHING_TOKEN ? "Token present" : "Token missing",
  });
}

export async function POST(req: NextRequest) {
  console.log("Test POST request received");
  console.log("Headers:", [...req.headers.entries()]);

  try {
    const contentType = req.headers.get("content-type");
    console.log("Content-Type:", contentType);

    if (contentType?.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File;
      console.log("File received:", file ? file.name : "No file");

      return NextResponse.json({
        message: "File received successfully",
        fileName: file?.name,
        fileSize: file?.size,
        fileType: file?.type,
      });
    }

    return NextResponse.json({ message: "No file in request" });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
