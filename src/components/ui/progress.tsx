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
				{/* Background CSS Border */}
				<div className="absolute inset-0 rounded-full border-[#151F6D] border-[3px] bg-gradient-to-r from-[#FFD991] to-[#FFFBEB] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" />

				{/* Fill */}
				<div className="absolute top-[3px] right-[3px] bottom-[3px] left-[3px] z-10 overflow-hidden rounded-full">
					<div
						className="relative h-full bg-[#151F6D] transition-all duration-500 ease-out"
						style={{ width: `${safeValue}%` }}
					/>
				</div>

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
