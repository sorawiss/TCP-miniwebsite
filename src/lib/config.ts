export type PowerId =
	| "power-1"
	| "power-2"
	| "power-3"
	| "power-4"
	| "power-5"
	| "power-6"
	| "power-7";

export interface ResultPower {
	description: string;
	id: PowerId;
	nickname: string;
	shareBlurb: string;
	title: string;
}

export interface StoryStep {
	body?: string;
	bottomImage?: string;
	id: string;
	title?: string;
	type: "story";
}

export interface IntroStep {
	bottomImage?: string;
	Image?: string;
	id: string;
	topImage?: string;
	type: "intro";
}

export interface CountdownStep {
	delay?: number;
	id: string;
	images: string[];
	type: "countdown";
}

export interface NameStep {
	id: string;
	label: string;
	placeholder: string;
	type: "name";
}

export interface BirthDateStep {
	id: string;
	label: string;
	optOutLabel: string;
	type: "birthDate";
}

export interface ChoiceOption {
	label: string;
	powerId: PowerId;
	value: string;
}

export interface ChoiceQuestionStep {
	bottomImage?: string;
	id: string;
	options: ChoiceOption[];
	prompt: string;
	type: "choice";
}

export interface TextQuestionStep {
	id: string;
	placeholder: string;
	prompt: string;
	type: "text";
}

export interface ResultStep {
	id: string;
	type: "result";
}

export type SurveyStep =
	| IntroStep
	| CountdownStep
	| NameStep
	| BirthDateStep
	| ChoiceQuestionStep
	| TextQuestionStep
	| StoryStep
	| ResultStep;

export const resultPowers: Record<PowerId, ResultPower> = {
	"power-1": {
		id: "power-1",
		title: "พลังอูฐผู้ใจนิ่ง",
		nickname: "ฉายา: อูฐผู้ใจนิ่ง",
		shareBlurb: "นิ่ง ทน อึด ในวันที่แดด Sahara ร้อนจนสติจะแตก",
		description: "อาวุธลับคือการคุมอารมณ์และจังหวะหายใจได้ นิ่งสนิทแบบอูฐสายคูล!",
	},
	"power-2": {
		id: "power-2",
		title: "พลังแมวป่ายอดนักซุ่ม",
		nickname: "ฉายา: แมวป่ายอดนักซุ่ม",
		shareBlurb: "อารมณ์ชั่ววูบทำอะไรคุณไม่ได้!",
		description:
			'อาวุธลับของคุณคือการ "หยุดนิ่งเพื่อตั้งหลัก" เหมือนแมวป่าที่ซุ่มรอจังหวะตะครุบทางรอดที่ฉลาดที่สุด',
	},
	"power-3": {
		id: "power-3",
		title: "พลังหนูทะเลทรายนักแก้เกม",
		nickname: "ฉายา: หนูทะเลทรายนักแก้เกม",
		shareBlurb: "อุปสรรคเหรอ? มันก็เกมเลเวลหนึ่งเท่านั้นแหละ!",
		description:
			"อาวุธลับของคุณคือการเป็นนักวิเคราะห์หาทางแก้ที่ปังที่สุด ใช้ไหวพริบได้เก่งจนน่าหมั่นไส้ สไตล์หนูทะเลทรายจอมเจ้าเล่ห์!",
	},
	"power-4": {
		id: "power-4",
		title: "พลังนกเหยี่ยวจอมมั่น",
		nickname: "ฉายา: นกเหยี่ยวจอมมั่น",
		shareBlurb: "คำว่า 'ทำไม่ได้' สะกดไม่เป็น!",
		description: "อาวุธลับของคุณคือความมั่นใจ No.1 และสายตาที่โฟกัสแต่ชัยชนะ",
	},
	"power-5": {
		id: "power-5",
		title: "พลังเมียร์แคตสายบวก",
		nickname: "ฉายา: เมียร์แคตสายบวก",
		shareBlurb: "ในวันที่น้ำเหลือติดก้นขวด คุณยังมองเห็นด้านที่พาไปต่อ",
		description:
			"อาวุธลับของคุณคือการมองหาข้อดีในสถานการณ์ห่วยๆ แล้วใช้ความหวังพาตัวเองไปหาเส้นชัย",
	},
	"power-6": {
		id: "power-6",
		title: "พลังเพนกวินสายซัพ",
		nickname: "ฉายา: เพนกวินสายซัพ",
		shareBlurb: "คุณคือ WiFi ของกลุ่มที่คอยเชื่อมต่อความรู้สึกทุกคนเข้าด้วยกัน!",
		description:
			"อาวุธลับของคุณคือความใจดีที่คอยพยุงเพื่อนข้างๆ จนใครๆ ก็อยากวิ่งไปพร้อมกับคุณเสมอ",
	},
	"power-7": {
		id: "power-7",
		title: "พลังจิ้งจอกจอมบุกเบิก",
		nickname: "ฉายา: จิ้งจอกจอมบุกเบิก",
		shareBlurb: "เส้นทางเดิมมันธรรมดาไป!",
		description:
			"อาวุธลับของคุณคือความกล้าที่จะลองเส้นทางใหม่ๆ เพราะทุกก้าวที่กล้าก้าว อาจเป็นทางที่พาคุณไปถึงเส้นชัยได้ไกลและเร็วกว่าเดิม",
	},
};

