import { FileText } from "lucide-react";
import React from "react";

const DemoSection = () => {
  return (
    <section className="py-20 px-4 ">
      <div className="max-w-3xl mx-auto text-center">
        {/* Animated Icon */}
        <div className="inline-flex items-center justify-center bg-white rounded-full w-12 h-12 animate-bounce shadow-md ">
          <FileText className="w-6 h-6 text-blue-600 animate-pulse" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-3xl font-bold text-gray-900 leading-snug">
          Watch how Summarion transforms this{" "}
          <span className="bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent font-semibold">
            Next.js course PDF
          </span>{" "}
          into a clear, concise summary!
        </h2>
      </div>
    </section>
  );
};

export default DemoSection;
