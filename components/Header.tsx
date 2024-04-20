"use client";
import CitySearchInput from "@/components/CitySearchInput";
import { useRouter } from "next/navigation";
import React from "react";

export default function Header() {
  const router = useRouter();

  const onSearchHandler = (name: string) => {
    router.push(name);
  };

  return <CitySearchInput onSearch={onSearchHandler} />;
}
