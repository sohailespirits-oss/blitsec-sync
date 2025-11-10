import { Metadata } from "next";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { PopularLocations } from "@/app/components/PopularLocations";
import { EbookBanner } from "@/app/components/EbookBanner";
import { Reviews } from "@/app/components/Reviews";
import { StatesList } from "@/app/components/StatesList";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Virtual Office Locations - 650+ Locations | Opus Virtual Offices",
  description: "Find your perfect virtual office location across 650+ locations in the USA, Canada, and Puerto Rico. Premium business addresses starting at $99/month.",
};

const FEATURES = [
  "Prestigious Business Address",
  "Professional Live Call Answering",
  "Personalized Call Transferring",
  "Business Phone/Fax Number",
  "Professional Mail Receipt",
  "Voicemail/Fax Converted to Email"
];

const PREMIUM_LOCATIONS = [
  {
    city: "Atlanta, GA",
    image: "/figmaAssets/atlanta.jpg",
    address: "3379 Peachtree Road NE",
    suite: "Suite 555",
    zip: "Atlanta, GA 30326"
  },
  {
    city: "New York, NY",
    image: "/figmaAssets/newyork.jpg",
    address: "26 Broadway, Suite 934",
    suite: "",
    zip: "New York, NY 10004"
  },
  {
    city: "Austin, TX",
    image: "/figmaAssets/austin.jpg",
    address: "1005 Congress Avenue",
    suite: "Suite 320",
    zip: "Austin, TX 78701"
  },
  {
    city: "Los Angeles, CA",
    image: "/figmaAssets/losangeles.jpg",
    address: "458 Wilshire Blvd",
    suite: "Suite 2",
    zip: "Los Angeles, CA 90010"
  }
];

