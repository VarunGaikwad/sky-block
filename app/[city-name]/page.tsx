"use client";

import onFetchCityWeatherInfo from "@/common/CityWeatherInfo";
import { CurrentWeather } from "@/common/Interfaces";
import CityWeatherCard from "@/components/CityWeatherCard";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CityName() {
  const pathname = decodeURIComponent(usePathname().slice(1)),
    [info, setInfo] = useState<CurrentWeather>();

  useEffect(() => {
    onFetchCityWeatherInfo(pathname).then(setInfo);
  }, [pathname]);

  return (
    <div className="grid lg:grid-cols-3 gap-4 mt-4">
      <CityWeatherCard info={info} />
      <div className="lg:col-span-2 bg-slate-400 rounded-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </div>
      <div className="lg:col-span-1 bg-slate-400 rounded-lg">asdas</div>
      <div className="lg:col-span-2 bg-slate-900 rounded-lg">asdsa</div>
    </div>
  );
}
