"use client";
import { useState } from "react";
import { EyeIcon, LightBulbIcon, RocketLaunchIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

const steps = [
  {
    label: "Perception",
    icon: EyeIcon,
    details: "GA4 tracks pricing page visits. CRM identifies converted customer traits. Google Ads shows high-performing queries.",
  },
  {
    label: "Planning (ML Agent)",
    icon: LightBulbIcon,
    details: "Look-alike & Propensity models run. Decision Engine determines actions like targeting specific ads to high-intent users.",
  },
  {
    label: "Action (GMP Integration)",
    icon: RocketLaunchIcon,
    details: "Audiences are pushed to Google Ads, bids are increased, dynamic creatives are served, and budget is reallocated automatically.",
  },
  {
    label: "Reflection",
    icon: ArrowPathIcon,
    details: "Monitors CPA, conversion rates, and lead quality. Learns from performance to adjust strategy and retrain models over time.",
  },
];

export default function WorkflowSection() {
  const [active, setActive] = useState(0);
  return (
    <section id="workflow" className="py-10 md:py-20 px-2 sm:px-4 bg-white w-full overflow-x-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-center section-title mb-4 text-black">Interactive Workflow Example</h2>
      <p className="text-base sm:text-lg text-black text-center max-w-3xl mx-auto mb-12 px-2">See how the agent works in a real-world scenario for generating SaaS B2B leads. Click each step to see the details of the &apos;Observe, Plan, Act, Reflect&apos; cycle in action.</p>
      <div className="max-w-3xl mx-auto space-y-4">
        {steps.map((step, idx) => (
          <div
            key={step.label}
            className={`workflow-step p-4 sm:p-6 rounded-r-lg cursor-pointer flex items-center gap-3 sm:gap-4 border-l-4 transition-all ${active === idx ? "border-purple-700 bg-white shadow-lg" : "border-stone-300 bg-white hover:bg-purple-50"}`}
            onClick={() => setActive(idx)}
          >
            <step.icon className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" />
            <div>
              <h4 className="font-bold text-base sm:text-xl mb-1 sm:mb-2 text-black">{idx + 1}. {step.label}</h4>
              <p className="text-black text-sm sm:text-base">{step.details}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
