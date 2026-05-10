import Image from "next/image";
import type { BirthDateStep } from "@/lib/config";
import type { ProfileAnswers } from "@/lib/survey";

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
						src="/svg/polygon.svg"
						width={134}
					/>
					<svg
						aria-hidden="true"
						className="relative z-10 -mt-2"
						fill="white"
						height="56"
						stroke="#FF8200"
						strokeWidth="1.5"
						viewBox="0 0 24 24"
						width="56"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect height="18" rx="3" ry="3" width="18" x="3" y="4" />
						<line strokeLinecap="round" x1="16" x2="16" y1="2" y2="6" />
						<line strokeLinecap="round" x1="8" x2="8" y1="2" y2="6" />
						<line x1="3" x2="21" y1="10" y2="10" />
						<circle cx="8" cy="14" fill="#FF8200" r="1.5" stroke="none" />
						<circle cx="12" cy="14" fill="none" r="1.5" />
						<circle cx="16" cy="14" fill="none" r="1.5" />
						<circle cx="12" cy="18" fill="none" r="1.5" />
						<circle cx="16" cy="18" fill="none" r="1.5" />
					</svg>
				</div>

				<div className="mt-12 w-full max-w-md space-y-4">
					<h2 className="font-bold text-2xl text-[#FF8200] drop-shadow-sm">
						{step.label}
					</h2>
					<div className="relative">
						<select
							autoFocus
							className="h-[60px] w-full appearance-none rounded-xl bg-gradient-to-b from-[#ffd385] to-[#f1a43a] px-6 text-[#9a5d1b] text-xl shadow-md focus:outline-none"
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

						{/* Chevron Down Icon for Select */}
						<div className="pointer-events-none absolute top-1/2 right-6 -translate-y-1/2 text-white">
							<svg
								aria-hidden="true"
								fill="none"
								height="28"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="3"
								viewBox="0 0 24 24"
								width="28"
								xmlns="http://www.w3.org/2000/svg"
							>
								<polyline points="6 9 12 15 18 9" />
							</svg>
						</div>

						{/* Optional noise overlay for the input */}
						<div
							className="pointer-events-none absolute inset-0 rounded-xl opacity-20"
							style={{
								backgroundImage: "url('/svg/background.svg')",
								backgroundSize: "cover",
							}}
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
					<button
						className="relative h-[60px] flex-1 overflow-hidden rounded-xl bg-gradient-to-b from-[#ff7a55] to-[#f75225] px-2 font-bold text-white text-xl shadow-md transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
						disabled={!(profile.birthDate || profile.skipsBirthDate)}
						onClick={() => {
							if (profile.skipsBirthDate) {
								onProfileChange("skipsBirthDate", false);
							}
							onNext();
						}}
						type="submit"
					>
						<div className="pointer-events-none absolute inset-1 rounded-lg border-2 border-white/30 border-dashed" />
						<div
							className="pointer-events-none absolute inset-0 opacity-20"
							style={{
								backgroundImage: "url('/svg/background.svg')",
								backgroundSize: "cover",
							}}
						/>
						<div className="relative flex items-center justify-center">
							ไปต่อ
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
