export interface ProfileAnswers {
	birthDate: string;
	name: string;
	skipsBirthDate: boolean;
}

export interface SurveyState {
	choiceAnswers: Record<string, string>;
	profile: ProfileAnswers;
	textAnswers: Record<string, string>;
	uuid: string; // TODO: Remove this in the future
}

export const initialSurveyState: SurveyState = {
	profile: {
		name: "",
		birthDate: "",
		skipsBirthDate: false,
	},
	textAnswers: {},
	choiceAnswers: {},
	uuid: "", // TODO: Remove this in the future
};
