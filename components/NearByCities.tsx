import { FindRemixIconCodes } from "@/common/IconDictionary";
import { CurrentWeather } from "@/common/Interfaces";
import { onFetchNearByCities } from "@/common/NearByCities";
import {
  RiCloudFill,
  RiRainyFill,
  RiSnowyFill,
  RiSunFill,
  RiThunderstormsFill,
  RiWindyFill,
} from "@remixicon/react";
import { Icon } from "@tremor/react";
import React, { useEffect, useState } from "react";

export default function NearByCities({ city }: { city: string }) {
  const [popularCities, setPopularCities] = useState<CurrentWeather[]>([]);

  useEffect(() => {
    onFetchNearByCities(city).then(setPopularCities);
  }, [city]);

  return (
    <div className="grid-card bg-blue-600 flex flex-col">
      <p className="text-xl">Popular Cities</p>
      <div className="mt-6 flex-1 flex justify-evenly flex-col text-sm">
        {popularCities.map(
          ({ display_name, current: { weather_code } }, idx) => (
            <PopularCity
              key={idx}
              weather_code={weather_code}
              display_name={display_name}
            />
          )
        )}
      </div>
    </div>
  );
}

type PopularCityProp = {
  weather_code: number;
  display_name: string;
};

function PopularCity({ weather_code, display_name }: PopularCityProp) {
  const [context, icon] = FindRemixIconCodes(weather_code);
  return (
    <div className="flex justify-between items-center px-8">
      <div className="w-1/3 flex justify-start">
        <Icon className="micro-info-icon" icon={icon} />
      </div>
      <p className="w-1/3">{display_name}</p>
      <p className="w-1/3 text-end capitalize">{context}</p>
    </div>
  );
}
