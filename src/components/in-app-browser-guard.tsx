"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const FB_REGEX = /FBAN|FBAV|FB_IAB|FB4A/i;
const IG_REGEX = /Instagram/i;
const LN_REGEX = /Line/i;
const TT_REGEX = /musical_ly|TikTok/i;
const ANDROID_REGEX = /Android/i;
const HTTPS_PREFIX_REGEX = /^https?:\/\//;

export function InAppBrowserGuard() {
	const [isInApp, setIsInApp] = useState(false);
	const [isAndroid, setIsAndroid] = useState(false);
	const [intentUrl, setIntentUrl] = useState("");

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		const ua =
			navigator.userAgent ||
			navigator.vendor ||
			(window as unknown as { opera?: string }).opera ||
			"";

		// Detect In-App browsers
		const isFB = FB_REGEX.test(ua);
		const isIG = IG_REGEX.test(ua);
		const isLN = LN_REGEX.test(ua);
		const isTT = TT_REGEX.test(ua);
		const detectedInApp = isFB || isIG || isLN || isTT;

		const detectedAndroid = ANDROID_REGEX.test(ua);

		setIsInApp(detectedInApp);
		setIsAndroid(detectedAndroid);

		if (detectedInApp && detectedAndroid) {
			// Construct Android intent URL
			const cleanUrl = window.location.href.replace(HTTPS_PREFIX_REGEX, "");
			const url = `intent://${cleanUrl}#Intent;scheme=https;end`;
			setIntentUrl(url);

			// Attempt auto-redirect
			window.location.href = url;
		}
	}, []);

	if (!isInApp) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-[9999] flex select-none flex-col items-center justify-center bg-[#FFFAF0] bg-[url('/svg/background.svg')] px-6 text-center text-[#2f1b09]">
			<style>{`
				@keyframes bounce-slow {
					0%, 100% {
						transform: translateY(0);
					}
					50% {
						transform: translateY(-8px);
					}
				}
				@keyframes pulse-ring {
					0% {
						transform: scale(0.95);
						box-shadow: 0 0 0 0 rgba(21, 31, 109, 0.4);
					}
					70% {
						transform: scale(1);
						box-shadow: 0 0 0 12px rgba(21, 31, 109, 0);
					}
					100% {
						transform: scale(0.95);
						box-shadow: 0 0 0 0 rgba(21, 31, 109, 0);
					}
				}
				.animate-bounce-slow {
					animation: bounce-slow 2s infinite ease-in-out;
				}
				.animate-pulse-ring {
					animation: pulse-ring 2s infinite;
				}
			`}</style>

			<div className="mx-auto flex max-w-sm flex-col items-center">
				{/* Top App Logo */}
				<div className="mb-6 flex justify-center">
					<Image
						alt="Logo"
						className="h-16 w-16 object-contain"
						height={64}
						priority
						src="/logo.png"
						width={64}
					/>
				</div>

				{isAndroid ? (
					// ANDROID VIEW
					<div className="flex flex-col items-center">
						<div className="relative mb-6 flex h-20 w-20 animate-pulse-ring items-center justify-center rounded-full bg-white shadow-md">
							{/* Chrome Icon SVG */}
							<svg
								className="h-12 w-12 text-[#151F6D]"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<title>Chrome Browser</title>
								<path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 1.5c4.71 0 8.7 3.23 9.77 7.59L12.01 9H12c-.93 0-1.8.27-2.54.72L5.23 2.87C7.13 2 9.42 1.5 12 1.5zM1.54 11.23l4.31 7.46C4.46 17.29 3.4 15.28 2.37 13H1.54C1.51 12.67 1.5 12.34 1.5 12c0-.26.01-.52.04-.77zm5.54 7.62l4.23-7.33A2.99 2.99 0 0012 12c.59 0 1.15-.17 1.63-.47l4.31 7.46C16.48 20.31 14.35 21 12 21c-1.84 0-3.56-.44-5.08-1.21l.16.06z" />
							</svg>
						</div>

						<h2 className="mb-3 font-bold text-2xl text-[#151F6D] tracking-wide">
							กรุณาเปิดในบราวเซอร์ปกติ
						</h2>
						<p className="mb-8 text-[#151F6D]/70 text-lg leading-relaxed">
							เพื่อเข้าใช้งานและรับประสบการณ์การเล่นที่สมบูรณ์แบบ
							กรุณาเปิดหน้าเว็บนี้ผ่านบราวเซอร์ของคุณ (เช่น Chrome)
						</p>

						<a
							className="inline-flex items-center justify-center rounded-full bg-[#151F6D] px-8 py-3.5 font-bold text-white text-xl shadow-lg transition-all duration-200 hover:bg-[#151F6D]/90 active:scale-95"
							href={intentUrl}
						>
							เปิดใน Chrome / เบราว์เซอร์ปกติ
						</a>
					</div>
				) : (
					// iOS / STANDARD VIEW
					<div className="flex flex-col items-center">
						<div className="relative mb-6 flex h-20 w-20 animate-bounce-slow items-center justify-center rounded-full bg-white shadow-md">
							{/* Safari Icon SVG */}
							<svg
								className="h-12 w-12 text-[#151F6D]"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								viewBox="0 0 24 24"
							>
								<title>Safari Browser</title>
								<circle cx="12" cy="12" r="10" />
								<polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
							</svg>
						</div>

						<h2 className="mb-3 font-bold text-2xl text-[#151F6D] tracking-wide">
							กรุณาเปิดด้วย Safari
						</h2>
						<p className="mb-6 text-[#151F6D]/70 text-lg leading-relaxed">
							เนื่องจากการเล่นในแอพ Facebook/Instagram
							อาจทำให้ระบบเสียงและรูปภาพทำงานไม่สมบูรณ์
						</p>

						{/* Step instructions */}
						<div className="w-full rounded-2xl border border-[#151F6D]/10 bg-[#151F6D]/5 p-5 text-left">
							<p className="mb-3 font-bold text-[#151F6D] text-lg">
								วิธีการเปิดใน Safari:
							</p>

							<div className="space-y-4 text-[#2f1b09]/80 text-base">
								<div className="flex items-start gap-3">
									<div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#151F6D] font-bold text-sm text-white">
										1
									</div>
									<p>
										แตะปุ่มเมนู{" "}
										<strong className="font-bold text-[#151F6D]">
											จุดสามจุด (•••)
										</strong>{" "}
										หรือปุ่ม{" "}
										<strong className="font-bold text-[#151F6D]">
											แชร์ (Share)
										</strong>{" "}
										ที่บริเวณมุมขวาบน หรือขวาล่างของหน้าจอ
									</p>
								</div>

								<div className="flex items-start gap-3">
									<div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#151F6D] font-bold text-sm text-white">
										2
									</div>
									<p>
										เลือก{" "}
										<strong className="font-bold text-[#151F6D]">
											"เปิดใน Safari" (Open in Safari)
										</strong>{" "}
										หรือ{" "}
										<strong className="font-bold text-[#151F6D]">
											"เปิดในบราวเซอร์เริ่มต้น" (Open in Browser)
										</strong>
									</p>
								</div>
							</div>
						</div>

						{/* Small hint arrow to point to top-right/bottom-right */}
						<div className="mt-8 flex animate-pulse items-center gap-2 text-[#151F6D]/60 text-sm">
							<span>เลื่อนแตะเมนูมุมขวาบนของหน้าจอ</span>
							<svg
								className="h-4 w-4 rotate-45 transform"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.5"
								viewBox="0 0 24 24"
							>
								<title>Arrow Icon</title>
								<path
									d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
