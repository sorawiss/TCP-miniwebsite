"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { PdpaStep } from "@/lib/config";

interface PdpaPageProps {
	onNext: () => void;
	step: PdpaStep;
}

export function SurveyPdpaPage({ onNext }: PdpaPageProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [noticeFound, setNoticeFound] = useState(false);
	const [showFallback, setShowFallback] = useState(false);

	useEffect(() => {
		const script = document.querySelector(
			'script[src*="reddot.js"]'
		) as HTMLScriptElement | null;
		if (!script) {
			const newScript = document.createElement("script");
			newScript.src =
				"https://privacy.tcp.com/v1/privacy-managers/49048097048/reddot.js";
			newScript.type = "text/javascript";
			newScript.async = true;
			document.body.appendChild(newScript);
		}

		const moveCookieNotice = () => {
			const notices = Array.from(document.querySelectorAll(".cookie-notice"));
			if (notices.length > 0) {
				const mainNotice = notices[0];
				if (
					containerRef.current &&
					!containerRef.current.contains(mainNotice)
				) {
					containerRef.current.appendChild(mainNotice);
					setNoticeFound(true);
					setShowFallback(false);
				}
				// Remove any other duplicate notices
				for (let i = 1; i < notices.length; i++) {
					notices[i].remove();
				}
			}
		};

		// Set up an observer to check when the script injects the element
		const observer = new MutationObserver(() => {
			moveCookieNotice();
		});

declare global {
	interface Window {
		// biome-ignore lint/suspicious/noExplicitAny: window.gtag accepts dynamic parameter lists from GTM
		gtag?: (...args: any[]) => void;
	}
}

export function SurveyPdpaPage({ onNext }: PdpaPageProps) {
	const [performance, setPerformance] = useState(false);
	const [functional, setFunctional] = useState(false);
	const [targeting, setTargeting] = useState(false);

	const acceptAll = () => {
		setPerformance(true);
		setFunctional(true);
		setTargeting(true);

		if (typeof window !== "undefined" && window.gtag) {
			window.gtag("consent", "update", {
				ad_storage: "granted",
				analytics_storage: "granted",
				ad_user_data: "granted",
				ad_personalization: "granted",
			});
		}

		setTimeout(onNext, 150);
	};

	const confirmChoices = () => {
		if (typeof window !== "undefined" && window.gtag) {
			window.gtag("consent", "update", {
				ad_storage: targeting ? "granted" : "denied",
				analytics_storage: performance ? "granted" : "denied",
				ad_user_data: targeting ? "granted" : "denied",
				ad_personalization: targeting ? "granted" : "denied",
			});
		}
		onNext();
	};

	return (
		<div className="relative flex h-screen items-center justify-center px-4">
			<div className="relative z-10 mb-30 flex w-full max-w-[400px] flex-col overflow-hidden rounded-2xl bg-white p-5 shadow-sm">
				{/* The title of the page */}
				{!noticeFound && (
					<div className="pb-4 text-center">
						<h2 className="font-bold text-[#1F1F1F] text-xl leading-tight">
							การตั้งค่าคุกกี้
						</h2>
					</div>
				)}

				{/* Container for Reddot Script UI placement */}
				<div className="w-full" ref={containerRef} />

				{/* Fallback button if script is blocked or already consented */}
				{showFallback && (
					<div className="flex flex-col items-center pt-2 text-center">
						<p className="mb-4 text-[#777777] text-lg leading-[1.45]">
							ยินยอมนโยบายความเป็นส่วนตัวและคุกกี้เรียบร้อยแล้ว
						</p>
						<button
							className="h-[34px] cursor-pointer rounded-[5px] border border-[#D3D3D3] bg-white px-3 text-[#222222] text-[18px] transition-colors active:bg-[#F4F4F4]"
							onClick={confirmChoices}
							type="button"
						>
							ดำเนินการต่อ
						</button>
					</div>
				)}

				{/* Loading indicator when waiting for script */}
				{!(noticeFound || showFallback) && (
					<div className="flex items-center justify-center py-8">
						<div className="h-6 w-6 animate-spin rounded-full border-2 border-[#E4002B] border-t-transparent" />
					</div>
				)}
			</div>
			<Image
				alt="Desert"
				className="pointer-events-none absolute bottom-0 left-0 z-0 w-full object-cover"
				fetchPriority="high"
				height={500}
				loading="eager"
				sizes="(max-width: 403px) 100vw, 403px"
				src={"/bottom/desert.png"}
				width={800}
			/>
		</div>
	);
}
