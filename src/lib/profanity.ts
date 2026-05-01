import { ProfanityFilter } from "bad-words-thai";

export const profanityFilter = new ProfanityFilter();
export let isProfanityFilterReady = false;

if (typeof window !== "undefined") {
	profanityFilter
		.initialize()
		.then(() => {
			isProfanityFilterReady = true;
		})
		.catch(console.error);
}
