"use client";
import Image from "next/image";
import { Suspense } from "react";
import { SurveyBirthDateStep } from "@/components/survey/survey-birth-date-step";
import { SurveyIntroPage } from "@/components/survey/survey-intro-page";
import { SurveyNameStep } from "@/components/survey/survey-name-step";
import { SurveyChoiceQuestionPage } from "@/components/survey-question-page";
import { SurveyStoryStep } from "@/components/survey-story-step";
import { SurveySummaryStep } from "@/components/survey-summary-step";
import { SurveyTextQuestionPage } from "@/components/survey-text-question-page";
import { Button } from "@/components/ui/button";
import { totalQuestionCount } from "@/lib/config";
import { useSurvey } from "@/lib/use-survey";

function HomeContent() {
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
		currentStep.type !== "choice" &&
		!isResultStep;

	return (
		<main className="bg-[url('/svg/background.svg')] bg-repeat text-[#2f1b09]">
			<div className="relative mx-auto flex h-screen max-w-[403px] flex-col pt-20">
				<Image
					alt="Logo"
					className="absolute inset-x-1/2 top-4 z-10 -translate-x-1/2"
					height={56}
					src="/logo.svg"
					width={56}
				/>
				{currentStep.type === "intro" ? (
					<SurveyIntroPage onNext={nextStep} step={currentStep} />
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
						bottomImage={currentStep.bottomImage}
						onAnswerChange={(questionId, value) => {
							updateChoiceAnswer(questionId, value);
							setTimeout(() => {
								nextStep();
							}, 350);
						}}
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
					<div className="relative z-10 mt-auto flex items-center justify-between gap-4 border-white/60 border-t px-4 pt-6 pb-8">
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

export default function Home() {
	return (
		<Suspense fallback={null}>
			<HomeContent />
		</Suspense>
	);
}
