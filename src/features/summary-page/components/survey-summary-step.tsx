// biome-ignore-all lint: generated file

import Image from "next/image";
import { useRef, useState } from "react";
import ButtonDonwload from "@/components/ui/button-donwload";
import { NextButton } from "@/components/ui/next-button";
import { CoinFlip } from "@/features/summary-page/components/coin-flip";
import type { ResultPower } from "@/lib/config";
import {
	downloadImage,
	generateImageFromElement,
	shareImage,
} from "@/lib/image";
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
	const formattedDays = daysLived ? daysLived.toLocaleString() : "0";
	const cardRef = useRef<HTMLDivElement>(null);
	const [isProcessing, setIsProcessing] = useState(false);

	const handleDownload = async (preGeneratedUrl?: string) => {
		if (isProcessing && !preGeneratedUrl) return;
		setIsProcessing(true);

		const dataUrl =
			preGeneratedUrl ||
			(await generateImageFromElement(cardRef.current, {
				filter: (node) => (node as HTMLElement).id !== "action-buttons",
			}));

		if (dataUrl) {
			downloadImage(dataUrl, "tcp-power.png");
		}

		setIsProcessing(false);
	};

	const handleShare = async () => {
		if (isProcessing) return;
		setIsProcessing(true);

		const dataUrl = await generateImageFromElement(cardRef.current, {
			filter: (node) => (node as HTMLElement).id !== "action-buttons",
		});

		if (!dataUrl) {
			setIsProcessing(false);
			return;
		}

		const shared = await shareImage(dataUrl, {
			title: "พลังที่ซ่อนอยู่ในตัวคุณ",
			text: "นี่คือพลังที่ซ่อนอยู่ในตัวฉัน! มาค้นหาพลังของคุณได้ที่นี่",
			filename: "tcp-power.png",
		});

		if (!shared) {
			// Fallback to download if Web Share API is not supported or fails
			downloadImage(dataUrl, "tcp-power.png");
		}

		setIsProcessing(false);
	};

	return (
		<div
			className="relative flex h-full w-full flex-col bg-[url('/svg/background.svg')] bg-repeat"
			ref={cardRef}
		>
			<div className="relative z-10 flex h-full w-full flex-col items-center overflow-y-auto no-scrollbar px-6 pb-10 pt-2">
				<h1 className="text-center text-[#FF8200] text-[2.5rem]">
					พลังที่ซ่อนอยู่ในตัวคุณ
				</h1>
				<div className="mb-2 text-center text-[#151F6D] -mt-4 text-[2.5rem]">
					{runnerName}
				</div>

				{isProcessing ? (
					<div className="relative mb-4 flex h-[220px] w-[220px] items-center justify-center select-none pointer-events-none">
						<Image
							alt="Power image"
							className="object-contain"
							height={180}
							src={`/results/${power.id}.png`}
							width={180}
						/>
					</div>
				) : (
					<div className="mb-4 flex h-[220px] w-[220px] items-center justify-center">
						<CoinFlip
							powerId={power.id}
							sideTextureUrl="/results/cap-side.png"
						/>
					</div>
				)}

				{/* Info Box */}
				{daysLived !== null && (
					<div
						className="relative border border-[#FFB500] mb-5 flex bg-[#FFEFC7]/50 w-fit rounded-full px-8 
					flex-col items-center justify-center "
					>
						<div className="relative z-10 text-center">
							<div className="text-[#4A4A4A] text-[1rem]">คุณใช้ชีวิตมาแล้ว</div>
							<div className="text-[#FF8200] -mt-1 leading-none text-[2rem]">
								{formattedDays} วัน
							</div>
						</div>
					</div>
				)}

				{/* Separator line with text */}
				<div className="flex w-full max-w-[300px] items-center">
					<div className="flex-grow border-[#E60000] border-t-[3px]" />
					<span className="mx-3 text-[1.2rem]">พลังที่ปลุกให้คุณไปต่อได้ คือ</span>
					<div className="flex-grow border-[#E60000] border-t-[3px]" />
				</div>

				{/* Power Title */}
				<h2 className="text-center text-[#ee1c25] text-[3rem]">
					{power.title}
				</h2>

				{/* Power Description */}
				<div className="mb-8 px-2 text-center text-[1.5rem] leading-relaxed">
					{power.description}
				</div>

				<div
					className="w-full flex flex-col items-center pb-10"
					id="action-buttons"
				>
					{/* Download Button */}
					<button
						className={`group relative rounded-full mb-4 flex w-full max-w-[300px] py-[1rem] items-center justify-center transition-transform ${
							isProcessing
								? "cursor-wait opacity-70"
								: "cursor-pointer active:scale-95"
						}`}
						disabled={isProcessing}
						onClick={() => handleDownload()}
					>
						<ButtonDonwload
							className="absolute inset-0 z-0 w-full  drop-shadow-sm"
							preserveAspectRatio="xMidYMid meet"
						/>
						<span className="relative z-10 flex items-center gap-2 font-medium text-[#FF8200] text-[1.5rem]">
							{isProcessing ? "กำลังประมวลผล..." : "ดาวน์โหลดพลังของคุณ"}
						</span>
					</button>

					{/* Share Button using NextButton */}
					<NextButton disabled={isProcessing} onClick={handleShare}>
						{isProcessing ? "กำลังประมวลผล..." : "แชร์พลังของคุณ"}
					</NextButton>
				</div>
			</div>

			<Image
				alt="Story background"
				className="pointer-events-none absolute bottom-0 left-0 z-0 w-full object-cover"
				height={800}
				src={"/results/bg.png"}
				width={800}
			/>
		</div>
	);
}
