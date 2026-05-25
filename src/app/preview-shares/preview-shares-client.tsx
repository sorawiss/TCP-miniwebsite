"use client";

import { useRef, useState } from "react";
import { SurveyShareCard } from "@/features/summary-page/components/survey-share-card";
import { resultPowers } from "@/lib/config";
import { downloadImage, generateImageFromElement } from "@/lib/image";

export default function PreviewSharesClient() {
	const [runnerName, setRunnerName] = useState("นักวิ่ง");
	const [daysLived, setDaysLived] = useState<number>(9999);
	const [uuid, setUuid] = useState("test-uuid-12345");
	const [downloadProgress, setDownloadProgress] = useState<string | null>(null);
	const [isDownloadingAll, setIsDownloadingAll] = useState(false);

	// Array of refs for each of the 7 cards
	// Power IDs are "1" to "7", so we'll map index 0..6 to powerIds "1".."7"
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

	const powers = Object.values(resultPowers);

	const handleDownloadSingle = async (powerId: string, index: number) => {
		const element = cardRefs.current[index];
		if (!element) {
			return;
		}

		setDownloadProgress(`กำลังเตรียมดาวน์โหลดพลังที่ ${powerId}...`);
		try {
			const dataUrl = await generateImageFromElement(element);
			if (dataUrl) {
				const sanitizedName = runnerName.replace(
					/[^a-zA-Z0-9\u0e00-\u0e7f]/g,
					"_"
				);
				downloadImage(dataUrl, `tcp-power-${powerId}-${sanitizedName}.png`);
			}
		} catch (error) {
			console.error(`Failed to download power ${powerId}:`, error);
		} finally {
			setDownloadProgress(null);
		}
	};

	const handleDownloadAll = async () => {
		if (isDownloadingAll) {
			return;
		}
		setIsDownloadingAll(true);

		// Loop through all 7 powers and download sequentially with a short delay
		for (let i = 0; i < powers.length; i++) {
			const power = powers[i];
			setDownloadProgress(
				`กำลังดาวน์โหลด (${i + 1}/${powers.length}): ${power.title}`
			);

			const element = cardRefs.current[i];
			if (element) {
				try {
					const dataUrl = await generateImageFromElement(element);
					if (dataUrl) {
						const sanitizedName = runnerName.replace(
							/[^a-zA-Z0-9\u0e00-\u0e7f]/g,
							"_"
						);
						downloadImage(
							dataUrl,
							`tcp-power-${power.id}-${sanitizedName}.png`
						);
					}
				} catch (error) {
					console.error(
						`Failed to download power ${power.id} in batch:`,
						error
					);
				}
			}
			// Wait 400ms between downloads to prevent browser blocking multiple file downloads
			await new Promise((resolve) => setTimeout(resolve, 400));
		}

		setDownloadProgress("ดาวน์โหลดทั้งหมดเสร็จสิ้น!");
		setIsDownloadingAll(false);
		setTimeout(() => setDownloadProgress(null), 3000);
	};

	return (
		<main className="min-h-screen bg-[#1e1e24] p-6 font-sans text-white">
			{/* Header & Controls Panel */}
			<div className="sticky top-4 z-50 mx-auto mb-10 max-w-7xl rounded-2xl border border-white/10 bg-[#2d2d37]/90 p-6 shadow-xl backdrop-blur-md">
				<h1 className="mb-4 font-bold text-2xl text-[#FF8200]">
					ระบบพรีวิวและดาวน์โหลดรูปภาพผลลัพธ์ (Share Images Tester)
				</h1>
				<p className="mb-6 text-gray-300 text-sm">
					ปรับแต่งชื่อ, จำนวนวัน และ UUID ด้านล่างเพื่อดูการแสดงผลของรูปภาพที่จะใช้แชร์จริง
					คุณสามารถตรวจสอบความถูกต้องของฟอนต์, การตัดบรรทัด, และดีไซน์ของทั้ง 7
					พลังได้พร้อมกัน
				</p>

				<div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
					<div className="flex flex-col">
						<label
							className="mb-2 font-semibold text-gray-300 text-sm"
							htmlFor="runner-name-input"
						>
							ชื่อนักวิ่ง
						</label>
						<input
							className="rounded-lg border border-white/20 bg-[#1e1e24] px-4 py-2 text-white focus:border-[#FF8200] focus:outline-none"
							id="runner-name-input"
							onChange={(e) => setRunnerName(e.target.value)}
							placeholder="ระบุชื่อนักวิ่ง..."
							type="text"
							value={runnerName}
						/>
					</div>

					<div className="flex flex-col">
						<label
							className="mb-2 font-semibold text-gray-300 text-sm"
							htmlFor="days-lived-input"
						>
							จำนวนวันที่ผ่านทะเลทราย (วัน)
						</label>
						<input
							className="rounded-lg border border-white/20 bg-[#1e1e24] px-4 py-2 text-white focus:border-[#FF8200] focus:outline-none"
							id="days-lived-input"
							onChange={(e) => setDaysLived(Number(e.target.value))}
							placeholder="เช่น 9999"
							type="number"
							value={daysLived}
						/>
					</div>

					<div className="flex flex-col">
						<label
							className="mb-2 font-semibold text-gray-300 text-sm"
							htmlFor="uuid-input"
						>
							UUID (แสดงขวาบน)
						</label>
						<input
							className="rounded-lg border border-white/20 bg-[#1e1e24] px-4 py-2 text-white focus:border-[#FF8200] focus:outline-none"
							id="uuid-input"
							onChange={(e) => setUuid(e.target.value)}
							placeholder="เช่น test-uuid-12345"
							type="text"
							value={uuid}
						/>
					</div>
				</div>

				<div className="flex flex-wrap items-center justify-between gap-4 border-white/10 border-t pt-4">
					<div className="font-medium text-gray-400 text-sm">
						{downloadProgress ? (
							<span className="flex animate-pulse items-center gap-2 text-[#FF8200]">
								<span className="inline-block h-2.5 w-2.5 rounded-full bg-[#FF8200]" />
								{downloadProgress}
							</span>
						) : (
							"พร้อมดาวน์โหลด"
						)}
					</div>
					<button
						className={`cursor-pointer rounded-xl px-6 py-2.5 font-bold shadow-md transition-all ${
							isDownloadingAll
								? "cursor-not-allowed bg-gray-600 text-gray-400"
								: "bg-[#FF8200] text-white hover:scale-[1.02] hover:bg-[#e07200] active:scale-95"
						}`}
						disabled={isDownloadingAll}
						onClick={handleDownloadAll}
						type="button"
					>
						{isDownloadingAll ? "กำลังประมวลผล..." : "ดาวน์โหลดทั้งหมด (7 รูป)"}
					</button>
				</div>
			</div>

			{/* Grid of Cards */}
			<div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-8 pb-20">
				{powers.map((power, index) => (
					<div
						className="flex w-[440px] flex-col items-center rounded-2xl border border-white/10 bg-[#2d2d37] p-5 shadow-lg transition-colors hover:border-[#FF8200]/50"
						key={power.id}
					>
						<div className="mb-4 flex w-full items-center justify-between border-white/10 border-b pb-2">
							<span className="font-bold text-[#FF8200] text-lg">
								ID: {power.id}
							</span>
							<span className="font-semibold text-gray-400 text-sm">
								{power.title}
							</span>
						</div>

						{/* The exact representation of the share card */}
						<div className="relative mb-5 overflow-hidden rounded-2xl border border-[#FF8200]/20 bg-[#FFEFC7] shadow-2xl">
							<SurveyShareCard
								daysLived={daysLived}
								power={power}
								ref={(el) => {
									cardRefs.current[index] = el;
								}}
								runnerName={runnerName}
								uuid={uuid}
							/>
						</div>

						{/* Individual Card Control */}
						<button
							className="mt-2 w-full cursor-pointer rounded-xl border border-[#FF8200]/30 bg-[#FF8200]/10 py-2 font-bold text-[#FF8200] text-sm transition-all hover:scale-[1.01] hover:bg-[#FF8200]/20 active:scale-95"
							onClick={() => handleDownloadSingle(power.id, index)}
							type="button"
						>
							ดาวน์โหลดการ์ดใบนี้
						</button>
					</div>
				))}
			</div>
		</main>
	);
}
