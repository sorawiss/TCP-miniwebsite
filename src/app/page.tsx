"use client";

import Image from "next/image";
import { SurveyBirthDateStep } from "@/components/survey/survey-birth-date-step";
import { SurveyIntroPage } from "@/components/survey/survey-intro-page";
import { SurveyNameStep } from "@/components/survey/survey-name-step";
import {
	SurveyChoiceQuestionPage,
	SurveyTextQuestionPage,
} from "@/components/survey-question-page";
import { SurveyStoryStep } from "@/components/survey-story-step";
import { SurveySummaryStep } from "@/components/survey-summary-step";
import { Button } from "@/components/ui/button";
import { totalQuestionCount } from "@/lib/config";
import { useSurvey } from "@/lib/use-survey";

export default function Home() {
	const {
		state,
		currentStep,
		canContinue,
		isResultStep,
		winningPower,
		daysLived,
		updateProfile,
		updateChoiceAnswer,
		updateTextAnswer,
		nextStep,
		prevStep,
	} = useSurvey();

	const showNavigation =
		currentStep.type !== "intro" &&
		currentStep.type !== "name" &&
		currentStep.type !== "birthDate" &&
		!isResultStep;

	return (
		<main className="min-h-screen bg-[url('/svg/background.svg')] bg-repeat text-[#2f1b09]">
			<div className="relative mx-auto flex min-h-screen max-w-[403px] flex-col border border-red-500 pt-20">
				<Image
					alt="Logo"
					className="absolute top-4 right-4 z-50"
					height={70}
					src="/logo.svg"
					width={70}
				/>
				{currentStep.type === "intro" ? (
					<SurveyIntroPage onNext={nextStep} />
				) : null}

				{currentStep.type === "name" ? (
					<SurveyNameStep
						onNext={nextStep}
						onProfileChange={updateProfile}
						profile={state.profile}
						step={currentStep}
					/>
				) : null}

				{currentStep.type === "birthDate" ? (
					<SurveyBirthDateStep
						onNext={nextStep}
						onProfileChange={updateProfile}
						profile={state.profile}
						step={currentStep}
					/>
				) : null}

				{currentStep.type === "choice" ? (
					<SurveyChoiceQuestionPage
						answers={state.choiceAnswers}
						onAnswerChange={updateChoiceAnswer}
						question={currentStep}
						questionNumber={Number(currentStep.id)}
						totalQuestions={totalQuestionCount}
					/>
				) : null}

				{currentStep.type === "text" ? (
					<SurveyTextQuestionPage
						answers={state.textAnswers}
						onAnswerChange={updateTextAnswer}
						question={currentStep}
						questionNumber={Number(currentStep.id)}
						totalQuestions={totalQuestionCount}
					/>
				) : null}

				{currentStep.type === "story" ? (
					<SurveyStoryStep story={currentStep} />
				) : null}

				{isResultStep ? (
					<SurveySummaryStep
						daysLived={daysLived}
						power={winningPower}
						state={state}
					/>
				) : null}

				{showNavigation ? (
					<div className="mt-10 flex items-center justify-between gap-4 border-white/60 border-t pt-6">
						<Button
							className="rounded-full border-[#d7b894] px-6 text-[#6c5135]"
							onClick={prevStep}
							variant="outline"
						>
							ย้อนกลับ
						</Button>

						<Button
							className="h-12 rounded-full bg-[#2f1b09] px-8 text-white hover:bg-[#4a2a11]"
							disabled={!canContinue}
							onClick={nextStep}
						>
							{currentStep.type === "story" && currentStep.id === "ending"
								? "เปิดพลังของฉัน!"
								: "ไปต่อ"}
						</Button>
					</div>
				) : null}
			</div>
		</main>
	);
}
