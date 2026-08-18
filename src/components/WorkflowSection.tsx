'use client';

import { useEffect, useState } from 'react';
import { EyeIcon, LightBulbIcon, RocketLaunchIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

const steps = [
  {
    id: 'observe',
    stage: 'Observe',
    label: 'Perception',
    icon: EyeIcon,
    signal: '412 pricing-page sessions this week. 38 of those accounts already sit in HubSpot.',
    decision: 'Keep first-party intent. Drop cold traffic that never hits pricing.',
    output: 'Unified visit + CRM + query graph in BigQuery.',
    systems: 'GA4 · HubSpot · Google Ads',
  },
  {
    id: 'plan',
    stage: 'Plan',
    label: 'ML Agent',
    icon: LightBulbIcon,
    signal: 'Those 38 accounts share three traits with last-quarter closed-won deals.',
    decision: 'Build a look-alike set and raise bids only on high-propensity queries.',
    output: 'Ranked audience + next-best-action for each cluster.',
    systems: 'Vertex AI · BigQuery ML · Python',
  },
  {
    id: 'act',
    stage: 'Act',
    label: 'GMP Activation',
    icon: RocketLaunchIcon,
    signal: 'Audience of 1,140 look-alikes is ready. Three creatives match the cluster.',
    decision: 'Push the list, lift bids on high-intent terms, hold spend elsewhere.',
    output: 'Live Ads + DV360 audiences, bids, and dynamic creative.',
    systems: 'Google Ads API · DV360 · GA4 audiences',
  },
  {
    id: 'reflect',
    stage: 'Reflect',
    label: 'Feedback',
    icon: ArrowPathIcon,
    signal: 'CPA is $47.20 vs $61.80 last week. Two segments underperformed.',
    decision: 'Retrain the propensity cut. Starve the weak segments. Feed winners back.',
    output: 'Updated scores and a new plan for the next loop.',
    systems: 'Looker Studio · BigQuery · Cloud Run',
  },
];

export default function WorkflowSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const step = steps[active];

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % steps.length), 3200);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section id="workflow" className="w-full scroll-mt-28 overflow-x-hidden bg-white px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-700">One live run</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-stone-900 md:text-5xl">
            Interactive Workflow
          </h2>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-stone-600 sm:text-lg">
            Mid-market SaaS, this week. The agent reads intent, decides who is worth the bid, acts in GMP, then writes the result back into the model.
          </p>
        </div>

        <div
          className="mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative grid grid-cols-1 gap-0 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
            {steps.map((item, idx) => {
              const on = active === idx;
              const Icon = item.icon;
              return (
                <div key={item.id} className="contents">
                  <button
                    type="button"
                    onClick={() => setActive(idx)}
                    className={`relative z-10 flex min-h-11 w-full cursor-pointer flex-col items-start rounded-2xl border px-4 py-4 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 md:items-center md:text-center ${on ? 'border-violet-300 bg-violet-50 shadow-[0_16px_32px_-20px_rgba(28,25,23,0.28)]' : 'border-stone-200 bg-white hover:border-violet-200'}`}
                    aria-current={on ? 'step' : undefined}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`flex h-9 w-9 items-center justify-center rounded-full ${on ? 'bg-violet-700 text-white' : 'bg-stone-100 text-violet-700'}`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-xs text-violet-700">0{idx + 1}</span>
                    </span>
                    <span className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-700">{item.stage}</span>
                    <span className="mt-1 font-heading text-base font-semibold text-stone-900">{item.label}</span>
                  </button>
                  {idx < steps.length - 1 && (
                    <div className="flex items-center justify-center py-2 md:px-1" aria-hidden>
                      <span className={`workflow-arrow h-8 w-px md:h-px md:w-8 ${on ? 'bg-violet-400' : 'bg-stone-300'}`} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <p className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-stone-500">
            <span className="h-px flex-1 bg-stone-200" />
            Reflect writes back into Observe
            <span className="h-px flex-1 bg-stone-200" />
          </p>

          <article className="mt-6 rounded-[1.6rem] border border-stone-200/80 bg-stone-50 p-2">
            <div className="rounded-[1.25rem] bg-white p-5 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-700">
                {step.stage} · 0{active + 1}
              </p>
              <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-stone-900">{step.label}</h3>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-stone-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-700">Sees</p>
                  <p className="mt-2 text-sm leading-relaxed text-stone-700">{step.signal}</p>
                </div>
                <div className="rounded-2xl bg-stone-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-700">Decides</p>
                  <p className="mt-2 text-sm leading-relaxed text-stone-700">{step.decision}</p>
                </div>
                <div className="rounded-2xl bg-stone-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-700">Writes</p>
                  <p className="mt-2 text-sm leading-relaxed text-stone-700">{step.output}</p>
                </div>
              </div>
              <p className="mt-5 text-sm text-stone-500">{step.systems}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
