import StateSearch from "@/app/components/StateSearch";
import StateData from "@/api-responses/state-search-result.json"

export default function StateSearchPage({ params }: { params: { state: string } }) {

  // Extract the first location from your JSON
  const location = StateData.result.locations[0];

  return <StateSearch data={location} />;
}
