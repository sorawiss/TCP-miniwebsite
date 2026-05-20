"use client";
import Image from "next/image";
import { Suspense, useEffect, useRef, useState } from "react";
import { FormLogo } from "@/components/form-logo";
import { SurveyBirthDateStep } from "@/components/survey/survey-birth-date-step";
import { SurveyIntroPage } from "@/components/survey/survey-intro-page";
import { SurveyNameStep } from "@/components/survey/survey-name-step";
import { SurveyPdpaPage } from "@/components/survey/survey-pdpa-page";
import { SurveyChoiceQuestionPage } from "@/components/survey-question-page";
import { SurveyStoryStep } from "@/components/survey-story-step";
import { SurveyTextQuestionPage } from "@/components/survey-text-question-page";
import { SurveyCountdownStep } from "@/features/countdown-page/components/survey-countdown-step";
import { SurveySummaryStep } from "@/features/summary-page/components/survey-summary-step";
import { preloadStepImages } from "@/lib/asset-preloader";
import { surveySteps, totalQuestionCount } from "@/lib/config";
import { useSurvey } from "@/lib/use-survey";

function HomeContent() {
	const {
		state,
		step,
		currentStep,
		isResultStep,
		winningPower,
		daysLived,
		updateProfile,
		updateChoiceAnswer,
		updateTextAnswer,
		setUuid,
		nextStep,
	} = useSurvey();

	const [showPreloader, setShowPreloader] = useState(true);
	const [fadeOut, setFadeOut] = useState(false);
	const hasSubmittedRef = useRef(false);

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

	useEffect(() => {
		preloadStepImages([surveySteps[step + 1], surveySteps[step + 2]]);
	}, [step]);

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

	useEffect(() => {
		if (!isResultStep || hasSubmittedRef.current) {
			return;
		}

		hasSubmittedRef.current = true;

		fetch("/api/submissions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(state),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Submission failed with status ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				if (data && typeof data.id === "string") {
					localStorage.setItem("survey_uuid", data.id);
					setUuid(data.id);
				}
			})
			.catch((error) => {
				hasSubmittedRef.current = false;
				console.error("Failed to submit survey", error);
			});
	}, [isResultStep, state, setUuid]);

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
						src="/logo.png"
						width={80}
					/>
				</div>
			)}
			<main className="bg-[url('/svg/background.svg')] bg-repeat text-[#2f1b09]">
				<div
					className={`relative mx-auto flex h-dvh max-w-md flex-col pt-20 transition-all duration-300 ease-in-out ${
						isTransitioning ? "opacity-0" : "opacity-100"
					}`}
				>
					<Suspense fallback={null}>
						<FormLogo />
					</Suspense>

					{activeStep.type === "intro" ? (
						<SurveyIntroPage onNext={nextStep} step={activeStep} />
					) : null}

					{activeStep.type === "pdpa" ? (
						<SurveyPdpaPage onNext={nextStep} step={activeStep} />
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
						<SurveyStoryStep onNext={nextStep} story={activeStep} />
					) : null}

					{isActiveResultStep ? (
						<SurveySummaryStep
							daysLived={daysLived}
							power={winningPower}
							state={state}
						/>
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
