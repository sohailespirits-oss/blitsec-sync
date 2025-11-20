import { readFile } from 'fs/promises';
import path from 'path';
import type { Metadata } from 'next';
import LocationBreadcrumb from '@/app/components/LocationBreadcrumb';
import LocationHeroCard from '@/app/components/LocationHeroCard';
const receptionistCardBg = "/receptionist-card-bg_1761593285326.webp";
const cashHandsHoldingBg = "/cash-hands-holding_1761593304143.webp";
const multipleProfessionalsBg = "/multiple-professionals_1761593320843.webp";
const businessAddressBg = "/business-address-bg_1761590800705.webp";
import { InteractiveCardsGrid } from "@/app/components/InteractiveCardsGrid";
import { HeroCta } from '@/app/locations/components/hero-cta';
import { FaqSection } from '@/app/components/FaqSection';
import { RepeaterItem, RepeaterSection } from '@/app/components/RepeaterSection';
import { EbookBanner } from '@/app/components/EbookBanner';
import Spacing from '@/app/components/Spacing';
import { Reviews } from '@/app/components/Reviews';
import PremiumSection from '@/app/components/PremiumSection';
import Padding from '@/app/components/ui/Padding';
import { Footer } from '@/app/components/Footer';

// Helper function to read location JSON data
async function getLocationData(state: string, city: string, locationId: string) {
  const jsonFilePath = path.join(
    process.cwd(),
    'newsite',
    'json',
    'states',
    state,
    city,
    locationId,
    `${locationId}_all_vo.json`
  );

  try {
    const fileContent = await readFile(jsonFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Failed to read location data from ${jsonFilePath}:`, error);
    return null;
  }
}

type LocationPageParams = {
  state: string;
  city: string;
  location: string;
};

// Generate SEO metadata from the JSON file
export async function generateMetadata({ params }: { params: Promise<LocationPageParams> }): Promise<Metadata> {
  const { state, city, location } = await params;
  const locationId = location.replace('location-', '');

  const locationData = await getLocationData(state, city, locationId);

  if (!locationData?.data?.seo) {
    return {
      title: 'Virtual Office | Opus Virtual Offices',
      description: 'Professional virtual office solutions.',
    };
  }

  const seo = locationData.data.seo;

  const metadata: Metadata = {
    title: seo.title,
    description: seo.meta_description,
  };

  if (seo.og) {
    metadata.openGraph = {
      title: seo.og.title,
      description: seo.og.description,
      url: seo.og.url,
      type: seo.og.type as 'website',
      images: seo.og.image ? [seo.og.image] : undefined,
    };
  }

  if (seo.canonical) {
    metadata.alternates = {
      canonical: seo.canonical,
    };
  }

  return metadata;
}

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

  // Extract ID from location param (e.g., "location-684" -> "684")
  const locationId = location.replace('location-', '');

  // Read location data from JSON file
  const locationData = await getLocationData(state, city, locationId);

  if (!locationData) {
    // TODO: Handle 404 or show error page
    return <div>Location not found</div>;
  }

  // Extract data from the JSON response
  const headerData = locationData.data?.header || {};
  const faq = locationData.data?.faqs || [];
  const repeaterData = locationData.data?.sections || [];
  const overviewData = locationData.data?.overview || {};

  const locId = headerData.signupUrl?.match(/locid=(\d+)/)?.[1] || locationId;
  const isPremiumNearby = headerData.nearbypremium === 1;
  const ismailbox = headerData.nearbypopular === 1;

  return (
    <div className="flex font-inter min-h-screen flex-col items-center bg-white justify-center w-full pt-[72px] lg:pt-[104px]">
      <main className="flex font-inter min-h-screen flex-col items-center bg-white justify-center lg:pt-[40px]">
        <LocationBreadcrumb city={city ?? ""} state={state ?? ""} />
        <LocationHeroCard data={headerData} ismailbox={ismailbox} />
        <InteractiveCardsGrid interactiveCards={interactiveCards} />
        {isPremiumNearby && (
          <PremiumSection href='/' />
        )}
        <div className='lg:pb-[0px] w-full'>
          <HeroCta />
        </div>
        <RepeaterSection
          items={repeaterData as RepeaterItem[]}
          overviewData={overviewData}
          cityName={city}
          locId={locId}
          price={headerData.price}
        />
        <FaqSection data={faq} />
        {!isPremiumNearby && (
          <Reviews />
        )}
        <div className='w-full py-[30px] sm:py-[30px] md:py-[40px] lg:py-[40px]'>
        <EbookBanner />
        </div>
      </main>
      <Footer />
    </div>
  );
}