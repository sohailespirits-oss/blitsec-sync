'use client';
import React, { useState } from 'react'
import Breadcrumb from './Breadcrumbs';
import CitySelectDropdown from './CitySelectDropdown';
import PopularCities from './ui/PopularCities';
import LocationSection from './LocationSection';
import type { LocationResult, LocationMap } from './LocationResultsWithMap';
import Padding from './ui/Padding';
import allcities from './../../api-responses/city-search-result.json'

interface LocationData {
    state: string;
    image: string;
    locations?: LocationResult[];
    map?: LocationMap;
}

function StateSearch({ data }: { data: LocationData }) {
    const { image, state, locations = [], map } = data;
    const [city, setCity] = useState("");
    const cities = allcities.result.locations.map(loc => loc.city);

    return (
        <section className="flex flex-col items-center justify-center w-full bg-basewhite">
            <Padding mobile="20px" desktop="40px" />
            <LocationSection
                state={state}
                city={city}
                cities={cities}
                dropdownOptions={["Atlanta", "Savannah", "Augusta", "Columbus"]}
                onCityChange={setCity}
                locations={locations}
                map={map}
            />


        </section>
    )
}

export default StateSearch;
