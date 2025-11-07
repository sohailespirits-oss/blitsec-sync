'use client';
import Link from "next/link";
import Image from "next/image";

const popularLocations = [
  { name: "Atlanta, GA", image: "https://api.builder.io/api/v1/image/assets/TEMP/064b6712d95273396330e06c658c4a8af19a9389?width=560", href: "/virtual-office/georgia/atlanta/location-684/" },
  { name: "Chicago, IL", image: "https://api.builder.io/api/v1/image/assets/TEMP/f1c8b28f46d86dc904f456da3df714aeb96dccdd?width=560", href: "/virtual-office/illinois/chicago/location-1430/" },
  { name: "Dallas, TX", image: "https://api.builder.io/api/v1/image/assets/TEMP/e4cdb897aef8f15e1674f5b715dbd4d8e72435fc?width=560", href: "/virtual-office/texas/dallas/location-1255/" },
  { name: "Houston, TX", image: "https://api.builder.io/api/v1/image/assets/TEMP/67646f1366fd0f1dfd149bbdcb819f539d051db6?width=560", href: "/virtual-office/texas/houston/location-1323/" },
  { name: "Los Angeles, CA", image: "https://api.builder.io/api/v1/image/assets/TEMP/fd1d05e164b2440de176a95ebc109a66d88ca6ec?width=560", href: "/virtual-office/california/los-angeles/location-1362/" },
  { name: "New York, NY", image: "https://api.builder.io/api/v1/image/assets/TEMP/f4a70289a97c557a7e2d32130973f8c1495a3f90?width=560", href: "/virtual-office/new-york/new-york/location-1450/" },
  { name: "Miami, FL", image: "https://api.builder.io/api/v1/image/assets/TEMP/2be9576251f6b4eab095d3fd742f7432e530b11d?width=560", href: "/virtual-office/florida/miami/location-1285/" },
  { name: "Tampa, FL", image: "https://api.builder.io/api/v1/image/assets/TEMP/ea1042815a7dc0862e328858ac5ffed92f00eb5e?width=560", href: "/virtual-office/florida/tampa/location-885/" },
  { name: "Boca Raton, FL", image: "https://api.builder.io/api/v1/image/assets/TEMP/8e054960d81e7cef9321ad4ae340e5b4941abbe1?width=560", href: "/virtual-office/florida/boca-raton/location-1/" },
  { name: "Brooklyn, NY", image: "https://api.builder.io/api/v1/image/assets/TEMP/a714754d025d209100be812fd3c2866098c8fda0?width=560", href: "/virtual-office/new-york/brooklyn/location-1/" },
  { name: "Fort Lauderdale", image: "https://api.builder.io/api/v1/image/assets/TEMP/bda4eb6068060fa789911cfc7a466dcaf9023b5a?width=560", href: "/virtual-office/florida/fort-lauderdale/location-1/" },
  { name: "Delaware", image: "https://api.builder.io/api/v1/image/assets/TEMP/4c42707606ae0ddda1654859d64dc8d3a3b326cc?width=560", href: "/virtual-office/delaware/location-1/" },
  { name: "Orlando", image: "https://api.builder.io/api/v1/image/assets/TEMP/84d0d24717470fddbf6389b3891c60ce36acb83f?width=560", href: "/virtual-office/florida/orlando/location-1/" },
  { name: "Nashville", image: "https://api.builder.io/api/v1/image/assets/TEMP/c02c96d9765bdacc6e54d6ae0c35a3324bfbb268?width=560", href: "/virtual-office/tennessee/nashville/location-1/" },
  { name: "Austin", image: "https://api.builder.io/api/v1/image/assets/TEMP/b67758d97629820889c55085ca826f58516fbb16?width=560", href: "/virtual-office/texas/austin/location-1/" },
  { name: "Beverly Hills", image: "https://api.builder.io/api/v1/image/assets/TEMP/c6113db8607520122f0c74ca11ccd76f5bf11139?width=560", href: "/virtual-office/california/beverly-hills/location-1/" },
];

interface PopularLocationsProps {
  title?: string;
  description?: string;
  showViewAllLink?: boolean;
  count?: number;
  align?: 'left' | 'center';
}

export function PopularLocations({
  title = "Most Popular Cities",
  description = "From the skyscrapers of NYC to the valleys of California, you'll be sure to find the perfect new business address in all major cities across the country.",
  showViewAllLink = false,
  count = 16,
  align = 'left'
}: PopularLocationsProps) {
  const displayedLocations = popularLocations.slice(0, count);

  // When align is 'center', add mx-auto to center the main container
  const containerClass = align === 'center' ? 'flex max-w-[1280px] w-full px-8 flex-col items-start gap-16 mx-auto' : 'flex max-w-[1280px] w-full px-8 flex-col items-start gap-16';

  return (
    <div className="flex w-full py-10 px-0 flex-col items-center bg-white">
      <div className={containerClass}>
        <div className="flex flex-col items-start gap-8">
          <div className="flex max-w-[768px] flex-col items-start gap-5">
            <h2 className="text-gray-900 text-4xl font-semibold leading-[44px] tracking-[-0.72px]">
              {title}
            </h2>
            <p className="text-gray-600 text-xl font-normal leading-[30px]">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-start content-start gap-x-8 gap-y-12 w-full flex-wrap">
          {displayedLocations.map((location, index) => (
            <Link
              key={index}
              href={location.href}
              prefetch={false}
              className="flex min-w-[240px] flex-col items-start gap-6 flex-1 basis-0"
            >
              <div className="h-[200px] self-stretch rounded-lg overflow-hidden relative">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col items-start gap-6 self-stretch">
                <div className="flex flex-col items-start gap-4 self-stretch">
                  <div className="flex flex-col items-start gap-1 self-stretch">
                    <h3 className="self-stretch text-gray-900 text-xl font-semibold leading-[30px]">
                      {location.name}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
