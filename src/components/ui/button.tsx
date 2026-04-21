import type * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "default" | "outline" | "ghost";
};

const buttonStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
	default: "bg-black text-white hover:bg-black/85",
	outline: "border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50",
	ghost: "bg-transparent text-zinc-700 hover:bg-zinc-100",
};

export function Button({
	className = "",
	variant = "default",
	type = "button",
	...props
}: ButtonProps) {
	return (
		<button
			className={`inline-flex h-10 items-center justify-center rounded-md px-4 font-medium text-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${buttonStyles[variant]} ${className}`}
			type={type}
			{...props}
		/>
	);
}
