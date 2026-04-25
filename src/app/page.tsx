"use client";

import { SurveyIntroStep } from "@/components/survey-intro-step";
import { SurveyQuestionPage } from "@/components/survey-question-page";
import { SurveySummaryStep } from "@/components/survey-summary-step";
import { Button } from "@/components/ui/button";
import { questionPages } from "@/lib/config";
import { useSurvey } from "@/lib/use-survey";

export default function Home() {
	const {
		state,
		currentQuestionPage,
		isIntroStep,
		isQuestionStep,
		isSummaryStep,
		currentQuestion,
		canContinue,
		updateProfile,
		updateQuestionAnswer,
		nextStep,
		prevStep,
	} = useSurvey();

	return (
		<main className="min-h-screen bg-zinc-50 text-zinc-950">
			{isIntroStep ? (
				<SurveyIntroStep
					canContinue={canContinue}
					onNext={nextStep}
					onProfileChange={updateProfile}
					profile={state.profile}
				/>
			) : (
				<div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6">
					<section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
						{isQuestionStep && currentQuestion ? (
							<SurveyQuestionPage
								answers={state.questionAnswers}
								onAnswerChange={updateQuestionAnswer}
								pageIndex={currentQuestionPage}
								question={currentQuestion}
								totalPages={questionPages.length}
							/>
						) : null}

						{isSummaryStep ? <SurveySummaryStep state={state} /> : null}

						<div className="mt-8 flex items-center justify-between gap-3 border-zinc-200 border-t pt-5">
							<Button
								disabled={state.step === 0}
								onClick={prevStep}
								variant="outline"
							>
								Back
							</Button>

							{isSummaryStep ? null : (
								<Button disabled={!canContinue} onClick={nextStep}>
									{state.step === questionPages.length
										? "See results"
										: "Continue"}
								</Button>
							)}
						</div>
					</section>
				</div>
			)}
		</main>
	);
}
