"use client";

import { useReducer } from "react";
import {
	initialSurveyState,
	questionPages,
	type SurveyState,
} from "@/lib/survey";

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
	  }
	| {
			type: "nextStep";
	  }
	| {
			type: "prevStep";
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
		case "nextStep":
			return {
				...state,
				step: Math.min(state.step + 1, questionPages.length + 1),
			};
		case "prevStep":
			return {
				...state,
				step: Math.max(state.step - 1, 0),
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
	const [state, dispatch] = useReducer(surveyReducer, initialSurveyState);

	const currentQuestionPage = state.step - 1;
	const isIntroStep = state.step === 0;
	const isQuestionStep =
		currentQuestionPage >= 0 && currentQuestionPage < questionPages.length;
	const isSummaryStep = state.step === questionPages.length + 1;

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
		nextStep: () => dispatch({ type: "nextStep" }),
		prevStep: () => dispatch({ type: "prevStep" }),
	};
}
