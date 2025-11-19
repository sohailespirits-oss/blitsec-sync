'use client';
import React, { useState } from 'react'
import Breadcrumb from './Breadcrumbs';
import CitySelectDropdown from './CitySelectDropdown';
import PopularCities from './ui/PopularCities';
import LocationSection from './LocationSection';

interface LocationData {
    state: string;
    image: string;
}
const cities = [
    "Atlanta",
    "Savannah",
    "Augusta",
    "Columbus",
    "Macon",
    "Athens",
    "Albany",
    "Sandy Springs",
    "Roswell",
];
function StateSearch({ data }: { data: LocationData }) {
    const { image, state } = data;
    const [city, setCity] = useState("");
    console.log("data:", data);

    return (
        <section className="flex flex-col items-center justify-center w-full bg-basewhite px-4 sm:px-6 lg:px-8 pt-[72px] lg:pt-[40px]">
            <LocationSection
                state={state}
                city={city}
                cities={cities}
                dropdownOptions={["Atlanta", "Savannah", "Augusta", "Columbus"]}
                onCityChange={setCity}
            />


        </section>
    )
}

export default StateSearch;