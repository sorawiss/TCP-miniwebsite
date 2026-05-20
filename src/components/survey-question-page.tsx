import Image from "next/image";
import { A, B, C, D } from "@/components/choice";
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
		const Icons = [A, B, C, D];
		const Icon = Icons[index % Icons.length];
		return <Icon height={74} width={74} />;
	};

	return (
		<>
			<section className="] relative z-10 flex flex-col justify-between space-y-6 px-4 pt-6">
				{/* Custom Progress Bar */}
				<Progress
					className="mx-auto mt-2 w-[85%] max-w-2xl pt-0 pb-0"
					value={progressValue}
				/>

				<h2
					className="mx-auto max-w-2xl whitespace-pre-line text-center text-[#1c2b59] text-[2.2rem] leading-[100%] sm:text-3xl"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <the html is safe from config>
					dangerouslySetInnerHTML={{ __html: question.prompt }}
				/>

				{/* TODO: This is not the final design now it just a mockup */}
				<div>
					<div className="mx-auto grid max-w-2xl gap-2">
						{question.options.map((option, index) => {
							const inputId = `${question.id}-${option.value}`;
							const isSelected = answers[question.id] === option.value;

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
										onClick={(event) => {
											if (isSelected) {
												onAnswerChange(question.id, event.currentTarget.value);
											}
										}}
										type="radio"
										value={option.value}
									/>
									<div
										className={`relative flex min-h-[48px] w-full items-center rounded-full border-[2px] bg-[#fffaf0] py-2 pr-1 pl-13 transition-all duration-200 md:min-h-[64px] md:py-3 md:pr-3 md:pl-[4.5rem] ${
											isSelected
												? "translate-y-[4px] border-[#d97c2a] shadow-[0_0px_0_0_#d97c2a]"
												: "border-[#e08a3c] shadow-[0_4px_0_0_#d97c2a] group-hover:translate-y-[2px] group-hover:shadow-[0_2px_0_0_#d97c2a]"
										}`}
									>
										<div className="text-[#151F6D] text-[1.5rem] leading-8 md:text-[1.8rem]">
											{option.label}
										</div>

										<div className="absolute top-1/2 -left-6 -translate-y-[45%] rounded-full drop-shadow-sm">
											{getOptionIcon(index)}
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
				fetchPriority="high"
				height={800}
				loading="eager"
				sizes="(max-width: 403px) 100vw, 403px"
				src={bottomImage}
				width={800}
			/>
		</>
	);
}
