"use client";
import Image from "next/image";
import { useState } from "react";
import { NextButton } from "@/components/ui/next-button";
import type { TextQuestionStep } from "@/lib/config";
import { isProfanityFilterReady, profanityFilter } from "@/lib/profanity";
import { TextInput } from "./ui/text-input";

interface TextQuestionPageProps {
	answers: Record<string, string>;
	onAnswerChange: (questionId: string, value: string) => void;
	onNext: () => void;
	question: TextQuestionStep;
}

export function SurveyTextQuestionPage({
	question,
	answers,
	onAnswerChange,
	onNext,
}: TextQuestionPageProps) {
	const [error, setError] = useState<string | null>(null);
	const currentAnswer = answers[question.id] ?? "";

	return (
		<>
			<section className="relative z-10 flex h-full flex-col justify-center space-y-6 px-4 pt-6">
				<div className="space-y-5">
					{question.promptImage ? (
						<div className="relative mx-auto mt-23 h-[120px] w-[80%] max-w-sm">
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
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							const value = event.target.value;
							onAnswerChange(question.id, value);
							if (isProfanityFilterReady) {
								const result = profanityFilter.check(value);
								if (result.isClean) {
									setError(null);
								} else {
									setError("กรุณาใช้คำที่สุภาพ");
								}
							}
						}}
						placeholder={question.placeholder}
						value={currentAnswer}
					/>
					{error && (
						<p className="text-center font-medium text-[#ee1c25] text-[1.5rem]">
							{error}
						</p>
					)}
				</div>
				<div className="relative z-10 mt-auto flex w-full items-center justify-center pt-8 pb-10">
					<NextButton
						disabled={!currentAnswer.trim() || !!error}
						onClick={onNext}
					>
						ไปต่อ
					</NextButton>
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
