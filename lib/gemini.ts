import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function generateGeminiSummary(text: string, temperature: number = 0.4): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable is not set.");
  }

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    // Use the free Gemini model with temperature parameter
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash", generationConfig: { temperature: 0.7, maxOutputTokens: 1500 } });
    // Professional system prompt with emoji instruction
    const systemPrompt =
      "You are a professional AI assistant. Summarize the provided document in a concise, clear, and professional manner. The summary should be suitable for business or academic use, highlighting the main points and key insights. Where appropriate, include relevant emojis to enhance clarity and engagement. Avoid unnecessary details and keep the language formal.";
    // Use both system prompt and user text as parts
    const result = await model.generateContent([
      { text: systemPrompt },
      { text },
    ]);
    const response = await result.response;
    const summary = response.text();
    if (!summary) {
      throw new Error("No summary returned from Gemini API.");
    }
    return summary;
  } catch (error) {
    console.log("Error calling Gemini API:", error);
    return "Error: Could not generate summary from Gemini.";
  }
} 