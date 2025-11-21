import Breadcrumb from "./Breadcrumbs";
import CitySelectDropdown from "./CitySelectDropdown";
import LocationResultsWithMap, {
    LocationMap,
    LocationResult,
} from "./LocationResultsWithMap";
import { RepeaterItem, RepeaterSection } from "./RepeaterSection";
import Padding from "./ui/Padding";
import PopularCities from "./ui/PopularCities";
import repeaterData from "@/api-responses/location-page/repeater.json";
import overviewData from '@/api-responses/location-page/overview.json';
import headerData from '@/api-responses/location-page/header.json';
import { EbookBanner } from "./EbookBanner";
import { Footer } from "./Footer";

interface City {
    id: string;
    name: string;
    popular: string;
}
interface LocationSectionProps {
    state: string;
    stateSlug?: string;
    city: string;
    cities: City[];
    dropdownOptions: City[];
    onCityChange: (value: string) => void;
    locations?: LocationResult[];
    map?: LocationMap;
}

export default function LocationSection({
    state,
    stateSlug,
    city,
    cities,
    dropdownOptions,
    onCityChange,
    locations = [],
    map,
}: LocationSectionProps) {
    const slugToTitle = (value: string) =>
        value.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const resolvedStateSlug = stateSlug || (state ? state.toLowerCase().replace(/\s+/g, "-") : "");
    const resolvedStateName = state || (stateSlug ? slugToTitle(stateSlug) : "");
    const locId = headerData.signupUrl.match(/locid=(\d+)/)?.[1] || '776';
    console.log("state:", state);

    return (
        <section className="flex w-full max-w-fill flex-col items-center">
            <div className="flex flex-col items-center max-w-[767px] sm:max-w-[767px] md:max-w-[1023px] lg:max-w-[1280px] mx-auto pt-[72px] md:pt-[104px] lg:pt-[104px]">
                {/* Breadcrumb */}
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-screen-xl flex flex-col gap-4">
                        <Breadcrumb
                            items={[
                                { label: "Locations" },
                                { label: resolvedStateName, href: `/virtual-office/${resolvedStateSlug}` },
                                ...(city ? [{ label: city }] : [])
                            ]}
                        />
                    </div>
                    <Padding mobile="24px" desktop="24px" />
                    {/* Heading */}
                    <div className="w-full max-w-screen-xl flex flex-col gap-4">
                        <h1
                            className="font-inter text-[#101828] font-semibold text-[24px] leading-[32px] tracking-[-0.48px] lg:text-[36px] lg:leading-[44px] lg:tracking-[-0.72px]"
                        >
                            {city
                                ? `Virtual office in ${city}`
                                : `Virtual office Locations in ${resolvedStateName}`
                            }
                        </h1>
                    </div>
                    <Padding mobile="24px" desktop="24px" />
                    {/* Dropdown */}
                    <div className="w-full max-w-screen-xl flex flex-col gap-4">
                        <CitySelectDropdown
                            options={dropdownOptions}
                            value={city}
                            onChange={onCityChange}
                        />
                    </div>
                    <Padding mobile="24px" desktop="27px" />
                    {/* Cities Section */}
                    {!city && (
                        <div className="w-full max-w-screen-xl flex flex-col gap-4">
                            <PopularCities state={resolvedStateName} stateSlug={resolvedStateSlug} cities={cities} />
                        </div>
                    )}
                </div>
                {locations.length > 0 && (
                    <>
                        <Padding mobile="24px" desktop="27px" />
                        <LocationResultsWithMap
                            city={city}
                            state={resolvedStateName}
                            locations={locations}
                            map={map}
                        />
                    </>
                )}

                <RepeaterSection
                    items={repeaterData as RepeaterItem[]}
                    overviewData={overviewData}
                    cityName={city}
                    locId={locId}
                    price={headerData.price}
                />
                <Padding mobile="20px" desktop="30px" />
                <EbookBanner />
                <Padding mobile="20px" desktop="40px" />

            </div>
            <Footer />
        </section>
    );
}
