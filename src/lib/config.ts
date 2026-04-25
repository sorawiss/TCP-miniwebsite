export interface Question {
	id: string;
	options: string[];
	prompt: string;
}

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
