import React from 'react'
import type { Metadata } from 'next';
import { getSeoMetadata } from '@/app/lib/seo';
import LocationsHero from './components/hero'
import { HeroCta } from './components/hero-cta'
import { Faqs } from './components/faqs';
import { EbookBanner } from '../components/EbookBanner';
import { Reviews } from '../components/Reviews';
import { Footer } from '../components/Footer';
import { Repeater, RepeaterItem } from './components/repeater';
import { TextWithMaps } from './components/text-with-maps';
import headerData from "@/api-responses/location-page/header.json"
import faqData from "@/api-responses/location-page/faq.json"
import repeaterData from "@/api-responses/location-page/repeater.json"
import overviewData from "@/api-responses/location-page/overview.json"

// Force dynamic rendering to fetch SEO on every request
export const dynamic = 'force-dynamic';

// Fetch SEO metadata from location-specific JSON file
// Pattern: /newsite/json/states/{state}/{city}/{locationId}/{locationId}_seo_vo.json
export async function generateMetadata(): Promise<Metadata> {
  // Extract location data from headerData
  const state = headerData.state.toLowerCase().replace(/\s+/g, '-');
  const city = headerData.city.toLowerCase().replace(/\s+/g, '-');
  const locationId = headerData.signupUrl.match(/locid=(\d+)/)?.[1] || '776';

  const jsonPath = `states/${state}/${city}/${locationId}/${locationId}_seo_vo`;
  return getSeoMetadata(jsonPath);
}

function LocationsPage() {
    // Extract locId from signupUrl
    const locId = headerData.signupUrl.match(/locid=(\d+)/)?.[1] || '776';

    // Type assertion for repeater data
    const repeaterItems = repeaterData as RepeaterItem[];

    return (
        <>
            <LocationsHero
                data={headerData}
            />

            <HeroCta />
            <TextWithMaps data={overviewData} />
            <Faqs data={faqData} />

            <Repeater
                items={repeaterItems}
                cityName={headerData.city}
                locId={locId}
                price={headerData.price}
            />
            <Reviews />

            <EbookBanner />

            <div className="py-6 sm:py-8 md:py-10"></div>

            <Footer />
        </>
    )
}

export default LocationsPage