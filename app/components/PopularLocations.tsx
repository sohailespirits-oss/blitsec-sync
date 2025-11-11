'use client';
import Link from "next/link";
import Image from "next/image";

const popularLocations = [
  { name: "Atlanta, GA", image: "/atlanta.webp", href: "/virtual-office/georgia/atlanta/location-684/" },
  { name: "Austin, TX", image: "/austin.webp", href: "/virtual-office/texas/austin/location-1475/" },
  { name: "Beverly Hills, CA", image: "/beverly-hills.webp", href: "/virtual-office/california/beverly-hills/location-936/" },
  { name: "Boca Raton, FL", image: "/boca-raton.webp", href: "/virtual-office/florida/boca-raton/location-776/" },
  { name: "Brooklyn, NY", image: "/brooklyn.webp", href: "/virtual-office/new-york/brooklyn/location-1477/" },
  { name: "Chicago, IL", image: "/chicago.webp", href: "/virtual-office/illinois/chicago/location-1430/" },
  { name: "Dallas, TX", image: "/dallas.webp", href: "/virtual-office/texas/dallas/location-1255/" },
  { name: "Fort Lauderdale, FL", image: "/fort-lauderdale.webp", href: "/virtual-office/florida/fort-lauderdale/location-803/" },
  { name: "Houston, TX", image: "/houston.webp", href: "/virtual-office/texas/houston/location-1323/" },
  { name: "Los Angeles, CA", image: "/los-angeles.webp", href: "/virtual-office/california/los-angeles/location-1362/" },
  { name: "Miami, FL", image: "/miami.webp", href: "/virtual-office/florida/miami/location-1285/" },
  { name: "Nashville, TN", image: "/nashville.webp", href: "/virtual-office/tennessee/nashville/location-1476/" },
  { name: "New York, NY", image: "/new-york.webp", href: "/virtual-office/new-york/new-york/location-1450/" },
  { name: "Orlando, FL", image: "/orlando.webp", href: "/virtual-office/florida/orlando/location-1499/" },
  { name: "Tampa, FL", image: "/tampa.webp", href: "/virtual-office/florida/tampa/location-885/" },
  { name: "Wilmington, DE", image: "/delaware.webp", href: "/virtual-office/delaware/wilmington/location-942/" },
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
