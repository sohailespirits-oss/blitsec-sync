'use client';

import { useMemo, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import type { PopularSliderLocation } from '@/app/lib/api/popularSlider';

interface TopPremiumSliderProps {
  locations: PopularSliderLocation[];
}

function normalizePath(link: string) {
  if (!link) return '/virtual-office/';
  if (link.startsWith('http')) {
    try {
      const url = new URL(link);
      return url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`;
    } catch {
      return link;
    }
  }
  return link.endsWith('/') ? link : `${link}/`;
}

export function TopPremiumSlider({ locations }: TopPremiumSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sliderLocations = useMemo(() => locations ?? [], [locations]);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const offset = direction === 'left' ? -420 : 420;
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const handleImageError = useCallback((id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  }, []);

  const cards = sliderLocations.length ? sliderLocations : Array.from({ length: 3 }).map((_, idx) => ({
    id: `placeholder-${idx}`,
    city: 'Loading',
    state_abbr: '',
    name: '',
    link: '#',
    top_premium: '1',
    alttext: null,
    city_featured_image_url: '',
    location_image_url: '',
  }));

  return (
    <section className="py-10 bg-white">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="flex justify-between items-start flex-wrap gap-8 mb-10">
          <div className="flex flex-col gap-5 min-w-[320px] max-w-[768px] flex-1">
            <h2 className="text-[#181D27] text-[36px] leading-[44px] font-semibold tracking-[-0.72px]">
              Top Premium Locations
            </h2>
            <p className="text-[#535862] text-xl leading-[30px]">
              Browse our most popular Opus-owned addresses, sourced directly from WordPress.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => handleScroll('left')}
              className="w-14 h-14 flex items-center justify-center rounded-full border border-[#E9EAEB]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#A4A7AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => handleScroll('right')}
              className="w-14 h-14 flex items-center justify-center rounded-full border border-[#E9EAEB]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#A4A7AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex items-stretch gap-8 overflow-x-auto pb-4 snap-x snap-mandatory">
          {cards.map((location) => {
            const href = sliderLocations.length ? normalizePath(location.link) : '#';
            const primaryImage = location.location_image_url;
            const showImage = !!primaryImage && !failedImages[location.id];
            const addressParts = location.name?.split(',').map((part) => part.trim()).filter(Boolean) ?? [];
            const primaryLine = addressParts.slice(0, 2).join(', ');
            const secondaryLine = addressParts.slice(2).join(', ');

            return (
              <Link
                key={location.id}
                href={href}
                prefetch={false}
                className="w-[360px] min-w-[360px] h-[480px] rounded-none relative flex-shrink-0 snap-start group"
              >
                <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-[0_12px_24px_rgba(15,23,42,0.12)]">
                  {showImage ? (
                    <img
                      src={primaryImage}
                      alt={location.alttext ?? `${location.city}, ${location.state_abbr}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      onError={() => handleImageError(location.id)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                      Image unavailable
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/15 to-black/45" />
                  <div className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-24">
                    <div className="text-white">
                      <div className="backdrop-blur-xl bg-white/40 rounded-2xl p-5 flex flex-col gap-2">
                        <h3 className="text-2xl font-semibold leading-tight">
                          {location.city}{location.state_abbr ? `, ${location.state_abbr}` : ''}
                        </h3>
                        {location.name && (
                          <p className="text-sm leading-relaxed text-white">
                            {primaryLine}
                            {secondaryLine && (
                              <>
                                <br />
                                {secondaryLine}
                              </>
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
