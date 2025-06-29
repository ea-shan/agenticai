'use client';
import { useState, useRef } from "react";
import { CircleStackIcon } from '@heroicons/react/24/outline';
import { AcademicCapIcon as BrainIcon } from '@heroicons/react/24/outline';
import { CursorArrowRaysIcon } from '@heroicons/react/24/outline';
import { ChartBarIcon } from '@heroicons/react/24/outline';

const tabData = [
  {
    label: "Data Ingestion & Unification",
    icon: CircleStackIcon,
    content: [
      { title: "Objective", text: "Collect and centralize all relevant prospect data into a single, unified source for comprehensive analysis." },
      { title: "Sources", text: "HubSpot, Google Ads, GA4, Apollo.io, SemRush, first-party & Google Platform data." },
      { title: "Tools", text: "Google Cloud Storage / BigQuery, GTM / GA4 Measurement Protocol, custom ETL scripts/connectors." },
    ],
  },
  {
    label: "Prospect Identification (The Brain)",
    icon: BrainIcon,
    content: [
      { title: "Objective", text: "Understand who ideal prospects are, proactively identify new ones, and segment them based on their likelihood to convert." },
      { title: "Processes", text: "Feature Engineering, Predictive Modeling (Look-alike, Propensity Scoring), Next Best Action Recommendation." },
      { title: "Tools", text: "Python ML, Vertex AI, BigQuery ML." },
    ],
  },
  {
    label: "Intelligent Targeting & Activation",
    icon: CursorArrowRaysIcon,
    content: [
      { title: "Objective", text: "Reach identified prospects with highly personalized messages and offers across the Google Marketing Platform." },
      { title: "Processes", text: "Audience Activation, Automated Bid Management, Dynamic Creative Optimization, Cross-Channel Orchestration." },
      { title: "Tools", text: "Google Ads API, DV360 API, GA4 audience linking." },
    ],
  },
  {
    label: "Performance Monitoring & Reflection",
    icon: ChartBarIcon,
    content: [
      { title: "Objective", text: "Continuously measure the impact of actions, evaluate performance against goals, and feed insights back for ongoing optimization and learning." },
      { title: "Processes", text: "Real-time Tracking of KPIs, Attribution Modeling, Reinforcement Learning, Anomaly Detection." },
      { title: "Tools", text: "GA4, Looker Studio, BigQuery, Cloud Functions / Cloud Run." },
    ],
  },
];

export default function ModelSection() {
  const [activeTab, setActiveTab] = useState(0);
  const tabCount = tabData.length;
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <section id="model" className="py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center section-title mb-4 text-black">The Agentic Model: Deep Dive</h2>
      <p className="text-lg text-stone-600 text-center max-w-3xl mx-auto mb-12">Our model is comprised of four interconnected components that form a continuous loop of learning and optimization. Explore each component to understand its detailed role and the technologies involved.</p>
      <div className="max-w-5xl mx-auto">
        {/* Mobile: horizontally scrollable tabs */}
        <div className="overflow-x-auto whitespace-nowrap -mx-4 px-4 border-b border-stone-300 mb-8 scrollbar-hide md:hidden">
          {tabData.map((tab, idx) => (
            <button
              key={tab.label}
              className={`inline-block min-w-max tab flex items-center gap-2 px-6 py-4 font-bold text-lg border-b-4 transition-all duration-200 ${activeTab === idx ? "text-purple-700 border-purple-700" : "text-stone-700 border-transparent hover:text-purple-500"}`}
              onClick={() => setActiveTab(idx)}
            >
              <tab.icon className="w-6 h-6" />
              {tab.label}
            </button>
          ))}
        </div>
        {/* Desktop: regular flex row tabs */}
        <div className="hidden md:flex justify-center border-b border-stone-300 mb-8">
          {tabData.map((tab, idx) => (
            <button
              key={tab.label}
              className={`tab flex items-center gap-2 px-6 py-4 font-bold text-lg border-b-4 transition-all duration-200 ${activeTab === idx ? "text-purple-700 border-purple-700" : "text-stone-700 border-transparent hover:text-purple-500"}`}
              onClick={() => setActiveTab(idx)}
            >
              <tab.icon className="w-6 h-6" />
              {tab.label}
            </button>
          ))}
        </div>
        {/* Sliding tab content */}
        <div className="relative w-full overflow-hidden" style={{ minHeight: 220 }}>
          <div
            ref={contentRef}
            className="flex transition-transform duration-500"
            style={{
              width: `${tabCount * 100}%`,
              transform: `translateX(-${activeTab * (100 / tabCount)}%)`,
            }}
          >
            {tabData.map((tab, idx) => (
              <div
                key={tab.label}
                className="w-full flex-shrink-0 px-1"
                style={{ width: `calc(100% / ${tabCount})` }}
                aria-hidden={activeTab !== idx}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {tab.content.map((item) => (
                    <div key={item.title} className="card bg-white p-6 rounded-xl shadow hover:shadow-lg transition-transform">
                      <h4 className="font-bold text-lg text-purple-700 mb-3">{item.title}</h4>
                      <p className="text-stone-600">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


