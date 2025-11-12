const LocationsContent = ({ heading, description, body }: { heading: string, description: string, body: string }) => {
    return (
        <section className="max-w-screen-xl mx-auto py-[30px]">
            <div className="w-full lg:px-[32px] px-[16px] lg:gap-[64px] gap-[32px] flex lg:flex-row flex-col">
                <div className="flex flex-col gap-[24px] w-full">
                    <span className="font-inter font-semibold lg:text-[36px] text-[30px] leading-[120%] tracking-[-2%] text-[#101828]">{heading}</span>
                    <p className="text-[#475467] font-normal font-inter text-[18px] leading-[140%] tracking-[0]">{description}</p>
                </div>
                <div className="w-full">
                    <p className="text-[#475467] font-normal font-inter text-[18px] leading-[140%] tracking-[0]">{body}</p>
                </div>
            </div>
        </section>
    )
}

export default LocationsContent;