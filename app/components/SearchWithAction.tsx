'use client';

import Link from "next/link";
import { ActionSearchBar, type LocationItem } from "@/app/components/ActionSearchBar";
import { Button } from "@/app/components/ui/button";

interface BrowseLink {
  href: string;
  label: string;
}

interface SearchWithActionProps {
  className?: string;
  placeholder?: string;
  onSelect?: (location: LocationItem) => void;
  buttonLabel?: string;
  browseLink?: BrowseLink;
  searchContainerClassName?: string;
}

export function SearchWithAction({
  className = "",
  placeholder = "Search for Zip, State, or City",
  onSelect,
  buttonLabel = "Get Started",
  browseLink,
  searchContainerClassName = "sm:max-w-[400px]",
}: SearchWithActionProps) {
  return (
    <div className={`flex w-full max-w-[800px] flex-col items-start gap-3 ${className}`}>
      <div className="flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div className={`flex w-full flex-1 flex-col items-start gap-1.5 ${searchContainerClassName}`}>
          <ActionSearchBar placeholder={placeholder} onSelect={onSelect} />
        </div>

        <Button
          className="hidden h-[50px] w-full gap-1.5 rounded-lg border border-solid border-[#36bff9] bg-blue-light400 px-[18px] py-3 text-basewhite shadow-shadows-shadow-xs transition-colors hover:border-blue-light700 hover:bg-blue-light700 font-text-sm-text-md-semibold font-[number:var(--text-sm-text-md-semibold-font-weight)] text-[length:var(--text-sm-text-md-semibold-font-size)] tracking-[var(--text-sm-text-md-semibold-letter-spacing)] leading-[var(--text-sm-text-md-semibold-line-height)] [font-style:var(--text-sm-text-md-semibold-font-style)] sm:flex sm:w-auto"
          data-testid="button-get-started"
        >
          {buttonLabel}
        </Button>
      </div>

      {browseLink && (
        <Link href={browseLink.href} prefetch={false}>
          <p className="[font-family:'Inter',Helvetica] cursor-pointer text-sm font-bold leading-normal text-gray-600 transition-colors hover:text-[#181d27]">
            {browseLink.label}
          </p>
        </Link>
      )}
    </div>
  );
}
