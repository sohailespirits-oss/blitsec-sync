interface PopularCitiesProps {
  state: string;
  cities: string[];
}

export default function PopularCities({ state, cities }: PopularCitiesProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Heading */}
      <h2 className="text-[#101828] text-[20px] font-semibold leading-[30px]">
        Popular Cities in {state}
      </h2>

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {cities.map((city, idx) => (
          <span
            key={idx}
            className="
              px-3 py-1
              border border-[#D0D5DD]
              rounded-full
              text-[#344054]
              text-[14px]
              font-medium
              leading-[20px]
            "
          >
            {city}
          </span>
        ))}
      </div>
    </div>
  );
}
