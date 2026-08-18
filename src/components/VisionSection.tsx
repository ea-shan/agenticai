'use client';

import HeroBackdrop from './HeroBackdrop';
import AgentOrbit from './AgentOrbit';

export default function VisionSection() {
  return (
    <section
      id="vision"
      className="relative isolate w-full overflow-x-hidden min-h-[100dvh] scroll-mt-28 px-4 sm:px-6"
    >
      <HeroBackdrop />
      <div className="mx-auto grid min-h-[100dvh] max-w-7xl items-center gap-10 py-28 md:py-32 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
        <div className="text-left">
          <p className="inline-flex rounded-full border border-violet-200 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-700">
            Observe · Plan · Act · Reflect
          </p>
          <h1 className="mt-5 max-w-[16ch] font-heading text-4xl font-semibold leading-none tracking-tighter text-stone-900 sm:text-5xl md:text-6xl">
            Autonomous growth for prospect marketing
          </h1>
          <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-stone-600 sm:text-lg">
            An agent that unifies the stack, decides the next action, executes in Google Marketing Platform, and learns from the result. Not another rules engine.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {['HubSpot + Apollo', 'BigQuery / Vertex', 'Google Ads + DV360'].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-stone-200 bg-white/80 px-3 py-1.5 text-sm text-stone-700"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
        <AgentOrbit />
      </div>
    </section>
  );
}
