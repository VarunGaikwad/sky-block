import { FindRemixIconCodes } from "@/common/IconDictionary";
import { CurrentWeather } from "@/common/Interfaces";
import { onFetchNearByCities } from "@/common/NearByCities";
import { Icon } from "@tremor/react";
import React, { useEffect, useState } from "react";

export default function NearByCities({ city }: { city: string }) {
  const [popularCities, setPopularCities] = useState<CurrentWeather[]>([]);

  useEffect(() => {
    onFetchNearByCities(city).then(setPopularCities);
  }, [city]);

  return (
    <div className={`grid-card lg:col-span-1 bg-blue-700 flex flex-col transition-all duration-1000 ease-in ${Object.keys(popularCities || {}).length ? 'blur-0' : 'blur-md'}`}>
      <p className="card-header">Popular Cities</p>
      <div className="flex-1 flex justify-evenly flex-col">
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
