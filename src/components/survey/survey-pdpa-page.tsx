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
				"https://privacy-uat.tcp.com/v1/privacy-managers/49052097048/reddot.js";
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

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});

		// Fallback check interval
		const interval = setInterval(moveCookieNotice, 100);

		// Clean up on unmount (only remove UI notice, leave script singleton)
		return () => {
			clearInterval(interval);
			observer.disconnect();
			const notices = document.querySelectorAll(".cookie-notice");
			for (const notice of notices) {
				notice.remove();
			}
		};
	}, []);

	// Fallback mechanism if the notice doesn't load/appear (e.g. adblocker, already accepted consent)
	useEffect(() => {
		const timer = setTimeout(() => {
			const notice = document.querySelector(".cookie-notice");
			if (!notice) {
				setShowFallback(true);
			}
		}, 1500);

		return () => clearTimeout(timer);
	}, [noticeFound]);

	// Handle button interactions inside the notice or modal
	useEffect(() => {
		const handleGlobalClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const clickedButton = target.closest("button");
			if (
				clickedButton &&
				(clickedButton.classList.contains("cm-btn-success") ||
					clickedButton.classList.contains("cn-decline") ||
					clickedButton.classList.contains("cm-btn-accept") ||
					clickedButton.classList.contains("cm-btn-accept-all") ||
					clickedButton.classList.contains("cm-btn-decline"))
			) {
				setTimeout(() => {
					onNext();
				}, 400); // 400ms delay to ensure reddot.js cookies/consent is stored
			}
		};

		document.addEventListener("click", handleGlobalClick);
		return () => {
			document.removeEventListener("click", handleGlobalClick);
		};
	}, [onNext]);

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
							className="h-[38px] w-full cursor-pointer rounded-[5px] bg-[#E4002B] px-6 font-bold text-[18px] text-white shadow-sm transition-colors active:bg-[#C90026]"
							onClick={onNext}
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
