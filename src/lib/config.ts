export interface ResultPower {
	description: string;
	id: string;
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
	className?: string;
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
	powerId: string;
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
	promptImage?: string;
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

export const resultPowers: Record<string, ResultPower> = {
	"1": {
		id: "1",
		title: "พลังนักสยบไอร้อน",
		description:
			"นิ่ง ทน อึด ในวันที่แดดร้อนสุดโหด อาวุธลับคือการคุมอารมณ์ และมีสติท่ามกลางความกดดัน",
	},
	"2": {
		id: "2",
		title: "พลังนักล่าโอเอซิส",
		description:
			'อารมณ์ชั่ววูบทำอะไรคุณไม่ได้! อาวุธลับของคุณคือการ "หยุดนิ่งเพื่อตั้งหลัก" ไม่พุ่งใส่พายุทราย ยิ่งช่วงเหนื่อยหนักยิ่งมองจังหวะ ตะครุบทางรอดที่ฉลาดที่สุด',
	},
	"3": {
		id: "3",
		title: "พลังนักอ่านเกมแห่งผืนทราย",
		description:
			'อุปสรรคหรอ? มันก็เกมเลเวลนึงเท่านั้นแหละ!  อาวุธลับของคุณคือการเป็น "นักวิเคราะห์หาทางแก้ที่ปังที่สุด" ใช้ไหวพริบได้เก่งจนน่าหมั่นไส้!',
	},
	"4": {
		id: "4",
		title: "พลังผู้พิชิตดวงตะวัน",
		description:
			'คำว่า "ทำไม่ได้" สะกดไม่เป็น! อาวุธของคุณคือ "ความมั่นใจ No.1 และสายตาที่โฟกัสเป้าชนะ" และเชื่อมั่นว่าคุณจะจัดการกับสถานการณ์ตรงหน้าได้',
	},
	"5": {
		id: "5",
		title: "พลังนักวิ่งกระบองเพชร",
		description:
			"ต่อให้เจอสภาพแวดล้อมที่โหดแค่ไหน ความทรหดก็ยังทำให้คุณมองเห็น “ความหวัง” ที่ซ่อนอยู่เสมออาวุธลับของคุณคือการมองด้านดี ในสถานการณ์ที่ยากลำบาก เหมือนกระบองเพชรที่ยังเติบโตได้แม้อยู่กลางทะเลทราย",
	},
	"6": {
		id: "6",
		title: "พลังนักวิ่งสายซัป",
		description:
			'คุณคือ นักวิ่งที่คอยคุมจังหวะการวิ่งให้ผู้อื่น และคอยชาร์จแบต "เติมพลังใจ" ให้ทุกคน อาวุธลับ การปลุกพลังใจให้เพื่อนนักวิ่ง คอยพยุงให้เพื่อนมีแรงมองถึง เส้นชัยไปพร้อมกับคุณ',
	},
	"7": {
		id: "7",
		title: "พลังผู้บุกเบิกเส้นทางใหม่",
		description:
			"เส้นทางเดิมมันธรรมดาไป! อาวุธคือความกล้าก้าวออกจากเซฟโซน ไปสู่เส้นทางใหม่ที่ท้าทาย เพราะทุกก้าวที่กล้า...อาจเป็นทางที่พาคุณไปถึงเส้นชัยได้เร็วกว่าที่คิด",
	},
};

export const surveySteps: SurveyStep[] = [
	{
		id: "intro",
		type: "intro",
		bottomImage: "/intro/intro0.svg",
		topImage: "/intro/intro0-text.svg",
		className: "mt-[20vh]",
	},
	{
		id: "intro-1",
		type: "intro",
		bottomImage: "/intro/intro1.svg",
		topImage: "/intro/intro1-text.svg",
		className: "mt-[25vh]",
	},
	{
		id: "countdown",
		type: "countdown",
		images: ["/text/3.svg", "/text/2.svg", "/text/1.svg", "/text/start.svg"],
	},
	{
		id: "name",
		type: "name",
		label: "สวัสดี! คุณ...",
		placeholder: "ชื่อของคุณ",
	},
	{
		id: "birthDate",
		type: "birthDate",
		label: "",
		optOutLabel: "ไม่ระบุวันเกิดและอายุ",
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
			{ value: "A", label: "ดึงเท้าออกช้า ๆ", powerId: "1" },
			{ value: "B", label: "นิ่งไว้ก่อน", powerId: "2" },
			{ value: "C", label: "มองหาอะไรเกาะ", powerId: "3" },
			{ value: "D", label: "กระชากขาขึ้น ฮีบเดียวจบ!", powerId: "4" },
		],
		bottomImage: "/bottom/1st.png",
	},
	{
		id: "2",
		type: "choice",
		prompt: "วิ่งมาแล้วเกือบครึ่งทาง แต่น้ำในกระติกจะหมด จะไหวไหมเนี่ย?",
		options: [
			{ value: "A", label: "อย่างน้อยก็เหลือ", powerId: "5" },
			{ value: "B", label: "หันไปถามเพื่อนข้างๆ ว่าไหวไหม", powerId: "6" },
			{ value: "C", label: "มองหาแหล่งน้ำด่วน!", powerId: "7" },
			{ value: "D", label: "จิบเท่าที่จำเป็นก่อน", powerId: "1" },
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
			{ value: "B", label: "คว้าผ้าบัฟคลุมหน้า ใส่แว่นทันที", powerId: "3" },
			{ value: "C", label: "เร่งสปีด ลุยฝ่าพายุเลย!", powerId: "4" },
			{ value: "D", label: "เบี่ยงเส้นทางหลบพายุ", powerId: "5" },
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
			{ value: "A", label: "เฮ้ย! มานี่ไปวิ่งด้วยกัน", powerId: "6" },
			{ value: "B", label: "เปลี่ยนไปวิ่งเส้นทางที่ง่ายขึ้นมั้ย?", powerId: "7" },
			{ value: "C", label: "อย่าเพิ่งท้อหายใจเข้าลึกๆ", powerId: "1" },
			{ value: "D", label: "แวะพักก่อน แล้วค่อยไปต่อนะ", powerId: "2" },
		],
		bottomImage: "/bottom/4th.png",
	},
	{
		id: "5",
		type: "choice",
		prompt: 'ใกล้ถึงเส้นชัย! เจอดีล "รับเงินก้อนใหญ่" ไม่ต้องกลับไปวิ่งให้เหนื่อย ดีลนี้เอาไง',
		options: [
			{ value: "A", label: "มีข้อแลกเปลี่ยนอะไรรึป่าว?", powerId: "3" },
			{ value: "B", label: "น่าสนใจแต่ขอเข้าเส้นชัยด้วยตัวเอง", powerId: "4" },
			{
				value: "C",
				label: "รับดีลทันที!",
				powerId: "5",
			},
			{
				value: "D",
				label: "ถามความเห็นจากเพื่อนข้างๆ",
				powerId: "6",
			},
		],
		bottomImage: "/bottom/5th.png",
	},
	{
		id: "6",
		type: "text",
		prompt: "ข้ามเส้นชัยแล้ว... ขอ 3 คำที่คุณอยากตะโกนบอกตัวเองคืออะไร?",
		promptImage: "/text/6.svg",
		placeholder: "ทำได้ แล้ว ....",
	},
	{
		id: "7",
		type: "story",
		body: "/text/last.svg",
		bottomImage: "/bottom/last.png",
	},
	{
		id: "result",
		type: "result",
	},
];

export const scoredQuestionIds = ["1", "2", "3", "4", "5"] as const;

export const totalQuestionCount = 5;
