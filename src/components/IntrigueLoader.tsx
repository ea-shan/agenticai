'use client';

import { useEffect, useState } from 'react';

const LINES = [
  'Reading the prospect graph…',
  'Checking HubSpot against GA4…',
  'Scoring look-alikes in Vertex…',
  'Asking Nemotron for the wedge…',
  'Watching CPA come back from Ads…',
  'Pulling Apollo signals into BigQuery…',
  'Comparing this to Einstein and HubSpot…',
  'Drafting the next best action…',
  'Closing the observe-plan-act-reflect loop…',
  'Writing investor-ready copy…',
];

function pickLine(exclude?: string) {
  const pool = exclude ? LINES.filter((line) => line !== exclude) : LINES;
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function IntrigueLoader({ compact = false }: { compact?: boolean }) {
  const [line, setLine] = useState(() => pickLine());

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setLine((current) => pickLine(current)), 1600);
    return () => window.clearInterval(id);
  }, []);

  if (compact) {
    return <span aria-live="polite">{line}</span>;
  }

  return (
    <div className="flex min-h-[120px] flex-col items-center justify-center gap-4 py-6" role="status" aria-live="polite">
      <span className="inline-block h-8 w-8 rounded-full border-4 border-violet-200 border-t-violet-700 animate-spin motion-reduce:animate-none" />
      <p className="max-w-sm text-center text-sm leading-relaxed text-stone-600">{line}</p>
    </div>
  );
}
