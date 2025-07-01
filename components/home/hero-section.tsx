import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="py-20 px-4 text-center animate-fade-in">
      {/* Badge */}
      <div className=" mt-10 flex justify-center mb-6">
        <Badge className="bg-white text-blue-800 border border-blue-600 p-[8px] rounded-full text-base gap-2 flex items-center hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-700 hover:text-white transition duration-300">
          <Sparkles className="w-8 h-8 text-blue-600 animate-pulse motion-safe:animate-spin-slow" />
          <span className="font-semibold">Powered by AI</span>
        </Badge>
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl mt-2 font-bold tracking-tight text-gray-900 animate-fade-in-up">
        Summarize complex documents in seconds .
      </h1>

      {/* Subtext */}
      <p className="mt-4 text-sm md:text-base text-gray-600 max-w-2xl mx-auto animate-fade-in-up delay-100">
        Boring PDFs? Not anymore. Get quick, smart summaries.
      </p>

      {/* CTA Button */}
      <div className="mt-10 animate-fade-in-up delay-200">
        <Link href="/pricing">
          <Button className="group mr-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-900 text-white px-5 py-5 text-base font-semibold shadow hover:from-blue-900 hover:to-blue-400 transition-all duration-300">
            Try Summarion
            <ArrowRight className="w-8 h-8 text-white transition-transform duration-300 group-hover:translate-x-1 " />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
