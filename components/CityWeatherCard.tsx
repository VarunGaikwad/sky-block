"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment-timezone";
import { CurrentWeather } from "@/common/Interfaces";
import { FindWeatherIconCodes, WeatherContext } from "@/common/IconDictionary";
import { Icon } from "@tremor/react";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdOutlineWindPower, MdWaterDrop } from "react-icons/md";
import { IoRainy } from "react-icons/io5";
import { IconType } from "react-icons";

export default function CityWeatherCard({
  info,
}: {
  info: CurrentWeather | undefined;
}) {
  const [time, setTime] = useState<string>(),
    src = FindWeatherIconCodes(info?.current.weather_code || 0, info?.current.is_day ?? 0),
    currentDate = new Date().toISOString();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment.tz(info?.timezone || "Asia/Mumbai").format("hh:mm a"));
    }, 1000);

    return () => clearInterval(interval);
  }, [info?.timezone]);

  return (
    <div className={`grid-card lg:col-span-1 bg-indigo-600 flex flex-col transition-all duration-1000 ease-in ${Object.keys(info || {}).length ? 'blur-0' : 'blur-md'}`}>
      <p className="card-header flex items-center">
        {_GreetingOfTheDay(info?.timezone ? moment.tz(info?.timezone).format("HH:mm") : moment.tz("Asia/Mumbai").format("HH:mm"))}
        <span className="text-lg ml-auto">{info?.display_name || "Paris"}</span>
      </p>
      <p className="text-lg ml-4 tracking-wider">{time || "00:00"}</p>
      <div className="flex justify-between items-center">
        <Image priority src={src} alt="Sun" className="size-28" />
        <div className="font-bold flex flex-col items-end">
          <p className="text-6xl">{info?.current.temperature_2m}&deg;C</p>
          <p className="text-lg ml-4 mt-2">
            {WeatherContext[info?.current.weather_code ?? -1]}
          </p>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-3">
        <MicroInfo
          icon={GiSunrise}
          value={info?.daily.sunrise[0] ? moment(info?.daily.sunrise[0]).format("hh:mm a") : moment(currentDate).format("hh:mm a")}
        />
        <MicroInfo
          icon={MdWaterDrop}
          value={(info?.current.relative_humidity_2m.toString() || "") + " " + (info?.current_units.relative_humidity_2m.toString() || "")}
        />
        <MicroInfo
          icon={IoRainy}
          value={(info?.current.rain.toString() || "") + " " + (info?.current_units.rain.toString() || "")}
        />
        <MicroInfo
          icon={MdOutlineWindPower}
          value={(info?.current.wind_speed_10m.toString() || "") + " " + (info?.current_units.wind_speed_10m.toString() || "")}
        />
        <MicroInfo
          icon={GiSunset}
          value={info?.daily.sunset[0] ? moment(info?.daily.sunset[0]).format("hh:mm a") : moment(currentDate).format("hh:mm a")}
        />
      </div>
    </div>
  );
}

function MicroInfo({ icon, value = "" }: {
  icon: IconType;
  value: string;
}) {
  return (
    <div className="font-semibold flex flex-col items-center gap-2 justify-center col-span-1">
      <Icon className="micro-info-icon" icon={icon} />
      <p>{value}</p>
    </div>
  );
}

function _GreetingOfTheDay(time: string = "10:00"): string {
  const hour = Number(time.slice(0, 2));

  if (hour >= 5 && hour < 12) {
    return "Good morning! 🌞";
  }

  if (hour >= 12 && hour < 18) {
    return "Good afternoon! 😁";
  }

  return "Good evening! 🥱";
}
