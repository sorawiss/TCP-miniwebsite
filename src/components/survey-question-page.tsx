import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import type { ChoiceQuestionStep, TextQuestionStep } from "@/lib/config";
import { isProfanityFilterReady, profanityFilter } from "@/lib/profanity";

interface ChoiceQuestionPageProps {
	answers: Record<string, string>;
	bottomImage?: string;
	onAnswerChange: (questionId: string, value: string) => void;
	question: ChoiceQuestionStep;
	questionNumber: number;
	totalQuestions: number;
}

export function SurveyChoiceQuestionPage({
	question,
	questionNumber,
	totalQuestions,
	answers,
	onAnswerChange,
	bottomImage = "/svg/desert.svg",
}: ChoiceQuestionPageProps) {
	const progressValue = (questionNumber / totalQuestions) * 100;

	const getOptionStyles = (index: number) => {
		const styles = [
			{ bg: "bg-[#182359]", border: "border-[#0f173b]" }, // A: Dark blue
			{ bg: "bg-[#ffbc11]", border: "border-[#e5a80f]" }, // B: Yellow
			{ bg: "bg-[#f87800]", border: "border-[#d96800]" }, // C: Orange
			{ bg: "bg-[#e60023]", border: "border-[#cc001f]" }, // D: Red
		];
		return styles[index % styles.length];
	};

	return (
		<>
			<section className="relative z-10 space-y-6 px-4 pt-6">
				{/* Custom Progress Bar */}
				{/* TODO : use real bar */}
				<div className="relative mx-auto w-full max-w-2xl pt-4 pb-2">
					<div className="absolute top-0 right-0 z-20 translate-x-2 -translate-y-2 transform">
						<svg
							aria-label="Location"
							fill="#f26522"
							height="28"
							viewBox="0 0 24 24"
							width="28"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
						</svg>
					</div>
					<div className="relative z-10 h-4 w-full rounded-full border-2 border-[#d97c2a] bg-white p-[2px] shadow-sm">
						<div
							className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-[#ff9b44] to-[#f26522]"
							style={{ width: `${Math.max(5, progressValue)}%` }}
						>
							<div className="absolute inset-0 rounded-full bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.5)_4px,rgba(255,255,255,0.5)_8px)] opacity-30" />
						</div>
					</div>
				</div>

				{/* TODO: This is not the final design now it just a mockup */}
				<div className="space-y-6 pt-4">
					<h2 className="mx-auto max-w-2xl whitespace-pre-line text-center text-2xl text-[#1c2b59] leading-relaxed sm:text-3xl">
						{question.prompt}
					</h2>
					<div className="mx-auto mt-8 grid max-w-2xl gap-[1rem]">
						{question.options.map((option, index) => {
							const inputId = `${question.id}-${option.value}`;
							const isSelected = answers[question.id] === option.value;
							const badgeStyles = getOptionStyles(index);

							return (
								<label
									className="group relative flex w-full cursor-pointer items-center py-1 pl-6"
									htmlFor={inputId}
									key={option.value}
								>
									<input
										checked={isSelected}
										className="hidden"
										id={inputId}
										name={question.id}
										onChange={(event) =>
											onAnswerChange(question.id, event.target.value)
										}
										type="radio"
										value={option.value}
									/>
									<div
										className={`relative flex min-h-[64px] w-full items-center rounded-full border-[2px] bg-[#fffaf0] py-3 pr-3 pl-[4.5rem] transition-all duration-200 ${
											isSelected
												? "translate-y-[4px] border-[#d97c2a] shadow-[0_0px_0_0_#d97c2a]"
												: "border-[#e08a3c] shadow-[0_4px_0_0_#d97c2a] group-hover:translate-y-[2px] group-hover:shadow-[0_2px_0_0_#d97c2a]"
										}`}
									>
										<div className="text-[#151F6D] text-[1.8rem] leading-8">
											{option.label}
										</div>

										<div
											className={`absolute top-1/2 -left-6 flex h-[76px] w-[76px] -translate-y-1/2 items-center justify-center rounded-full border-[4px] shadow-sm ${badgeStyles.bg} ${badgeStyles.border}`}
										>
											<div className="absolute inset-0.5 rounded-full border-[2px] border-white/30" />
											<div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" />
											<span className="relative z-10 font-bold text-3xl text-white drop-shadow-md">
												{option.value}
											</span>
										</div>
									</div>
								</label>
							);
						})}
					</div>
				</div>
			</section>
			<Image
				alt="Question background mockup"
				className="pointer-events-none absolute bottom-0 left-0 z-0 w-full object-cover"
				height={800}
				src={bottomImage}
				width={800}
			/>
		</>
	);
}

interface TextQuestionPageProps {
	answers: Record<string, string>;
	onAnswerChange: (questionId: string, value: string) => void;
	question: TextQuestionStep;
	questionNumber: number;
	totalQuestions: number;
}

export function SurveyTextQuestionPage({
	question,
	questionNumber,
	totalQuestions,
	answers,
	onAnswerChange,
}: TextQuestionPageProps) {
	const progressValue = (questionNumber / totalQuestions) * 100;

	return (
		<section className="space-y-8">
			<div className="space-y-3">
				<div className="flex items-center justify-between text-[#8b6744] text-sm">
					<span>{`Quiz ${questionNumber}`}</span>
					<span>{`${Math.round(progressValue)}%`}</span>
				</div>
				<Progress value={progressValue} />
			</div>

			<div className="space-y-5">
				<h2 className="max-w-2xl font-bold text-3xl text-[#2f1b09] leading-tight sm:text-5xl">
					{question.prompt}
				</h2>
				<Textarea
					autoFocus
					className="min-h-40 rounded-[2rem] border-2 border-[#d7b894] bg-white/90 px-6 py-5 text-[#2f1b09] text-base placeholder:text-[#b18963] focus:border-[#c85f1a]"
					onChange={(event) => {
						const value = event.target.value;
						if (isProfanityFilterReady) {
							const result = profanityFilter.check(value);
							onAnswerChange(question.id, result.cleanedText ?? value);
						} else {
							onAnswerChange(question.id, value);
						}
					}}
					placeholder={question.placeholder}
					value={answers[question.id] ?? ""}
				/>
			</div>
		</section>
	);
}
