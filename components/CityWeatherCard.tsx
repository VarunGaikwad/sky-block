"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment-timezone";
import { CurrentWeather } from "@/common/Interfaces";
import { FindWeatherIconCodes, WeatherContext } from "@/common/IconDictionary";
import { Icon } from "@tremor/react";
import {
  RemixiconComponentType,
  RiArrowDownDoubleFill,
  RiRainyFill,
  RiWaterPercentFill,
  RiWindyFill,
} from "@remixicon/react";

export default function CityWeatherCard({
  info,
}: {
  info: CurrentWeather | undefined;
}) {
  const [time, setTime] = useState<string>(),
    src = FindWeatherIconCodes(
      info?.current.weather_code || 0,
      info?.current.is_day ?? 0
    );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        moment
          .tz(
            info?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
          )
          .format("hh:mm a")
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [info?.timezone]);

  return (
    <div className="grid-card bg-indigo-700 bg-opacity-80">
      <p className="font-semibold text-2xl">
        {_getGreeting(time)}, {info?.display_name}
      </p>
      <p className="text-sm ml-4">{time}</p>
      <div className="flex justify-between items-center">
        <Image priority src={src} alt="Sun" className="size-28" />
        <div className="font-bold flex flex-col items-end">
          <p className="text-6xl">{info?.current.temperature_2m}&deg;C</p>
          <p className="text-xs ml-4 mt-2">
            {WeatherContext[info?.current.weather_code ?? -1]}
          </p>
        </div>
      </div>
      <div className="flex justify-between px-4 my-2">
        <MicroInfo
          icon={RiWaterPercentFill}
          value={
            (info?.current.relative_humidity_2m.toString() || "") +
            " " +
            (info?.current_units.relative_humidity_2m.toString() || "")
          }
        />
        <MicroInfo
          icon={RiRainyFill}
          value={
            (info?.current.rain.toString() || "") +
            " " +
            (info?.current_units.rain.toString() || "")
          }
        />
        <MicroInfo
          icon={RiWindyFill}
          value={
            (info?.current.wind_speed_10m.toString() || "") +
            " " +
            (info?.current_units.wind_speed_10m.toString() || "")
          }
        />
        <MicroInfo
          icon={RiArrowDownDoubleFill}
          value={
            (info?.current.surface_pressure.toString() || "") +
            " " +
            (info?.current_units.surface_pressure.toString() || "")
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
  icon: RemixiconComponentType;
  value: string;
}) {
  return (
    <div className="font-semibold flex flex-col items-center gap-2 w-max text-sm">
      <Icon className="micro-info-icon" icon={icon} />
      <p>{value}</p>
    </div>
  );
}

function _getGreeting(time: string = "12:25 am"): string {
  const [hour, minute, period] = time.split(/[: ]/),
    hour24 = parseInt(hour) + (period.toLowerCase() === "pm" ? 12 : 0);

  if (hour24 < 12) return "Good morning! 🌞";
  if (hour24 < 18) return "Good afternoon! 😁";
  else return "Good evening! 🥱";
}
