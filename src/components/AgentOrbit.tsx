'use client';

import { useEffect, useState } from 'react';
import { EyeIcon, LightBulbIcon, RocketLaunchIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

const stages = [
  { label: 'Observe', icon: EyeIcon, tip: 'Gathers HubSpot, Apollo, Ads, and GA4 into one picture.' },
  { label: 'Plan', icon: LightBulbIcon, tip: 'Scores and segments prospects before a dollar moves.' },
  { label: 'Act', icon: RocketLaunchIcon, tip: 'Pushes audiences, bids, and creatives through GMP.' },
  { label: 'Reflect', icon: ArrowPathIcon, tip: 'Reads outcomes and writes the next decision.' },
];

const positions = [
  'left-1/2 top-0 -translate-x-1/2',
  'right-0 top-1/2 -translate-y-1/2',
  'left-1/2 bottom-0 -translate-x-1/2',
  'left-0 top-1/2 -translate-y-1/2',
];

const tipPos = [
  'top-full mt-2 left-1/2 -translate-x-1/2',
  'right-full mr-2 top-1/2 -translate-y-1/2',
  'bottom-full mb-2 left-1/2 -translate-x-1/2',
  'left-full ml-2 top-1/2 -translate-y-1/2',
];

export default function AgentOrbit() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % stages.length), 2200);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div
      className="relative mx-auto h-[340px] w-[90vw] max-w-xs sm:max-w-md md:h-[440px] md:w-[440px] md:max-w-none"
      onMouseLeave={() => setPaused(false)}
    >
      <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 440 440" fill="none" aria-hidden>
        <circle cx="220" cy="220" r="168" className="stroke-violet-200" strokeWidth="1.5" />
        <circle cx="220" cy="220" r="118" className="stroke-violet-100" strokeWidth="1" />
        <g className={paused ? '' : 'orbit-dash'}>
          <circle
            cx="220"
            cy="220"
            r="168"
            className="stroke-violet-500/70"
            strokeWidth="2"
            strokeDasharray="18 14"
          />
        </g>
      </svg>

      {stages.map((stage, idx) => {
        const Icon = stage.icon;
        const on = active === idx;
        return (
          <button
            key={stage.label}
            type="button"
            className={`absolute ${positions[idx]} flex flex-col items-center cursor-pointer rounded-xl px-2 py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600`}
            onMouseEnter={() => {
              setPaused(true);
              setActive(idx);
            }}
            onFocus={() => {
              setPaused(true);
              setActive(idx);
            }}
            aria-pressed={on}
          >
            <span className={`flex h-11 w-11 items-center justify-center rounded-full border transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] sm:h-12 sm:w-12 ${on ? 'border-violet-400 bg-white text-violet-700 scale-105' : 'border-stone-200 bg-white/80 text-violet-500'}`}>
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>
            <span className={`mt-1 text-sm font-semibold ${on ? 'text-stone-900' : 'text-stone-600'}`}>{stage.label}</span>
            {on && (
              <span className={`absolute ${tipPos[idx]} w-44 rounded-lg border border-violet-200 bg-white px-3 py-2 text-left text-xs leading-relaxed text-stone-700 shadow-[0_12px_30px_-18px_rgba(28,25,23,0.35)] sm:w-52`}>
                {stage.tip}
              </span>
            )}
          </button>
        );
      })}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-700 text-lg font-bold text-white shadow-[0_18px_40px_-18px_rgba(109,40,217,0.55)] sm:h-28 sm:w-28 sm:text-2xl md:h-32 md:w-32 md:text-3xl">
          Agent
        </div>
      </div>
    </div>
  );
}
