// lib/googleMaps.ts
declare global {
  interface Window {
    _googleMapsLoaded?: boolean;
    google?: typeof google;
  }
}

export const loadGoogleMaps = () => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return;

    if (window.google && window.google.maps) {
      resolve(window.google);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY
    }&libraries=places,marker,maps`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => resolve(window.google);
  });
};

