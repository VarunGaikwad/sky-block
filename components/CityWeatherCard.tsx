"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment-timezone";
import { CurrentWeather } from "@/common/Interfaces";
import { FindWeatherIconCodes, WeatherContext } from "@/common/IconDisctonary";

export default function CityWeatherCard({
  info,
}: {
  info: CurrentWeather | undefined;
}) {
  const [time, setTime] = useState(""),
    src = FindWeatherIconCodes(
      info?.current.weather_code || 0,
      info?.current.is_day || 1
    );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment.tz(info?.timezone || "").format("HH:mm a"));
    }, 1000);

    return () => clearInterval(interval);
  }, [info?.timezone]);

  return (
    <div className="lg:col-span-1 rounded-xl bg-indigo-700 bg-opacity-80 text-white p-5 shadow-2xl">
      <p className="font-semibold text-2xl">
        Good Morning, {info?.display_name}
      </p>
      <p className="text-sm ml-4">{time}</p>
      <div className="flex justify-between items-center">
        <Image src={src} alt="Sun" className="size-36" />
        <div className="font-bold flex flex-col items-end">
          <p className="text-7xl">{info?.current.temperature_2m}&deg;C</p>
          <p className="text-xs ml-4 mt-2">
            {WeatherContext[info?.current.weather_code || -1]}
          </p>
        </div>
      </div>
      <div className="flex justify-between px-4 my-2">
        <MicroInfo
          value={
            (info?.current.relative_humidity_2m.toString() || "") +
            " " +
            (info?.current_units.relative_humidity_2m.toString() || "")
          }
        />
        <MicroInfo
          value={
            (info?.current.precipitation.toString() || "") +
            " " +
            (info?.current_units.precipitation.toString() || "")
          }
        />
        <MicroInfo
          value={
            (info?.current.wind_speed_10m.toString() || "") +
            " " +
            (info?.current_units.wind_speed_10m.toString() || "")
          }
        />
        <MicroInfo
          value={
            (info?.current.cloud_cover.toString() || "") +
            " " +
            (info?.current_units.cloud_cover.toString() || "")
          }
        />
      </div>
    </div>
  );
}

function MicroInfo({
  icon,
  value = "",
}: {
  icon?: React.ReactNode;
  value: string;
}) {
  return (
    <div className="font-semibold flex flex-col items-center gap-2 w-max">
      {icon}
      {value}
    </div>
  );
}
