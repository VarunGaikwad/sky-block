import { DonutChart } from "@tremor/react";

const datahero = [
  {
    name: "Noche Holding AG",
    value: 9800,
  },
  {
    name: "Rain Drop AG",
    value: 4567,
  },
  {
    name: "Push Rail AG",
    value: 3908,
  },
  {
    name: "Flow Steal AG",
    value: 2400,
  },
  {
    name: "Tiny Loop Inc.",
    value: 2174,
  },
  {
    name: "Anton Resorts Holding",
    value: 1398,
  },
];

export default function DonutChartHero() {
  return (
    <div className="grid-card bg-sky-950 bg-opacity-80 grid place-items-center">
      <DonutChart
        showAnimation
        showLabel={false}
        data={datahero}
        variant="donut"
      />
    </div>
  );
}
