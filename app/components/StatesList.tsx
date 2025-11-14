'use client';
import Link from "next/link";
import { useStates } from "@/app/lib/api/useStates";

export function StatesList() {
  const { data: statesData, isLoading: statesLoading } = useStates();

  // Extract countries from API data
  const usaData = statesData?.data.find(country => country.country_abbr === 'US');
  const canadaData = statesData?.data.find(country => country.country_abbr === 'CA');
  const puertoRicoData = statesData?.data.find(country => country.country_abbr === 'PR');

  return (
    <>
      {/* State Selection Section */}
      <section className="py-10 bg-white">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="max-w-[1280px] mx-auto px-8">
            <div className="flex flex-col gap-8">
              {/* United States */}
              <div>
                <div className="flex flex-col gap-5 max-w-[768px] mb-8">
                  <h2 className="text-gray-900 text-[36px] leading-[44px] font-semibold tracking-[-0.72px]">
                    United States - Select Your State
                  </h2>
                </div>

                <div className="flex flex-wrap items-start gap-6">
                  {statesLoading ? (
                    // Loading skeleton
                    [...Array(50)].map((_, index) => (
                      <div key={index} className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                    ))
                  ) : (
                    usaData?.states.map((state) => (
                      <Link
                        key={state.state_id}
                        href={`/state-search/${state.state_name.toLowerCase().replace(/\s+/g, '-')}`}
                        prefetch={false}
                        className="flex items-center gap-2"
                      >
                        <span className="text-gray-600 text-base font-semibold leading-6 hover:text-blue-light400 transition-colors">
                          {state.state_name}
                        </span>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Canada Section */}
      <section className="py-10 bg-white">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="max-w-[1280px] mx-auto px-8">
            <div className="flex flex-col gap-8">
              <div>
                <div className="flex flex-col gap-5 max-w-[768px] mb-8">
                  <h2 className="text-gray-900 text-[36px] leading-[44px] font-semibold tracking-[-0.72px]">
                    Canada - Select Your Province
                  </h2>
                </div>

                <div className="flex flex-wrap items-start gap-5">
                  {statesLoading ? (
                    // Loading skeleton
                    [...Array(6)].map((_, index) => (
                      <div key={index} className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                    ))
                  ) : (
                    canadaData?.states.map((province) => (
                      <Link
                        key={province.state_id}
                        href={`/virtual-office/canada/${province.state_name.toLowerCase().replace(/\s+/g, '-')}`}
                        prefetch={false}
                        className="flex items-center gap-2"
                      >
                        <span className="text-gray-600 text-base font-semibold leading-6 hover:text-blue-light400 transition-colors">
                          {province.state_name}
                        </span>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Puerto Rico Section */}
      <section className="py-10 bg-white">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="max-w-[1280px] mx-auto px-8">
            <div className="flex flex-col gap-8">
              <div>
                <div className="flex flex-col gap-5 max-w-[768px] mb-8">
                  <h2 className="text-gray-900 text-[36px] leading-[44px] font-semibold tracking-[-0.72px]">
                    Puerto Rico - Select Your City
                  </h2>
                </div>

                <div className="flex flex-wrap items-start gap-5">
                  {statesLoading ? (
                    // Loading skeleton
                    <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    puertoRicoData?.states.map((city) => (
                      <Link
                        key={city.state_id}
                        href={`/virtual-office/puerto-rico/${city.state_name.toLowerCase().replace(/\s+/g, '-')}`}
                        prefetch={false}
                        className="flex items-center gap-2"
                      >
                        <span className="text-gray-600 text-base font-semibold leading-6 hover:text-blue-light400 transition-colors">
                          {city.state_name}
                        </span>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
