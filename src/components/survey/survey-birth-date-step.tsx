import Image from "next/image";
import type { BirthDateStep } from "@/lib/config";
import type { ProfileAnswers } from "@/lib/survey";
import { SurveyNextButton } from "./survey-next-button";

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
	const ageOptions = [
		"",
		"ต่ำกว่า 18 ปี",
		"18-22 ปี",
		"23-40 ปี",
		"41-60 ปี",
		"60 ปีขึ้นไป",
	];

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
						<select
							autoFocus
							className="h-[60px] w-full appearance-none rounded-xl px-6 text-[#9a5d1b] text-xl shadow-md focus:outline-none"
							onChange={(event) => {
								onProfileChange("birthDate", event.target.value);
								onProfileChange("skipsBirthDate", false);
							}}
							style={{
								boxShadow:
									"inset 0px 4px 10px rgba(0,0,0,0.05), 0px 4px 6px rgba(0,0,0,0.15)",
							}}
							value={profile.birthDate}
						>
							<option disabled hidden value="">
								เลือกอายุของคุณ
							</option>
							{ageOptions.slice(1).map((opt) => (
								<option key={opt} value={opt}>
									{opt}
								</option>
							))}
						</select>

						<Image
							alt="calendar"
							className="absolute top-1/2 right-6 -translate-y-1/2"
							height={32}
							src={"/svg/calendar.svg"}
							width={32}
						/>
					</div>
				</div>

				<div className="mt-16 flex w-full max-w-md gap-4">
					{/* Skip Button */}
					<button
						className="relative h-[60px] flex-1 overflow-hidden rounded-xl border border-[#f1a43a]/40 bg-gradient-to-b from-[#fffaf0] to-[#ffe8c4] px-2 font-bold text-[#FF8200] text-xl shadow-md transition-all hover:opacity-90 active:scale-[0.98]"
						onClick={() => {
							onProfileChange("skipsBirthDate", true);
							onNext();
						}}
						type="submit"
					>
						<div className="pointer-events-none absolute inset-1 rounded-lg border-2 border-[#f1a43a]/30 border-dashed" />
						<div
							className="pointer-events-none absolute inset-0 opacity-10"
							style={{
								backgroundImage: "url('/svg/background.svg')",
								backgroundSize: "cover",
							}}
						/>
						<div className="relative flex items-center justify-center">
							{step.optOutLabel}
						</div>
					</button>

					{/* Next Button */}
					<SurveyNextButton
						className="flex-1 px-2"
						disabled={!(profile.birthDate || profile.skipsBirthDate)}
						onClick={() => {
							if (profile.skipsBirthDate) {
								onProfileChange("skipsBirthDate", false);
							}
							onNext();
						}}
						type="submit"
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
