import cities from "@/common/Cities.json";
import { CityList } from "@/common/Interfaces";
import { RiSearchLine } from "@remixicon/react";
import { Icon } from "@tremor/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  onSearch: (city: string) => void;
};

export default function CitySearchInput({ onSearch }: Props) {
  const [city, setCity] = useState<string>(""),
    pathname = usePathname().slice(1),
    [cityNameList, setCityListName] = useState<CityList[]>([]),
    inputRef = useRef<HTMLInputElement>(null),
    formRef = useRef<HTMLFormElement>(null),
    [isInputActive, setInputActive] = useState<boolean>(false),
    onCityInputChange = (uiEvent: React.ChangeEvent<HTMLInputElement>) => {
      const value = uiEvent.target.value;
      setCity(value);
      setCityListName(
        cities.filter(({ name = "" }) => name.includes(value)).slice(0, 5)
      );
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
    onFormSubmit = (uiEvent: React.FormEvent<HTMLFormElement>) => {
      uiEvent.preventDefault();
      if (city.trim() !== "") {
        onSearch(city);
        setCityListName([]);
      }
    },
    onOptionTab = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const {
          key,
          currentTarget: { innerHTML },
        } = event,
        { current } = formRef;
      if (key === "Enter" && innerHTML !== "") {
        setCity(innerHTML);
        setCityListName([...[]]);
        inputRef.current?.focus();
      }
    },
    onOptionClick = (event: React.MouseEvent<HTMLDivElement>) => {
      const {
          currentTarget: { innerHTML },
        } = event,
        { current } = formRef;
      if (innerHTML !== "") {
        setCity(innerHTML);
        setCityListName([...[]]);
        inputRef.current?.focus();
      }
    };

  useEffect(() => {
    if (pathname) {
      setCity(decodeURIComponent(pathname));
      inputRef.current?.focus();
    }
  }, [pathname]);

  return (
    <form ref={formRef} onSubmit={onFormSubmit} className="relative lg:w-1/3">
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
        <button type="submit" className="ml-2">
          <Icon
            icon={RiSearchLine}
            variant="simple"
            className="search-icon-btn"
          />
        </button>
      </div>
      <div className="absolute z-10 mt-1 w-full bg-white bg-opacity-30 font-semibold rounded-xl shadow-lg">
        {cityNameList.length > 0 &&
          cityNameList.map(({ name }, index) => (
            <div
              key={index}
              tabIndex={0}
              onKeyDown={onOptionTab}
              onClick={onOptionClick}
              className="py-3 pl-6 cursor-pointer hover:bg-blue-400 focus:bg-blue-400 focus:outline-none hover:ring-0 rounded-xl"
            >
              {name}
            </div>
          ))}
      </div>
    </form>
  );
}
