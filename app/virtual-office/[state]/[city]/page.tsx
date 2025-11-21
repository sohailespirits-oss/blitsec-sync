import CitySearch from "@/app/components/CitySearch";
import FloridaData from "../../../../newsite/json/states/florida/florida_locations_vo.json";
import { LocationResult } from "@/app/components/LocationResultsWithMap";

function normalizeLocation(raw: any): LocationResult {
  return {
    id: String(raw.id),
    city: raw.city,
    name: raw.location_name ?? raw.name,
    address: raw.address,
    abbr: raw.state_abbr,
    showpopular: String(raw.showpopular ?? ""),
    premium: raw.premium,
    opusowned: raw.opusowned,
    point_x: String(raw.point_x ?? ""),
    point_y: String(raw.point_y ?? ""),
    image: typeof raw.image === "object" ? raw.image.url : raw.image,
    link: raw.url,
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const { state, city } = await params;

  const readableCity = city.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const readableState = state.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const allCityLocations = FloridaData.data.filter(
    (loc: any) => loc.city.toLowerCase() === readableCity.toLowerCase()
  );

  if (!allCityLocations.length) {
    return <div className="p-10 text-center text-red-500">City "{readableCity}" not found.</div>;
  }

  const firstLocation = allCityLocations[0];
  const rawImg = firstLocation.image;
  const img = typeof rawImg === "object" ? rawImg.url : rawImg;

  const map =
    firstLocation.point_x && firstLocation.point_y
      ? { lat: Number(firstLocation.point_x), lng: Number(firstLocation.point_y) }
      : undefined;
console.log("allCityLocations:",allCityLocations);

  return (
    <CitySearch
      data={{
        state: readableState,
        city: readableCity,
        image: img || "/default.jpg",
        locations: allCityLocations.map(normalizeLocation),
        map,
      }}
    />
  );
}
