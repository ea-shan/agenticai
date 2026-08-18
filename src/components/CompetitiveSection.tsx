'use client';
import { useLLMModal } from "./LLMModalProvider";
import { SparklesIcon } from "@heroicons/react/24/solid";

const OUR_EDGE =
  "Express Analytics is building a closed observe-plan-act-reflect loop: unify HubSpot/Apollo/GMP/GA4 data in BigQuery, score and segment with Python ML/Vertex AI, activate in Google Ads/DV360, then feed results back for self-optimization. We are not a siloed CRM, MAP, or sequencer.";

const competitors = [
  {
    name: "Salesforce (Einstein AI)",
    category: "CRM + predictive AI",
    focus: "Integrated CRM with AI for predictive lead scoring, opportunity insights, and automated lead assignment. Strong in data ingestion (CRM) and predictive modeling.",
    gap: "Scores inside the CRM. Does not own the full media-activation and reflection loop.",
  },
  {
    name: "HubSpot",
    category: "Inbound suite",
    focus: "All-in-one inbound marketing & sales platform with AI for lead generation, chat, and customizable scoring. Good for data ingestion, segmentation, and automated execution.",
    gap: "Workflow automation, not an autonomous agent that reallocates spend from outcomes.",
  },
  {
    name: "Marketo Engage",
    category: "B2B marketing automation",
    focus: "Advanced marketing automation for B2B with powerful lead management, segmentation, and analytics. Excels in lead scoring and complex nurturing workflows.",
    gap: "Rules and journeys. Weak on live prospecting data and closed-loop bid/audience action.",
  },
  {
    name: "Apollo.io",
    category: "Prospecting data",
    focus: "Robust AI prospecting, integrating vast data sources for lead finding and sales engagement. Strong in data ingestion (third-party) and prospect identification.",
    gap: "Finds contacts. Does not unify first-party performance data or optimize media.",
  },
  {
    name: "Reply.io",
    category: "Sales engagement",
    focus: "AI-powered sales engagement platform for automated, personalized multi-channel outreach and lead nurturing. Strong in automated execution and adaptive learning.",
    gap: "Outbound sequences only. No propensity modeling across ads, web, and CRM.",
  },
  {
    name: "Assistents.ai",
    category: "No-code agents",
    focus: "Platform for building custom AI agents for marketing (lead scoring, ad optimization) with no-code tools. High potential for custom agentic components across all phases.",
    gap: "Toolkit, not a production agent wired to this stack and this ICP.",
  },
];

function insightPrompt(c: (typeof competitors)[number]) {
  return `Compare ${c.name} to our agentic AI for prospect marketing.

Competitor focus: ${c.focus}
Known gap: ${c.gap}

Our wedge: ${OUR_EDGE}

Write exactly four short labeled lines:
**Positioning** — what ${c.name} is, in one sentence
**Strength** — the capability investors should respect
**Gap** — where they stop short of end-to-end agentic autonomy
**Our wedge** — why Express Analytics still wins this deal`;
}

export default function CompetitiveSection() {
  const { openModal } = useLLMModal();
  return (
    <section id="competitive" className="py-10 md:py-20 px-2 sm:px-4 bg-white w-full overflow-x-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-center section-title mb-4 text-black">Competitive Landscape</h2>
      <p className="text-base sm:text-lg text-stone-600 text-center max-w-3xl mx-auto mb-12 px-2">
        Leading platforms automate a slice of the funnel. Ours is built to run the full observe, plan, act, reflect loop. Generate an insight on any competitor to see the wedge in writing.
      </p>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {competitors.map((c) => (
          <div key={c.name} className="card bg-white p-4 sm:p-6 rounded-xl shadow flex flex-col justify-between hover:shadow-lg transition-transform">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-purple-600 font-semibold mb-2">{c.category}</p>
              <h3 className="font-bold text-lg sm:text-xl text-purple-700 mb-2 text-black">{c.name}</h3>
              <p className="text-xs sm:text-sm text-stone-600">{c.focus}</p>
              <p className="mt-3 text-xs sm:text-sm text-stone-800 border-l-2 border-purple-300 pl-3">
                <span className="font-semibold text-purple-700">Gap: </span>{c.gap}
              </p>
            </div>
            <button
              className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 active:scale-[0.98] flex items-center justify-center gap-2 text-sm sm:text-base"
              onClick={() => openModal({
                title: `Insight: ${c.name}`,
                prompt: insightPrompt(c),
              })}
            >
              <SparklesIcon className="w-5 h-5" /> Generate Insight
            </button>
          </div>
        ))}
      </div>
      <div className="max-w-3xl mx-auto mt-10 rounded-xl bg-stone-50 border border-stone-200 p-5 sm:p-6">
        <p className="text-sm uppercase tracking-[0.16em] text-purple-700 font-semibold mb-2">Where we win</p>
        <p className="text-base sm:text-lg text-stone-700">{OUR_EDGE}</p>
      </div>
    </section>
  );
}
