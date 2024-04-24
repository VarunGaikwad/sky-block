"use client";

import { CurrentWeather } from "@/common/Interfaces";
import {
  RiRainyFill,
  RiSnowflakeFill,
  RiTempColdFill,
  RiWindyFill,
} from "@remixicon/react";
import { AreaChart, Button, Icon, Switch } from "@tremor/react";
import { useEffect, useState } from "react";

type ChartProp = {
  time: string;
  Rain: number;
  Temperature: number;
  Wind: number;
};

export function AreaChartHero({ info }: { info: CurrentWeather | undefined }) {
  const [isClient, setClient] = useState(false),
    [category, setCategory] = useState("Temperature"),
    [chartData, setChartData] = useState<ChartProp[]>(),
    chartType = [
      {
        name: "Temperature",
        icon: RiTempColdFill,
      },
      {
        name: "Rain",
        icon: RiRainyFill,
      },
      {
        name: "Wind",
        icon: RiWindyFill,
      },
      {
        name: "Snow",
        icon: RiSnowflakeFill,
      },
    ],
    valueFormat = (value: number) => {
      if (category === "Snow") {
        return value + (info?.hourly_units.snowfall || "");
      }
      if (category === "Wind") {
        return value + (info?.hourly_units.wind_speed_10m || "");
      }
      if (category === "Rain") {
        return value + (info?.hourly_units.rain || "");
      }
      if (category === "Temperature") {
        return value + (info?.hourly_units.temperature_2m || "");
      }
      return "";
    };

  useEffect(() => {
    setClient(true);
    const { rain, time, temperature_2m, wind_speed_10m, snowfall } =
        info?.hourly || {
          rain: [],
          time: [],
          temperature_2m: [],
          wind_speed_10m: [],
          snowfall: [],
        },
      formatter = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      chart = rain.slice(0, 23).map((data: number, idx: number) => ({
        time: formatter.format(new Date(time[idx])),
        Rain: data,
        Temperature: temperature_2m[idx],
        Wind: wind_speed_10m[idx],
        Snow: snowfall[idx],
      }));
    setChartData([...chart]);
  }, [info?.hourly]);

  return isClient ? (
    <div className="lg:col-span-2 bg-slate-900 rounded-lg p-4">
      <div className="flex justify-end gap-4">
        {chartType.map(({ name, icon }, idx) => (
          <Button
            key={idx}
            disabled={category === name}
            variant={category === name ? "secondary" : "primary"}
            icon={icon}
            onClick={() => {
              setCategory(name);
            }}
          />
        ))}
      </div>
      <AreaChart
        showAnimation
        showGradient
        showLegend
        className="mt-2 h-80"
        data={chartData || []}
        index="time"
        categories={[category]}
        colors={["indigo"]}
        yAxisWidth={50}
        valueFormatter={valueFormat}
      />
    </div>
  ) : (
    <div className="lg:col-span-2 bg-slate-900 rounded-lg text-white font-semibold flex justify-center items-center">
      Loading......
    </div>
  );
}
