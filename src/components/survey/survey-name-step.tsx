import type { NameStep } from "@/lib/config";
import { isProfanityFilterReady, profanityFilter } from "@/lib/profanity";
import type { ProfileAnswers } from "@/lib/survey";
import { Input } from "../ui/input";
import { SurveyStepLayout } from "./survey-layout";

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
		<SurveyStepLayout
			isNextDisabled={!profile.name.trim()}
			nextLabel="ถัดไป"
			onNext={onNext}
			pageLabel="Page 1"
			title={step.label}
		>
			<Input
				autoFocus
				className="h-16 rounded-[1.5rem] border-2 border-[#d7b894] bg-white/90 px-6 text-[#2f1b09] text-lg placeholder:text-[#b18963] focus:border-[#c85f1a]"
				onChange={(event) => {
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
		</SurveyStepLayout>
	);
}
