"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import z from "zod";
import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

// Zod schema for file validation
const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine((file) => file.type === "application/pdf", "File must be a PDF"),
});

const UploadPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState("");

  // Initialize useUploadThing with your file route slug
  const { startUpload, isUploading: isUtUploading } = useUploadThing(
    "pdfUploader", // This must match your route slug from ourFileRouter
    {
      onClientUploadComplete: (res: string | any[]) => {
        // This runs on the client after the upload is complete
        console.log("UploadThing client upload complete:", res);
        // You'll get an array of uploaded files, even if maxFileCount is 1
        if (res && res.length > 0) {
          const uploadedFile = res[0];
          // Continue with the rest of your backend calls using uploadedFile.url
          handlePostUploadProcessing(uploadedFile.url, uploadedFile.name);
        }
      },
      onUploadError: (error: Error) => {
        // This runs if the upload fails on the client-side or server-side
        console.error("UploadThing error:", error);
        setStatus(`❌ Upload error: ${error.message}`);
        setIsUploading(false); // Make sure to reset state
      },
      onUploadBegin: () => {
        console.log("Upload has begun!");
        setIsUploading(true);
        setStatus("Uploading file to UploadThing...");
      },
    }
  );

  // Handler for file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setStatus("");
    }
  };

  // New function to handle the steps after UploadThing completes its upload
  const handlePostUploadProcessing = async (
    fileUrl: string,
    fileName: string
  ) => {
    try {
      setStatus("Extracting text from PDF...");

      const extractResponse = await fetch("/api/extract-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileUrl: fileUrl,
          fileName: fileName,
        }),
      });

      if (!extractResponse.ok) {
        throw new Error("Failed to extract text from PDF");
      }

      const extractData = await extractResponse.json();
      setStatus("Generating AI summary...");

      const summaryResponse = await fetch("/api/gemini-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: extractData.text,
          fileName: fileName,
        }),
      });

      if (!summaryResponse.ok) {
        throw new Error("Failed to generate AI summary");
      }

      const summaryData = await summaryResponse.json();
      setStatus("Saving to database...");

      const saveResponse = await fetch("/api/save-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: fileName,
          fileUrl: fileUrl,
          extractedText: extractData.text,
          summary: summaryData.summary,
          createdAt: new Date().toISOString(),
          uploadedBy: user?.id,
        }),
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save to database");
      }

      setStatus("✅ Success! PDF processed and saved successfully!");
      setSelectedFile(null);
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) (fileInput as HTMLInputElement).value = "";
    } catch (error) {
      console.error("Error in post-upload process:", error);
      if (error instanceof Error) {
        setStatus(`❌ Error: ${error.message}`);
      } else {
        setStatus("❌ Error: An unknown error occurred during processing");
      }
    } finally {
      setIsUploading(false); // Ensure final state reset
    }
  };

  // Handler for form submission (initiates UploadThing upload)
  const handleSubmit = async () => {
    if (!isSignedIn) {
      setStatus("Please sign in to upload files.");
      return;
    }

    if (!selectedFile) {
      setStatus("Please select a PDF file first.");
      return;
    }

    const validation = schema.safeParse({ file: selectedFile });
    if (!validation.success) {
      setStatus(validation.error.errors[0].message);
      return;
    }

    console.log("File validation successful:", validation.data);
    // Trigger UploadThing upload
    // `startUpload` expects an array of files
    await startUpload([selectedFile]);
  };

  const isButtonDisabled =
    !isLoaded || !isSignedIn || isUploading || !selectedFile;
  const buttonText = isUploading ? "Uploading..." : "Upload PDF";

  return (
    <div className="py-20 px-4 text-center bg-gray-50 min-h-screen animate-fade-in font-inter">
      <div className="mt-10 flex justify-center mb-5">
        <Badge className="bg-white text-blue-800 border border-blue-600 p-[8px] rounded-full text-base gap-2 flex items-center hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-700 hover:text-white transition duration-300">
          <Sparkles className="w-8 h-8 text-blue-600 animate-pulse motion-safe:animate-spin-slow" />
          <span className="font-semibold">AI-Powered Content Creation</span>
        </Badge>
      </div>

      <div className="flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold mb-2">
          Start Uploading{" "}
          <span className=" relative inline-block bg-blue-100 px-2 py-1 rounded-md skew-y-[-2deg]">
            Your PDF's
          </span>
        </h1>
        <p className="text-gray-600 mb-6">
          Upload your PDF and let our AI do the magic! ✨
        </p>

        <div className="bg-blue-50 w-full max-w-lg p-6 rounded-xl shadow-md border border-blue-200">
          <label className="flex flex-col items-center justify-center w-full h-40 px-4 transition bg-white border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-100">
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileSelect}
              disabled={isUploading}
            />
            <p className="text-gray-500">
              {selectedFile ? (
                <span className="text-blue-600 font-medium">
                  Selected: {selectedFile.name}
                </span>
              ) : (
                <>
                  Drag & drop your PDF here, or{" "}
                  <span className="text-blue-600 font-medium">browse</span>
                </>
              )}
            </p>
          </label>

          {!isLoaded ? (
            <div className="mt-4 p-3 bg-white rounded-lg border">
              <p className="text-sm text-gray-700">
                Loading authentication status...
              </p>
            </div>
          ) : !isSignedIn ? (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200">
              <p className="text-sm">Please sign in to upload files.</p>
            </div>
          ) : null}

          {status && (
            <div className="mt-4 p-3 bg-white rounded-lg border">
              <p className="text-sm text-gray-700">{status}</p>
            </div>
          )}

          <Button
            type="button"
            className="mr-2 mt-5 rounded-full bg-gradient-to-r from-blue-400 to-blue-900 text-white px-5 py-3 text-base font-semibold hover:opacity-90 transition-all duration-300"
            onClick={handleSubmit}
            disabled={isButtonDisabled}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
