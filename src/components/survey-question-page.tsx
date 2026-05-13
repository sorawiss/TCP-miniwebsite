import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import type { ChoiceQuestionStep } from "@/lib/config";

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

	const getOptionIcon = (index: number) => {
		const icons = ["/svg/a.svg", "/svg/b.svg", "/svg/c.svg", "/svg/d.svg"];
		return icons[index % icons.length];
	};

	return (
		<>
			<section className="relative z-10 space-y-6 px-4 pt-6">
				{/* Custom Progress Bar */}
				<Progress
					className="mx-auto max-w-2xl pt-6 pb-2"
					value={progressValue}
				/>

				{/* TODO: This is not the final design now it just a mockup */}
				<div className="space-y-6 pt-4">
					<h2 className="mx-auto max-w-2xl whitespace-pre-line text-center text-2xl text-[#1c2b59] leading-relaxed sm:text-3xl">
						{question.prompt}
					</h2>
					<div className="mx-auto mt-8 grid max-w-2xl gap-[1rem]">
						{question.options.map((option, index) => {
							const inputId = `${question.id}-${option.value}`;
							const isSelected = answers[question.id] === option.value;
							const iconSrc = getOptionIcon(index);

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

										<Image
											alt={option.value}
											className="absolute top-1/2 -left-6 -translate-y-1/2 drop-shadow-sm"
											height={90}
											src={iconSrc}
											width={90}
										/>
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
