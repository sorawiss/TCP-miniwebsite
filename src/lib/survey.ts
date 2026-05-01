export interface ProfileAnswers {
	birthDate: string;
	name: string;
	skipsBirthDate: boolean;
}

export interface SurveyState {
	choiceAnswers: Record<string, string>;
	profile: ProfileAnswers;
	textAnswers: Record<string, string>;
}

export const initialSurveyState: SurveyState = {
	profile: {
		name: "",
		birthDate: "",
		skipsBirthDate: false,
	},
	textAnswers: {},
	choiceAnswers: {},
};
