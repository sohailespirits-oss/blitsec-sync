import CitySearchData from "@/api-responses/city-search-result.json";
import CitySearch from "@/app/components/CitySearch";

type Params = {
  state: string;
  city: string;
};

export default async function CityPage({
  params,
}: {
  params: { state: string; city: string };
}) {
  const { state, city } = await params;

  // Format city slug => human readable
  const readableCity = city
    .replace(/-/g, " ")                     // los-angeles → los angeles
    .replace(/\b\w/g, (char) => char.toUpperCase()); // → Los Angeles

  // ALSO format state for display
  const readableState = state.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // Find matching city from JSON (match lowercase only)
  const cityLocation = CitySearchData.result.locations.find(
    (loc) => loc.city.toLowerCase() === readableCity.toLowerCase()
  );

  if (!cityLocation) {
    return (
      <div className="p-10 text-center text-red-500">
        City "{readableCity}" not found. Please go back.
      </div>
    );
  }

  // Build map data
  const map =
    cityLocation.point_x && cityLocation.point_y
      ? {
        lat: Number(cityLocation.point_x),
        lng: Number(cityLocation.point_y),
      }
      : undefined;

  // Send fully enriched data to your CitySearch component
  return (
    <CitySearch
      data={{
        state: readableState,
        city: readableCity,
        image: cityLocation.image || "/default.jpg",
        locations: [cityLocation],
        map,
      }}
    />
  );
}
