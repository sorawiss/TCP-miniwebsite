// biome-ignore-all lint: generated file

import Image from "next/image";
import { SummaryFooterContentCarousel } from "./summary-footer-content-carousel";

export function SummaryFooterBranding() {
	return (
		<div className="relative z-10 flex w-full flex-col items-center px-4 pb-6 pt-2">
			{/* Outer bordered card */}
			<div
				className="w-full max-w-[360px] rounded-2xl border-2 border-[#FFC560] 
				bg-[radial-gradient(circle_at_top_left,_#ffffff,_#ffefd3)] "
				style={{ boxShadow: "0 2px 12px rgba(255,181,0,0.15)" }}
			>
				{/* Logos row */}
				<div className="flex items-center justify-center gap-2 -mt-5">
					<Image
						alt="TCP Logo"
						className="object-contain"
						height={36}
						src="/logo/tcp.png"
						width={72}
					/>
					<Image
						alt="TCP Foundation Logo"
						className="object-contain"
						height={40}
						src="/logo/foundation.png"
						width={40}
					/>
				</div>

				{/* Headline */}
				<div className="px-5 text-center">
					<p className="text-[#151F6D] text-[2rem] leading-[110%]">
						แชร์พลังคุณ คืนพลังให้อาสา
					</p>
					<p className="text-[#6B3E1F] text-[1.8rem] leading-[110%]">
						ร่วมกิจกรรมง่ายๆ
					</p>
				</div>

				{/* Inner body box */}
				<div className="mx-4 my-3 overflow-hidden ">
					<p className="text-center text-[#151F6D] text-[1rem] sm:text-[1.2rem] leading-[110%] sm:leading-7 whitespace-nowrap">
						เมื่อทำ <span className="text-[1.6rem] sm:text-[2rem]">Quiz</span>{" "}
						ค้นหาพลังที่ซ่อนอยู่ในตัวคุณจบแล้ว
						<br />
						เพียงแชร์พลังของคุณไปยังโซเชียลมีเดียช่องทางใดก็ได้
						<br />
						ทุก <span className="text-[1.6rem] sm:text-[2rem]">1</span> แชร์ ={" "}
						<span className="text-[1.6rem] sm:text-[2rem]">TCP</span>{" "}
						ร่วมบริจาคเครื่องดื่มในเครือ{" "}
						<span className="text-[1.6rem] sm:text-[2rem]">1 ขวด*</span>
						<br />
						ให้เหล่าอาสาจัดการภัยพิบัติภาคประชาชน
						<br />
						โดยมูลนิธิกระจกเงา
						<br />
						ได้มีพลังกาย-พลังใจไปช่วยเหลือผู้อื่นต่อ
						<br />
						<span className="opacity-40">
							ร่วมกิจกรรมได้ตั้งแต่วันนี้ - 9 สิงหาคม 2569
						</span>
					</p>
				</div>

				{/* 6 TCP product bottles */}
				<div className="flex w-full items-end justify-center overflow-hidden pb-1">
					<Image
						alt="TCP product bottles"
						className="w-full object-contain"
						height={594}
						src="/tcp-bottle.png"
						width={382}
					/>
				</div>
				<p className="text-center text-[#151F6D]/50">
					*TCP บริจาคเครื่องดื่มสูงสุดจำนวน 6,000 ขวด
				</p>
			</div>
			<SummaryFooterContentCarousel />
		</div>
	);
}
