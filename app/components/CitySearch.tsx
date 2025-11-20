"use client";

import Padding from "./ui/Padding";
import Breadcrumb from "./Breadcrumbs";
import LocationSection from "./LocationSection";
import type { LocationResult, LocationMap } from "./LocationResultsWithMap";

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
    console.log("Breadcrumb final:", [
        { label: "Locations" },
        { label: state, href: `/state-search/${state}` },
        { label: city, href: `/state-search/${state}/${city.toLowerCase().replace(/\s+/g, "-")}` }
    ]);


    return (
        <section className="flex flex-col w-full bg-basewhite">
            <Padding mobile="20px" desktop="40px" />

            {/* Main Location Section */}
            <LocationSection
                state={state}
                city={city}
                cities={[city]}
                dropdownOptions={[city]}
                onCityChange={() => { }}
                locations={locations}
                map={map}
            />
        </section>
    );
}
