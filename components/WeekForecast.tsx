import React from "react";
import moment from "moment-timezone";
import Image from "next/image";
import { CurrentWeather } from "@/common/Interfaces";
import { FindWeatherIconCodes } from "@/common/IconDictionary";

export default function WeekForecastCard({
  info,
}: {
  info: CurrentWeather | undefined;
}) {
  const { time, temperature_2m_max, temperature_2m_min, weather_code } =
      info?.daily || {
        time: [],
        temperature_2m_max: [],
        temperature_2m_min: [],
        weather_code: [],
      },
    array = Array(time.length).fill(0);
  return (
    <div className="grid-card bg-cyan-950 bg-opacity-80 text-sm text-black">
      <p>Forecast</p>
      <div className="flex flex-col gap-1 mt-2">
        {array.map((_, i) => (
          <DayCast
            key={i}
            code={weather_code[i]}
            max={temperature_2m_max[i]}
            min={temperature_2m_min[i]}
            date={time[i]}
          />
        ))}
      </div>
    </div>
  );
}

function DayCast({
  max,
  min,
  date,
  code,
}: {
  code: number;
  max: number;
  min: number;
  date: string;
}) {
  const src = FindWeatherIconCodes(code);
  return (
    <div className="flex justify-between items-center px-4">
      <Image className="size-10" src={src || ""} alt="Varun" />
      <p>
        {max}&deg; / {min}&deg;
      </p>
      <p>{moment(date).format("ddd D MMM")}</p>
    </div>
  );
}
