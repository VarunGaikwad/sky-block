import axios from "axios";
import cities from "@/common/Cities.json";
import { CitiesProp } from "./Interfaces";

const baseURL = "https://api.open-meteo.com",
  openMeteoAxios = axios.create({
    baseURL,
  });

type Props = { latitude: number; longitude: number; name: string };

export default async function onFetchCityWeatherInfo(city: string) {
  const selectedCity = (cities as CitiesProp[]).find(
    ({ name }: CitiesProp) => name?.toLowerCase() === city.toLowerCase()
  ) as Props;

  if (!selectedCity) {
    alert("Unable to find this city. Redirecting you back.");
    return;
  }

  return onFetch(selectedCity);
}

async function onFetch(city: Props) {
  const params = {
      latitude: city?.latitude,
      longitude: city?.longitude,
      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "is_day",
        "rain",
        "weather_code",
        "wind_speed_10m",
        "precipitation",
        "cloud_cover",
        "surface_pressure",
      ].toString(),
      timezone: "auto",
    },
    { data } = await openMeteoAxios.get("v1/forecast", { params });

  data.display_name = city?.name || "";
  return data;
}
