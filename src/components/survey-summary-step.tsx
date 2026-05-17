// biome-ignore-all lint: generated file

import Image from "next/image";
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
		<div className="relative w-full py-5 items-center h-full flex flex-col">
			<Image
				alt="Story background"
				className="pointer-events-none absolute bottom-0 left-0 z-0 w-full object-cover"
				height={800}
				src={"/svg/result-bg.svg"}
				width={800}
			/>

			<h1 className="text-center">
				พลังที่ซ่อนอยู่ในตัวคุณ
				<br />
				{runnerName}
			</h1>
		</div>
	);
}
