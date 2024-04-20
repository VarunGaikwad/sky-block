import axios from "axios";

const baseURL = "https://nominatim.openstreetmap.org/",
  nominatimAxios = axios.create({
    baseURL,
  });

export default async function onFetchCityLatLong(q: string) {
  const params = { format: "json", q },
    { data } = await nominatimAxios.get("search", { params });

  return data;
}
