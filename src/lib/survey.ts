export type AgeRange = "Under 18" | "18-24" | "25-34" | "35-44" | "45+";

export interface ProfileAnswers {
	ageRange: AgeRange | "";
	birthDate: string;
	consent: boolean;
	name: string;
	prefersAgeRange: boolean;
}

export interface Question {
	id: string;
	options: string[];
	prompt: string;
}

export interface SurveyState {
	profile: ProfileAnswers;
	questionAnswers: Record<string, string>;
	step: number;
}

export const ageRanges: AgeRange[] = [
	"Under 18",
	"18-24",
	"25-34",
	"35-44",
	"45+",
];

export const questionPages: Question[] = [
	{
		id: "creative-energy",
		prompt: "When do you feel most creative during your day?",
		options: ["Morning", "Afternoon", "Evening", "Late night"],
	},
	{
		id: "creative-goal",
		prompt: "What do you want this project or survey to help you discover?",
		options: [
			"A clearer direction",
			"New ideas",
			"Better habits",
			"More confidence",
		],
	},
];

export const initialSurveyState: SurveyState = {
	step: 0,
	profile: {
		name: "",
		birthDate: "",
		ageRange: "",
		prefersAgeRange: false,
		consent: false,
	},
	questionAnswers: {},
};
