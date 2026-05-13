import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import type { TextQuestionStep } from "@/lib/config";
import { isProfanityFilterReady, profanityFilter } from "@/lib/profanity";

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
