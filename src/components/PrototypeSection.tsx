"use client";
import { useState } from "react";
import { useLLMModal } from "./LLMModalProvider";
import dynamic from "next/dynamic";
import { SparklesIcon } from "@heroicons/react/24/solid";

const phases = [
  {
    title: "Phase 1: Data Unification & Foundation",
    months: "1.5 - 2",
    details: "Centralize and clean data in BigQuery for ML readiness. Design BigQuery schema, set up automated ETL from HubSpot, Apollo.io, Google Ads, GA4, initial data cleaning and feature engineering.",
  },
  {
    title: "Phase 2: ML Model Development & Agentic Logic",
    months: "1.5 - 2",
    details: "Build core predictive models and the initial decision engine. Develop and train propensity scoring & look-alike models using Python ML/Vertex AI, design 'decision engine' logic to translate predictions into actions.",
  },
  {
    title: "Phase 3: Integration, Automation & Initial Feedback Loop",
    months: "1 - 2",
    details: "Connect the 'brain' to GMP for automated action and basic performance monitoring. Develop Google Ads API scripts (audience upload, bid adjustments), set up Looker Studio dashboards, implement initial feedback mechanisms for performance data.",
  },
];

const Chart = dynamic(() => import("./PrototypeSectionChart"), { ssr: false });

export default function PrototypeSection() {
  const { openModal } = useLLMModal();
  const [months, setMonths] = useState(4);
  const [pm, setPm] = useState(false);
  return (
    <section id="prototype" className="py-20 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center section-title mb-4 text-black">Prototype Plan & Costs</h2>
      <p className="text-lg text-black text-center max-w-3xl mx-auto mb-12">Our high-feasibility plan leverages our existing strengths to deliver a working prototype in 4-6 months. Explore the development timeline and interact with the cost model below, seeing how we&apos;ll demonstrate the core agentic loop. Click &quot;Explain Phase ✨&quot; for an AI-powered deep dive into each stage.</p>
      <div className="my-16">
        <h3 className="text-2xl font-bold text-center mb-8 text-black">Development Timeline</h3>
        <div className="relative max-w-4xl mx-auto border-l-2 border-purple-300 pl-8 py-4">
          {phases.map((phase) => (
            <div key={phase.title} className="timeline-item mb-12 relative pr-4">
              <h4 className="font-bold text-xl text-black">{phase.title}</h4>
              <p className="font-medium text-black">Months: {phase.months}</p>
              <ul className="list-disc list-inside text-black mt-2">
                <li>{phase.details}</li>
              </ul>
              <button
                className="mt-4 bg-purple-600 text-white py-1 px-3 rounded-md hover:bg-purple-700 flex items-center gap-2 text-black"
                onClick={() => openModal({
                  title: `Deep Dive: ${phase.title}`,
                  prompt: `Explain the following prototype phase in more detail, focusing on its significance and expected outcomes for an agentic AI marketing solution: &quot;${phase.title}. ${phase.details}&quot;.`
                })}
              >
                <SparklesIcon className="w-5 h-5 text-black" /> Explain Phase ✨
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="card bg-white p-8 mt-16 rounded-xl shadow">
        <h3 className="text-2xl font-bold text-center mb-8 text-black">Interactive Cost Estimator</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <Chart months={months} pm={pm} />
          </div>
          <div className="space-y-6">
            <div>
              <label htmlFor="timelineSlider" className="block font-medium mb-2 text-black">Project Duration: <span className="font-bold text-purple-700">{months}</span> months</label>
              <input id="timelineSlider" type="range" min={4} max={6} value={months} onChange={e => setMonths(Number(e.target.value))} className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer" />
            </div>
            <div className="flex items-center">
              <input id="pmToggle" type="checkbox" checked={pm} onChange={e => setPm(e.target.checked)} className="h-4 w-4 text-purple-600 border-stone-300 rounded focus:ring-purple-500" />
              <label htmlFor="pmToggle" className="ml-3 block text-sm font-medium text-black">Include Project Manager (0.5 FTE)</label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
