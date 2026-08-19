'use client';
import { SparklesIcon, CheckCircleIcon, ChartBarIcon, CloudArrowUpIcon, UserGroupIcon, ArrowTrendingUpIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import jsPDF from "jspdf";
import { useLLMModal } from "./LLMModalProvider";
import IntrigueLoader from "./IntrigueLoader";

const cards = [
  { icon: CheckCircleIcon, title: "Unlock True Automation", desc: "Move beyond rule-based systems to adaptive, intelligent growth." },
  { icon: ChartBarIcon, title: "Demonstrable ROI", desc: "Prototype will show clear improvements in key marketing KPIs." },
  { icon: CloudArrowUpIcon, title: "Leverage Existing Stack", desc: "Built upon a robust, modern marketing tech stack." },
  { icon: UserGroupIcon, title: "Expertise-Driven", desc: "Backed by in-house Python AI/ML talent." },
  { icon: ArrowTrendingUpIcon, title: "Scalable Architecture", desc: "Designed for future expansion on Google Cloud Platform." },
  { icon: SparklesIcon, title: "Address Market Need", desc: "Meet growing demand for intelligent marketing solutions." },
];

const ASK_LOW = 2000000;
const ASK_HIGH = 5000000;
const ASK_LABEL = `$${ASK_LOW.toLocaleString()} – $${ASK_HIGH.toLocaleString()}`;

const uses = [
  { share: "35%", label: "ML / agentic engine", detail: "Propensity, look-alike, and the decide-then-act loop" },
  { share: "30%", label: "Data foundation", detail: "BigQuery unification from HubSpot, Apollo, Ads, GA4" },
  { share: "20%", label: "Activation & integration", detail: "Google Ads / DV360 audiences, bids, and feedback" },
  { share: "15%", label: "Infra + contingency", detail: "GCP runtime and a 15% buffer on the prototype" },
];

function pitchPrompt() {
  return `Draft a seed pitch summary for Express Analytics.

Ask: ${ASK_LABEL} seed to build and refine an agentic AI prototype for prospect marketing in 4–6 months.
Loop: observe, plan, act, reflect.
Stack: HubSpot, Apollo.io, Google Ads, GA4 → BigQuery / Vertex AI / Python ML → Google Ads API, DV360, Looker Studio.
Team: in-house Python AI/ML. No greenfield stack rebuild.
Phases: (1) data unification, (2) models + decision engine, (3) activation + first feedback loop.
Competitors: Salesforce Einstein, HubSpot, Marketo, Apollo.io, Reply.io, Assistents.ai — they automate slices; we close the loop.
Use of funds: 35% ML/agent, 30% data, 20% activation, 15% infra + contingency.

Write this structure, tight and specific:
**The ask** — one line with the dollar range and what it buys
**The problem** — two sentences
**The product** — two sentences on the agentic loop
**Why now / why us** — two sentences
**Use of funds** — four bullets
**12-month proof** — two measurable outcomes the prototype must show`;
}

export default function InvestmentSection() {
  const { generateText } = useLLMModal();
  const [summary, setSummary] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDraftSummary = async () => {
    setLoading(true);
    setError(null);
    setShowModal(true);
    setSummary(null);
    try {
      setSummary(await generateText(pitchPrompt()));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not draft the pitch summary.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!summary) return;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Agentic AI Pitch Summary", 10, 20);
    doc.setFontSize(12);
    doc.text(summary, 10, 35, { maxWidth: 180 });
    doc.save("Agentic_AI_Pitch_Summary.pdf");
  };

  return (
    <section id="investment" className="py-10 md:py-20 px-2 sm:px-4 text-center bg-white w-full overflow-x-hidden">
      <h2 className="text-3xl md:text-4xl font-bold section-title mb-4 text-black">Why Invest In Us?</h2>
      <p className="text-base sm:text-lg text-stone-600 text-center max-w-3xl mx-auto mb-12 px-2">
        Seed capital funds a working observe-plan-act-reflect prototype on the stack we already run. Draft a pitch summary when you want the ask in investor language.
      </p>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 my-10 md:my-12">
        {cards.map((c) => (
          <div key={c.title} className="card bg-white p-4 sm:p-6 rounded-xl shadow flex flex-col items-center hover:shadow-lg transition-transform">
            <c.icon className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600 mb-2" />
            <h3 className="font-bold text-base sm:text-lg mb-2 text-black">{c.title}</h3>
            <p className="text-stone-600 text-sm sm:text-base">{c.desc}</p>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto rounded-2xl bg-stone-50 border border-stone-200 p-1.5 text-left">
        <div className="rounded-[14px] bg-white p-6 sm:p-10 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-purple-700 font-semibold">Seed ask</p>
          <p className="text-sm sm:text-base text-stone-500 mt-3">Seeking</p>
          <p className="text-3xl sm:text-5xl font-bold text-purple-700 tracking-tight my-2">{ASK_LABEL}</p>
          <p className="text-base sm:text-lg text-stone-700 max-w-2xl">
            in seed funding to develop and refine the Agentic AI prototype — a 4–6 month build that unifies data, scores prospects, activates media, and learns from results.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {uses.map((item) => (
              <div key={item.label} className="rounded-xl border border-stone-200 p-4">
                <p className="text-2xl font-bold text-purple-700">{item.share}</p>
                <p className="font-semibold text-black mt-1">{item.label}</p>
                <p className="text-sm text-stone-600 mt-1">{item.detail}</p>
              </div>
            ))}
          </div>

          <button
            className="mt-8 bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 active:scale-[0.98] inline-flex items-center gap-2 text-sm sm:text-base disabled:opacity-60"
            onClick={handleDraftSummary}
            disabled={loading}
          >
            <SparklesIcon className="w-5 h-5" />
            {loading ? <IntrigueLoader compact /> : 'Draft Pitch Summary'}
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-lg w-full relative text-left">
            <button
              className="absolute top-2 right-2 text-black hover:text-purple-700"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-black pr-8">Pitch Summary</h2>
            {loading && <IntrigueLoader />}
            {error && <p className="text-red-600 mb-4">{error}</p>}
            {summary && <pre className="whitespace-pre-wrap text-black mb-6 text-sm leading-relaxed">{summary}</pre>}
            {summary && (
              <button
                className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
                onClick={handleDownloadPDF}
              >
                Download as PDF
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
