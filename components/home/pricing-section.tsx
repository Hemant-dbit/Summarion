import React from "react";
import { Check } from "lucide-react";
import Link from "next/link";

// Step 1: Define the type for a plan
interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  href: string;
  highlight: boolean;
  paymentLink: string;
  priceId: string;
}

// Step 2: Use the type for the plans array
const plans: Plan[] = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for occasional users who want quick summaries.",
    features: [
      "5 summaries/month",
      "Max file size: 5MB",
      "Limited AI accuracy",
      "Email support",
    ],
    buttonText: "Get Started",
    href: "/signup",
    highlight: false,
    paymentLink: " ",
    priceId: "",
  },
  {
    name: "Pro",
    price: "$9.99/mo",
    description: "Unlimited summaries with advanced AI analysis.",
    features: [
      "Unlimited summaries",
      "Max file size: 50MB",
      "Priority AI accuracy",
      "24/7 support",
      "Priority support",
      "Access to future features",
    ],
    buttonText: "Upgrade Now",
    href: "/signup",
    highlight: true,
    paymentLink: " ",
    priceId: "",
  },
];

// Step 3: No props needed, just export the FC
const PricingSection: React.FC = () => {
  return (
    <section
      className="min-h-screen px-6 py-16 bg-white relative overflow-hidden"
      id="pricing"
    >
      <div className="max-w-5xl mx-auto text-center ">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-gray-600 mb-12">
          Get started for free or unlock the full power of Summarion with Pro.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 border shadow-md bg-white flex flex-col justify-between hover:scale-105 transition-transform duration-300 ${
                plan.highlight ? "border-blue-600" : "border-gray-200"
              }`}
            >
              <div>
                <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
                <div>
                  <p className="text-3xl font-bold text-blue-600 mb-4">
                    {plan.price}
                  </p>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="text-left space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <Check className="text-green-500" size={20} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Link href={plan.paymentLink}>
                <button
                  className={`w-full py-3 mt-4 rounded-full font-semibold transition ${
                    plan.highlight
                      ? "bg-gradient-to-r from-blue-800 to-blue-400 text-white hover:from-blue-400 hover:to-blue-800"
                      : "bg-gradient-to-r from-gray-800 to-gray-400  text-black hover:from-gray-400 hover:to-gray-800"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