export default function VirtualOfficePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white pt-[96px] lg:pt-[128px] pb-7">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="flex items-start gap-8">
            {/* Left Column - Heading and Search */}
            <div className="flex flex-col justify-center items-start gap-12 w-[768px] self-stretch">
              <div className="flex max-w-[768px] flex-col items-start gap-6 self-stretch">
                <h1 className="self-stretch text-[36px] leading-[44px] font-normal tracking-[-0.72px]">
                  <span className="text-gray-900">Find Your Virtual Office Location: </span>
                  <span className="font-bold text-[#0086C9]">650+</span>
                  <span className="text-gray-900"> Locations Await – Seamless Virtual Office Solutions at </span>
                  <span className="font-bold text-[#17B26A]">$99/</span>
                  <span className="text-black">month</span>
                </h1>
              </div>

              {/* Search Bar */}
              <div className="flex max-w-[925px] items-start gap-[18.5px]">
                <div className="flex flex-col items-start gap-[12.757px] w-[556px]">
                  <div className="flex flex-col items-start gap-[6.379px] self-stretch">
                    <div className="flex h-[101px] px-[14.883px] py-[12.757px] items-center gap-[8.505px] self-stretch rounded-[8.505px] border border-gray-300 bg-white shadow-[0_1.063px_2.126px_0_rgba(16,24,40,0.05)]">
                      <div className="flex items-center gap-[8.505px] flex-1">
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" className="w-[21.262px] h-[21.262px] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]">
                          <g filter="url(#filter0_d_365_4926)">
                            <path d="M2 7.94369C2 5.62828 2 4.47058 2.45061 3.58621C2.84697 2.80829 3.47944 2.17583 4.25735 1.77947C5.14172 1.32886 6.29942 1.32886 8.61483 1.32886H13.9894C16.3048 1.32886 17.4625 1.32886 18.3469 1.77947C19.1248 2.17583 19.7572 2.80829 20.1536 3.58621C20.6042 4.47058 20.6042 5.62828 20.6042 7.94369V13.3182C20.6042 15.6336 20.6042 16.7913 20.1536 17.6757C19.7572 18.4536 19.1248 19.0861 18.3469 19.4825C17.4625 19.9331 16.3048 19.9331 13.9894 19.9331H8.61483C6.29942 19.9331 5.14172 19.9331 4.25735 19.4825C3.47944 19.0861 2.84697 18.4536 2.45061 17.6757C2 16.7913 2 15.6336 2 13.3182V7.94369Z" fill="white"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.6176 8.51248L16.6175 8.54072C16.6174 8.55261 16.6173 8.56451 16.6172 8.5764C16.6175 8.59029 16.6176 8.60428 16.6176 8.6184C16.6176 10.8351 14.8905 12.7973 13.7349 14.1104C13.3995 14.4914 13.1123 14.8178 12.9293 15.0798C12.2784 16.0119 11.9349 17.0218 11.8445 17.4101C11.8445 17.7026 11.6017 17.9398 11.3021 17.9398C11.0025 17.9398 10.7597 17.7026 10.7597 17.4101C10.6693 17.0218 10.3258 16.0119 9.67492 15.0798C9.49194 14.8178 9.2047 14.4914 8.86936 14.1104C7.71367 12.7973 5.98662 10.8351 5.98662 8.6184C5.98662 8.60428 5.98675 8.59029 5.98702 8.5764C5.98675 8.55512 5.98662 8.53381 5.98662 8.51248C5.98662 5.64595 8.36644 3.32217 11.3021 3.32217C14.2378 3.32217 16.6176 5.64595 16.6176 8.51248ZM11.3021 10.4191C12.4404 10.4191 13.3632 9.51806 13.3632 8.40655C13.3632 7.29504 12.4404 6.39399 11.3021 6.39399C10.1638 6.39399 9.241 7.29504 9.241 8.40655C9.241 9.51806 10.1638 10.4191 11.3021 10.4191Z" fill="#34A851"/>
                            <path d="M16.0231 6.12514C15.3722 4.90052 14.2362 3.96121 12.8637 3.54993L9.81088 7.01741C10.1862 6.6334 10.7155 6.39417 11.3021 6.39417C12.4404 6.39417 13.3632 7.29522 13.3632 8.40673C13.3632 8.86017 13.2096 9.2786 12.9505 9.61509L16.0231 6.12514Z" fill="#4285F5"/>
                            <path d="M8.931 14.1805C8.91065 14.1574 8.89009 14.1341 8.86936 14.1105C8.10757 13.245 7.09752 12.0974 6.4975 10.7808L9.6704 7.17691C9.40119 7.517 9.241 7.94354 9.241 8.40665C9.241 9.51816 10.1638 10.4192 11.3021 10.4192C11.8787 10.4192 12.4 10.188 12.7741 9.81535L8.931 14.1805Z" fill="#F9BB0E"/>
                            <path d="M7.24431 5.15979C6.45975 6.06423 5.98662 7.23445 5.98662 8.51258C5.98662 8.53391 5.98675 8.55522 5.98702 8.5765C5.98675 8.59039 5.98662 8.60438 5.98662 8.6185C5.98662 9.37404 6.18725 10.1 6.4975 10.7808L9.66505 7.18299L7.24431 5.15979Z" fill="#E74335"/>
                            <path d="M12.8637 3.54977C12.3699 3.40182 11.8455 3.32217 11.3021 3.32217C9.67539 3.32217 8.21935 4.03569 7.24432 5.15969L9.66506 7.18286L9.67033 7.17689C9.71436 7.12126 9.7613 7.06794 9.81095 7.01715L12.8637 3.54977Z" fill="#1A73E6"/>
                          </g>
                          <defs>
                            <filter id="filter0_d_365_4926" x="-1.32887" y="-1" width="25.2619" height="25.262" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                              <feOffset dy="1"/>
                              <feGaussianBlur stdDeviation="1"/>
                              <feComposite in2="hardAlpha" operator="out"/>
                              <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"/>
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_365_4926"/>
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_365_4926" result="shape"/>
                            </filter>
                          </defs>
                        </svg>
                        <input
                          type="text"
                          placeholder="Search for Zip, State, or City"
                          className="flex-1 overflow-hidden text-ellipsis text-gray-500 text-[30px] font-medium leading-[38px] outline-none placeholder:text-gray-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button className="flex h-[101px] px-[18px] py-3 justify-center items-center gap-[6px] rounded-lg border-2 border-white/12 bg-[#36BFFA] shadow-[0_0_0_1px_rgba(10,13,18,0.18)_inset,0_-2px_0_0_rgba(10,13,18,0.05)_inset,0_1px_2px_0_rgba(10,13,18,0.05)]">
                  <div className="flex px-[2px] justify-center items-center">
                    <span className="text-white text-base font-semibold leading-6">Sign up</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Column - Features List */}
            <div className="flex max-w-[480px] pb-[13px] pl-4 flex-col items-start gap-3 self-stretch">
              <div className="flex py-3 justify-center items-center gap-[6px] rounded-lg">
                <div className="flex px-[2px] justify-center items-center">
                  <span className="text-gray-600 text-base leading-6">
                    <span className="font-normal">When We Say</span>
                    <span className="font-semibold"> All-Inclusive,</span>
                    <br />
                    <span className="font-normal">We Mean </span>
                    <span className="font-semibold">ALL-INCLUSIVE:</span>
                  </span>
                </div>
              </div>

              {FEATURES.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="w-8 h-8">
                    <rect width="32" height="32" rx="16" fill="#E0F2FE"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M22.7952 9.85337L13.2485 19.0667L10.7152 16.36C10.2485 15.92 9.51522 15.8934 8.98188 16.2667C8.46188 16.6534 8.31522 17.3334 8.63522 17.88L11.6352 22.76C11.9285 23.2134 12.4352 23.4934 13.0085 23.4934C13.5552 23.4934 14.0752 23.2134 14.3685 22.76C14.8485 22.1334 24.0085 11.2134 24.0085 11.2134C25.2085 9.98671 23.7552 8.90671 22.7952 9.84004V9.85337Z" fill="#36BFFA"/>
                  </svg>
                  <div className="flex w-[356px] pt-[2px] flex-col items-start">
                    <span className="text-gray-600 text-lg font-normal leading-7">{feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* State Selection Sections - Loaded from API */}
      <StatesList />

      {/* Top Premium Locations */}
      <section className="py-10 bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="flex justify-between items-start flex-wrap gap-8 mb-16">
            <div className="flex flex-col gap-5 min-w-[480px] max-w-[768px] flex-1">
              <h2 className="text-[#181D27] text-[36px] leading-[44px] font-semibold tracking-[-0.72px]">
                Top Premium Locations
              </h2>
              <p className="text-[#535862] text-xl leading-[30px]">
                Browse our most popular prestigious virtual office locations throughout the USA.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-8 overflow-x-auto pb-4">
              {PREMIUM_LOCATIONS.map((location, index) => (
                <div key={index} className="min-w-[360px] h-[480px] rounded-none relative flex-shrink-0">
                  <div className="w-full h-full bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
            
            <div className="flex items-start gap-8">
              <button className="w-14 h-14 flex items-center justify-center gap-3 rounded-full border border-[#E9EAEB]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#A4A7AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="w-14 h-14 flex items-center justify-center gap-3 rounded-full border border-[#E9EAEB]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#A4A7AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

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
