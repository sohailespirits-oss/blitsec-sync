"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";

type BreadcrumbProps = {
  city: string;
  state: string;
};

export default function LocationBreadcrumb({ city, state }: BreadcrumbProps) {
  const cityLabel = city || "";
  const stateLabel = state || "";

  return (
    <div className="flex flex-col lg:flex-row w-full lg:gap-[32px] px-4 sm:px-6 md:px-8 max-w-screen-xl mx-auto mb-[8px] sm:mb-4 items-start lg:items-center justify-between mt-30">
      <div className="flex w-full lg:w-[50%] flex-col sm:py-[12px] py-[8px] gap-[8px] max-w-[762px]">
        <div className="flex flex-row items-center gap-[8px]">
          <span className="font-inter  font-semibold text-[14px] leading-[100%] text-[#717680]">Locations</span>
          <ChevronRight className="w-[16px] h-[16px] min-w-[16px] min-h-[16px]" />
          <span className="font-inter font-semibold text-[14px] leading-[100%] tracking-[0] text-[#717680] capitalize">{stateLabel}</span>
          <ChevronRight className="w-[16px] h-[16px] min-w-[16px] min-h-[16px]" />
          <span className="font-inter font-semibold text-[14px] leading-[100%] tracking-[0] text-[#026AA2] capitalize">{cityLabel}</span>
        </div>
        <span className="font-inter text-[20px] leading-[30px] sm:leading-[120%] font-medium lg:text-[36px] tracking-[-2%]">
          Virtual office in <span className="font-bold text-[#36BFFA] capitalize">{cityLabel}</span>
        </span>

        <span className="font-inter font-normal lg:text-[16px] text-[12px] text-[#475467] leading-[130%]">
        <span className="font-bold text-[#36BFFA] capitalize">{cityLabel}</span> Virtual Business Address & Live Receptionist Answering Service
        </span>
      </div>

      <div className="flex flex-row py-[4px] h-auto items-center lg:gap-[32px] gap-[12px] justify-start lg:justify-center sm:pb-1 lg:pt-1 flex-wrap lg:flex-nowrap self-end lg:self-center">
        <Image
          src={"/locations/review-companies-1.svg"}
          alt="BBB A+ rating"
          width={130}
          height={46}
          className="lg:w-[130px] lg:h-[46px] w-[76px] h-[24px]"
        />
        <Image
          src={"/locations/review-companies-2.svg"}
          alt="Trustpilot"
          width={130}
          height={46}
          className="lg:w-[130px] lg:h-[46px] w-[76px] h-[24px]"
        />
        <Image
          src={"/locations/review-companies-3.svg"}
          alt="Google rating"
          width={130}
          height={46}
          className="lg:w-[130px] lg:h-[46px] w-[76px] h-[24px]"
        />
      </div>
    </div>
  );
}
