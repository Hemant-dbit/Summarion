import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";


export async function extractTextFromPDF(blob: Blob): Promise<string> {
  const loader = new PDFLoader(blob, { splitPages: false });
  const docs = await loader.load();
  return docs.map((doc: { pageContent: string }) => doc.pageContent).join("\n");
}

