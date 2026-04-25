"use client";

import { parseAsInteger, useQueryState } from "nuqs";
import { useReducer } from "react";
import { initialSurveyState, type SurveyState } from "@/lib/survey";
import { questionPages } from "./config";

type SurveyAction =
	| {
			type: "updateProfile";
			field: keyof SurveyState["profile"];
			value: string | boolean;
	  }
	| {
			type: "updateQuestionAnswer";
			questionId: string;
			value: string;
	  };

function surveyReducer(state: SurveyState, action: SurveyAction): SurveyState {
	switch (action.type) {
		case "updateProfile": {
			const nextProfile = {
				...state.profile,
				[action.field]: action.value,
			};

			if (action.field === "prefersAgeRange" && action.value === true) {
				nextProfile.birthDate = "";
			}

			if (action.field === "prefersAgeRange" && action.value === false) {
				nextProfile.ageRange = "";
			}

			return {
				...state,
				profile: nextProfile,
			};
		}
		case "updateQuestionAnswer":
			return {
				...state,
				questionAnswers: {
					...state.questionAnswers,
					[action.questionId]: action.value,
				},
			};
		default:
			return state;
	}
}

function isIntroStepValid(state: SurveyState) {
	const { name, birthDate, ageRange, prefersAgeRange, consent } = state.profile;
	const hasAgeInput = prefersAgeRange ? Boolean(ageRange) : Boolean(birthDate);

	return Boolean(name && consent && hasAgeInput);
}

export function useSurvey() {
	const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(0));

	const [state, dispatch] = useReducer(surveyReducer, {
		...initialSurveyState,
		step,
	});

	const currentQuestionPage = step - 1;
	const isIntroStep = step === 0;
	const isQuestionStep =
		currentQuestionPage >= 0 && currentQuestionPage < questionPages.length;
	const isSummaryStep = step === questionPages.length + 1;

	const currentQuestion = isQuestionStep
		? questionPages[currentQuestionPage]
		: undefined;

	let canContinue: boolean;
	if (isIntroStep) {
		canContinue = isIntroStepValid(state);
	} else if (isQuestionStep && currentQuestion) {
		canContinue = Boolean(state.questionAnswers[currentQuestion.id]);
	} else {
		canContinue = false;
	}

	return {
		state,
		currentQuestionPage,
		isIntroStep,
		isQuestionStep,
		isSummaryStep,
		currentQuestion,
		canContinue,
		updateProfile: (
			field: keyof SurveyState["profile"],
			value: string | boolean
		) => dispatch({ type: "updateProfile", field, value }),
		updateQuestionAnswer: (questionId: string, value: string) =>
			dispatch({ type: "updateQuestionAnswer", questionId, value }),
		nextStep: () =>
			setStep((prev) => Math.min((prev ?? 0) + 1, questionPages.length + 1)),
		prevStep: () => setStep((prev) => Math.max((prev ?? 0) - 1, 0)),
	};
}
