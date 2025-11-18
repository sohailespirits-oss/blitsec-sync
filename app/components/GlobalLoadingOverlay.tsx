
'use client';

import { useEffect, useRef, useState, createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';

const FALLBACK_HIDE_DELAY = 1500;

// Create context for loading state
const LoadingContext = createContext<{
  showLoading: (withTimeout?: boolean) => void;
  hideLoading: () => void;
} | null>(null);

// Hook to use loading overlay from anywhere
export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within GlobalLoadingOverlay');
  }
  return context;
}

/**
 * Displays a full-screen loading overlay whenever the user interacts with the page
 * (click/tap) while a navigation or async action is pending. The overlay hides
 * automatically when the route changes or after a short timeout for non-navigation clicks.
 */
export function GlobalLoadingOverlay({ children }: { children?: React.ReactNode }) {
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

  const showOverlay = (withTimeout: boolean = false) => {
    setIsVisible(true);
    if (fallbackTimeout.current) {
      clearTimeout(fallbackTimeout.current);
      fallbackTimeout.current = null;
    }

    // Only set timeout for link clicks, not for programmatic calls (forms)
    if (withTimeout) {
      fallbackTimeout.current = setTimeout(() => {
        hideOverlay();
      }, FALLBACK_HIDE_DELAY);
    }
  };

  // Context value to provide to children
  const contextValue = {
    showLoading: showOverlay,
    hideLoading: hideOverlay,
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

      // Show overlay with timeout for link clicks
      showOverlay(true);
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

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
      {isVisible && (
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
      )}
    </LoadingContext.Provider>
  );
}
