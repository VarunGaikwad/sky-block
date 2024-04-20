"use client";
import onFetchCityLatLong from "@/common/CityLatLong";
import SearchInput from "@/components/CitySearchInput";

export default function Home() {
  const handleSearch = (city: string) => {
    console.log("This is the city name", city);
  };
  return (
    <div>
      <SearchInput onSearch={handleSearch} />
    </div>
  );
}
