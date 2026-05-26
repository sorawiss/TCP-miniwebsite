import type * as React from "react";

export function Input({
	className = "",
	...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			className={`h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none transition focus:border-zinc-500 ${className}`}
			{...props}
		/>
	);
}
