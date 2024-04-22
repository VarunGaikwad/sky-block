import dictonary from "@/common/Cities.json";
import { CitiesProp } from "./Interfaces";
import axios from "axios";

const baseURL = "https://api.open-meteo.com",
  openMeteoAxios = axios.create({
    baseURL,
  });

type Props = {
  latitude: number;
  longitude: number;
  name: string;
};
export function onFetchNearByCities(city: string) {
  const cities: CitiesProp[] = dictonary as CitiesProp[],
    current_country = cities.find(({ name }) => name === city),
    all_cities = cities
      .filter(
        ({ name, country }) =>
          country === current_country?.country && name !== city
      ).sort(() => Math.random() - 0.5).slice(0, 5),
    all_request = all_cities.map((element) => onFetch(element));

  return Promise.all(all_request);
}

async function onFetch(city: Props) {
  const params = {
    latitude: city?.latitude,
    longitude: city?.longitude,
    current: ["weather_code"].toString(),
  },
    { data } = await openMeteoAxios.get("v1/forecast", { params });

  data.display_name = city?.name;

  return data;
}
