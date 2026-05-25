// biome-ignore-all lint: generated file

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
import { SummaryFooterBranding } from "./summary-footer-branding";
import { SurveyShareCard } from "./survey-share-card";
import { playSummaryEntranceAnimation } from "./survey-summary-step.animation";

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
	const shareCardRef = useRef<HTMLDivElement>(null);
	const [isProcessing, setIsProcessing] = useState(false);
	const [cachedDataUrl, setCachedDataUrl] = useState<string | null>(null);
	const [showShareModal, setShowShareModal] = useState(false);
	const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
		null
	);
	const randomUuid = state.uuid; // TODO: Remove UUID display and logic in the future

	const isMobileDevice = (): boolean => {
		if (typeof window === "undefined") return false;
		return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
	};

	useEffect(() => {
		return playSummaryEntranceAnimation(cardRef);
	}, []);

	// Clear the cached image URL when the UUID updates, forcing regeneration with the correct UUID
	useEffect(() => {
		setCachedDataUrl(null);
	}, [randomUuid]);

	const getCardImageUrl = async (): Promise<string | null> => {
		if (cachedDataUrl) return cachedDataUrl;
		if (!shareCardRef.current) return null;

		const url = await generateImageFromElement(shareCardRef.current);
		if (url) {
			setCachedDataUrl(url);
		}
		return url;
	};

	const handleDownload = async () => {
		if (isProcessing) return;
		setIsProcessing(true);

		const dataUrl = await getCardImageUrl();

		if (dataUrl) {
			if (isMobileDevice()) {
				setGeneratedImageUrl(dataUrl);
				setShowShareModal(true);
			} else {
				downloadImage(dataUrl, "tcp-power.png");
			}
		}

		setIsProcessing(false);
	};

	const handleShare = async () => {
		if (isProcessing) return;
		setIsProcessing(true);

		const dataUrl = await getCardImageUrl();

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
			if (isMobileDevice()) {
				setGeneratedImageUrl(dataUrl);
				setShowShareModal(true);
			} else {
				downloadImage(dataUrl, "tcp-power.png");
			}
		}

		setIsProcessing(false);
	};

	return (
		<div
			className="relative flex h-full w-full flex-col bg-[url('/svg/background.svg')] bg-repeat"
			ref={cardRef}
		>
			<div className="relative z-10 flex h-full w-full flex-col items-center overflow-y-auto no-scrollbar px-6 pb-10 pt-2">
				<div
					className="z-20 mb-4 self-end rounded-full border border-[#FF8200] px-1 text-[0.5rem] text-[#FF8200]"
					style={{ backgroundColor: "rgba(255, 229, 215, 0.5)" }}
				>
					UUID: {randomUuid}
				</div>

				<h1
					className="text-center text-[#FF8200] font-uid leading-[110%] text-[2.5rem] mb-2"
					data-animate="title"
				>
					พลังที่ซ่อนอยู่ในตัวคุณ
				</h1>
				<div
					className="text-center text-[#151F6D] font-uid text-[2.5rem] leading-[110%]"
					data-animate="subtitle"
				>
					{runnerName}
				</div>

				{isProcessing ? (
					<div className="relative mb-2 flex h-[220px] w-[220px] items-center justify-center select-none pointer-events-none">
						<Image
							alt="Power image"
							className="object-contain"
							height={180}
							src={`/results/${power.id}.png`}
							width={180}
						/>
					</div>
				) : (
					<div
						className="mb-4 flex h-[220px] w-[220px] items-center justify-center"
						data-animate="cap"
					>
						{/* TODO: make sideTextureUrl Dynamic */}
						<CoinFlip
							powerId={power.id}
							sideTextureUrl={`/results/cap-${power.id}.png`}
						/>
					</div>
				)}

				{/* Info Box */}
				{daysLived !== null && (
					<div
						className="relative border border-[#FFB500] mb-5 flex bg-[#FFEFC7]/50 w-fit rounded-full px-8 
					flex-col items-center justify-center "
						data-animate="info-box"
					>
						<div className="relative z-10 text-center">
							<div className="text-[#4A4A4A] text-[1.2rem]">
								คุณผ่าน“ทะเลทราย” ของตัวเองมาแล้ว
							</div>
							<div className="text-[#FF8200] -mt-1 leading-none text-[2rem]">
								{formattedDays} วัน
							</div>
						</div>
					</div>
				)}

				{/* Separator line with text */}
				<div
					className="flex w-full max-w-[300px] items-center"
					data-animate="separator"
				>
					<div className="flex-grow border-[#E60000] border-t-[3px]" />
					<span className="mx-3 text-[1.2rem] whitespace-nowrap">
						พลังที่ปลุกให้คุณไปต่อได้ คือ
					</span>
					<div className="flex-grow border-[#E60000] border-t-[3px]" />
				</div>

				{/* Power Title */}
				<h2
					className="mt-2 text-center font-uid text-[#ee1c25] text-[3rem] leading-[110%]"
					data-animate="power-title"
				>
					{power.title}
				</h2>

				{/* Power Description */}
				<div
					className="mb-8 px-2 text-center text-[1.5rem] leading-[110%] text-[#151F6D]"
					data-animate="power-desc"
				>
					{power.description}
				</div>

				<div
					className="w-full flex flex-col items-center pb-10"
					data-animate="buttons"
					id="action-buttons"
				>
					{/* Download Button */}
					<button
						className={`group relative rounded-full flex w-full max-w-[300px] py-[1rem] 
							items-center justify-center transition-transform ${
								isProcessing
									? "cursor-wait opacity-70"
									: "cursor-pointer active:scale-95"
							}`}
						disabled={isProcessing}
						onClick={() => handleDownload()}
						type="button"
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
					<p className="text-[1.4rem] mt-2">
						ร่วมกิจกรรมได้ตั้งแต่วันนี้ - 9 สิงหาคม 2569
					</p>
				</div>

				{/* Branding footer: logos + product bottles — excluded from image capture */}
				<div id="branding-footer">
					<SummaryFooterBranding />
				</div>
			</div>

			<Image
				alt="Story background"
				className="pointer-events-none absolute bottom-0 left-0 z-0 w-full object-cover"
				fetchPriority="high"
				height={800}
				loading="eager"
				sizes="(max-width: 403px) 100vw, 403px"
				src={"/results/bg.png"}
				width={800}
			/>

			{/* Off-screen hidden card for high-fidelity image capture */}
			{/* --------------------------------------------- */}
			<div
				className="pointer-events-none absolute"
				style={{
					position: "absolute",
					left: "-9999px",
					top: "-9999px",
					overflow: "hidden",
					width: "400px",
					height: "700px",
				}}
			>
				<SurveyShareCard
					daysLived={daysLived}
					power={power}
					ref={shareCardRef}
					runnerName={runnerName}
					uuid={randomUuid}
				/>
			</div>

			{/* Fallback image share/saving overlay for mobile devices */}
			{showShareModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
					<div className="relative flex flex-col items-center bg-[#FFEFC7] border-4 border-[#FFB500] rounded-3xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
						{/* Close Button */}
						<button
							className="absolute top-3 right-3 text-[#FF8200] hover:text-[#E60000] text-2xl font-bold bg-white/90 rounded-full w-8 h-8 flex items-center justify-center shadow-sm cursor-pointer border border-[#FFB500]/30 transition-transform active:scale-90"
							onClick={() => setShowShareModal(false)}
							type="button"
						>
							&times;
						</button>

						{/* Instructions */}
						<h3 className="text-center text-[#151F6D] text-[1.4rem] font-bold mb-1 mt-2">
							บันทึกรูปภาพพลังของคุณ
						</h3>
						<p className="text-center text-[#6B3E1F] text-[1.05rem] mb-4">
							กดค้างที่รูปภาพเพื่อบันทึก หรือส่งต่อให้เพื่อน
						</p>

						{/* Real HTML <img> showing generated image data URL */}
						<div className="relative border-4 border-white rounded-2xl overflow-hidden shadow-md bg-white w-full flex items-center justify-center">
							{generatedImageUrl && (
								<img
									alt="TCP Power Result"
									className="w-full h-auto object-contain"
									src={generatedImageUrl}
									style={{ WebkitTouchCallout: "default" }}
								/>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
