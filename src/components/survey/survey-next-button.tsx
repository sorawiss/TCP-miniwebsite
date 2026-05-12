import Image from "next/image";
import type * as React from "react";

type SurveyNextButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function SurveyNextButton({
	className = "",
	children = "ไปต่อ",
	type = "button",
	...props
}: SurveyNextButtonProps) {
	return (
		<button
			className={`relative h-[60px] w-full overflow-hidden rounded-xl font-bold text-white text-xl transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
			type={type}
			{...props}
		>
			<Image
				alt="Next Button Background"
				className="pointer-events-none object-cover"
				fill
				src="/svg/next-button.svg"
			/>
			<div className="relative z-10 flex h-full items-center justify-center gap-2">
				{children}
			</div>
		</button>
	);
}
