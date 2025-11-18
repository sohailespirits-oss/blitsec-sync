import Link from 'next/link'
import React from 'react'

export const HeroCta = () => {
    return (
        <section className='max-w-screen-xl mx-auto'>
            <div className='lg:px-[32px] px-[16px] flex flex-col gap-[32px] justify-center items-center text-center'>
                <div className='flex flex-col gap-[16px] lg:gap-[20px]'>
                    <span className='font-inter font-semibold lg:text-[36px] text-[30px] leading-[38px] lg:leading-[120%] tracking-[-0.72px] text-[#181D27]'>Start Your Business Expansion Journey</span>
                    <span className='font-inter font-normal lg:text-[20px] text-[18px] leading-[28px] lg:leading-[30px] tracking-[0] text-[#535862]'>Join over 20,000+ businesses already growing with Opus VO.</span>
                </div>

                <Link
                    href="#"
                    className='py-[12px] px-[20px] w-full lg:w-auto items-center justify-center text-center rounded-[8px] bg-[#36BFFA] text-white hover:bg-[#026AA2]
                            font-inter font-semibold text-[16px] leading-[24px] tracking-[0] md:w-auto'>
                    Select This Location
                </Link>
            </div>
        </section>
    )
}