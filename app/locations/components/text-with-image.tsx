import Image from "next/image";
import React from "react";

type TextWithImageProps = {
  reversed?: boolean;
  title: string;
  body: string;
  image: string;
};

export const TextWithImage = ({ reversed = false, title, body, image }: TextWithImageProps) => {
  return (
    <section className="flex pt-[20px] max-w-[1280px] w-full mx-auto lg:pt-[30px] pb-[30px]">
      <div
        className={`lg:px-[32px] md:flex-row px-[16px] flex flex-col lg:gap-[64px] gap-[32px] w-full ${reversed ? "md:flex-row-reverse" : "md:flex-row"} ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"}`}
      >
        {/* LEFT TEXT */}
          <div className="w-full max-w-full md:max-w-[48%] lg:max-w-[592px] flex flex-col">
          <span className="font-inter font-semibold lg:text-[36px] pb-[24px] text-[30px] leading-[38px] lg:leading-[44px] lg:tracking-[-0.72px] text-[#101828]">
            {title}
          </span>
          <p className="font-inter font-normal lg:text-[18px] text-[18px] leading-[28px] text-[#535862]">
            {body}
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full max-w-full md:max-w-[48%] lg:max-w-[560px] flex flex-col bg-[#F2F4F7] p-[16px] lg:p-[32px]">
          <div className="max-w-[496px] w-full overflow-hidden relative lg:min-h-[312px] min-h-[236px] h-full">
            <Image
              src={image}
              alt="Virtual Office Image"
              fill
              className="w-full max-w-[496px] lg:min-h-[312px] min-h-[236px] h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
