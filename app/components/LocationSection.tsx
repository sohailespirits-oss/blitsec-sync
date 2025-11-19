import Breadcrumb from "./Breadcrumbs";
import CitySelectDropdown from "./CitySelectDropdown";
import PopularCities from "./ui/PopularCities";

interface LocationSectionProps {
    state: string;
    city: string;
    cities: string[];
    dropdownOptions: string[];
    onCityChange: (value: string) => void;
}

export default function LocationSection({
    state,
    city,
    cities,
    dropdownOptions,
    onCityChange,
}: LocationSectionProps) {
    return (
        <section className="flex w-[1440px] flex-col items-center gap-6">
            {/* Breadcrumb */}
            <div className="w-full max-w-screen-xl flex flex-col gap-4">
                <Breadcrumb stateLabel={state} cityLabel={city} />
            </div>
            {/* Heading */}
            <div className="w-full max-w-screen-xl flex flex-col gap-4">
                <h1 className="font-inter text-[#101828] text-[20px] leading-[30px] sm:leading-[120%] font-medium lg:text-[36px] tracking-[-2%]">
                    Virtual office Locations in{" "}
                    <span className="font-bold text-[#36BFFA] capitalize">{state}</span>
                </h1>
            </div>
            {/* Dropdown */}
            <div className="w-full max-w-screen-xl flex flex-col gap-4">
                <CitySelectDropdown
                    options={dropdownOptions}
                    value={city}
                    onChange={onCityChange}
                />
            </div>

            {/* Cities Section */}
            <div className="w-full max-w-screen-xl flex flex-col gap-4">
                <PopularCities state={state} cities={cities} />
            </div>
        </section>
    );
}