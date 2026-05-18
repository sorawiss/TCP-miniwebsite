import {
	forwardRef,
	type InputHTMLAttributes,
	type Ref,
	type TextareaHTMLAttributes,
} from "react";
import NameBackground from "../name-background";

export type TextInputProps = {
	containerClassName?: string;
	multiline?: boolean;
} & (
	| InputHTMLAttributes<HTMLInputElement>
	| TextareaHTMLAttributes<HTMLTextAreaElement>
);

export const TextInput = forwardRef<
	HTMLInputElement | HTMLTextAreaElement,
	TextInputProps
>(({ className, containerClassName, multiline, ...props }, ref) => {
	const containerClasses = `relative w-full overflow-hidden rounded-2xl ${
		containerClassName || "h-[72px]"
	}`;
	const inputClasses = `relative z-10 h-full w-full bg-transparent px-8 py-6 text-[#9a5d1b] text-[2rem] placeholder:text-[#a86a24] focus:outline-none resize-none ${
		className || ""
	}`;

	if (multiline) {
		return (
			<div className={containerClasses}>
				{/* Background */}
				<NameBackground className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover" />
				<textarea
					className={inputClasses}
					ref={ref as Ref<HTMLTextAreaElement>}
					{...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
				/>
			</div>
		);
	}

	return (
		<div className={containerClasses}>
			{/* Background */}
			<NameBackground className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover" />
			<input
				className={inputClasses}
				ref={ref as Ref<HTMLInputElement>}
				{...(props as InputHTMLAttributes<HTMLInputElement>)}
			/>
		</div>
	);
});

TextInput.displayName = "TextInput";
