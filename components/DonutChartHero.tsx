import { CurrentWeather } from "@/common/Interfaces";
import { DonutChart } from "@tremor/react";
import { useEffect, useState } from "react";

export default function DonutChartHero({
  info,
}: {
  info: CurrentWeather | undefined;
}) {
  const {
      daily: { sunrise, sunset, time },
    } = info || {
      daily: {
        sunrise: [],
        sunset: [],
        time: [],
      },
    },
    [dataHero, setDataHero] = useState([
      {
        name: "Sunlight",
        value: 9800,
      },
      {
        name: "Moonlight",
        value: 9800,
      },
    ]);

  useEffect(() => {
    const [first_time, first_sunrise, first_sunset, full_day] = [
      sunrise[0],
      sunset[0],
      time[0],
      86340000,
    ];
    console.log("Data", first_time, first_sunrise, first_sunset);
  }, [sunrise, sunset, time]);

  return (
    <div className="grid-card bg-sky-950 bg-opacity-80 grid place-items-center">
      <DonutChart
        showAnimation
        showLabel={false}
        data={dataHero}
        variant="donut"
      />
    </div>
  );
}
