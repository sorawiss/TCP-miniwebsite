import type * as React from "react";

export function Textarea({
	className = "",
	...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
	return (
		<textarea
			className={`min-h-28 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-zinc-500 ${className}`}
			{...props}
		/>
	);
}
