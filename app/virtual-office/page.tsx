'use client';

import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { PopularLocations } from "@/app/components/PopularLocations";
import { EbookBanner } from "@/app/components/EbookBanner";
import { Reviews } from "@/app/components/Reviews";
import { StatesList } from "@/app/components/StatesList";
import { TopPremiumSlider } from "@/app/components/TopPremiumSlider";
import { SearchWithAction } from "@/app/components/SearchWithAction";
import { FeaturesBoxLocations } from "@/app/components/FeaturesBoxLocations";
import Image from "next/image";

const FEATURES = [
  "Prestigious Business Address",
  "Professional Live Call Answering",
  "Personalized Call Transferring",
  "Business Phone/Fax Number",
  "Professional Mail Receipt",
  "Voicemail/Fax Converted to Email"
];

export default function VirtualOfficePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-[96px] lg:pt-[128px] pb-8 mb-5 [font-family:'Inter',Helvetica]">
        <div className="absolute inset-0 opacity-40 pointer-events-none" aria-hidden="true">
          <Image
            src="/dots.svg"
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,768px)_1fr] gap-3 lg:gap-[32px]">
            {/* Left Column - Heading and Search */}
            <div className="flex flex-col lg:gap-10 lg:max-w-[768px]">
              <div className="flex flex-col gap-6">
                <h1 className="text-[24px] leading-[32px] font-normal tracking-tight text-[#101828] lg:text-[48px] lg:leading-[60px]">
                  <span>Find Your Virtual Office Location: </span>
                  <span className="font-semibold text-[#0086C9]">650+</span>
                  <span> Locations Await – Seamless Virtual Office Solutions at </span>
                  <span className="font-semibold text-[#17B26A]">$99/</span>
                  <span>month</span>
                </h1>
              </div>

              <SearchWithAction className="mt-5 lg:mt-6" />
            </div>

            {/* Right Column - Features List */}
            <div className="w-full max-w-[416px] lg:pl-4">
              <FeaturesBoxLocations features={FEATURES} />
            </div>
          </div>
        </div>
      </section>

      {/* State Selection Sections - Loaded from API */}
      <StatesList />

      <TopPremiumSlider />

      {/* Most Popular Cities */}
      <PopularLocations
        title="Most Popular Cities"
        description="From the skyscrapers of NYC to the valleys of California, you'll be sure to find the perfect new business address in all major cities across the country."
        count={16}
        align="center"
      />

      {/* Reviews Section */}
      <Reviews />

      {/* CTA Section */}
      <EbookBanner />

      <Footer />
    </div>
  );
}
