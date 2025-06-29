'use client';
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { EyeIcon, LightBulbIcon, RocketLaunchIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

const iconData = [
  {
    label: "Observe",
    icon: EyeIcon,
    tooltip: "Gathers diverse data inputs.",
    pos: "left-1/2 top-0 -translate-x-1/2",
  },
  {
    label: "Plan",
    icon: LightBulbIcon,
    tooltip: "Identifies and segments prospects.",
    pos: "right-0 top-1/2 -translate-y-1/2",
  },
  {
    label: "Act",
    icon: RocketLaunchIcon,
    tooltip: "Executes campaigns programmatically.",
    pos: "left-1/2 bottom-0 -translate-x-1/2",
  },
  {
    label: "Reflect",
    icon: ArrowPathIcon,
    tooltip: "Monitors outcomes and fine-tunes.",
    pos: "left-0 top-1/2 -translate-y-1/2",
  },
];

export default function VisionSection() {
  const [paused, setPaused] = useState(false);
  const [tooltipIdx, setTooltipIdx] = useState<number|null>(0);
  const autoRef = useRef<NodeJS.Timeout|null>(null);

  // Auto-sequential tooltip animation
  useEffect(() => {
    if (paused) return;
    autoRef.current = setInterval(() => {
      setTooltipIdx((prev) => prev === null ? 0 : (prev + 1) % iconData.length);
    }, 2000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [paused]);

  // Pause auto on hover, show tooltip for hovered icon
  const handleMouseEnter = (idx: number) => {
    setPaused(true);
    setTooltipIdx(idx);
  };
  const handleMouseLeave = () => {
    setPaused(false);
  };

  return (
    <section id="vision" className="text-center min-h-[80vh] flex flex-col justify-center items-center py-16 bg-white w-full">
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80"
          alt="Abstract AI background"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>
      <h2 className="text-4xl md:text-6xl font-bold text-center section-title mb-4 text-black drop-shadow-lg">Unleashing Autonomous Growth</h2>
      <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto mb-12 drop-shadow">We are building an intelligent, autonomous system that moves beyond simple automation to deliver adaptive learning, proactive decision-making, and self-optimization for prospect acquisition.</p>
      <div className="relative flex flex-col items-center justify-center w-[340px] h-[340px] md:w-[420px] md:h-[420px] mx-auto">
        {/* Concentric animated circles (rotating, pause on hover) */}
        <div
          className={`absolute inset-0 flex items-center justify-center z-0 pointer-events-none ${paused ? '' : 'animate-spin-slow'}`}
        >
          <span className="block w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full border-4 border-purple-200 animate-pulse-slow" />
          <span className="block absolute w-[220px] h-[220px] md:w-[300px] md:h-[300px] rounded-full border-2 border-purple-100 animate-pulse-slower" />
        </div>
        {/* Static icons around the circle */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {iconData.map((item, idx) => (
            <div
              key={item.label}
              className={`absolute ${item.pos} flex flex-col items-center group`}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
            >
              <item.icon className="w-12 h-12 text-purple-500 mb-2" />
              <span
                className="font-bold text-black underline underline-offset-4 cursor-pointer"
                tabIndex={0}
              >
                {item.label}
              </span>
              {/* Tooltip on hover or auto */}
              {tooltipIdx === idx && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-16 md:mt-20 bg-white border border-purple-200 shadow-lg rounded-lg px-4 py-2 text-sm text-black z-30 whitespace-nowrap animate-fade-in">
                  {item.tooltip}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Agent circle in center */}
        <div className="relative z-20 flex items-center justify-center">
          <div className="w-28 h-28 md:w-36 md:h-36 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl md:text-3xl shadow-lg animate-pulse">Agent</div>
        </div>
      </div>
    </section>
  );
}

// Tailwind custom keyframes (add to globals.css or tailwind config):
// .animate-spin-slow { animation: spin 12s linear infinite; }
// .animate-pulse-slow { animation: pulse 2.5s cubic-bezier(0.4,0,0.6,1) infinite; }
// .animate-pulse-slower { animation: pulse 4s cubic-bezier(0.4,0,0.6,1) infinite; }
// @keyframes spin { 100% { transform: rotate(360deg); } }
// @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }


