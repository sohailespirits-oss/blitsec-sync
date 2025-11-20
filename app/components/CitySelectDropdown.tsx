'use client';

import { useState, useRef, useEffect } from "react";
import { MapPin, ChevronDown } from "lucide-react";

interface CitySelectDropdownProps {
  options: string[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function CitySelectDropdown({
  options,
  placeholder = "Select Your City",
  value,
  onChange,
}: CitySelectDropdownProps) {

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-full lg:max-w-[514px]">
      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
  flex items-center
  w-full justify-between
  px-[16.194px] py-[11.567px]
  gap-[9.254px]
  rounded-[9.254px]
  border-[1.157px] border-[#D0D5DD]
  bg-white
  shadow-[0_1.157px_2.313px_rgba(16,24,40,0.05)]
  text-[15px] font-medium text-[#1A1F36]
" >

        <div className="flex items-center gap-3">
          <MapPin className="w-6 lg:w-8 h-6 lg:h-8 text-[#5A6474]" />
          <span
            className={`
    font-inter
    text-[20.821px]
    font-medium
    leading-[32.388px]
    ${value ? "text-[#101828]" : "text-[#5A6474]"}
  `}
          >
            {value || placeholder}
          </span>

        </div>

        <ChevronDown
          className={`w-5 h-5 text-[#5A6474] transition-transform ${open ? "rotate-180" : ""
            }`}
        />
      </button>


      {/* Dropdown Menu */}
      {open && (
        <ul
          className="
            absolute left-0 right-0 mt-2
            bg-white border border-[#E2E4EA]
            rounded-xl shadow-md z-20
            max-h-60 overflow-y-auto
          "
        >
          {options.length === 0 && (
            <li className="px-4 py-2 text-gray-500">No cities available</li>
          )}

          {options.map((city) => (
            <li
              key={city}
              onClick={() => {
                onChange?.(city);
                setOpen(false);
              }}
              className="
                px-4 py-2 cursor-pointer
                hover:bg-gray-100 rounded-lg
              "
            >
              {city}
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}
