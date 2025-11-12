'use client';
import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface FeaturesBoxLocationsProps {
  features: string[];
}

export const FeaturesBoxLocations = ({ features }: FeaturesBoxLocationsProps) => {
  const [showAll, setShowAll] = useState(false);

  // Check if there are more than 3 features to show the button
  const hasMoreFeatures = features.length > 3;

  return (
    <div className="inline-flex flex-col w-full lg:max-w-[418px] self-stretch items-start gap-3 sm:gap-2.5 pl-0 pr-0 py-0">
      <p className="font-text-sm-text-md-regular font-[number:var(--text-sm-text-md-regular-font-weight)] text-gray-600 text-[length:var(--text-sm-text-md-regular-font-size)] tracking-[var(--text-sm-text-md-regular-letter-spacing)] leading-[var(--text-sm-text-md-regular-line-height)] [font-style:var(--text-sm-text-md-regular-font-style)]">
        When We Say <span className="font-semibold">All-Inclusive,</span><br />We Mean <span className="font-semibold">ALL-INCLUSIVE:</span>
      </p>

      <div className="inline-flex flex-col items-start gap-3.5 sm:gap-3 w-full">
        {features.map((feature, index) => {
          // On mobile: hide items after index 2 unless showAll is true
          // On desktop (lg+): always show all items
          const isHiddenOnMobile = !showAll && index >= 3;

          return (
            <div
              key={index}
              className={`inline-flex items-center gap-2.5 sm:gap-[12px] ${isHiddenOnMobile ? 'lg:flex hidden' : 'flex'}`}
              data-testid={`feature-${index}`}
            >
              <Image
                className="w-[36px] h-[36px] flex-shrink-0"
                alt="Check icon"
                src="/figmaAssets/check-icon.svg"
                width="36"
                height="36"
                loading="eager"
              />
              <div className="flex flex-col w-full items-start pt-0.5 pb-0 px-0">
                <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-base sm:text-sm md:text-[18px] tracking-[0] leading-normal">
                  {feature}
                </p>
              </div>
            </div>
          );
        })}

        {/* Show All Features Button - Only visible on mobile when there are more than 3 features */}
        {hasMoreFeatures && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="lg:hidden inline-flex items-center gap-2 text-[#475467] font-semibold text-base hover:text-[#026AA2] transition-colors mt-2"
            data-testid="see-all-features-button"
          >
            <ChevronDown className="w-[24px] h-[24px] min-w-[24px] min-h-[24px]" />
            <span>See All Features</span>
          </button>
        )}
      </div>
    </div>
  );
};
