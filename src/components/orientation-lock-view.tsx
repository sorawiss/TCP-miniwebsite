"use client";

import { useMediaQuery, useOrientation } from "@uidotdev/usehooks";

export function OrientationLockView() {
	const orientation = useOrientation();
	const isMobileOrTablet = useMediaQuery("only screen and (max-width: 1024px)");

	// If it's landscape and we are on mobile/tablet, show the rotate lock overlay
	const isLandscape = orientation?.type?.includes("landscape");

	if (!(isLandscape && isMobileOrTablet)) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FFFAF0] bg-[url('/svg/background.svg')] px-6 text-center text-[#2f1b09]">
			<style>{`
				@keyframes rotatePhone {
					0%, 20% {
						transform: rotate(-90deg);
					}
					50%, 70% {
						transform: rotate(0deg);
					}
					100% {
						transform: rotate(-90deg);
					}
				}
				@keyframes drawArrow {
					0%, 20% {
						stroke-dashoffset: 80;
						opacity: 0;
					}
					50%, 70% {
						stroke-dashoffset: 0;
						opacity: 1;
					}
					100% {
						stroke-dashoffset: 80;
						opacity: 0;
					}
				}
				.animate-phone {
					animation: rotatePhone 3s cubic-bezier(0.77, 0, 0.175, 1) infinite;
				}
				.animate-arrow {
					stroke-dasharray: 80;
					animation: drawArrow 3s cubic-bezier(0.77, 0, 0.175, 1) infinite;
				}
			`}</style>

			<div className="relative mb-8 flex h-32 w-32 items-center justify-center">
				<svg
					className="h-28 w-28 text-[#151F6D]/80"
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="3.5"
					viewBox="0 0 100 100"
				>
					<title>Rotate device</title>
					{/* Phone outline that rotates */}
					<g className="origin-center animate-phone">
						{/* Phone body */}
						<rect fill="none" height="64" rx="8" width="32" x="34" y="18" />
						{/* Home bar or screen details */}
						<line x1="45" x2="55" y1="76" y2="76" />
						{/* Camera/speaker notch */}
						<line x1="48" x2="52" y1="23" y2="23" />
					</g>
				</svg>
			</div>

			<h2 className="font-bold text-3xl text-[#151F6D] tracking-wide md:text-4xl">
				กรุณาหมุนโทรศัพท์ของคุณเป็นแนวตั้ง
			</h2>
			<p className="mb-2 text-[#151F6D]/70 text-xl md:text-2xl">
				เพื่อเปิดรับประสบการณ์การเล่นอย่างเต็มรูปแบบ
			</p>
		</div>
	);
}
