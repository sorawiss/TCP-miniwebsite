import Image from "next/image";
import type { TextQuestionStep } from "@/lib/config";
import { isProfanityFilterReady, profanityFilter } from "@/lib/profanity";
import { TextInput } from "./ui/text-input";

interface TextQuestionPageProps {
	answers: Record<string, string>;
	onAnswerChange: (questionId: string, value: string) => void;
	question: TextQuestionStep;
}

export function SurveyTextQuestionPage({
	question,
	answers,
	onAnswerChange,
}: TextQuestionPageProps) {
	return (
		<>
			<section className="relative z-10 flex h-full flex-col justify-center space-y-6 px-4 pt-6">
				<div className="space-y-5">
					{question.promptImage ? (
						<div className="relative mx-auto h-[120px] w-[80%] max-w-sm">
							<Image
								alt={question.prompt}
								className="object-contain"
								fill
								src={question.promptImage}
							/>
						</div>
					) : (
						<h2 className="max-w-2xl font-bold text-3xl text-[#2f1b09] leading-tight sm:text-5xl">
							{question.prompt}
						</h2>
					)}
					<TextInput
						autoFocus
						containerClassName="h-[10rem]"
						multiline
						onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
			<Image
				alt="Question background mockup"
				className="pointer-events-none absolute bottom-0 left-0 z-0 w-full object-cover"
				height={800}
				src={"/bottom/6.png"}
				width={800}
			/>
		</>
	);
}
