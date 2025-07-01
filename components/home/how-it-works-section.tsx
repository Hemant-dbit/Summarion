import React from "react";
import { FileUp, BrainCircuit, FileText, MoveRight } from "lucide-react"; // Optional icons

// Step 1: Define the type for a step
interface Step {
  title: string;
  description: string;
  icon: React.ReactNode; // Use ReactNode for icons
}

const steps: Step[] = [
  {
    title: "Upload PDF",
    description: "Upload your PDF document securely to start the process.",
    icon: <FileUp size={64} strokeWidth={1.5} />,
  },
  {
    title: "AI Analysis",
    description: "Our AI will read and analyze the content of your document.",
    icon: <BrainCircuit size={64} strokeWidth={1.5} />,
  },
  {
    title: "Get Summary",
    description: "Receive a clean, concise summary of your PDF instantly.",
    icon: <FileText size={64} strokeWidth={1.5} />,
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="w-full px-6 py-12 bg-gray-100 relative overflow-hidden" id="how-it-works">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">HOW IT WORKS</h2>
        <h3 className="text-2xl font-medium text-black">
          Transform any PDF into an easy-to-digest summary in three simple steps
        </h3>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              {/* Step Card */}
              <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition hover:shadow-lg hover:border-blue-500 hover:border-2 w-80">
                <div className="mb-4 text-blue-600 bg-gradient-to-r from-blue-200 to-blue-50 p-2 rounded-2xl">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>

              {/* Arrow - Don't show after last step */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex">
                  <MoveRight
                    size={40}
                    strokeWidth={1.5}
                    className="text-blue-600"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
