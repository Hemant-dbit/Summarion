import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CTASection: React.FC = () => {
  return (
    <section className="bg-gray-100 text-white py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
          Ready to summarize your PDFs in seconds?
        </h2>
        <p className="text-lg text-gray-900 mb-8">
          Save time and effort by letting Summarion turn your documents into
          concise summaries.
        </p>
        <Link href="/signup">
          <button className="bg-gradient-to-r from-blue-800 to-blue-400 text-white hover:from-blue-400 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-full shadow transition duration-300 transform hover:scale-105 group ">
            Get Started for Free
            <ArrowRight className="inline-block ml-2 w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
