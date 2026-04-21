import type * as React from "react";

export function Label({
	className = "",
	...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
	return (
		// biome-ignore lint: This is a label without a control
		<label
			className={`font-medium text-sm text-zinc-900 ${className}`}
			{...props}
		/>
	);
}
