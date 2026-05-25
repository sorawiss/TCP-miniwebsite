import type { Ref } from "react";
import type { ResultPower } from "@/lib/config";

interface SurveyShareCardProps {
	daysLived: number | null;
	power: ResultPower;
	ref?: Ref<HTMLDivElement>;
	runnerName: string;
	uuid: string;
}

export function SurveyShareCard({
	power,
	runnerName,
	daysLived,
	uuid,
	ref,
}: SurveyShareCardProps) {
	const formattedDays = daysLived ? daysLived.toLocaleString() : "0";

	return (
		<div
			className="relative flex select-none flex-col items-center gap-4 overflow-hidden bg-[#FFEFC7] px-3 py-3"
			ref={ref}
			style={{
				width: "400px",
				height: "700px",
				backgroundImage: "url('/svg/background.svg')",
			}}
		>
			{/* UUID display */}
			<div
				className="absolute top-4 right-4 rounded-full border border-[#FF8200] px-1 text-[#FF8200] text-[0.5rem]"
				style={{ backgroundColor: "rgba(255, 229, 215, 0.5)" }}
			>
				UUID: {uuid}
			</div>

			{/* Logo */}
			{/* biome-ignore lint/performance/noImgElement: standard img element is needed for html-to-image canvas sharing */}
			<img
				alt="Logo"
				className="relative z-10 mx-auto w-12"
				height={56}
				src="/logo.png"
				width={56}
			/>

			{/* Card Content */}
			<div className="relative z-10 flex w-full flex-col items-center">
				<h1 className="mb-2 text-center font-uid text-[#FF8200] text-[2.2rem] leading-tight">
					พลังที่ซ่อนอยู่ในตัวคุณ
				</h1>
				<div className="mb-1 text-center font-uid text-[#151F6D] text-[2.2rem] leading-[110%]">
					{runnerName}
				</div>

				{/* Character Image */}
				<div className="relative mb-4 flex justify-center">
					{/* biome-ignore lint/performance/noImgElement: standard img element is needed for html-to-image canvas sharing */}
					<img
						alt="Power character"
						className="object-contain"
						height={160}
						src={`/results/${power.id}.png`}
						style={{ display: "block" }}
						width={160}
					/>
				</div>

				{/* Info Box */}
				{daysLived !== null && (
					<div className="relative mb-2 flex w-fit flex-col items-center justify-center rounded-full border border-[#FFB500] bg-[#FFEFC7]/80 px-8 py-1 shadow-sm">
						<div className="font-medium text-[#4A4A4A] text-[0.95rem]">
							คุณผ่าน“ทะเลทราย” ของตัวเองมาแล้ว
						</div>
						<div className="font-bold text-[#FF8200] text-[1.8rem] leading-none">
							{formattedDays} วัน
						</div>
					</div>
				)}

				{/* Separator */}
				<div className="my-2 flex w-full max-w-[280px] items-center">
					<div className="flex-grow border-[#E60000] border-t-[2px]" />
					<span className="mx-3 whitespace-nowrap font-medium text-[#E60000] text-[1.1rem]">
						พลังที่ปลุกให้คุณไปต่อได้ คือ
					</span>
					<div className="flex-grow border-[#E60000] border-t-[2px]" />
				</div>

				{/* Power Title */}
				<h2 className="my-1 text-center font-uid text-[#ee1c25] text-[2.4rem] leading-[110%]">
					{power.title}
				</h2>

				{/* Power Description */}
				<p className="px-2 text-center font-sans text-[#151F6D] text-[1.75rem] leading-[100%]">
					{power.description}
				</p>
			</div>

			{/* Bottom share bg */}
			{/* biome-ignore lint/performance/noImgElement: standard img element is needed for html-to-image canvas sharing */}
			<img
				alt=""
				className="pointer-events-none absolute bottom-0 left-0 z-0 h-auto w-full object-cover"
				height={200}
				src="/share-bg.png"
				width={200}
			/>
		</div>
	);
}
