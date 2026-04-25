export interface Question {
	id: string;
	options: string[];
	prompt: string;
}

export const questionPages: Question[] = [
	{
		id: "1",
		prompt: "เพิ่งสตาร์ทได้ไม่ทันไร ทรายก็เข้าเต็มรองเท้าจนเริ่มเจ็บ... เอาไงดีนักวิ่ง?",
		options: [
			"สลัดทรายออก",
			"ขอหยุดดูอาการเจ็บก่อน",
			"เปลี่ยนท่าวิ่งดู!",
			"วิ่งต่อไม่แคร์ทราย",
		],
	},
	{
		id: "2",
		prompt: "วิ่งมาแล้วเกือบครึ่งทาง แต่น้ำในกระติกจะหมด จะไหวไหมเนี่ย?",
		options: [
			"อย่างน้อยก็เหลือ",
			"หันไปถามเพื่อนข้างๆ ว่าไหวไหม",
			"มองหาแหล่งน้ำด่วน!",
			"จิบเท่าที่จำเป็นก่อน",
		],
	},
	{
		id: "3",
		prompt: "ระวัง!! ข้างหน้าเป็นรอยแยกทรายถล่ม! จะข้ามยังไงดี?",
		options: [
			"เช็กความแข็งแรงของพื้นรอบๆ ก่อน",
			"เอากระบองเพชรมาต่อเป็นสะพาน",
			"Better habits",
			"More confidence",
		],
	},
	{
		id: "4",
		prompt: "นักวิ่งข้างๆ เริ่มถอดใจ คุณจะบอกว่า…",
		options: [
			"A clearer direction",
			"New ideas",
			"Better habits",
			"More confidence",
		],
	},
	{
		id: "5",
		prompt: "ใกล้ถึงเส้นชัย! เจอดีล “รับเงินก้อนใหญ่” ไม่ต้องกลับไปวิ่งให้เหนื่อย ดีลนี้เอาไง",
		options: [
			"A clearer direction",
			"New ideas",
			"Better habits",
			"More confidence",
		],
	},
];
