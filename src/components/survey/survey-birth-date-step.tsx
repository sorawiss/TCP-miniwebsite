import Image from "next/image";
import type { BirthDateStep } from "@/lib/config";
import type { ProfileAnswers } from "@/lib/survey";
import NextButton from "../ui/next-button";

interface BirthDateStepProps {
	onNext: () => void;
	onProfileChange: (
		field: keyof ProfileAnswers,
		value: string | boolean
	) => void;
	profile: ProfileAnswers;
	step: BirthDateStep;
}

export function SurveyBirthDateStep({
	step,
	profile,
	onProfileChange,
	onNext,
}: BirthDateStepProps) {
	return (
		<>
			<div className="relative z-10 flex h-full flex-col items-center px-6 pt-[15vh]">
				{/* Top Polygon with Calendar Icon */}
				<div className="relative flex h-[129px] w-[134px] items-center justify-center">
					<Image
						alt="Polygon Background"
						className="absolute inset-0 h-full w-full object-contain"
						height={129}
						src="/svg/polygon-bd.svg"
						width={134}
					/>
				</div>

				<div className="mt-12 w-full max-w-md space-y-4">
					<h2 className="font-bold text-2xl text-[#FF8200] drop-shadow-sm">
						{step.label}
					</h2>
					<div className="relative h-[60px] w-full overflow-hidden rounded-2xl">
						{/* Background */}
						<Image
							alt="Input Background"
							className="pointer-events-none -z-10 object-cover"
							fill
							src="/svg/name-box.svg"
						/>
						<input
							autoFocus
							className="relative z-10 h-[60px] w-full appearance-none rounded-xl bg-transparent px-6 text-[#9a5d1b] text-xl shadow-md focus:outline-none [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
							onChange={(event) => {
								onProfileChange("birthDate", event.target.value);
								onProfileChange("skipsBirthDate", false);
							}}
							style={{
								boxShadow:
									"inset 0px 4px 10px rgba(0,0,0,0.05), 0px 4px 6px rgba(0,0,0,0.15)",
							}}
							type="date"
							value={profile.birthDate}
						/>

						<Image
							alt="calendar"
							className="pointer-events-none absolute top-1/2 right-6 z-20 -translate-y-1/2"
							height={32}
							src={"/svg/calendar.svg"}
							width={32}
						/>
					</div>
				</div>

				<div className="mt-[3rem] flex w-full flex-col items-center gap-[1rem]">
					{/* Next Button */}
					<NextButton
						className="px-2"
						disabled={!(profile.birthDate || profile.skipsBirthDate)}
						onClick={() => {
							if (profile.skipsBirthDate) {
								onProfileChange("skipsBirthDate", false);
							}
							onNext();
						}}
						type="submit"
					/>

					{/* Skip Button */}
					<button
						className="relative w-full flex-1 overflow-hidden rounded-full border border-[#f1a43a]/40 bg-gradient-to-b from-[#fffaf0] to-[#ffe8c4] px-2 font-bold text-[#FF8200] text-xl shadow-md transition-all hover:opacity-90 active:scale-[0.98]"
						onClick={() => {
							onProfileChange("skipsBirthDate", true);
							onNext();
						}}
						type="submit"
					>
						<div className="relative flex items-center justify-center py-[0.75rem]">
							{step.optOutLabel}
						</div>
					</button>
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
