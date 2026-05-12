import Image from "next/image";
import type { NameStep } from "@/lib/config";
import { isProfanityFilterReady, profanityFilter } from "@/lib/profanity";
import type { ProfileAnswers } from "@/lib/survey";
import { SurveyNextButton } from "./survey-next-button";

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
					<h2 className="font-bold text-2xl text-bluebrand drop-shadow-sm">
						{step.label}
					</h2>
					<div className="relative h-[72px] w-full overflow-hidden rounded-2xl">
						{/* Background */}
						<Image
							alt="Input Background"
							className="pointer-events-none z-0 object-cover"
							fill
							src="/svg/name-box.svg"
						/>
						<input
							autoFocus
							className="relative z-10 h-full w-full bg-transparent px-6 text-[#9a5d1b] text-xl placeholder:text-[#a86a24] focus:outline-none"
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
					</div>
				</div>

				<div className="mt-10 w-full max-w-md">
					<SurveyNextButton
						className="px-8 shadow-lg"
						disabled={!profile.name.trim()}
						onClick={onNext}
					/>
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
