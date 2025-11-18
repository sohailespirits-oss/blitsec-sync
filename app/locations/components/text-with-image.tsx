import Image from 'next/image'
import React from 'react'

type MapData = {
    lat?: number;
    lng?: number;
    zoom?: number;
};

type TextWithImageProps = {
    reversed?: boolean;
    title: string;
    body: string;
    image: string;
    map?: MapData;
    city?: string;
};

export const TextWithImage = ({ reversed = false, title, body, image, map, city }: TextWithImageProps) => {
    const mapZoom = map?.zoom ?? 14;
    return (
        <section className={`max-w-[1280px] w-full mx-auto pt-[20px] lg:pt-[30px] pb-[30px]`}>
            <div className={`lg:px-[32px] px-[16px] flex flex-col lg:gap-[64px] gap-[32px] ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                <div className='flex flex-col w-full max-w-[592px]'>
                    <span className='font-inter font-semibold lg:text-[36px] pb-[24px] text-[30px] leading-[38px] lg:leading-[44px] lg:tracking-[-0.72px] text-[#101828]'>{title}</span>
                    <p className='font-inter font-normal lg:text-[18px] text-[18px] leading-[28px] text-[#535862]'>
                        {body}
                    </p>
                </div>

                {title == "Virtual Office Orlando Locations" ? (
                   <div className='w-full max-w-[560px] bg-[#F2F4F7] p-[16px] lg:p-[32px]'>
                        <iframe
                            title={`Map of ${city || title}`}
                            className="w-full h-full border-0 sm:min-h-[224px] lg:min-h-[300px]"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps?q=28.5384,81.3789&z=${mapZoom}&output=embed`}
                        />
                    </div>
                ) : (
                    <div className='w-full max-w-[560px] bg-[#F2F4F7] p-[16px] lg:p-[32px]'>
                        <div className='max-w-[496px] w-full overflow-hidden relative lg:min-h-[312px] min-h-[236px] h-full'>
                            <Image
                                src={image}
                                alt='Virtual Office Image'
                                fill
                                className='w-full max-w-[496px] lg:min-h-[312px] min-h-[236px] h-full object-cover'
                            />
                        </div>
                    </div>
                )}

            </div>
        </section>
    )
}