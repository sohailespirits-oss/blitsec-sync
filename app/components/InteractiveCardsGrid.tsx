"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type InteractiveCard = {
  bgClass: string;
  bgImage?: string;
  text: string;
  hasButton: boolean;
  href?: string;
};

type InteractiveCardsGridProps = {
  interactiveCards: InteractiveCard[];
  onDemoClick?: () => void;
};

export function InteractiveCardsGrid({ interactiveCards, onDemoClick }: InteractiveCardsGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 max-w-[1280px] w-full px-4 sm:px-6 md:px-8 mx-auto lg:p-[11px]">
      {interactiveCards.map((card, index) => {
        const cardContent = (
          <motion.div
            className={`flex items-end gap-2 ${card.bgClass} flex-1 h-full rounded-xl overflow-hidden shadow-shadows-shadow-lg relative bg-cover bg-center cursor-pointer`}
            style={card.bgImage ? { backgroundImage: `url(${card.bgImage})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
            whileHover={{ scaleY: 1.1, scaleX: 1.1 }}
            transition={{ duration: 0.3 }}
            onClick={card.hasButton ? onDemoClick : undefined}
          >
            {card.bgImage && (
              <motion.div
                className="absolute inset-0 z-0"
                style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%), linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(119,119,119,1) 100%)" }}
                initial={{ opacity: 1 }}
                whileHover={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-center h-[42px] px-2 z-10">
              <p className="font-text-sm-text-md-bold p-[10px] font-[number:var(--text-sm-text-md-bold-font-weight)] text-[#ffffff] text-[length:var(--text-sm-text-md-bold-font-size)] text-center tracking-[var(--text-sm-text-md-bold-letter-spacing)] leading-[var(--text-sm-text-md-bold-line-height)] [font-style:var(--text-sm-text-md-bold-font-style)] text-xs sm:text-sm">
                {card.text}
              </p>
            </div>
            {card.hasButton && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+4px)] w-[68px] h-[68px] bg-[#00000000] rounded-[100000000px] backdrop-blur-[2.0px] backdrop-brightness-[110%] [-webkit-backdrop-filter:blur(2.0px)_brightness(110%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)] z-10">
                <img
                  className="w-full h-full"
                  alt="Button"
                  src="/figmaAssets/button.svg"
                  width="68"
                  height="68"
                  loading="eager"
                />
              </div>
            )}
          </motion.div>
        );

        return (
          <div
            key={index}
            className={`flex w-full items-start h-[130px] ${index === 0 ? "hidden sm:flex" : ""}`}
            data-testid={`card-interactive-${index}`}
          >
            {card.href ? (
              <Link href={card.href} prefetch={false} className="flex flex-1 h-full">
                {cardContent}
              </Link>
            ) : (
              cardContent
            )}
          </div>
        );
      })}

      <div className="flex w-full items-start h-[130px]" data-testid="card-pricing">
        <Link href="/signup/?btn=902" prefetch={false} className="flex flex-1 h-full">
          <motion.div
            className="flex items-end gap-2 bg-[linear-gradient(180deg,rgba(54,191,250,1)_0%,rgba(3,137,209,1)_100%),linear-gradient(0deg,rgba(54,191,250,1)_0%,rgba(54,191,250,1)_100%)] flex-1 h-full rounded-xl overflow-hidden shadow-shadows-shadow-lg relative cursor-pointer group"
            initial="rest"
            whileHover="hover"
            variants={{ rest: { scaleY: 1, scaleX: 1 }, hover: { scaleY: 1.1, scaleX: 1.1 } }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute top-0 inset-x-0 flex items-center justify-center pt-3"
              variants={{ rest: { opacity: 1 }, hover: { opacity: 1 } }}
            >
              <p className="[font-family:'Inter',Helvetica] font-medium text-[#ffffff] text-xs sm:text-sm text-center tracking-[0] leading-normal whitespace-nowrap">
                ALL-INCLUSIVE
              </p>
            </motion.div>

            <div className="lg:hidden absolute inset-0 flex flex-col items-center justify-center gap-1">
              <p className="[font-family:'Inter',Helvetica] font-bold text-[#ffffff] text-center tracking-[-0.96px] whitespace-nowrap text-4xl">
                $99/mo
              </p>
              <p className="[font-family:'Inter',Helvetica] font-medium text-[#ffffff] text-center tracking-[0] leading-normal whitespace-nowrap text-xs">
                No Hidden Fees
              </p>
            </div>

            <motion.div
              className="hidden lg:flex absolute top-[24px] left-0 right-0 bottom-[42px] flex-col items-center justify-center"
              variants={{ rest: { gap: 1 }, hover: { gap: 12 } }}
              transition={{ duration: 0.3 }}
            >
              <motion.p
                className="[font-family:'Inter',Helvetica] font-bold text-[#ffffff] text-center tracking-[-0.96px] whitespace-nowrap text-[48px]"
                variants={{ rest: { y: 0 }, hover: { y: 4 } }}
                transition={{ duration: 0.3 }}
              >
                $99/mo
              </motion.p>
              <motion.p
                className="[font-family:'Inter',Helvetica] font-medium text-[#ffffff] text-center tracking-[0] leading-normal whitespace-nowrap text-sm"
                variants={{ rest: { opacity: 0, height: "0px", y: 0 }, hover: { opacity: 1, height: "auto", y: -4 } }}
                transition={{ duration: 0.3 }}
              >
                NO HIDDEN FEES
              </motion.p>
            </motion.div>

            <motion.div className="absolute inset-x-0 bottom-0 flex items-center justify-center h-[42px] px-2" variants={{ rest: { opacity: 1 }, hover: { opacity: 1 } }}>
              <p className="font-text-sm-text-md-bold font-[number:var(--text-sm-text-md-bold-font-weight)] text-[#ffffff] text-[length:var(--text-sm-text-md-bold-font-size)] text-center tracking-[var(--text-sm-text-md-bold-letter-spacing)] leading-[var(--text-sm-text-md-bold-line-height)] [font-style:var(--text-sm-text-md-bold-font-style)] text-xs sm:text-sm">
                Sign Up Now
              </p>
            </motion.div>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
