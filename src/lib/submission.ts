import {
	type ChoiceQuestionStep,
	resultPowers,
	scoredQuestionIds,
	surveySteps,
} from "@/lib/config";
import { getWinningPower } from "@/lib/scoring";
import type { SurveyState } from "@/lib/survey";

export interface SurveySubmission {
	choiceAnswers: Record<string, string>;
	profile: SurveyState["profile"];
	textAnswers: Record<string, string>;
	uuid: string; // TODO: Remove this in the future
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasValidChoiceAnswers(
	choiceAnswers: Record<string, unknown>
): choiceAnswers is Record<string, string> {
	return scoredQuestionIds.every((questionId) => {
		const answer = choiceAnswers[questionId];
		const question = surveySteps.find(
			(step): step is ChoiceQuestionStep =>
				step.type === "choice" && step.id === questionId
		);

		return (
			typeof answer === "string" &&
			Boolean(question?.options.some((option) => option.value === answer))
		);
	});
}

export function parseSurveySubmission(value: unknown): SurveySubmission | null {
	if (!isRecord(value)) {
		return null;
	}

	const { profile, choiceAnswers, textAnswers, uuid } = value;

	if (
		!(isRecord(profile) && isRecord(choiceAnswers) && isRecord(textAnswers))
	) {
		return null;
	}

	const { name, birthDate, skipsBirthDate } = profile;
	const textAnswer = textAnswers["6"];

	if (
		typeof name !== "string" ||
		typeof birthDate !== "string" ||
		typeof skipsBirthDate !== "boolean" ||
		!name.trim() ||
		!hasValidChoiceAnswers(choiceAnswers) ||
		typeof textAnswer !== "string" ||
		!textAnswer.trim()
	) {
		return null;
	}

	if (!(skipsBirthDate || birthDate)) {
		return null;
	}

	return {
		profile: {
			name: name.trim(),
			birthDate,
			skipsBirthDate,
		},
		choiceAnswers,
		textAnswers: {
			"6": textAnswer.trim(),
		},
		uuid: typeof uuid === "string" ? uuid : "", // TODO: Remove this in the future
	};
}

export function getSubmissionResult(submission: SurveySubmission) {
	const winningPowerId = getWinningPower(submission);
	const winningPower = resultPowers[winningPowerId];

	if (!winningPower) {
		throw new Error("Unable to determine winning power");
	}

	return {
		winningPower,
		winningPowerId,
	};
}
