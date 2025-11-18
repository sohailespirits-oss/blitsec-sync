import Image from "next/image";
import Link from "next/link";

export function GetYourOfficeSection() {
  return (
    <section className="flex w-full py-6 sm:py-8 md:py-10 lg:py-[96px]">
      <div className="flex w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row w-full bg-[#065986] rounded-[24px] overflow-hidden lg:h-[400px] lg:min-h-[400px] shadow-[0px_3px_3px_-1.5px_rgba(10,13,18,0.04),0px_8px_8px_-4px_rgba(10,13,18,0.03)]">
          {/* Content Section */}
          <div className="flex flex-col gap-4 sm:gap-0 justify-center w-full lg:flex-1 p-6 sm:p-8 lg:p-[64px]">
            <h2 className="font-semibold text-white text-[28px] sm:text-[32px] lg:text-[36px] leading-[36px] sm:leading-[40px] lg:leading-[44px] tracking-[-0.72px] mb-20 lg:mb-[20px]">
              Get Your Office Solution Today!
            </h2>
            <p className="text-[#B9E6FE] font-[700] text-[16px] sm:text-[18px] lg:text-[20px] leading-[2px] sm:leading-[28px] lg:leading-[30px] tracking-[0px] mb-6 lg:mb-[48px]">
              Business Address for only $59/Month <span className=" font-[400]">- No Hidden Fees</span>
            </p>
            <Link href="#" prefetch={false} className="w-full sm:w-auto">
              <button className="w-full h-[48px] sm:w-auto py-[12px] px-[20px] min-w-[129px] bg-white text-[#344054] font-semibold text-[16px] rounded-[8px]">
                Get started
              </button>
            </Link>
          </div>

          {/* Image Section */}
          <div className="flex-shrink-0 w-full lg:w-[480px] h-[300px] sm:h-[350px] lg:h-[400px] min-h-[300px] sm:min-h-[350px] lg:min-h-[400px] relative">
            <Image
              src="/assets/getoffer.png"
              alt="Get Your Office Solution"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

