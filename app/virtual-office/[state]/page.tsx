import StateSearch from "@/app/components/StateSearch";
import StateData from "@/api-responses/state-search-result.json";
import CitySearchData from "../../../newsite/json/states/florida/florida_locations_vo.json";

export default async function StateSearchPage({ params }: { params: Promise<{ state: string }> }) {
  const { state: stateSlug } = await params;
  const readableState = stateSlug?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // Extract the first location from your JSON
  const stateLocation = StateData.result.locations[0];
  const cityLocations = CitySearchData.data.map((location: any) => ({
    ...location,
    id: String(location.id),
  }));
  const firstCity = cityLocations[0];
  const map =
    firstCity && firstCity.point_x && firstCity.point_y
      ? {
        lat: Number(firstCity.point_x),
        lng: Number(firstCity.point_y),
      }
      : undefined;
  const location = {
    ...stateLocation,
    state: readableState,
    stateSlug,
    locations: cityLocations,
    map,
  };

  return <StateSearch data={location} />;
}
