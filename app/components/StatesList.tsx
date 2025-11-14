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
      <section className="bg-white pt-0 pb-5">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="max-w-[1280px] mx-auto px-8">
            <div className="flex flex-col gap-8">
              {/* United States */}
              <div>
                <div className="flex flex-col gap-5 max-w-[768px] mb-5 lg:mb-10">
                  <h2 className="text-gray-900 text-[30px] leading-[38px] font-semibold tracking-[-0.6px] lg:text-[36px] lg:leading-[44px] lg:tracking-[-0.72px]">
                    <span>United States -</span>
                    <br className="lg:hidden" />
                    <span> Select Your State</span>
                  </h2>
                </div>

                <div className="flex flex-wrap items-start gap-[20px] lg:gap-6">
                  {statesLoading ? (
                    // Loading skeleton
                    [...Array(50)].map((_, index) => (
                      <div key={index} className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                    ))
                  ) : (
                    usaData?.states.map((state) => (
                      <Link
                        key={state.state_id}
                        href={`/virtual-office/${state.state_name.toLowerCase().replace(/\s+/g, '-')}`}
                        prefetch={false}
                        className="flex items-center gap-2"
                      >
                        <span className="text-gray-600 text-base font-semibold leading-6 hover:text-[#181d27] transition-colors">
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
      <section className="bg-white py-5">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="max-w-[1280px] mx-auto px-8">
            <div className="flex flex-col gap-8">
              <div>
                <div className="flex flex-col gap-5 max-w-[768px] mb-5 lg:mb-10">
                  <h2 className="text-gray-900 text-[30px] leading-[38px] font-semibold tracking-[-0.6px] lg:text-[36px] lg:leading-[44px] lg:tracking-[-0.72px]">
                    <span>Canada -</span>
                    <br className="lg:hidden" />
                    <span> Select Your Province</span>
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
      <section className="bg-white pt-5 pb-0">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="max-w-[1280px] mx-auto px-8">
            <div className="flex flex-col gap-8">
              <div>
                <div className="flex flex-col gap-5 max-w-[768px] mb-5 lg:mb-10">
                  <h2 className="text-gray-900 text-[30px] leading-[38px] font-semibold tracking-[-0.6px] lg:text-[36px] lg:leading-[44px] lg:tracking-[-0.72px]">
                    <span>Puerto Rico -</span>
                    <br className="lg:hidden" />
                    <span> Select Your City</span>
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
