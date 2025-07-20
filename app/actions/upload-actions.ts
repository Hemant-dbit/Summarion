"use server";
import { extractTextFromPDF} from "@/lib/langchain";
import { UTApi } from "uploadthing/server";
import { generateGeminiSummary } from "@/lib/gemini";

const utapi = new UTApi();

export async function uploadAndExtractAction(file: File) {
  // Upload to UploadThing
  const uploaded = await utapi.uploadFiles(file);
  if (!uploaded || !uploaded.data || !uploaded.data.url) {
    throw new Error("Failed to upload file to UploadThing");
  }
  const fileUrl = uploaded.data.url;

  // Fetch the PDF as a blob
  const response = await fetch(fileUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch uploaded PDF");
  }
  const blob = await response.blob();

  // Extract text using langchain
  const text = await extractTextFromPDF(blob);
  return { text, fileUrl };
}

export async function createGeminiSummaryAction(text: string) {
  const summary = await generateGeminiSummary(text);
  return summary;
} 