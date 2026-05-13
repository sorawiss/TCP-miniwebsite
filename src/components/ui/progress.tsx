import Image from "next/image";
import type * as React from "react";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
	value: number;
}

export function Progress({ value, className, ...props }: ProgressProps) {
	const safeValue = Math.max(5, Math.min(100, value));

	return (
		<div
			aria-label="Survey progress"
			aria-valuemax={100}
			aria-valuemin={0}
			aria-valuenow={value}
			className={`relative w-full pt-10 pb-2 ${className || ""}`}
			role="progressbar"
			{...props}
		>
			<div className="relative z-10 h-[18px] w-full">
				{/* Fill */}
				<div className="absolute top-[4px] right-[1.16%] bottom-[7px] left-[1.16%] z-10">
					<div
						className="relative h-full overflow-hidden rounded-full bg-[#151F6D] transition-all duration-500 ease-out"
						style={{ width: `${safeValue}%` }}
					/>
				</div>

				{/* Background SVG Border */}
				<Image
					alt="Progress border"
					className="absolute inset-0 h-full w-full object-cover"
					height={28}
					src="/svg/border.svg"
					width={18}
				/>

				{/* Goal Pin */}
				<div className="absolute right-0 bottom-[14px] z-20 translate-x-1/2">
					<Image alt="Goal" height={28} src="/svg/pin.svg" width={18} />
				</div>

				{/* Bottle Marker */}
				<div
					className="absolute bottom-[2px] z-30 -translate-x-1/2 transition-all duration-300 ease-in-out"
					style={{ left: `${safeValue}%` }}
				>
					<Image
						alt="Progress marker"
						className="drop-shadow-md"
						height={51}
						src="/svg/bottle.svg"
						width={24}
					/>
				</div>
			</div>
		</div>
	);
}
