import Image from 'next/image';

interface ImageCardProps {
	opusowned?: number;
	premium?: number;
	imageSrc?: string;
	imageAlt?: string;
	cityName: string;
	address: string;
	subAddress?: string;
	isHighlight?: boolean;
}

export default function ImageCard(props: ImageCardProps) {
	const {
		premium = 0,
		opusowned = 0,
		imageSrc = '',
		imageAlt = '',
		cityName,
		address,
		subAddress,
		isHighlight = false,
	} = props;


	console.log("premium:", premium);

	return (
		<>
			{isHighlight ? (
				<div className="flex flex-col lg:flex-row border-[4px] border-[#9DA4AE] rounded-[12px] h-full w-full bg-[#D5D7DA]">
					<div className="relative w-full lg:w-[239px] lg:max-w-[239px] h-[184px] lg:h-full rounded-tr-[8px] rounded-bl-[0px] text-transparent">
						<Image
							src={imageSrc}
							alt={imageAlt}
							width={239}
							height={184}
							className="w-full lg:max-w-[239px] h-full object-cover rounded-tl-[8px] rounded-tr-[8px] lg:rounded-tr-[0px] rounded-bl-[0px] lg:rounded-bl-[8px] text-transparent"
						/>
						{(premium === 1 && opusowned === 0) && (
							<div className="absolute top-3 left-3 bg-[#F16527] border-[1px] flex items-center gap-2 border-[#E79A78] py-1 pr-2 pl-1 rounded-[12px]">
								<span className="px-[10px] py-[2px] rounded-[9px] bg-white capitalize text-[16px] text-[#252B37] text-center text-base font-medium leading-6">
									most
								</span>
								<span className="font-bold text-white text-[16px] leading-[24px] capitalize">
									popular
								</span>
							</div>
						)}
					</div>

					<div className="flex-1 flex flex-col items-start p-6 gap-[20px] justify-between">
						<div className="w-full flex flex-col gap-1">
							<div className="w-full flex justify-between h-[30px]">
								<span className="text-black font-inter text-[18px] font-bold leading-[28px] whitespace-nowrap max-w-[174px] overflow-hidden text-ellipsis">
									{cityName}
								</span>
								{(premium === 1 && opusowned === 0) && (
									<div className="bg-[#ECFDF3] border flex gap-2 items-center border-[#ABEFC6] py-1 pr-2 pl-1 text-[10px] rounded-full">
										<span className="border border-[#ABEFC6] px-2 py-[2px] rounded-full bg-white text-[#067647] leading-[18px] capitalize">
											Premium
										</span>
										<span className="text-[#067647] capitalize">location</span>
									</div>
								)}
							</div>

							<div className='max-w-[305px]'>
								<p className="text-[14px] font-normal text-[#000] leading-5 truncate">
									{address}
								</p>
								<p className="text-[14px] font-normal text-[#000] leading-5 truncate">
									{subAddress}
								</p>
							</div>

						</div>

						<button className="bg-[#36BFFA] hover:bg-[#026AA2] text-white text-[14px] font-semibold px-[14px] py-[10px] rounded-lg w-full capitalize leading-5">
							learn more
						</button>
					</div>
				</div>
			) : (
				<div
					className="flex flex-col lg:flex-row rounded-[12px] h-full lg:h-full w-full bg-white "
					style={{ boxShadow: '0 1px 2px 0 rgba(16, 24, 40, 0.05)' }}
				>
					<Image
						src={imageSrc}
						alt={imageAlt}
						width={239}
						height={184}
						className="w-full lg:max-w-[239px] h-[184px] object-cover rounded-tl-[8px] rounded-tr-[8px] lg:rounded-tr-[0px] rounded-bl-[0px] lg:rounded-bl-[8px] text-transparent"
					/>

					<div
						className="
    w-full flex flex-col items-start p-6 gap-4 justify-between
    rounded-r-[12px]
    border-t border-r border-b border-[#EAECF0]

    /* MOBILE ONLY */
    border-l
    rounded-bl-[8px]
    rounded-tr-[0px]

    /* TABLET & WEB OVERRIDES */
    md:border-l-0
    md:rounded-bl-[0px]
    md:rounded-tr-[12px]
  "
					>

						<div className="w-full flex flex-col gap-1">
							<div className="w-full flex justify-between h-[30px]">
								<span className="text-black font-inter text-[18px] font-bold leading-[28px] whitespace-nowrap max-w-[59%] lg:max-w-[174px] overflow-hidden text-ellipsis">
									{cityName}
								</span>
								{(premium === 1 && opusowned === 0) && (
									<div className="bg-[#ECFDF3] border flex gap-2 items-center border-[#ABEFC6] py-1 pr-2 pl-1 text-[10px] rounded-full sm:w-[138px]">
										<span className="border border-[#ABEFC6] px-2 py-[2px] rounded-full bg-white text-[#067647] leading-[18px] capitalize">
											Premium
										</span>
										<span className="text-[#067647] capitalize">location</span>
									</div>
								)}
							</div>
							<div className='max-w-[305px]'>
								<p className="text-[14px] font-normal text-[#000] leading-5 truncate">
									{address}
								</p>
								<p className="text-[14px] font-normal text-[#000] leading-5 truncate">
									{subAddress}
								</p>
							</div>
						</div>

						<button className="bg-[#36BFFA] hover:bg-[#026AA2] text-white text-[14px] font-semibold px-[14px] py-[10px] rounded-lg w-full capitalize leading-5">
							learn more
						</button>
					</div>
				</div>
			)}
		</>
	);
}