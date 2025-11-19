import React from "react";
import Link from "next/link";

interface CTASectionProps {
    href: string;
    price?: string; // default: "$99/mo"
}

const PremiumSection: React.FC<CTASectionProps> = ({ href, price = "$99/mo" }) => {
    return (
        <div className="hidden md:flex w-full justify-center py-10 px-8 max-w-[1280px] m-0">
            <Link
                href={href}
                className="
          w-full
          max-w-[1280px]
         rounded-[12px] bg-[linear-gradient(63deg,#065986_16.72%,#0086C9_83.39%)] shadow-[0_12px_16px_-4px_rgba(16,24,40,0.08),_0_4px_6px_-2px_rgba(16,24,40,0.03)] p-[12px] text-[20px] leading-[30px] text-center text-white md:text-[18px] lg:text-[20px] md:leading-[28px] lg:leading-[30px]"
            >
                <span className="font-bold underline">CLICK HERE</span>{" "}
                <span className="font-light">
                    to view the most <span className="font-bold">POPULAR</span> locations nearby for the same{" "}
                    <span className="font-bold">{price}</span>.
                </span>
            </Link>
        </div>
    );
};

export default PremiumSection;
