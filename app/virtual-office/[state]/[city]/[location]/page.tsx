'use server';

import LocationBreadcrumb from '@/app/components/LocationBreadcrumb';
import LocationHeroCard from '@/app/components/LocationHeroCard';
import headerData from '@/api-responses/location-page/header.json';
const receptionistCardBg = "/receptionist-card-bg_1761593285326.webp";
const cashHandsHoldingBg = "/cash-hands-holding_1761593304143.webp";
const multipleProfessionalsBg = "/multiple-professionals_1761593320843.webp";
const businessAddressBg = "/business-address-bg_1761590800705.webp";
import { InteractiveCardsGrid } from "@/app/components/InteractiveCardsGrid";
import { Spacing } from '@/app/components/Spacing';
import { HeroCta } from '@/app/locations/components/hero-cta';
import { FaqSection } from '@/app/components/FaqSection';
import faq from '@/api-responses/location-page/faq.json';
import { RepeaterItem } from '@/app/locations/components/repeater';
import repeaterData from "@/api-responses/location-page/repeater.json"
import { RepeaterSection } from '@/app/components/RepeaterSection';
import { EbookBanner } from '@/app/components/EbookBanner';

type LocationPageParams = {
  state: string;
  city: string;
  location: string;
};

const interactiveCards = [
  {
    bgClass:
      "bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(119,119,119,1)_100%),linear-gradient(0deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%)]",
    bgImage: receptionistCardBg,
    text: "Click to view demo",
    hasButton: true,
    href: undefined,
  },
  {
    bgClass:
      "bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(119,119,119,1)_100%)]",
    bgImage: cashHandsHoldingBg,
    text: "Bundle & Save",
    hasButton: false,
    href: "/cost-comparison/",
  },
  {
    bgClass:
      "bg-[linear-gradient(0deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%),linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(119,119,119,1)_100%)]",
    bgImage: multipleProfessionalsBg,
    text: "Is a virtual office for me?",
    hasButton: false,
    href: "/is-a-virtual-office-for-me/",
  },
  {
    bgClass:
      "bg-[linear-gradient(0deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%),linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(119,119,119,1)_100%)]",
    bgImage: businessAddressBg,
    text: "Address Only",
    hasButton: false,
    href: "/prestigious-business-address/",
  },
];

export default async function LocationPage({ params }: { params: Promise<LocationPageParams> }) {
  const { state, city, location } = await params;
  const locId = headerData.signupUrl.match(/locid=(\d+)/)?.[1] || '776';

  return (
    <main className="flex font-inter min-h-screen flex-col items-center bg-white justify-center pt-[72px] lg:pt-[60px] sm:pt-[104px]">

      <div className="hidden sm:block">
        <Spacing size={40} />
      </div>
      <LocationBreadcrumb city={city ?? ""} state={state ?? ""} />
      <LocationHeroCard data={headerData} />
      <div className="block sm:hidden">
        <Spacing size={12} />
      </div>

      {/* sm and above */}
      <div className="hidden sm:block">
        <Spacing size={40} />
      </div>


      <InteractiveCardsGrid interactiveCards={interactiveCards} />

      <div className='pt-[40px] lg:pt-[48px] lg:pb-[48px] w-full'>
        {/* <Spacing size={64} /> */}
        <HeroCta />
      </div>
      <Spacing size={64} />

      <RepeaterSection
        items={repeaterData}
        cityName={city}
        locId={locId}
        price={headerData.price}
      />
      <Spacing size={60} />
      <FaqSection data={faq} />

      <EbookBanner />
    </main>
  );
}
