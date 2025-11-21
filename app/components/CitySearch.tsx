"use client";

import Padding from "./ui/Padding";
import LocationSection from "./LocationSection";
import type { LocationResult, LocationMap } from "./LocationResultsWithMap";

interface City {
  id: string;
  name: string;
  popular: string;
}

interface CitySearchProps {
  data: {
    state: string;
    city: string;
    image: string;
    locations: LocationResult[];
    map?: LocationMap;
  };
}

export default function CitySearch({ data }: CitySearchProps) {
  const { state, city, locations, map } = data;

  const singleCityObj: City[] = [
    {
      id: "0",
      name: city,
      popular: "1",
    },
  ];
console.log("city:",data);

  return (
    <section className="flex flex-col w-full bg-basewhite">
      <Padding mobile="20px" desktop="40px" />

      <LocationSection
        state={state}
        city={city}
        cities={singleCityObj}
        dropdownOptions={singleCityObj}
        onCityChange={() => {}}
        locations={locations}
        map={map}
      />
    </section>
  );
}
