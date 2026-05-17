"use client";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
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
		winningPower,
		daysLived,
		updateProfile,
		updateChoiceAnswer,
		updateTextAnswer,
		nextStep,
	} = useSurvey();

	const [showPreloader, setShowPreloader] = useState(true);
	const [fadeOut, setFadeOut] = useState(false);

	// Step-by-step transition states
	const [activeStep, setActiveStep] = useState(currentStep);
	const [isTransitioning, setIsTransitioning] = useState(false);

	useEffect(() => {
		// Wait 1.5s for initial assets to load, then start fade out
		const timer1 = setTimeout(() => {
			setFadeOut(true);
		}, 1500);

		// Remove preloader after transition finishes
		const timer2 = setTimeout(() => {
			setShowPreloader(false);
		}, 2000);

		return () => {
			clearTimeout(timer1);
			clearTimeout(timer2);
		};
	}, []);

	// Handle transitions when step changes
	useEffect(() => {
		if (
			currentStep.id !== activeStep.id ||
			currentStep.type !== activeStep.type
		) {
			setIsTransitioning(true);
			const timer = setTimeout(() => {
				setActiveStep(currentStep);
				setIsTransitioning(false);
			}, 400); // Duration matches transition utility duration-300
			return () => clearTimeout(timer);
		}
	}, [currentStep, activeStep]);

	// Hide Navigation Settings based on active step to match transition
	const showNavigation =
		activeStep.type !== "name" &&
		activeStep.type !== "birthDate" &&
		activeStep.type !== "choice" &&
		activeStep.type !== "countdown" &&
		activeStep.type !== "text" &&
		activeStep.type !== "result";

	const isActiveResultStep = activeStep.type === "result";

	return (
		<>
			{showPreloader && (
				<div
					className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFFAF0] transition-opacity duration-500 ${
						fadeOut ? "opacity-0" : "opacity-100"
					}`}
				>
					<Image
						alt="Loading..."
						className="animate-pulse"
						height={80}
						priority
						src="/logo.svg"
						width={80}
					/>
				</div>
			)}
			<main className="bg-[url('/svg/background.svg')] bg-repeat text-[#2f1b09]">
				<div
					className={`relative mx-auto flex h-screen max-w-[403px] flex-col pt-20 transition-all duration-300 ease-in-out ${
						isTransitioning ? "opacity-0" : "opacity-100"
					}`}
				>
					<Image
						alt="Logo"
						className="absolute inset-x-1/2 top-4 z-10 -translate-x-1/2"
						height={56}
						src="/logo.svg"
						width={56}
					/>
					{activeStep.type === "intro" ? (
						<SurveyIntroPage step={activeStep} />
					) : null}

					{activeStep.type === "countdown" ? (
						<SurveyCountdownStep onNext={nextStep} step={activeStep} />
					) : null}

					{activeStep.type === "name" ? (
						<SurveyNameStep
							onNext={nextStep}
							onProfileChange={updateProfile}
							profile={state.profile}
							step={activeStep}
						/>
					) : null}

					{activeStep.type === "birthDate" ? (
						<SurveyBirthDateStep
							onNext={nextStep}
							onProfileChange={updateProfile}
							profile={state.profile}
							step={activeStep}
						/>
					) : null}

					{activeStep.type === "choice" ? (
						<SurveyChoiceQuestionPage
							answers={state.choiceAnswers}
							bottomImage={activeStep.bottomImage}
							onAnswerChange={(questionId, value) => {
								updateChoiceAnswer(questionId, value);
								setTimeout(() => {
									nextStep();
								}, 350);
							}}
							question={activeStep}
							questionNumber={Number(activeStep.id)}
							totalQuestions={totalQuestionCount}
						/>
					) : null}

					{activeStep.type === "text" ? (
						<SurveyTextQuestionPage
							answers={state.textAnswers}
							onAnswerChange={updateTextAnswer}
							onNext={nextStep}
							question={activeStep}
						/>
					) : null}

					{activeStep.type === "story" ? (
						<SurveyStoryStep story={activeStep} />
					) : null}

					{isActiveResultStep ? (
						<SurveySummaryStep
							daysLived={daysLived}
							power={winningPower}
							state={state}
						/>
					) : null}

					{showNavigation ? (
						<div className="relative z-10 mt-auto flex w-full items-center justify-center pb-[3rem]">
							<NextButton disabled={!canContinue} onClick={nextStep}>
								{activeStep.type === "story" && activeStep.id === "ending"
									? "เปิดพลังของฉัน!"
									: "ไปต่อ"}
							</NextButton>
						</div>
					) : null}
				</div>
			</main>
		</>
	);
}

export default function Home() {
	return (
		<Suspense fallback={null}>
			<HomeContent />
		</Suspense>
	);
}
