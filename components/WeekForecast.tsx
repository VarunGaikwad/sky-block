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
    <div className={`grid-card bg-cyan-800 transition-all duration-1000 ease-in ${Object.keys(info || {}).length ? 'blur-0' : 'blur-md'}`}>
      <p className="card-header">7-day forecast</p>
      <div className="flex flex-col justify-evenly text-sm lg:text-base">
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
  let is_curr_done = false;
  const src = FindWeatherIconCodes(code),
    current_date = moment(new Date()).format("ddd D MMM"),
    check_current = (value: string) => {
      if (is_curr_done) {
        return value;
      }
      if (current_date === value) {
        is_curr_done = true;
        return "Today";
      }
      return value;
    };
  return (
    <div className="flex justify-between items-center px-4">
      <p className="w-1/3">{check_current(moment(date).format("ddd D MMM"))}</p>
      <Image className="size-10 w-1/3" src={src || ""} alt="Varun" />
      <p className="w-1/3 text-end">
        {max}&deg; / {min}&deg;
      </p>
    </div>
  );
}
