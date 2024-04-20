import onFetchCityLatLong from "@/common/CityLatLong";
import { CityList } from "@/common/Interfaces";
import { RiSearchLine } from "@remixicon/react";
import { Icon } from "@tremor/react";
import React, { useRef, useState } from "react";

type Props = {
  onSearch: (city: string) => void;
};

export default function CitySearchInput({ onSearch }: Props) {
  const [city, setCity] = useState<string>(""),
    [cityNameList, setCityListName] = useState<CityList[]>([]),
    inputRef = useRef<HTMLInputElement>(null),
    [isInputActive, setInputActive] = useState<boolean>(false),
    onCityInputChange = (uiEvent: React.ChangeEvent<HTMLInputElement>) => {
      const value = uiEvent.target.value;
      setCity(value);
      onFetchCityLatLong(value).then(setCityListName);
    },
    onCityLabelFocus = () => {
      const { current } = inputRef;
      current?.focus();
    },
    onCityInputFocus = () => {
      setInputActive(true);
    },
    onCityInputBlur = () => {
      if (city.trim() === "") setInputActive(false);
    },
    onCityOptionSelect = () => {},
    onFormSubmit = (uiEvent: React.FormEvent<HTMLFormElement>) => {
      uiEvent.preventDefault();
      if (city.trim() !== "") onSearch(city);
    };

  return (
    <form onSubmit={onFormSubmit} className="relative lg:w-1/3">
      <label
        onClick={onCityLabelFocus}
        htmlFor="city"
        className={`ml-6 font-semibold absolute top-4 transition-all duration-300 cursor-text ${
          isInputActive ? "-translate-y-10" : "translate-y-0 opacity-50"
        }`}
      >
        Enter City Name
      </label>
      <div className="search-input-box">
        <input
          list="cityNameList"
          autoComplete="off"
          ref={inputRef}
          type="text"
          name="city"
          value={city}
          onChange={onCityInputChange}
          onFocus={onCityInputFocus}
          onBlur={onCityInputBlur}
          className="search-input"
        />
        <datalist id="cityNameList">
          {cityNameList.map(({ display_name }, idx) => (
            <option key={idx} value={display_name} onClick={onCityOptionSelect}>
              {display_name}
            </option>
          ))}
        </datalist>
        <button type="submit" className="ml-2">
          <Icon
            icon={RiSearchLine}
            variant="simple"
            className="search-icon-btn"
          />
        </button>
      </div>
    </form>
  );
}
