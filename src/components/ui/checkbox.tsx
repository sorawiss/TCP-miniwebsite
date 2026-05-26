import type * as React from "react";

export function Checkbox({
	className = "",
	...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			className={`h-4 w-4 rounded border-zinc-300 text-black accent-black ${className}`}
			type="checkbox"
			{...props}
		/>
	);
}
