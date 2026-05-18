import {
	type ChoiceQuestionStep,
	scoredQuestionIds,
	surveySteps,
} from "@/lib/config";
import type { SurveyState } from "@/lib/survey";

export function getWinningPower(state: SurveyState): string {
	const scores: Record<string, number> = {
		"1": 0,
		"2": 0,
		"3": 0,
		"4": 0,
		"5": 0,
		"6": 0,
		"7": 0,
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

	let bestPower = "1";
	let bestScore = -1;

	for (const powerId of Object.keys(scores)) {
		if (scores[powerId] > bestScore) {
			bestPower = powerId;
			bestScore = scores[powerId];
		}
	}

	return bestPower;
}
