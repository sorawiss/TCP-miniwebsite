import Image from "next/image";
import {
	forwardRef,
	type InputHTMLAttributes,
	type Ref,
	type TextareaHTMLAttributes,
} from "react";

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
	const inputClasses = `relative z-10 h-full w-full bg-transparent px-6 py-5 text-[#9a5d1b] text-[2rem] placeholder:text-[#a86a24] focus:outline-none resize-none ${
		className || ""
	}`;

	if (multiline) {
		return (
			<div className={containerClasses}>
				{/* Background */}
				<Image
					alt="Input Background"
					className="pointer-events-none z-0 object-cover"
					fill
					src="/svg/name-box.svg"
				/>
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
			<Image
				alt="Input Background"
				className="pointer-events-none z-0 object-cover"
				fill
				src="/svg/name-box.svg"
			/>
			<input
				className={inputClasses}
				ref={ref as Ref<HTMLInputElement>}
				{...(props as InputHTMLAttributes<HTMLInputElement>)}
			/>
		</div>
	);
});

TextInput.displayName = "TextInput";
