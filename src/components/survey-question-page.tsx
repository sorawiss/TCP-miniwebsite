import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import type { Question } from "@/lib/config";

interface SurveyQuestionPageProps {
	answers: Record<string, string>;
	onAnswerChange: (questionId: string, value: string) => void;
	pageIndex: number;
	question: Question;
	totalPages: number;
}

export function SurveyQuestionPage({
	pageIndex,
	totalPages,
	question,
	answers,
	onAnswerChange,
}: SurveyQuestionPageProps) {
	const progressValue = ((pageIndex + 1) / totalPages) * 100;

	return (
		<section className="space-y-6">
			<div className="space-y-2">
				<div className="flex items-center justify-between text-sm text-zinc-600">
					<span>{`Question page ${pageIndex + 1}`}</span>
					<span>{`${Math.round(progressValue)}%`}</span>
				</div>
				<Progress value={progressValue} />
			</div>

			<div className="space-y-4">
				<div className="rounded-lg border border-zinc-200 p-4">
					<div className="mb-3 space-y-1">
						<p className="text-xs text-zinc-500 uppercase tracking-[0.2em">
							{`Question ${pageIndex + 1}`}
						</p>
						<Label className="text-base">{question.prompt}</Label>
					</div>
					<div className="space-y-2">
						{question.options.map((option) => {
							const inputId = `${question.id}-${option}`;

							return (
								<label
									className="flex cursor-pointer items-center gap-3 rounded-md border border-zinc-200 px-3 py-2 text-sm transition hover:bg-zinc-50"
									htmlFor={inputId}
									key={option}
								>
									<input
										checked={answers[question.id] === option}
										className="h-4 w-4 accent-black"
										id={inputId}
										name={question.id}
										onChange={(event) =>
											onAnswerChange(question.id, event.target.value)
										}
										type="radio"
										value={option}
									/>
									<span>{option}</span>
								</label>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
