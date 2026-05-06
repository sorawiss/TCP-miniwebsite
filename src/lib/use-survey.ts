"use client";

import { parseAsInteger, useQueryState } from "nuqs";
import { useMemo } from "react";
import { create } from "zustand";
import {
	type ChoiceQuestionStep,
	type PowerId,
	resultPowers,
	type SurveyStep,
	scoredQuestionIds,
	surveySteps,
} from "@/lib/config";
import { initialSurveyState, type SurveyState } from "@/lib/survey";

interface SurveyStore extends SurveyState {
	updateChoiceAnswer: (questionId: string, value: string) => void;
	updateProfile: (
		field: keyof SurveyState["profile"],
		value: string | boolean
	) => void;
	updateTextAnswer: (questionId: string, value: string) => void;
}

const useSurveyStore = create<SurveyStore>((set) => ({
	...initialSurveyState,
	updateProfile: (field, value) =>
		set((state) => {
			const nextProfile = {
				...state.profile,
				[field]: value,
			};

			if (field === "skipsBirthDate" && value === true) {
				nextProfile.birthDate = "";
			}

			return { profile: nextProfile };
		}),
	updateChoiceAnswer: (questionId, value) =>
		set((state) => ({
			choiceAnswers: {
				...state.choiceAnswers,
				[questionId]: value,
			},
		})),
	updateTextAnswer: (questionId, value) =>
		set((state) => ({
			textAnswers: {
				...state.textAnswers,
				[questionId]: value,
			},
		})),
}));

function isStepComplete(step: SurveyStep, state: SurveyState) {
	switch (step.type) {
		case "intro":
		case "story":
			return true;
		case "name":
			return Boolean(state.profile.name.trim());
		case "birthDate":
			return state.profile.skipsBirthDate || Boolean(state.profile.birthDate);
		case "choice":
			return Boolean(state.choiceAnswers[step.id]);
		case "text":
			return Boolean(state.textAnswers[step.id]?.trim());
		case "result":
			return false;
		default:
			return false;
	}
}

function getWinningPower(state: SurveyState): PowerId {
	const scores: Record<PowerId, number> = {
		"power-1": 0,
		"power-2": 0,
		"power-3": 0,
		"power-4": 0,
		"power-5": 0,
		"power-6": 0,
		"power-7": 0,
	};

	for (const questionId of scoredQuestionIds) {
		const answer = state.choiceAnswers[questionId];
		const question = surveySteps.find(
			(step): step is ChoiceQuestionStep =>
				step.type === "choice" && step.id === questionId
		);

		if (!(question && answer)) {
			continue;
		}

		const selectedOption = question.options.find(
			(option) => option.value === answer
		);
		if (selectedOption) {
			scores[selectedOption.powerId] += 1;
		}
	}

	let bestPower: PowerId = "power-1";
	let bestScore = -1;

	for (const powerId of Object.keys(scores) as PowerId[]) {
		if (scores[powerId] > bestScore) {
			bestPower = powerId;
			bestScore = scores[powerId];
		}
	}

	return bestPower;
}

export function getDaysLived(birthDate: string) {
	if (!birthDate) {
		return null;
	}

	const birth = new Date(birthDate);
	if (Number.isNaN(birth.getTime())) {
		return null;
	}

	const today = new Date();
	const diffMs = today.getTime() - birth.getTime();
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	return diffDays >= 0 ? diffDays : null;
}

export function useSurvey() {
	const [step, setStep] = useQueryState(
		"step",
		parseAsInteger.withDefault(0).withOptions({ history: "push" })
	);
	const store = useSurveyStore();

	const state: SurveyState = {
		profile: store.profile,
		choiceAnswers: store.choiceAnswers,
		textAnswers: store.textAnswers,
	};

	const currentStep = surveySteps[step] ?? surveySteps[0];
	const isResultStep = currentStep.type === "result";
	const canContinue = isResultStep ? false : isStepComplete(currentStep, state);

	const winningPowerId = useMemo(() => getWinningPower(state), [state]);
	const winningPower = resultPowers[winningPowerId];
	const daysLived = useMemo(
		() => getDaysLived(state.profile.birthDate),
		[state.profile.birthDate]
	);

	return {
		state,
		step,
		currentStep,
		canContinue,
		isResultStep,
		totalSteps: surveySteps.length,
		winningPower,
		daysLived,
		updateProfile: store.updateProfile,
		updateChoiceAnswer: store.updateChoiceAnswer,
		updateTextAnswer: store.updateTextAnswer,
		nextStep: () =>
			setStep((prev) => Math.min((prev ?? 0) + 1, surveySteps.length - 1)),
		prevStep: () => setStep((prev) => Math.max((prev ?? 0) - 1, 0)),
	};
}
