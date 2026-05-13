"use client";
import Image from "next/image";
import { Suspense } from "react";
import { SurveyBirthDateStep } from "@/components/survey/survey-birth-date-step";
import { SurveyCountdownStep } from "@/components/survey/survey-countdown-step";
import { SurveyIntroPage } from "@/components/survey/survey-intro-page";
import { SurveyNameStep } from "@/components/survey/survey-name-step";
import { SurveyChoiceQuestionPage } from "@/components/survey-question-page";
import { SurveyStoryStep } from "@/components/survey-story-step";
import { SurveySummaryStep } from "@/components/survey-summary-step";
import { SurveyTextQuestionPage } from "@/components/survey-text-question-page";
import { NextButton } from "@/components/ui/next-button";
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
	} = useSurvey();

	const showNavigation =
		currentStep.type !== "name" &&
		currentStep.type !== "birthDate" &&
		currentStep.type !== "choice" &&
		currentStep.type !== "countdown" &&
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
					<SurveyIntroPage step={currentStep} />
				) : null}

				{currentStep.type === "countdown" ? (
					<SurveyCountdownStep onNext={nextStep} step={currentStep} />
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
					<div className="relative z-10 mt-auto flex w-full items-center justify-center pb-[3rem]">
						<NextButton disabled={!canContinue} onClick={nextStep}>
							{currentStep.type === "story" && currentStep.id === "ending"
								? "เปิดพลังของฉัน!"
								: "ไปต่อ"}
						</NextButton>
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
