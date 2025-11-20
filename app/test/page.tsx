import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import CityLocationHero from "@/app/components/CityLocationHero";

export default function TestPage() {
  // Sample data for Orlando location
  const locationData = {
    city: "Orlando",
    state: "Florida",
    stateAbbrev: "FL",
    address: {
      street: "200 E Robinson Street, Suite 1120",
      city: "Orlando",
      state: "FL",
      zip: "32801",
      phone: "(407) 559-2000",
    },
    price: "$99/mo",
    companyName: "Web Design Agency",
    // Optional: add image URL when available
    // image: "/images/orlando-office.jpg"
  };

  return (
    <main className="min-h-screen bg-basewhite">
      <Navbar />

      {/* Navbar is fixed (~105px) + 40px spacing = pt-[145px] */}
      <div className="pt-[145px] pb-10">
        <CityLocationHero {...locationData} />
      </div>

      <Footer />
    </main>
  );
}
