import type { ResultPower } from "@/lib/config";
import type { SurveyState } from "@/lib/survey";

interface SurveySummaryStepProps {
	daysLived: number | null;
	power: ResultPower;
	state: SurveyState;
}

export function SurveySummaryStep({
	state,
	power,
	daysLived,
}: SurveySummaryStepProps) {
	const runnerName = state.profile.name.trim() || "นักวิ่ง";
	const selfMessage = state.textAnswers["6"]?.trim() || "-";

	return (
		<section className="space-y-8">
			<div className="space-y-3">
				<p className="text-[#9d6b2f] text-sm uppercase tracking-[0.35em]">
					Result
				</p>
				<h1 className="font-black text-4xl text-[#2f1b09] leading-tight sm:text-6xl">
					{power.title}
				</h1>
				<p className="max-w-2xl text-[#5f4630] text-lg leading-8">
					{power.shareBlurb}
				</p>
			</div>

			<div className="rounded-[2rem] border border-[#e5c59f] bg-white/85 p-6 shadow-[0_20px_60px_rgba(132,86,43,0.08)] sm:p-8">
				<div className="space-y-4 text-[#4a331d]">
					<p className="font-semibold text-[#c85f1a] text-lg">
						{daysLived === null
							? "คุณเก่งมากแล้วที่ผ่านชีวิตมาได้ถึงวันนี้"
							: `คุณผ่าน “ทะเลทราย” ของตัวเองมาแล้ว ${daysLived.toLocaleString()} วัน`}
					</p>
					<p className="text-base leading-8">
						{runnerName} บอกกับตัวเองว่า: “{selfMessage}”
					</p>
				</div>
			</div>

			<div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
				<div className="rounded-[2rem] bg-[#2f1b09] p-6 text-[#fff3e4] sm:p-8">
					<p className="text-[#ffcf91] text-sm uppercase tracking-[0.35em]">
						บทสรุปพลังลับ
					</p>
					<p className="mt-4 font-bold text-2xl leading-tight sm:text-4xl">
						{power.nickname}
					</p>
					<p className="mt-5 text-base leading-8">{power.description}</p>
				</div>

				<div className="rounded-[2rem] border border-[#d8ae80] border-dashed bg-[#fff7ef] p-6 text-[#6c5135] sm:p-8">
					<p className="font-semibold text-[#9d6b2f]">พร้อมแชร์</p>
					<p className="mt-4 text-sm leading-7">
						พลังที่ซ่อนอยู่ในตัวคุณคือ “{power.title}”
					</p>
					<p className="mt-3 text-sm leading-7">{power.description}</p>
				</div>
			</div>
		</section>
	);
}
