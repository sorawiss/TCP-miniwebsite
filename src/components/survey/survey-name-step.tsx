import Image from "next/image";
import type { NameStep } from "@/lib/config";
import { isProfanityFilterReady, profanityFilter } from "@/lib/profanity";
import type { ProfileAnswers } from "@/lib/survey";

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
				{/* TODO: use real icon */}
				{/* Top Polygon with User Icon */}
				<div className="relative flex h-[129px] w-[134px] items-center justify-center">
					<Image
						alt="Polygon Background"
						className="absolute inset-0 h-full w-full object-contain"
						height={129}
						src="/svg/polygon.svg"
						width={134}
					/>
					<svg
						aria-label="user icon"
						className="relative z-10 -mt-2"
						fill="white"
						height="60"
						stroke="#FF8200"
						strokeWidth="1.5"
						viewBox="0 0 24 24"
						width="60"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
						<circle cx="12" cy="7" r="4" />
					</svg>
				</div>

				<div className="mt-12 w-full max-w-md space-y-4">
					<h2 className="font-bold text-2xl text-[#FF8200] drop-shadow-sm">
						{step.label}
					</h2>
					<div className="relative">
						<input
							autoFocus
							className="h-[72px] w-full rounded-xl bg-gradient-to-b from-[#ffd385] to-[#f1a43a] px-6 text-[#9a5d1b] text-xl shadow-md placeholder:text-[#a86a24] focus:outline-none"
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
							style={{
								boxShadow:
									"inset 0px 4px 10px rgba(0,0,0,0.05), 0px 4px 6px rgba(0,0,0,0.15)",
							}}
							value={profile.name}
						/>
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

				<div className="mt-10 w-full max-w-md">
					<button
						className="relative h-[60px] w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#ff7a55] to-[#f75225] px-8 font-bold text-white text-xl shadow-lg transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
						disabled={!profile.name.trim()}
						onClick={onNext}
						type="button"
					>
						{/* Dashed line border inside the button */}
						<div className="pointer-events-none absolute inset-1.5 rounded-lg border-2 border-white/30 border-dashed" />
						<div className="relative flex items-center justify-center gap-2">
							ไปต่อ
							<svg
								aria-label="ไปต่อ"
								fill="none"
								height="24"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="3"
								viewBox="0 0 24 24"
								width="24"
							>
								<path d="m13 17 5-5-5-5" />
								<path d="m6 17 5-5-5-5" />
							</svg>
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
