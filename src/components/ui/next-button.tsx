import Image from "next/image";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface NextButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function NextButton({ children, className, ...props }: NextButtonProps) {
	return (
		<button
			className={cn(
				"group relative flex h-[60px] w-[240px] cursor-pointer items-center justify-center transition-transform active:scale-95 disabled:pointer-events-none disabled:opacity-50",
				className
			)}
			{...props}
		>
			<Image
				alt="Next button background"
				className="absolute inset-0 z-0 h-full w-full object-contain drop-shadow-md"
				height={60}
				src="/svg/bottle-next.svg"
				width={240}
			/>
			<span className="relative z-10 pr-[10%] font-bold text-2xl text-white drop-shadow-md">
				{children}
			</span>
		</button>
	);
}

export default NextButton;
