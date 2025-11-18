"use client";

import { useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { FeaturesBoxLocations } from "@/app/components/FeaturesBoxLocations";

type LocationAddress = {
  line1: string;
  suite?: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
};

type LocationHeroData = {
  city: string;
  state: string;
  price: number;
  signupUrl: string;
  address: LocationAddress;
  images: { hero: string[] };
  features: { showMailX?: number };
};

const baseFeatures = [
  "Prestigious Business Address",
  "Professional Live Call Answering",
  "Personalized Call Transferring",
  "Business Phone/Fax Number",
  "Professional Mail Receipt",
  "Voicemail/Fax Converted to Email",
  "Digital Mail Notifications by Mail X"
];

const formatAddress = (address: LocationAddress) => {
  const { line1, suite, city, state, zip } = address;
  return `${line1}${suite ? `, ${suite}` : ""}\n${city}, ${state} ${zip}`;
};

const getImageUrl = (path: string) => {
  if (!path) return "/new-york-aerial-view_1761593422460.webp";
  if (path.startsWith("http")) return path;
  return `https://www.opusvirtualoffices.com${path.startsWith("/") ? path : `/${path}`}`;
};

export default function LocationHeroCard({ data }: { data: LocationHeroData }) {
  const heroImages = useMemo(
    () => (data.images?.hero?.length ? data.images.hero : ["/new-york-aerial-view_1761593422460.webp"]),
    [data.images?.hero]
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const includedFeatures =
    data.features?.showMailX === 1 ? baseFeatures : baseFeatures.slice(0, -1);

  const handleNext = useCallback(
    () => setCurrentImageIndex((prev) => (prev + 1) % heroImages.length),
    [heroImages.length]
  );
  const handlePrev = useCallback(
    () => setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length),
    [heroImages.length]
  );

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-[1280px] px-4 sm:px-6 md:px-8 py-0 justify-center items-start gap-5 md:gap-8">
      <motion.div
        className="flex lg:flex-col flex-row flex-1 items-start justify-start h-full w-full overflow-hidden rounded-[16px] lg:h-[560px] max-w-[696px]"
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0 }}
      >
        <div className="flex h-[214px] w-[42%] sm:h-[400px]  justify-center items-center self-stretch overflow-hidden relative lg:w-full">
          <Image
            src={getImageUrl(heroImages[currentImageIndex])}
            alt={`${data.city} virtual office`}
            className="object-cover w-full h-[214px] sm:w-[150px] lg:w-[400px] sm:h-[360px] lg:h-[400px]"
            fill
            unoptimized
          />

          {heroImages.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="lg:flex hidden bg-white w-[36px] h-[36px] min-w-[36px] min-h-[36px] rounded-full items-center justify-center absolute left-[16px] top-1/2 -translate-y-1/2 z-10 hover:bg-gray-100 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-[20px] h-[20px] text-[#414651]" />
              </button>
              <button
                onClick={handleNext}
                className="lg:flex hidden bg-white w-[36px] h-[36px] min-w-[36px] min-h-[36px] rounded-full items-center justify-center absolute right-[16px] top-1/2 -translate-y-1/2 z-10 hover:bg-gray-100 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-[20px] h-[20px] text-[#414651]" />
              </button>

              <div className="flex flex-row items-center gap-[12px] bg-white rounded-full p-[8px] absolute bottom-[16px] left-1/2 -translate-x-1/2 z-10">
                {heroImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-[8px] h-[8px] rounded-full transition-colors ${idx === currentImageIndex ? "bg-[#0086C9]" : "lg:bg-white bg-gray-300"
                      }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col px-[12px] pt-[12px] pb-[12px] lg:px-[32px] flex-1 min-w-[200px] sm:min-w-[200px] md:min-w-[200px] lg:min-w-[480px] w-full justify-center items-start gap-[12px] md:gap-[8px] self-stretch  border-t border-white/30 bg-[#36BFFA] backdrop-blur-lg">
          <div className="flex flex-row items-center w-full justify-between gap-[16px]">
            <span className="font-inter font-semibold lg:text-[36px] text-[14px] leading-[20px] tracking-normal lg:tracking-[-0.72px] text-white">
              {data.city}, {data.state}
            </span>
            <div className="lg:flex hidden flex-row items-center gap-[4px]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} fill="white" className="w-[20px] h-[20px] text-white" />
              ))}
            </div>
          </div>

          <div className="flex lg:flex-row flex-col items-center w-full justify-between gap-[2px]">
            <span className="font-inter pr-[20px] pb-[12px] lg:font-semibold font-normal lg:text-[18px] text-[12px] text-white leading-[18px] lg:leading-[28px] w-full whitespace-pre-line max-w-[472px]">
              {formatAddress(data.address)}
              {data.address.phone ? `\n${data.address.phone}` : ""}
            </span>

            <div className="flex-row items-end lg:flex hidden max-w-[160px]">
              <span className="font-inter font-bold text-[48px] leading-[100%] tracking-normal text-white">
                ${data.price || 99}
              </span>
              <span className="font-inter font-bold text-[36px] leading-[100%] tracking-normal text-white">/mo</span>
            </div>

            <div className="lg:hidden flex flex-row items-center justify-between w-full">
              <div className="flex flex-row items-center gap-[1.6px]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} fill="white" className="w-[8.8px] h-[8.8px] text-white" />
                ))}
              </div>
              <div className="flex-row items-end flex">
                <span className="font-inter font-bold lg:text-[48px] text-[20px] leading-[100%] tracking-[-2%] text-white">
                  ${data.price || 99}
                </span>
                <span className="font-inter font-bold lg:text-[36px] text-[20px] leading-[100%] tracking-[-2%] text-white">/mo</span>
              </div>
            </div>
          </div>

          <Link
            href={data.signupUrl || "#"}
            className="lg:hidden leading-[20px] text-nowrap flex py-[8px] px-[12px] w-full items-center text-[#414651] justify-center text-center rounded-[8px] bg-white font-inter font-semibold text-[14px] leading-[100%] transition-colors border border-[#D5D7DA]"
          >
            Select this location
          </Link>
        </div>
      </motion.div>

      <div className="flex flex-col justify-between items-start w-full lg:flex-1 lg:max-w-[488px] self-stretch gap-8">
        <FeaturesBoxLocations features={includedFeatures} />

        <span className="hidden sm:inline font-inter font-normal text-[20px] leading-[30px] text-[#475467]">
          All for only <span className="text-[#0086C9] font-bold">${data.price || 99}</span>/month
        </span>


        <Link
          href={data.signupUrl || "#"}
          className="lg:flex tracking-[100%] hidden h-[60px] px-[32px] w-full items-center justify-center text-center rounded-[8px] bg-[#36BFFA] text-white font-inter font-semibold text-[18px] leading-[100%] hover:bg-[#2ea8d9] transition-colors"
        >
          Select This Location
        </Link>
      </div>
    </div>
  );
}
