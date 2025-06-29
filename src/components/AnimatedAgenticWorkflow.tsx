"use client";
import { motion, useAnimation } from "framer-motion";
import { EyeIcon, LightBulbIcon, RocketLaunchIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

// Arrange nodes in a circle
const circleNodes = [
  { label: "Perception", icon: EyeIcon, color: "bg-purple-100 border-purple-400", angle: 0, desc: "Gathers and unifies data from GA4, CRM, Google Ads." },
  { label: "Planning", icon: LightBulbIcon, color: "bg-fuchsia-100 border-fuchsia-400", angle: 90, desc: "Runs ML models and decision logic to plan actions." },
  { label: "Action", icon: RocketLaunchIcon, color: "bg-teal-100 border-teal-400", angle: 180, desc: "Executes campaigns and actions via APIs." },
  { label: "Reflection", icon: ArrowPathIcon, color: "bg-yellow-100 border-yellow-400", angle: 270, desc: "Monitors results and feeds insights back to planning." },
];
const NODE_COUNT = circleNodes.length;
const BOX_RADIUS = 14; // SVG units, half box size for edge calculation
const CIRCLE_RADIUS = 38; // SVG units, for a 100x100 viewBox (responsive)
const CENTER = 50;

function getNodePos(idx: number, r = CIRCLE_RADIUS) {
  const angle = (360 / NODE_COUNT) * idx - 90; // start at top
  const rad = angle * (Math.PI / 180);
  return {
    x: CENTER + r * Math.cos(rad),
    y: CENTER + r * Math.sin(rad),
    angle,
    rad,
  };
}

export default function AnimatedAgenticWorkflow() {
  // For animating dash offset
  const [dashOffset, setDashOffset] = useState(0);
  useEffect(() => {
    let frame: number;
    const animate = () => {
      setDashOffset((prev) => (prev + 2) % 28);
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  // Animation for rotating the whole group
  const controls = useAnimation();
  useEffect(() => {
    controls.start({ rotate: 360, transition: { repeat: Infinity, duration: 12, ease: "linear" } });
  }, [controls]);

  return (
    <section className="py-16 bg-white w-full">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-black">Agentic AI: Animated Workflow</h2>
      <div className="relative w-full max-w-3xl mx-auto aspect-square" style={{ minHeight: 320 }}>
        {/* Rotating group for arrows and nodes */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ originX: 0.5, originY: 0.5 }}
          animate={controls}
        >
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
            {/* Central circle */}
            <circle cx={CENTER} cy={CENTER} r={CIRCLE_RADIUS - 10} fill="#f3f4f6" stroke="#a78bfa" strokeWidth={1.5} />
            {/* Animated circular edges/arrows */}
            {circleNodes.map((node, i) => {
              const from = getNodePos(i);
              const to = getNodePos((i + 1) % NODE_COUNT);
              // Tangent direction at each node for perfect edge connection
              const theta = Math.atan2(to.y - from.y, to.x - from.x);
              const sx = from.x + Math.cos(theta) * BOX_RADIUS;
              const sy = from.y + Math.sin(theta) * BOX_RADIUS;
              const ex = to.x - Math.cos(theta) * BOX_RADIUS;
              const ey = to.y - Math.sin(theta) * BOX_RADIUS;
              // Control point for Bezier: midpoint plus perpendicular offset for arc
              const mx = (sx + ex) / 2;
              const my = (sy + ey) / 2;
              const perp = { x: -(ey - sy), y: ex - sx };
              const norm = Math.sqrt(perp.x * perp.x + perp.y * perp.y) || 1;
              const curveAmount = 12; // adjust for arc
              const cx = mx + (perp.x / norm) * curveAmount;
              const cy = my + (perp.y / norm) * curveAmount;
              const path = `M${sx},${sy} Q${cx},${cy} ${ex},${ey}`;
              return (
                <motion.path
                  key={i}
                  d={path}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  strokeDashoffset={dashOffset}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: i * 0.5, repeat: Infinity, repeatDelay: 2 }}
                  markerEnd="url(#arrowhead-red)"
                />
              );
            })}
            <defs>
              <marker id="arrowhead-red" markerWidth="3.5" markerHeight="3.5" refX="3" refY="1.75" orient="auto" markerUnits="strokeWidth">
                <polygon points="0 0, 3.5 1.75, 0 3.5" fill="#ef4444" />
              </marker>
            </defs>
          </svg>
          {/* Circular node placement with tooltip on hover */}
          {circleNodes.map((node, i) => {
            const { x, y } = getNodePos(i);
            return (
              <motion.div
                key={node.label}
                className={`absolute flex flex-col items-center justify-center border-2 shadow-lg ${node.color} rounded-xl p-3 w-28 h-28 select-none group`}
                style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.2 }}
              >
                <node.icon className="w-10 h-10 mb-2 text-purple-600" />
                <span className="font-bold text-black text-center text-base">{node.label}</span>
                <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 z-20 bg-white border border-purple-200 shadow-lg rounded px-4 py-2 text-xs text-black opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                  {node.desc}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
