"use client";

import onFetchCityWeatherInfo from "@/common/CityWeatherInfo";
import { CurrentWeather } from "@/common/Interfaces";
import { AreaChartHero } from "@/components/AreaChartHero";
import CityWeatherCard from "@/components/CityWeatherCard";
import DonutChartHero from "@/components/DonutChartHero";
import NearByCities from "@/components/NearByCities";
import WeekForecastCard from "@/components/WeekForecast";
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
      <DonutChartHero />
      <NearByCities city={pathname} />
      <WeekForecastCard info={info} />
      <AreaChartHero info={info} />
    </div>
  );
}
