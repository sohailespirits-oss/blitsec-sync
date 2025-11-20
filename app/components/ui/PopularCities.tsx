import Link from "next/link";

interface PopularCitiesProps {
  state: string;
  cities: string[];
}

export default function PopularCities({ state, cities }: PopularCitiesProps) {
  return (
    <div className="flex flex-col gap-[24px] py-[20px] lg:py-[32px]">
      {/* Heading */}
      <h2 className="font-inter text-[#101828] text-[20px] font-semibold leading-[30px]">
        Popular Cities in {state}
      </h2>

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {cities.map((city, idx) => (
          <Link
            key={idx}
            href={`/state-search/${state}/${city.toLowerCase().replace(/\s+/g, "-")}`}
            className="flex items-center px-[12px] py-[4px] rounded-[16px] h-[28px] border-[1.5px] border-[#475467] text-[#344054] text-[14px] font-medium leading-[20px]"
          >
            {city}
          </Link>

        ))}
      </div>

    </div>
  );
}
