"use client"
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const handleSubmit = () =>{
  
}

const UploadPage = () => {
  
  return (
    <div className="py-20 px-4 text-center bg-gray-50 min-h-screen animate-fade-in">
      {/* AI Badge */}
      <div className="mt-10 flex justify-center mb-5">
        <Badge className="bg-white text-blue-800 border border-blue-600 p-[8px] rounded-full text-base gap-2 flex items-center hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-700 hover:text-white transition duration-300">
          <Sparkles className="w-8 h-8 text-blue-600 animate-pulse motion-safe:animate-spin-slow" />
          <span className="font-semibold">AI-Powered Content Creation</span>
        </Badge>
      </div>

      {/* Main PDF Upload Section */}
      <div className="flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold mb-2">
          Start Uploading{" "}
          <span className=" relative inline-block bg-blue-100  px-2 py-1 rounded-md skew-y-[-2deg]">
            Your PDF's
          </span>
        </h1>
        <p className="text-gray-600 mb-6">
          Upload your PDF and let our AI do the magic! ✨
        </p>

        <div className="bg-blue-50 w-full max-w-lg p-6 rounded-xl shadow-md border border-blue-200">
          <label className="flex flex-col items-center justify-center w-full h-40 px-4 transition bg-white border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-100">
            <input type="file" accept=".pdf" className="hidden" />
            <p className="text-gray-500">
              Drag & drop your PDF here, or{" "}
              <span className="text-blue-600 font-medium">browse</span>
            </p>
          </label>
          <Button
            className="group mr-2 mt-5 rounded-full bg-gradient-to-r from-blue-400 to-blue-900 text-white px-5 py-5 text-base font-semibold shadow hover:from-blue-900 hover:to-blue-400 transition-all duration-300"
            onClick={handleSubmit}
          >
            Upload PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
