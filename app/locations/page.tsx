import React from 'react'
import LocationsHero from './components/hero'
import { HeroCta } from './components/hero-cta'
import { Faqs } from './components/faqs';
import { EbookBanner } from '../components/EbookBanner';
import { Reviews } from '../components/Reviews';
import { Repeater, RepeaterItem } from './components/repeater';
import { TextWithMaps } from './components/text-with-maps';
import headerData from "@/api-responses/location-page/header.json"
import faqData from "@/api-responses/location-page/faq.json"
import repeaterData from "@/api-responses/location-page/repeater.json"
import overviewData from "@/api-responses/location-page/overview.json"

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
        </>
    )
}

export default LocationsPage