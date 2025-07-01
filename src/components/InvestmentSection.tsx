'use client';
// import { useLLMModal } from "./LLMModalProvider";
import { SparklesIcon, CheckCircleIcon, ChartBarIcon, CloudArrowUpIcon, UserGroupIcon, ArrowTrendingUpIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import jsPDF from "jspdf";

const cards = [
  { icon: CheckCircleIcon, title: "Unlock True Automation", desc: "Move beyond rule-based systems to adaptive, intelligent growth." },
  { icon: ChartBarIcon, title: "Demonstrable ROI", desc: "Prototype will show clear improvements in key marketing KPIs." },
  { icon: CloudArrowUpIcon, title: "Leverage Existing Stack", desc: "Built upon a robust, modern marketing tech stack." },
  { icon: UserGroupIcon, title: "Expertise-Driven", desc: "Backed by in-house Python AI/ML talent." },
  { icon: ArrowTrendingUpIcon, title: "Scalable Architecture", desc: "Designed for future expansion on Google Cloud Platform." },
  { icon: SparklesIcon, title: "Address Market Need", desc: "Meet growing demand for intelligent marketing solutions." },
];

export default function InvestmentSection() {
  const [summary, setSummary] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Dummy values for months and pm; replace with context or props if needed
  const months = 4;
  const pm = false;
  const costLow = 160510;
  const costHigh = 449900;

  const handleDraftSummary = () => {
    // This would be replaced by actual LLM or context-driven summary
    const pitch = `Agentic AI for Prospect Marketing\n\nOur vision is to build an agentic AI for prospect marketing that observes, plans, acts, and reflects autonomously.\n\nPrototype Timeline: ${months} months${pm ? ' (with Project Manager)' : ''}\nEstimated Cost: $${costLow.toLocaleString()} - $${costHigh.toLocaleString()}\n\nWe are seeking seed funding to unlock true automation, demonstrate ROI, leverage existing stack, and address a critical market need for scalable, expertise-driven agentic solutions.`;
    setSummary(pitch);
    setShowModal(true);
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
      <p className="text-base sm:text-lg text-stone-600 text-center max-w-3xl mx-auto mb-12 px-2">Our agentic AI solution represents the future of marketing, delivering unparalleled efficiency and growth. Click &quot;Draft Pitch Summary &quot; for an AI-generated concise overview of our value proposition.</p>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 my-10 md:my-12">
        {cards.map((c) => (
          <div key={c.title} className="card bg-white p-4 sm:p-6 rounded-xl shadow flex flex-col items-center hover:shadow-lg transition-transform">
            <c.icon className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600 mb-2" />
            <h3 className="font-bold text-base sm:text-lg mb-2 text-black">{c.title}</h3>
            <p className="text-stone-600 text-sm sm:text-base">{c.desc}</p>
          </div>
        ))}
      </div>
      <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg inline-block">
        <p className="text-base sm:text-lg text-stone-600">Seeking</p>
        <p className="text-2xl sm:text-4xl font-bold text-purple-700 my-2">[X Amount]</p>
        <p className="text-base sm:text-lg text-stone-600">in Seed Funding to develop and refine the Agentic AI Prototype.</p>
        <button
          className="mt-6 bg-purple-600 text-white py-2 px-6 rounded-md hover:bg-purple-700 flex items-center gap-2 text-sm sm:text-base"
          onClick={handleDraftSummary}
        >
          <SparklesIcon className="w-5 h-5" /> Draft Pitch Summary
        </button>
      </div>
      {showModal && summary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-black hover:text-purple-700"
              onClick={() => setShowModal(false)}
              aria-label='Close'
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-black">Pitch Summary</h2>
            <pre className="whitespace-pre-wrap text-black mb-6">{summary}</pre>
            <button
              className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
              onClick={handleDownloadPDF}
            >
              Download as PDF
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
