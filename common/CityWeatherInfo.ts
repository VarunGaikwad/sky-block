import axios from "axios";
import cities from "@/common/Cities.json";

const baseURL = "https://api.open-meteo.com",
  openMeteoAxios = axios.create({
    baseURL,
  });

type Props = { latitude: number; longitude: number };

export default async function onFetchCityWeatherInfo(city: string) {
  const selectedCity = cities.find(({ name }) => name === city) as Props;

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
        "weather_code",
        "wind_speed_10m",
      ],
    },
    { data } = await openMeteoAxios.get("forecast", { params });

  return data;
}
