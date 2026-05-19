"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { PdpaStep } from "@/lib/config";

interface PdpaPageProps {
	onNext: () => void;
	step: PdpaStep;
}

interface CookieToggleProps {
	checked: boolean;
	description: string;
	disabled?: boolean;
	id: string;
	initialExpanded?: boolean;
	onChange?: (checked: boolean) => void;
	title: string;
}

function CookieToggle({
	id,
	title,
	description,
	checked,
	disabled = false,
	initialExpanded = false,
	onChange,
}: CookieToggleProps) {
	const [expanded, setExpanded] = useState(initialExpanded);
	const switchClassName = disabled
		? "cursor-not-allowed bg-[#E4002B]"
		: "cursor-pointer";
	const switchColorClassName = checked ? "bg-[#E4002B]" : "bg-[#C9C9C3]";

	return (
		<div className="rounded-[6px] border border-[#E0E0E0] bg-[#FAFAF8]">
			<div className="flex min-h-[54px] items-center gap-3 px-3 py-2.5">
				<button
					aria-expanded={expanded}
					className="min-w-0 flex-1 text-left"
					onClick={() => setExpanded((v) => !v)}
					type="button"
				>
					<span className="block truncate text-[14px]">{title}</span>
					{disabled && (
						<span className="mt-1 inline-flex rounded-full bg-[#FFE9E3] px-2 py-0.5 font-medium text-[#E4002B] text-[9px] leading-none">
							เปิดใช้งานตลอดเวลา
						</span>
					)}
				</button>

				<div className="flex shrink-0 items-center gap-1">
					<button
						aria-checked={checked}
						aria-label={`Toggle ${title}`}
						className={`relative inline-flex h-[20px] w-[33px] shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none ${switchClassName} ${disabled ? "" : switchColorClassName}`}
						disabled={disabled}
						id={`toggle-${id}`}
						onClick={() => !disabled && onChange?.(!checked)}
						role="switch"
						type="button"
					>
						<span
							className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
								checked ? "translate-x-[15px]" : "translate-x-0.5"
							}`}
						/>
					</button>

					<button
						aria-label={`${expanded ? "Collapse" : "Expand"} ${title}`}
						className="flex h-5 w-5 items-center justify-center text-[#9B9B96]"
						onClick={() => setExpanded((v) => !v)}
						type="button"
					>
						<svg
							className={`h-3 w-3 transition-transform duration-200 ${
								expanded ? "rotate-180" : ""
							}`}
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
							viewBox="0 0 24 24"
						>
							<title>{expanded ? "Collapse" : "Expand"}</title>
							<path
								d="M19 9l-7 7-7-7"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
			</div>

			{expanded && (
				<p className="px-3 pb-3 text-[#666666] text-[14px] leading-relaxed">
					{description}
				</p>
			)}
		</div>
	);
}

export function SurveyPdpaPage({ onNext }: PdpaPageProps) {
	const [performance, setPerformance] = useState(false);
	const [functional, setFunctional] = useState(false);
	const [targeting, setTargeting] = useState(false);

	const acceptAll = () => {
		setPerformance(true);
		setFunctional(true);
		setTargeting(true);
		setTimeout(onNext, 150);
	};

	return (
		<div className="relative min-h-[90dvh]">
			<div className="relative z-10 mx-3 mt-9 flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
				<div className="px-3 pt-4 pb-3">
					<div className="pb-4">
						<h2 className="font-bold text-[#1F1F1F] text-[18px] leading-tight">
							การตั้งค่าคุกกี้
						</h2>
						<p className="mt-1.5 text-[#777777] text-[14px] leading-[1.45]">
							โดยท่านสามารถคลิกปรับเปลี่ยนแต่ละประเภทตามด้านล่าง
							เพื่อเรียนรู้เพิ่มเติมและปรับเปลี่ยนการตั้งค่า ทั้งนี้การปิดการใช้งานคุกกี้บางประเภท
							อาจส่งผลกระทบต่อประสบการณ์การใช้งานเว็บไซต์หรือบริการที่บริษัทฯ เสนอให้ท่าน
						</p>
						<Link
							className="mt-1 inline-block text-[#777777] text-[10px] underline"
							href="https://privacy.tcp.com/privacy/4ddf1f02-9722-4fe8-d135-08ddb905412e"
							target="_blank"
						>
							นโยบายความเป็นส่วนตัว privacy notice
						</Link>
					</div>

					<div className="space-y-3 border-[#E8E8E8] border-t pt-3">
						<CookieToggle
							checked
							description="คุกกี้ประเภทนี้มีความจำเป็นอย่างยิ่งต่อการทำงานของเว็บไซต์ ได้แก่ คุกกี้ที่ทำให้เว็บไซต์สามารถทำหน้าที่ขั้นพื้นฐาน เช่น การเลื่อนสำรวจหน้าเว็บไซต์ หรือทำให้ผู้เข้าชม/ผู้ใช้เว็บไซต์สามารถเข้าสู่ระบบและสามารถเข้าถึงส่วนของเว็บไซต์ที่ถูกสงวนไว้ให้ใช้เฉพาะสมาชิกเท่านั้น เว็บไซต์จะไม่สามารถทำงานอย่างถูกต้องได้เลยหากไม่มีการเก็บรวบรวมคุกกี้เหล่านี้ บริษัทฯ จึงไม่มีความจำเป็นต้องขอความยินยอมจากท่านในการจัดวางคุกกี้เหล่านี้ลงในอุปกรณ์ของท่าน คุกกี้ประเภทนี้ไม่มีการจัดเก็บข้อมูลซึ่งสามารถระบุตัวตนของท่านได้อย่างเจาะจงแต่อย่างใด "
							disabled
							id="necessary"
							title="คุกกี้ที่มีความจำเป็นอย่างยิ่ง"
						/>

						<CookieToggle
							checked={performance}
							description="คุกกี้ประเภทนี้ ทำให้บริษัทฯ สามารถรับรู้ข้อมูลประสิทธิภาพเว็บไซต์ได้ เช่น จำนวนผู้เข้าชมเว็บไซต์ จำนวนการเข้าชมเว็บไซต์ และแหล่งที่มาของผู้เข้าชมแต่ละนั้น ทำให้เข้าใจว่าผู้เข้าชม/ผู้ใช้มีการปฏิสัมพันธ์กับเว็บไซต์อย่างไรบ้าง และหน้าเว็บไซต์ใดที่ได้รับความนิยมมากที่สุดหรือน้อยที่สุด เป็นต้น โดยการเก็บรวบรวมและการรายงานข้อมูลโดยไม่ระบุตัวตนของท่าน ช่วยให้บริษัทฯ สามารถพัฒนาและส่งมอบประสบการณ์การใช้งานเว็บไซต์ที่ดีขึ้นแก่ท่าน หากท่านไม่อนุญาตให้ใช้คุกกี้ประเภทนี้ บริษัทฯ จะไม่ทราบข้อมูลเกี่ยวกับการเข้าชมเว็บไซต์ของท่าน และไม่สามารถติดตามประสิทธิภาพการประมวลผลของหน้าเว็บไซต์ได้ อย่างไรก็ตาม ข้อมูลนี้ไม่ได้ประกอบด้วยข้อมูลส่วนบุคคล เช่น ชื่อและที่อยู่อีเมล จึงไม่สามารถนำไปใช้เพื่อระบุตัวตนของท่านได้ โดยบริษัทฯ จะนำไปใช้เพื่อวัตถุประสงค์ทางด้านสถิติเพื่อปรับปรุงประสิทธิภาพเว็บไซต์ และปรับปรุงประสบการณ์ของผู้ใช้เว็บไซต์ เท่านั้น "
							id="performance"
							onChange={setPerformance}
							title="คุกกี้ประสิทธิภาพ"
						/>
						<CookieToggle
							checked={functional}
							description="คุกกี้ประเภทนี้ อาจถูกติดตั้งไว้โดยบริษัทฯ หรือผู้ให้บริการซึ่งเป็นบุคคลที่สาม โดยเป็นคุกกี้ประเภทที่ทำให้เว็บไซต์สามารถช่วยเหลือหรืออำนวยความสะดวกในการใช้งานให้กับท่านได้ ยกตัวอย่างเช่น ทำให้เว็บไซต์สามารถจดจำชื่อผู้ใช้และรหัสผ่านได้ และจดจำว่าท่านเคยปรับแต่งการใช้หน้าเว็บไซต์อย่างไรบ้าง เพื่อการแสดงผลหน้าเว็บไซต์ในครั้งต่อไปเป็นต้น หากท่านไม่อนุญาตให้ใช้คุกกี้ประเภทนี้ บางฟังก์ชั่นนั้นเว็บไซต์อาจไม่สามารถดำเนินการได้อย่างถูกต้อง "
							id="functional"
							onChange={setFunctional}
							title="คุกกี้ที่ช่วยเหลือในการทำงาน"
						/>
						<CookieToggle
							checked={targeting}
							description="คุกกี้ประเภทนี้ อาจถูกติดตั้งไว้โดยบริษัทฯ หรือผู้ให้บริการซึ่งเป็นบุคคลที่สาม โดยคุกกี้ดังกล่าว จะทำการจัดเก็บข้อมูลการเข้าชมเว็บไซต์ของท่าน เช่น ท่านเข้าชมเว็บไซต์ใดบ้าง และเข้าชมเว็บไซต์ผ่านทางลิงก์ใดบ้าง เป็นต้น โดยบริษัทฯ ใช้ข้อมูลเหล่านี้เพื่อกำหนดให้เว็บไซต์แสดงโฆษณาที่ถูกจริตกับความต้องการของท่าน โดยเว็บไซต์ในเครือข่ายพันธมิตรของผู้ให้บริการโฆษณา โซเชียลมีเดียตามช่องทางของบริษัทฯ และโซเชียลมีเดียตามช่องทางของผู้ให้บริการโฆษณา มีความเกี่ยวข้องกับความสนใจของท่านมากขึ้น โดยเราอาจเปิดเผยข้อมูลเหล่านี้แก่บุคคลที่สาม เพื่อวัตถุประสงค์เหล่านี้ด้วย หากท่านไม่อนุญาตให้ใช้คุกกี้ประเภทนี้ ท่านจะได้รับการโฆษณาที่เฉพาะเจาะจงน้อยลง "
							id="targeting"
							onChange={setTargeting}
							title="คุกกี้เพื่อกำหนดเป้าหมาย"
						/>
					</div>
				</div>

				<footer className="border-[#E8E8E8] border-t bg-white px-3 py-2.5">
					<div className="grid grid-cols-2 gap-3">
						<button
							className="h-[34px] rounded-[5px] border border-[#D3D3D3] bg-white px-3 text-[#222222] text-[11px] transition-colors active:bg-[#F4F4F4]"
							onClick={onNext}
							type="button"
						>
							ยืนยันตัวเลือกของฉัน
						</button>
						<button
							className="h-[34px] rounded-[5px] bg-[#E4002B] px-3 text-[11px] text-white transition-colors active:bg-[#C90026]"
							onClick={acceptAll}
							type="button"
						>
							อนุญาตทั้งหมด
						</button>
					</div>
				</footer>
			</div>
			<Image
				alt="Desert"
				className="pointer-events-none absolute bottom-0 left-0 z-0 w-full object-cover"
				fetchPriority="high"
				height={500}
				loading="eager"
				sizes="(max-width: 403px) 100vw, 403px"
				src={"/bottom/desert.webp"}
				width={800}
			/>
		</div>
	);
}
