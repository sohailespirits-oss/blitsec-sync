'use client';
import React, { useMemo, useState } from 'react';
import LocationSection from './LocationSection';
import type { LocationResult, LocationMap } from './LocationResultsWithMap';
import Padding from './ui/Padding';
import floridaCities from './../../api-responses/florida_citiesvirtual.json';
import floridaLocations from './../../newsite/json/states/florida/florida_locations_vo.json';

interface LocationData {
    state: string;
    stateSlug?: string;
    image: string;
    locations?: LocationResult[];
    map?: LocationMap;
}

function StateSearch({ data }: { data: LocationData }) {
    const { state, stateSlug, locations = [], map } = data;
    const [city, setCity] = useState("");

    const cityList = floridaCities.data;

    const dropdownOptions = useMemo(
        () => cityList,
        [cityList]
    );

    const popularCityNames = useMemo(
        () => cityList.filter((city) => city.popular === "1"),
        [cityList]
    );

    const locationResults: LocationResult[] = useMemo(
        () =>
            (floridaLocations.data ?? []).map((loc: any) => ({
                id: loc.id?.toString(),
                city: loc.city,
                name: loc.location_name,
                address: loc.address,
                abbr: loc.state_abbr,
                premium: loc.premium,
                showpopular: loc.showpopular?.toString?.() ?? loc.premium?.toString?.(),
                opusowned: loc.opusowned,
                point_x: loc.point_x?.toString?.(),
                point_y: loc.point_y?.toString?.(),
                image: typeof loc.image === "object" ? loc.image?.url : loc.image,
                link: loc.url,
            })),
        []
    );

    return (
        <section className="flex flex-col items-center justify-center w-full bg-basewhite">
            <Padding mobile="20px" desktop="40px" />
            <LocationSection
                state={state}
                stateSlug={stateSlug}
                city={city}
                cities={popularCityNames}
                dropdownOptions={dropdownOptions}
                onCityChange={setCity}
                locations={locationResults.length ? locationResults : locations}
                map={map}
            />
        </section>
    );
}

export default StateSearch;
