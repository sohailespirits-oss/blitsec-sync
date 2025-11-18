'use client';

import { CirclePlus, MinusCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FAQItem {
  question: string;
  answer: string;
  linkText?: string;
  linkUrl?: string;
}

interface FAQSectionProps {
  data?: FAQItem[];
}

export function FAQSection({ data = [] }: FAQSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0); // First item open by default

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Parse answer text to extract link if present
  const parseAnswer = (answer: string, linkText?: string, linkUrl?: string) => {
    if (!linkText || !linkUrl) {
      return <>{answer}</>;
    }

    // Check if the answer contains the link text
    if (answer.includes(linkText)) {
      const parts = answer.split(linkText);
      return (
        <>
          {parts[0]}
          <Link
            href={linkUrl}
            className="font-text-md-regular font-[number:var(--text-md-regular-font-weight)] text-[#B9E6FE] text-[length:var(--text-md-regular-font-size)] tracking-[var(--text-md-regular-letter-spacing)] leading-[var(--text-md-regular-line-height)] [font-style:var(--text-md-regular-font-style)] underline"
          >
            {linkText}
          </Link>
          {parts[1] && <>{parts[1]}</>}
        </>
      );
    }
    return <>{answer}</>;
  };

  return (
    <section className="flex w-full bg-[#065986] py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="flex w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row w-full gap-8 lg:gap-[64px]">
          {/* Left side - Title and Description */}
          <div className="flex flex-col gap-4 sm:gap-6 w-full lg:max-w-[400px]">
            <div className="flex flex-col gap-3">
              <span className="font-text-md-regular font-[number:var(--text-md-regular-font-weight)] text-white text-[length:var(--text-md-regular-font-size)] tracking-[var(--text-md-regular-letter-spacing)] leading-[var(--text-md-regular-line-height)] [font-style:var(--text-md-regular-font-style)]">
                Support
              </span>
              <h2 className="font-display-md-semibold font-[number:var(--display-md-semibold-font-weight)] text-white text-[length:var(--display-md-semibold-font-size)] tracking-[var(--display-md-semibold-letter-spacing)] leading-[var(--display-md-semibold-line-height)] [font-style:var(--display-md-semibold-font-style)]">
                FAQs
              </h2>
              <p className="font-text-md-regular font-[number:var(--text-md-regular-font-weight)] text-white text-[length:var(--text-md-regular-font-size)] tracking-[var(--text-md-regular-letter-spacing)] leading-[var(--text-md-regular-line-height)] [font-style:var(--text-md-regular-font-style)]">
                Everything you need to know about securing your corporate business presence.
              </p>
            </div>
          </div>

          {/* Right side - FAQ list */}
          <div className="flex flex-col gap-4 w-full lg:flex-1">
            {data.length === 0 ? (
              <p className="font-text-md-regular font-[number:var(--text-md-regular-font-weight)] text-white/80 text-[length:var(--text-md-regular-font-size)] tracking-[var(--text-md-regular-letter-spacing)] leading-[var(--text-md-regular-line-height)] [font-style:var(--text-md-regular-font-style)]">
                No FAQs available at this time.
              </p>
            ) : (
              data.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <div
                    key={index}
                    className={`flex flex-col rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#0a6fa0] p-4 sm:p-5'
                        : 'bg-white p-4 sm:p-5'
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex flex-row gap-4 justify-between items-start cursor-pointer focus:outline-none w-full text-left"
                    >
                      <span
                        className={`font-text-md-semibold font-[number:var(--text-md-semibold-font-weight)] text-[length:var(--text-md-semibold-font-size)] tracking-[var(--text-md-semibold-letter-spacing)] leading-[var(--text-md-semibold-line-height)] [font-style:var(--text-md-semibold-font-style)] flex-1 ${
                          isActive ? 'text-white' : 'text-[#101828]'
                        }`}
                      >
                        {item.question}
                      </span>
                      <div className="flex-shrink-0 mt-1">
                        {isActive ? (
                          <MinusCircle className="text-white w-6 h-6 min-w-[24px] min-h-[24px]" />
                        ) : (
                          <CirclePlus className="text-[#101828] w-6 h-6 min-w-[24px] min-h-[24px]" />
                        )}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key="content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: 0.35,
                            ease: [0.25, 0.1, 0.25, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <p className="font-text-md-regular font-[number:var(--text-md-regular-font-weight)] text-white text-[length:var(--text-md-regular-font-size)] tracking-[var(--text-md-regular-letter-spacing)] leading-[var(--text-md-regular-line-height)] [font-style:var(--text-md-regular-font-style)] mt-4">
                            {parseAnswer(item.answer, item.linkText, item.linkUrl)}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