export const surveySteps: SurveyStep[] = [
	{
		id: "intro",
		type: "intro",
		bottomImage: "/intro/intro0.svg",
		topImage: "/intro/intro0-text.svg",
	},
	{
		id: "intro-1",
		type: "intro",
		bottomImage: "/intro/intro1.svg",
		topImage: "/intro/intro1-text.svg",
	},
	{
		id: "countdown",
		type: "countdown",
		images: ["/text/3.svg", "/text/2.svg", "/text/1.svg", "/text/start.svg"],
	},
	{
		id: "name",
		type: "name",
		label: "สวัสดีพี่นักวิ่งชื่อคุณ :",
		placeholder: "ชื่อของคุณ",
	},
	{
		id: "birthDate",
		type: "birthDate",
		label: "วันเกิดของคุณ",
		optOutLabel: "ข้ามคำถาม",
	},
	{
		id: "0",
		type: "story",
		body: "/text/story0-text.svg",
		bottomImage: "/bottom/story-0.png",
	},
	{
		id: "1",
		type: "choice",
		prompt: "เพิ่งสตาร์ทได้ไม่ทันไร ก้าวพลาดไปเจอทรายดูดเอาไงดี?",
		options: [
			{ value: "A", label: "ดึงเท้าออกช้า ๆ", powerId: "power-1" },
			{ value: "B", label: "นิ่งไว้ก่อน", powerId: "power-2" },
			{ value: "C", label: "มองหาอะไรเกาะ", powerId: "power-3" },
			{ value: "D", label: "กระชากขาขึ้น ฮีบเดียวจบ!", powerId: "power-4" },
		],
		bottomImage: "/bottom/1st.png",
	},
	{
		id: "2",
		type: "choice",
		prompt: "วิ่งมาแล้วเกือบครึ่งทาง แต่น้ำในกระติกจะหมด จะไหวไหมเนี่ย?",
		options: [
			{ value: "A", label: "อย่างน้อยก็เหลือ", powerId: "power-5" },
			{ value: "B", label: "หันไปถามเพื่อนข้างๆ ว่าไหวไหม", powerId: "power-6" },
			{ value: "C", label: "มองหาแหล่งน้ำด่วน!", powerId: "power-7" },
			{ value: "D", label: "จิบเท่าที่จำเป็นก่อน", powerId: "power-1" },
		],
		bottomImage: "/bottom/2nd.png",
	},
	{
		id: "story-1",
		type: "story",
		body: "/text/story1-text.svg",
		bottomImage: "/bottom/story1.svg",
	},
	{
		id: "story-1-1",
		type: "story",
		bottomImage: "/bottom/story-bridge-1.svg",
	},
	{
		id: "story-1-2",
		type: "story",
		bottomImage: "/bottom/story-bridge-2.svg",
	},
	{
		id: "3",
		type: "choice",
		prompt: "ระวัง!! ข้างหน้าเป็นรอยแยกทรายถล่ม! จะข้ามยังไงดี?",
		options: [
			{
				value: "A",
				label: "หาที่กำบัง",
				powerId: "power-2",
			},
			{ value: "B", label: "คว้าผ้าบัฟคลุมหน้า ใส่แว่นทันที", powerId: "power-3" },
			{ value: "C", label: "เร่งสปีด ลุยฝ่าพายุเลย!", powerId: "power-4" },
			{ value: "D", label: "เบี่ยงเส้นทางหลบพายุ", powerId: "power-5" },
		],
		bottomImage: "/bottom/3rd.png",
	},
	{
		id: "story-2",
		type: "story",
		body: "/text/story2-text.svg",
		bottomImage: "/bottom/story-2.png",
	},
	{
		id: "4",
		type: "choice",
		prompt: "นักวิ่งข้างๆ เริ่มถอดใจ คุณจะบอกว่า...",
		options: [
			{ value: "A", label: "เฮ้ย! มานี่ไปวิ่งด้วยกัน", powerId: "power-6" },
			{ value: "B", label: "เปลี่ยนไปวิ่งเส้นทางที่ง่ายขึ้นมั้ย?", powerId: "power-7" },
			{ value: "C", label: "อย่าเพิ่งท้อหายใจเข้าลึกๆ", powerId: "power-1" },
			{ value: "D", label: "แวะพักก่อน แล้วค่อยไปต่อนะ", powerId: "power-2" },
		],
		bottomImage: "/bottom/4th.png",
	},
	{
		id: "5",
		type: "choice",
		prompt: 'ใกล้ถึงเส้นชัย! เจอดีล "รับเงินก้อนใหญ่" ไม่ต้องกลับไปวิ่งให้เหนื่อย ดีลนี้เอาไง',
		options: [
			{ value: "A", label: "มีข้อแลกเปลี่ยนอะไรรึป่าว?", powerId: "power-3" },
			{ value: "B", label: "น่าสนใจแต่ขอเข้าเส้นชัยด้วยตัวเอง", powerId: "power-4" },
			{
				value: "C",
				label: "รับดีลทันที!",
				powerId: "power-5",
			},
			{
				value: "D",
				label: "ถามความเห็นจากเพื่อนข้างๆ",
				powerId: "power-6",
			},
		],
		bottomImage: "/bottom/5th.png",
	},
	{
		id: "6",
		type: "text",
		prompt: "ข้ามเส้นชัยแล้ว... ขอ 3 คำที่คุณอยากตะโกนบอกตัวเองคืออะไร?",
		placeholder: "พิมพ์ 3 คำของคุณ",
	},
	{
		id: "result",
		type: "result",
	},
];

export const scoredQuestionIds = ["1", "2", "3", "4", "5"] as const;

export const totalQuestionCount = 5;
