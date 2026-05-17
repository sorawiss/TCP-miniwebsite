import type { ButtonHTMLAttributes } from "react";
import ButtonNext from "@/components/button-next";
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
			<ButtonNext className="absolute inset-0 z-0 h-full w-full drop-shadow-md" />
			<span className="relative z-10 pr-[10%] text-2xl text-white drop-shadow-md">
				{children || "ไปต่อ"}
			</span>
		</button>
	);
}

export default NextButton;
