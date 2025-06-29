"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface Props {
  months: number;
  pm: boolean;
}

const costData = {
  base: {
    personnel: [40000, 108000],
    ml: [48000, 132000],
    backend: [27000, 80000],
    infra: [660, 12900],
  },
  pm: [24000, 60000],
};

function calculateCosts(months: number, pm: boolean) {
  const multiplier = months / 4;
  let lowEnd = (costData.base.personnel[0] + costData.base.ml[0] + costData.base.backend[0]) * multiplier + costData.base.infra[0];
  let highEnd = (costData.base.personnel[1] + costData.base.ml[1] + costData.base.backend[1]) * multiplier + costData.base.infra[1];
  if (pm) {
    lowEnd += costData.pm[0] * multiplier;
    highEnd += costData.pm[1] * multiplier;
  }
  const lowContingency = lowEnd * 0.15;
  const highContingency = highEnd * 0.15;
  const totalLow = lowEnd + lowContingency;
  const totalHigh = highEnd + highContingency;
  return {
    personnel: [costData.base.personnel[0] * multiplier, costData.base.personnel[1] * multiplier],
    ml: [costData.base.ml[0] * multiplier, costData.base.ml[1] * multiplier],
    backend: [costData.base.backend[0] * multiplier, costData.base.backend[1] * multiplier],
    pm: pm ? [costData.pm[0] * multiplier, costData.pm[1] * multiplier] : [0, 0],
    infra: [costData.base.infra[0], costData.base.infra[1]],
    contingency: [lowContingency, highContingency],
    total: [totalLow, totalHigh],
  };
}

export default function PrototypeSectionChart({ months, pm }: Props) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);
  const costs = calculateCosts(months, pm);

  useEffect(() => {
    if (!chartRef.current) return;
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    chartInstance.current = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: ["Low Estimate", "High Estimate"],
        datasets: [
          { label: "Data Eng.", data: [costs.personnel[0], costs.personnel[1]], backgroundColor: "#a855f7" },
          { label: "ML/DS", data: [costs.ml[0], costs.ml[1]], backgroundColor: "#9333ea" },
          { label: "Backend Dev", data: [costs.backend[0], costs.backend[1]], backgroundColor: "#7e22ce" },
          { label: "Project Manager", data: [costs.pm[0], costs.pm[1]], backgroundColor: "#6b21a8" },
          { label: "Infrastructure", data: [costs.infra[0], costs.infra[1]], backgroundColor: "#facc15" },
          { label: "Contingency (15%)", data: [costs.contingency[0], costs.contingency[1]], backgroundColor: "#eab308" },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" },
          title: { display: false },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || "";
                if (label) label += ": ";
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(context.parsed.y);
                }
                return label;
              },
            },
          },
        },
        scales: {
          x: { stacked: true },
          y: {
            stacked: true,
            ticks: {
              callback: function (value) {
                return "$" + (value as number / 1000) + "k";
              },
            },
          },
        },
      },
    });
    // eslint-disable-next-line
  }, [months, pm]);

  return (
    <div className="relative w-full max-w-xl mx-auto h-72">
      <div className="text-center mb-2 text-lg font-bold text-stone-800">
        Total Estimated Cost: <span className="text-purple-700">${Math.round(costs.total[0]).toLocaleString()} - ${Math.round(costs.total[1]).toLocaleString()}</span>
      </div>
      <canvas ref={chartRef} className="w-full h-72" />
    </div>
  );
}
