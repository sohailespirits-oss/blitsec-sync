'use client';
import React, { useState } from 'react'
import { ChevronRight } from 'lucide-react';
import { Input } from './ui/input';
import CitySelectInput from './CitySelectDropdown';
import CitySelectDropdown from './CitySelectDropdown';
import StateLocations from './StateLocations';

interface LocationData {
    state: string;
    image: string;
}

const popularLocation = {
    city: "Boca Raton",
    address1: "4855 Technology Way",
    address2: "Boca Raton, FL 33431",
    image: "/office-building-1.jpg",
    premium: true
};

const additionalLocations = [
    {
        city: "Miami",
        address1: "150 SE 2nd Ave",
        address2: "Miami, FL 33131",
        image: "/office-building-2.jpg",
        premium: true
    },
    {
        city: "Orlando",
        address1: "111 N Magnolia Ave",
        address2: "Orlando, FL 32801",
        image: "/office-building-3.jpg",
        premium: false
    },
    {
        city: "Tampa",
        address1: "401 E Jackson St",
        address2: "Tampa, FL 33602",
        image: "/office-building-4.jpg",
        premium: true
    }
];


function StateSearch({ data }: { data: LocationData }) {
    const [city, setCity] = useState("");
    return (
        <section className="flex flex-col items-center w-full bg-basewhite">

            {/* WRAPPER WITH 24px GAP */}
            <div className="flex flex-col w-full items-center">

                {/* HEADER + BREADCRUMB */}
                <div className="flex flex-col w-full items-center gap-4 sm:gap-6 md:gap-8 px-0 py-1 sm:py-8 pt-[40px] sm:pt-[40px] md:pt-[140px]">
                    <div className="flex flex-col lg:flex-row w-full  md:px-8 max-w-screen-xl mx-auto">
                        <div className="flex flex-col gap-[24px] w-full">

                            <div className="flex flex-row items-center gap-[24px]">
                                <span className="font-inter font-semibold text-[14px] text-[#717680]">Locations</span>
                                <ChevronRight className="w-[16px] h-[16px]" />
                                <span className="font-inter font-semibold text-[14px] text-[#026AA2]">
                                    {data.state}
                                </span>
                            </div>

                            <span className="font-inter font-medium lg:text-[36px] text-[20px] leading-[120%] tracking-[-2%]">
                                Virtual Office Locations in {data.state}
                            </span>

                        </div>
                    </div>
                </div>

                {/* CITY SELECT DROPDOWN — perfectly aligned */}
                <div className="w-full sm:px-4 md:px-8 max-w-screen-xl pb-[24px]">
                    <CitySelectDropdown
                        options={["Atlanta", "Savannah", "Augusta", "Columbus"]}
                        value={city}
                        onChange={setCity}
                    />
                </div>
                {/* POPULAR CITIES */}
                <div className="w-full sm:px-4 md:px-8 max-w-screen-xl mx-auto flex flex-col gap-4 pt-[32px]">
                    {/* Header */}
                    <h2 className="text-[#101828] text-[20px] font-semibold leading-[30px]">
                        Popular Cities in {data.state}
                    </h2>

                    {/* City Pills */}
                    <div className="flex flex-wrap gap-2">
                        {["Atlanta", "Savannah", "Augusta", "Columbus", "Macon", "Athens", "Albany", "Sandy Springs", "Roswell"].map(
                            (city, idx) => (
                                <span
                                    key={idx}
                                    className="
            px-3 py-1
            border border-[#D0D5DD]
            rounded-full
            text-[#344054] text-[14px] font-medium leading-[20px]
          "
                                >
                                    {city}
                                </span>
                            )
                        )}
                    </div>

                </div>

                <StateLocations
                    state="Florida"
                    popular={popularLocation}
                    additional={additionalLocations}
                />

            </div>

        </section>


    )
}

export default StateSearch;