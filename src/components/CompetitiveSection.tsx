'use client';
import { useLLMModal } from "./LLMModalProvider";
import { SparklesIcon } from "@heroicons/react/24/solid";

const competitors = [
  {
    name: "Salesforce (Einstein AI)",
    focus: "Integrated CRM with AI for predictive lead scoring, opportunity insights, and automated lead assignment. Strong in data ingestion (CRM) and predictive modeling.",
  },
  {
    name: "HubSpot",
    focus: "All-in-one inbound marketing & sales platform with AI for lead generation, chat, and customizable scoring. Good for data ingestion, segmentation, and automated execution.",
  },
  {
    name: "Marketo Engage",
    focus: "Advanced marketing automation for B2B with powerful lead management, segmentation, and analytics. Excels in lead scoring and complex nurturing workflows.",
  },
  {
    name: "Apollo.io",
    focus: "Robust AI prospecting, integrating vast data sources for lead finding and sales engagement. Strong in data ingestion (third-party) and prospect identification.",
  },
  {
    name: "Reply.io",
    focus: "AI-powered sales engagement platform for automated, personalized multi-channel outreach and lead nurturing. Strong in automated execution and adaptive learning.",
  },
  {
    name: "Assistents.ai",
    focus: "Platform for building custom AI agents for marketing (lead scoring, ad optimization) with no-code tools. High potential for custom agentic components across all phases.",
  },
];

export default function CompetitiveSection() {
  const { openModal } = useLLMModal();
  return (
    <section id="competitive" className="py-20 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center section-title mb-4 text-black">Competitive Landscape</h2>
      <p className="text-lg text-stone-600 text-center max-w-3xl mx-auto mb-12">We&apos;ve analyzed leading AI marketing platforms and specialized tools. While many automate parts, our solution aims for true, end-to-end agentic autonomy. Click &quot;Generate Insight ✨&quot; for an AI-powered overview of each competitor.</p>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {competitors.map((c) => (
          <div key={c.name} className="card bg-white p-6 rounded-xl shadow flex flex-col justify-between hover:shadow-lg transition-transform">
            <div>
              <h3 className="font-bold text-xl text-purple-700 mb-2 text-black">{c.name}</h3>
              <p className="text-sm text-stone-600">{c.focus}</p>
            </div>
            <button
              className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 flex items-center justify-center gap-2"
              onClick={() => openModal({
                title: `Insight: ${c.name}`,
                prompt: `Provide a concise, 2-3 sentence strategic insight about ${c.name} in the context of agentic AI marketing solutions, highlighting their strengths or a key differentiator.`
              })}
            >
              <SparklesIcon className="w-5 h-5" /> Generate Insight ✨
            </button>
          </div>
        ))}
      </div>
      <p className="text-lg text-stone-600 max-w-3xl mx-auto mt-8">While these tools offer significant automation, our vision is a solution that fully integrates the &apos;observe, plan, act, reflect&apos; loop for true self-optimization, going beyond siloed functionalities.</p>
    </section>
  );
}
