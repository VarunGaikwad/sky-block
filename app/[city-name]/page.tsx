"use client";

import onFetchCityWeatherInfo from "@/common/CityWeatherInfo";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function CityName() {
  const pathname = decodeURIComponent(usePathname().slice(1));

  useEffect(() => {
    onFetchCityWeatherInfo(pathname).then(console.log);
  }, [pathname]);

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      <div className="col-span-1 bg-white rounded-lg">Varu</div>
      <div className="col-span-2 bg-slate-400 rounded-lg">asdsa</div>
      <div className="col-span-1 bg-slate-400 rounded-lg">asdas</div>
      <div className="col-span-2 bg-slate-900 rounded-lg">asdsa</div>
    </div>
  );
}
