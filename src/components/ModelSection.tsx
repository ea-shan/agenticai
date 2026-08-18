'use client';

import { KeyboardEvent, useState } from 'react';
import { CircleStackIcon, AcademicCapIcon, CursorArrowRaysIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const tabData = [
  {
    short: 'Unify',
    stage: 'Observe',
    label: 'Data Ingestion & Unification',
    icon: CircleStackIcon,
    summary: 'One prospect graph instead of four dashboards.',
    content: [
      { title: 'Objective', text: 'Collect and centralize prospect data into a single, analysis-ready source.' },
      { title: 'Sources', text: 'HubSpot, Google Ads, GA4, Apollo.io, SemRush, first-party and Google Platform data.' },
      { title: 'Tools', text: 'BigQuery, Cloud Storage, GTM / GA4 Measurement Protocol, custom ETL connectors.' },
    ],
  },
  {
    short: 'Decide',
    stage: 'Plan',
    label: 'Prospect Identification',
    icon: AcademicCapIcon,
    summary: 'The brain that names who to pursue next.',
    content: [
      { title: 'Objective', text: 'Identify ideal prospects, find look-alikes, and rank them by likelihood to convert.' },
      { title: 'Processes', text: 'Feature engineering, propensity scoring, look-alike modeling, next-best-action.' },
      { title: 'Tools', text: 'Python ML, Vertex AI, BigQuery ML.' },
    ],
  },
  {
    short: 'Activate',
    stage: 'Act',
    label: 'Targeting & Activation',
    icon: CursorArrowRaysIcon,
    summary: 'Decisions leave the notebook and hit the media APIs.',
    content: [
      { title: 'Objective', text: 'Reach scored prospects with personalized offers across Google Marketing Platform.' },
      { title: 'Processes', text: 'Audience activation, automated bids, dynamic creative, cross-channel orchestration.' },
      { title: 'Tools', text: 'Google Ads API, DV360 API, GA4 audience linking.' },
    ],
  },
  {
    short: 'Learn',
    stage: 'Reflect',
    label: 'Monitoring & Reflection',
    icon: ChartBarIcon,
    summary: 'Outcomes write the next plan. The loop closes.',
    content: [
      { title: 'Objective', text: 'Measure impact against goals and feed results back into scoring and spend.' },
      { title: 'Processes', text: 'KPI tracking, attribution, reinforcement learning, anomaly detection.' },
      { title: 'Tools', text: 'GA4, Looker Studio, BigQuery, Cloud Functions / Cloud Run.' },
    ],
  },
];

export default function ModelSection() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = tabData[activeTab];
  const featured = tab.content[0];
  const rest = tab.content.slice(1);

  const onTabKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveTab((i) => (i + 1) % tabData.length);
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveTab((i) => (i - 1 + tabData.length) % tabData.length);
    }
    if (event.key === 'Home') {
      event.preventDefault();
      setActiveTab(0);
    }
    if (event.key === 'End') {
      event.preventDefault();
      setActiveTab(tabData.length - 1);
    }
  };

  return (
    <section id="model" className="w-full scroll-mt-28 overflow-x-hidden bg-stone-50 px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-700">The loop, in systems</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-stone-900 md:text-5xl">
            The Agentic Model: Deep Dive
          </h2>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-stone-600 sm:text-lg">
            Four components, one closed circuit. Each stage names the job, the process, and the stack that already sits in-house.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
          <div
            role="tablist"
            aria-label="Agentic model stages"
            onKeyDown={onTabKey}
            className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible"
          >
            {tabData.map((item, idx) => {
              const on = activeTab === idx;
              return (
                <button
                  key={item.label}
                  type="button"
                  role="tab"
                  id={`model-tab-${idx}`}
                  aria-selected={on}
                  aria-controls={`model-panel-${idx}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActiveTab(idx)}
                  className={`min-h-11 min-w-[11rem] cursor-pointer rounded-2xl border px-4 py-3 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 lg:min-w-0 ${on ? 'border-violet-300 bg-white text-stone-900 shadow-[0_16px_32px_-20px_rgba(28,25,23,0.25)]' : 'border-transparent bg-transparent text-stone-600 hover:bg-white/70'}`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`font-mono text-xs ${on ? 'text-violet-700' : 'text-stone-400'}`}>0{idx + 1}</span>
                    <item.icon className={`h-5 w-5 ${on ? 'text-violet-700' : 'text-stone-400'}`} />
                    <span className="text-sm font-semibold">{item.short}</span>
                    <span className="ml-auto hidden text-[10px] uppercase tracking-[0.16em] text-violet-600 lg:inline">{item.stage}</span>
                  </span>
                  <span className="mt-1 hidden text-xs leading-relaxed text-stone-500 lg:block">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`model-panel-${activeTab}`}
            aria-labelledby={`model-tab-${activeTab}`}
            className="rounded-[1.6rem] border border-stone-200/80 bg-white p-2"
          >
            <div className="rounded-[1.25rem] bg-stone-50 p-5 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-700">
                {tab.stage} · 0{activeTab + 1}
              </p>
              <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">{tab.label}</h3>
              <p className="mt-2 text-base text-stone-600">{tab.summary}</p>

              <article className="mt-6 rounded-2xl bg-white p-5 sm:p-6">
                <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-violet-700">{featured.title}</h4>
                <p className="mt-2 text-lg leading-relaxed text-stone-800">{featured.text}</p>
              </article>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {rest.map((item) => (
                  <article key={item.title} className="rounded-2xl bg-white p-5">
                    <h4 className="text-sm font-semibold text-stone-900">{item.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
