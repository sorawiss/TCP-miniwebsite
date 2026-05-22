// biome-ignore-all lint: <explanation>
import { ProfanityFilter } from "bad-words-thai";
// @ts-ignore - injecting directly into the library's internal dictionary
import * as dictionaries from "bad-words-thai/dist/dictionaries";

const customProfanityWords = [
	"คดีบอส",
	"คดีบอสวรยุทธ",
	"คดีบอสอยู่วิทยา",
	"บอสวรยุทธ",
	"บอสอยู่วิทยา",
	"บอสกระทิงแดง",
	"อยู่วิทยา",
	"ลูกกระทิงแดง",
	"วรยุทธ อยู่วิทยา",
	"บอส อยู่วิทยา",
	"เครือกระทิงแดง",
	"#คดีบอส",
	"#คดีบอสวรยุทธ",
	"#คดีบอสอยู่วิทยา",
	"#บอสวรยุทธ",
	"#บอสอยู่วิทยา",
	"#บอสกระทิงแดง",
	"#ลูกกระทิงแดง",
	"โอสถสภา",
	"KTD",
	"M-149",
	"Carabao",
	"M sport",
	"yanhee go",
	"Oishi",
	"Sappe",
	"พญานาค",
	"Ichitan",
	"Teaplus",
	"Ready Energy",
	"Sting Energy",
];

// bad-words-thai ignores the customBadWords option and requires words to be lowercased without spaces
customProfanityWords.forEach((word) => {
	const cleanWord = word
		.replace(/[^a-zA-Z0-9\u0E00-\u0E7F]/g, "")
		.toLowerCase();
	if (cleanWord && dictionaries.profanityList) {
		dictionaries.profanityList[cleanWord] = {
			severity: "severe",
			variants: [],
		};
	}
});

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
