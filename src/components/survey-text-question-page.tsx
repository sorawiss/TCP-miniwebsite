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
		<section className="relative z-10 space-y-6 px-4 pt-6">
			<div className="space-y-5">
				<h2 className="max-w-2xl font-bold text-3xl text-[#2f1b09] leading-tight sm:text-5xl">
					{question.prompt}
				</h2>
				<TextInput
					autoFocus
					containerClassName="h-[10rem]"
					multiline
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
