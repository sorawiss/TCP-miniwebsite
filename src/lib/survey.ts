export type AgeRange = "Under 18" | "18-24" | "25-34" | "35-44" | "45+";

export interface ProfileAnswers {
	ageRange: AgeRange | "";
	birthDate: string;
	consent: boolean;
	name: string;
	prefersAgeRange: boolean;
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
