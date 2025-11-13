
'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const FALLBACK_HIDE_DELAY = 1500;

/**
 * Displays a full-screen loading overlay whenever the user interacts with the page
 * (click/tap) while a navigation or async action is pending. The overlay hides
 * automatically when the route changes or after a short timeout for non-navigation clicks.
 */
export function GlobalLoadingOverlay() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const fallbackTimeout = useRef<NodeJS.Timeout | null>(null);
  const previousPathRef = useRef(pathname);

  const hideOverlay = () => {
    if (fallbackTimeout.current) {
      clearTimeout(fallbackTimeout.current);
      fallbackTimeout.current = null;
    }
    setIsVisible(false);
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#')) return;

      const anchorTarget = anchor.getAttribute('target');
      if (anchorTarget && anchorTarget !== '_self') return;

      setIsVisible(true);
      if (fallbackTimeout.current) {
        clearTimeout(fallbackTimeout.current);
      }
      fallbackTimeout.current = setTimeout(() => {
        hideOverlay();
      }, FALLBACK_HIDE_DELAY);
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
      if (fallbackTimeout.current) {
        clearTimeout(fallbackTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (pathname !== previousPathRef.current) {
      previousPathRef.current = pathname;
      hideOverlay();
    }
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <div
      id="globalBundleSpinner"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
      role="status"
      aria-live="assertive"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center rounded-lg bg-white px-10 py-8 text-center shadow-2xl">
        <div className="global-loading-spinner mb-4" />
        <div className="text-lg font-semibold text-[#333]">Loading...</div>
      </div>
    </div>
  );
}
