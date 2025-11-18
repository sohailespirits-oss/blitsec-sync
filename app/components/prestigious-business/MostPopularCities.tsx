'use client';

import Image from "next/image";
import Link from "next/link";

const cities = [
  {
    name: "Atlanta",
    state: "GA",
    image: "/atlanta.webp",
    href: "/virtual-office/atlanta-georgia/",
  },
  {
    name: "Chicago",
    state: "IL",
    image: "/chicago.webp",
    href: "/virtual-office/chicago-illinois/",
  },
  {
    name: "Dallas",
    state: "TX",
    image: "/dallas.webp",
    href: "/virtual-office/dallas-texas/",
  },
  {
    name: "Houston",
    state: "TX",
    image: "/houston.webp",
    href: "/virtual-office/houston-texas/",
  },
  {
    name: "Los Angeles",
    state: "CA",
    image: "/los-angeles.webp",
    href: "/virtual-office/los-angeles-california/",
  },
  {
    name: "Miami",
    state: "FL",
    image: "/miami.webp",
    href: "/virtual-office/miami-florida/",
  },
  {
    name: "New York",
    state: "NY",
    image: "/new-york.webp",
    href: "/virtual-office/new-york-new-york/",
  },
  {
    name: "Tampa",
    state: "FL",
    image: "/tampa.webp",
    href: "/virtual-office/tampa-florida/",
  },
];

export function MostPopularCities() {
  return (
    <section className="flex w-full bg-white py-12 sm:py-16 md:py-20 lg:py-[40px]">
      <div className="flex w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col w-full gap-8 md:gap-12 lg:gap-[64px]">
          {/* Header Section */}
          <div className="flex flex-col items-start">
            <h2 className="text-[32px] sm:text-[32px] md:text-[36px] lg:text-[36px] font-[600] leading-[44px] tracking-[-0.72px] text-[#101828] mb-[20px]">
             Most Popular Cities
            </h2>
            <div className="flex flex-col">
              <p className="text-[16px] md:text-[18px] lg:text-[20px] font-normal leading-[30px] text-[#475467]">
                Over 100 Locations Across the USA <br /> Prestigious Business Address for Only $59/mo
              </p>
            </div>
          </div>

          {/* City Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-x-[32px] lg:gap-y-[48px] w-full">
            {cities.map((city, index) => (
              <Link
                key={index}
                href={city.href}
                prefetch={false}
                className="flex flex-col gap-[24px] group cursor-pointer"
              >
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden max-h-[200px]">
                  <Image
                    src={city.image}
                    alt={`${city.name}, ${city.state} skyline`}
                    fill
                    className="object-cover transition-transform rounded-lg duration-300 group-hover:scale-105 h-[200px]!"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <h3 className="text-[16px] md:text-[18px] lg:text-[20px] font-semibold leading-[30px] text-[#101828] text-center transition-colors">
                    {city.name}, {city.state}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


