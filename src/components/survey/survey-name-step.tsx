import Image from "next/image";
import { TextInput } from "@/components/ui/text-input";
import type { NameStep } from "@/lib/config";
import { isProfanityFilterReady, profanityFilter } from "@/lib/profanity";
import type { ProfileAnswers } from "@/lib/survey";
import NextButton from "../ui/next-button";

interface NameStepProps {
	onNext: () => void;
	onProfileChange: (
		field: keyof ProfileAnswers,
		value: string | boolean
	) => void;
	profile: ProfileAnswers;
	step: NameStep;
}

export function SurveyNameStep({
	step,
	profile,
	onProfileChange,
	onNext,
}: NameStepProps) {
	return (
		<>
			<div className="relative z-10 flex h-full flex-col items-center px-6 pt-[15vh]">
				<h2 className="text-[#151F6D] text-[2.5rem] drop-shadow-sm">
					{step.label}
				</h2>
				<div className="relative flex h-[129px] w-[134px] items-center justify-center">
					<Image
						alt="Username icon"
						className="absolute inset-0 h-full w-full object-contain"
						height={129}
						src="/svg/polygon-name.svg"
						width={134}
					/>
				</div>

				<div className="mt-12 w-full max-w-md space-y-4">
					<TextInput
						autoFocus
						containerClassName="h-[6rem]"
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							const value = event.target.value;
							if (isProfanityFilterReady) {
								const result = profanityFilter.check(value);
								onProfileChange("name", result.cleanedText ?? value);
							} else {
								onProfileChange("name", value);
							}
						}}
						placeholder={step.placeholder}
						value={profile.name}
					/>
				</div>

				<div className="mt-10">
					<NextButton disabled={!profile.name.trim()} onClick={onNext} />
				</div>
			</div>
			<Image
				alt="Desert background"
				className="pointer-events-none absolute bottom-0 left-0 z-0 w-full object-cover"
				height={800}
				src="/svg/desert.svg"
				width={800}
			/>
		</>
	);
}
