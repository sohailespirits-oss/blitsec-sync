'use client';

import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { PopularLocations } from "@/app/components/PopularLocations";
import { EbookBanner } from "@/app/components/EbookBanner";
import { Reviews } from "@/app/components/Reviews";
import { StatesList } from "@/app/components/StatesList";
import { TopPremiumSlider } from "@/app/components/TopPremiumSlider";
import { SearchWithAction } from "@/app/components/SearchWithAction";
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
      <section className="relative overflow-hidden bg-white pt-[96px] lg:pt-[128px] pb-8 [font-family:'Inter',Helvetica]">
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
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,768px)_1fr] gap-12 lg:gap-[32px]">
            {/* Left Column - Heading and Search */}
            <div className="flex flex-col gap-10 lg:max-w-[768px]">
              <div className="flex flex-col gap-6">
                <h1 className="text-[48px] leading-[60px] font-normal tracking-tight text-[#101828]">
                  <span>Find Your Virtual Office Location:</span>
                  <br />
                  <span className="font-semibold text-[#0086C9]">650+</span>
                  <span> Locations Await – Seamless Virtual Office Solutions at </span>
                  <span className="font-semibold text-[#17B26A]">$99/</span>
                  <span>month</span>
                </h1>
              </div>

              <SearchWithAction className="mt-4" />
            </div>

            {/* Right Column - Features List */}
            <div className="flex flex-col gap-[12px] items-start max-w-[416px] pb-[13px] pl-4">
              <div className="flex py-3 justify-center items-center gap-[6px] rounded-lg">
                <div className="flex px-[2px] justify-center items-center">
                  <span className="text-[#475467] text-[16px] font-semibold leading-[24px]">
                    <span className="font-normal">When We Say</span>
                    <span>{` All-Inclusive, `}<br /></span>
                    <span className="font-normal">We Mean </span>ALL-INCLUSIVE:
                  </span>
                </div>
              </div>

              {FEATURES.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="w-8 h-8">
                    <rect width="32" height="32" rx="16" fill="#E0F2FE"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M22.7952 9.85337L13.2485 19.0667L10.7152 16.36C10.2485 15.92 9.51522 15.8934 8.98188 16.2667C8.46188 16.6534 8.31522 17.3334 8.63522 17.88L11.6352 22.76C11.9285 23.2134 12.4352 23.4934 13.0085 23.4934C13.5552 23.4934 14.0752 23.2134 14.3685 22.76C14.8485 22.1334 24.0085 11.2134 24.0085 11.2134C25.2085 9.98671 23.7552 8.90671 22.7952 9.84004V9.85337Z" fill="#36BFFA"/>
                  </svg>
                  <div className="flex flex-col pt-[2px]">
                    <span className="text-[#475467] text-[18px] leading-[28px]">{feature}</span>
                  </div>
                </div>
              ))}
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
