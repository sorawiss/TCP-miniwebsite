// biome-ignore-all lint: generated file

import * as htmlToImage from "html-to-image";
import Image from "next/image";
import { useRef, useState } from "react";
import { NextButton } from "@/components/ui/next-button";
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
	const formattedDays = daysLived ? daysLived.toLocaleString() : "0";
	const cardRef = useRef<HTMLDivElement>(null);
	const [isProcessing, setIsProcessing] = useState(false);

	const generateImage = async (): Promise<string | null> => {
		if (!cardRef.current) return null;
		try {
			return await htmlToImage.toPng(cardRef.current, {
				cacheBust: true,
				pixelRatio: 2,
				style: {
					fontFamily: "inherit",
				},
			});
		} catch (error) {
			console.error("Failed to generate image", error);
			return null;
		}
	};

	const handleDownload = async (preGeneratedUrl?: string) => {
		if (isProcessing && !preGeneratedUrl) return;
		setIsProcessing(true);

		const dataUrl = preGeneratedUrl || (await generateImage());

		if (dataUrl) {
			const link = document.createElement("a");
			link.download = "tcp-power.png";
			link.href = dataUrl;
			link.click();
		}

		setIsProcessing(false);
	};

	const handleShare = async () => {
		if (isProcessing) return;
		setIsProcessing(true);

		const dataUrl = await generateImage();
		if (!dataUrl) {
			setIsProcessing(false);
			return;
		}

		try {
			const blob = await (await fetch(dataUrl)).blob();
			const file = new File([blob], "tcp-power.png", { type: "image/png" });

			if (
				navigator.share &&
				navigator.canShare &&
				navigator.canShare({ files: [file] })
			) {
				await navigator.share({
					title: "พลังที่ซ่อนอยู่ในตัวคุณ",
					text: "นี่คือพลังที่ซ่อนอยู่ในตัวฉัน! มาค้นหาพลังของคุณได้ที่นี่",
					files: [file],
				});
				setIsProcessing(false);
			} else {
				// Fallback to download if Web Share API is not supported
				setIsProcessing(false); // Reset so handleDownload can run
				await handleDownload(dataUrl);
			}
		} catch (error) {
			console.error("Failed to share image", error);
			setIsProcessing(false);
		}
	};

	return (
		<div
			className="relative flex h-full w-full flex-col bg-[url('/svg/background.svg')] bg-repeat"
			ref={cardRef}
		>
			<div className="relative z-10 flex h-full w-full flex-col items-center overflow-y-auto px-6 pb-10 pt-2">
				<h1 className="text-center text-[#FF8200] text-[2.5rem]">
					พลังที่ซ่อนอยู่ในตัวคุณ
				</h1>
				<div className="mb-2 text-center text-[#151F6D] -mt-4 text-[2.5rem]">
					{runnerName}
				</div>

				<Image
					alt="Power image"
					className="mb-4 object-contain"
					height={180}
					src={`/results/${power.id}.png`}
					width={180}
				/>

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

				{/* Download Button */}
				<button
					className={`group relative rounded-full mb-4 flex w-full py-[1rem] items-center justify-center transition-transform ${
						isProcessing
							? "cursor-wait opacity-70"
							: "cursor-pointer active:scale-95"
					}`}
					disabled={isProcessing}
					onClick={() => handleDownload()}
				>
					<Image
						alt="Download bg"
						className="absolute inset-0 z-0 drop-shadow-sm rounded-full"
						fill
						src="/results/button.svg"
					/>
					<span className="relative z-10 flex items-center gap-2 font-medium text-[#FF8200] text-[1.5rem]">
						{isProcessing ? "กำลังประมวลผล..." : "ดาวน์โหลดพลังของคุณ"}
					</span>
				</button>

				{/* Share Button using NextButton */}
				<div className="mb-10">
					<NextButton disabled={isProcessing} onClick={handleShare}>
						{isProcessing ? "กำลังประมวลผล..." : "แชร์พลังของคุณ"}
					</NextButton>
				</div>
			</div>

			<Image
				alt="Story background"
				className="pointer-events-none absolute bottom-0 left-0 z-0 w-full object-cover"
				height={800}
				src={"/svg/result-bg.svg"}
				width={800}
			/>
		</div>
	);
}
