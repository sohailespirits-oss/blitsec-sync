import StateSearch from "@/app/components/StateSearch";
import StateData from "@/api-responses/state-search-result.json"
import CitySearchData from "@/api-responses/city-search-result.json";

export default function StateSearchPage({ params }: { params: { state: string } }) {

  // Extract the first location from your JSON
  const stateLocation = StateData.result.locations[0];
  const cityLocations = CitySearchData.result.locations;
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
    locations: cityLocations,
    map,
  };

  return <StateSearch data={location} />;
}
