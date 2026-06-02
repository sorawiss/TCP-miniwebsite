"use client";

import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";

const articles = [
	{
		title:
			"7 พลัง 7 แรงบันดาลใจ ปลุกพลัง…ผู้ประกอบการ…ให้ไปต่อ โครงการ Durbell Successor Program เคียงข้างผู้ประกอบการรุ่นใหม่ ขับเคลื่อนธุรกิจไทยให้ไปไกลกว่าเดิม",
		image: "/articles/1.jpg",
		url: "https://www.tcp.com/th/updates/tcp-updates/tcp-70-years/396/7-%E0%B8%9E%E0%B8%A5%E0%B8%B1%E0%B8%87-7-%E0%B9%81%E0%B8%A3%E0%B8%87%E0%B8%9A%E0%B8%B1%E0%B8%99%E0%B8%94%E0%B8%B2%E0%B8%A5%E0%B9%83%E0%B8%88-%E0%B8%9B%E0%B8%A5%E0%B8%B8%E0%B8%81%E0%B8%9E%E0%B8%A5%E0%B8%B1%E0%B8%87%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%AD%E0%B8%9A%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B9%84%E0%B8%9B%E0%B8%95%E0%B9%88%E0%B8%AD-%E0%B9%82%E0%B8%84%E0%B8%A3%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A3-durbell-successor-program-%E0%B9%80%E0%B8%84%E0%B8%B5%E0%B8%A2%E0%B8%87%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%87%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%AD%E0%B8%9A%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A3%E0%B8%B8%E0%B9%88%E0%B8%99%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88-%E0%B8%82%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%84%E0%B8%A5%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%99%E0%B8%98%E0%B8%B8%E0%B8%A3%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B9%84%E0%B8%9B%E0%B9%84%E0%B8%81%E0%B8%A5%E0%B8%81%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B9%80%E0%B8%94%E0%B8%B4%E0%B8%A1",
	},
	{
		title:
			"7 พลัง 7 แรงบันดาลใจ ปลุกพลัง…คนรักษ์โลก…ให้ไปต่อ ค่าย TCP Spirit ห้องเรียนธรรมชาติ เรียนรู้และลงมือทำเพื่อโลกที่ดีกว่า",
		image: "/articles/2.jpg",
		url: "https://www.tcp.com/th/updates/tcp-updates/tcp-70-years/395/7-%E0%B8%9E%E0%B8%A5%E0%B8%B1%E0%B8%87-7-%E0%B9%81%E0%B8%A3%E0%B8%87%E0%B8%9A%E0%B8%B1%E0%B8%99%E0%B8%94%E0%B8%B2%E0%B8%A5%E0%B9%83%E0%B8%88-%E0%B8%9B%E0%B8%A5%E0%B8%B8%E0%B8%81%E0%B8%9E%E0%B8%A5%E0%B8%B1%E0%B8%87%E0%B8%84%E0%B8%99%E0%B8%A3%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B9%8C%E0%B9%82%E0%B8%A5%E0%B8%81%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B9%84%E0%B8%9B%E0%B8%95%E0%B9%88%E0%B8%AD-%E0%B8%84%E0%B9%88%E0%B8%B2%E0%B8%A2-tcp-spirit-%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%98%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4-%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%A5%E0%B8%87%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%97%E0%B8%B3%E0%B9%80%E0%B8%9E%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B9%82%E0%B8%A5%E0%B8%81%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B5%E0%B8%81%E0%B8%A7%E0%B9%88%E0%B8%B2",
	},
	{
		title:
			"7 พลัง 7 แรงบันดาลใจ ปลุกพลัง…คนมี Passion…ให้ไปต่อ TCP พร้อมอยู่เบื้องหลังความสำเร็จของคนสู้งาน ด้วยเครื่องดื่มที่อยู่เคียงข้างทุกหยาดเหงื่อ",
		image: "/articles/3.jpg",
		url: "https://www.tcp.com/th/updates/tcp-updates/tcp-70-years/394/7-%E0%B8%9E%E0%B8%A5%E0%B8%B1%E0%B8%87-7-%E0%B9%81%E0%B8%A3%E0%B8%87%E0%B8%9A%E0%B8%B1%E0%B8%99%E0%B8%94%E0%B8%B2%E0%B8%A5%E0%B9%83%E0%B8%88-%E0%B8%9B%E0%B8%A5%E0%B8%B8%E0%B8%81%E0%B8%9E%E0%B8%A5%E0%B8%B1%E0%B8%87%E0%B8%84%E0%B8%99%E0%B8%A1%E0%B8%B5-passion%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B9%84%E0%B8%9B%E0%B8%95%E0%B9%88%E0%B8%AD-tcp-%E0%B8%9E%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%AD%E0%B8%A2%E0%B8%B9%E0%B9%88%E0%B9%80%E0%B8%9A%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%87%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%AA%E0%B8%B3%E0%B9%80%E0%B8%A3%E0%B9%87%E0%B8%88%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%99%E0%B8%AA%E0%B8%B9%E0%B9%89%E0%B8%87%E0%B8%B2%E0%B8%99-%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%AD%E0%B8%A2%E0%B8%B9%E0%B9%88%E0%B9%80%E0%B8%84%E0%B8%B5%E0%B8%A2%E0%B8%87%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%87%E0%B8%97%E0%B8%B8%E0%B8%81%E0%B8%AB%E0%B8%A2%E0%B8%B2%E0%B8%94%E0%B9%80%E0%B8%AB%E0%B8%87%E0%B8%B7%E0%B9%88%E0%B8%AD",
	},
	{
		title:
			"เพราะ “พลังของคน” คือจุดเริ่มต้นของทุกการไปต่อ ครบรอบ 70 ปี กลุ่มธุรกิจ TCP ถ่ายทอด “7 เรื่องจริง 7 แรงบันดาลใจ” ชวนค้นหา “พลังในตัวเอง” ผ่านอินเตอร์แอคทีฟควิซ “เช็คพลัง...ให้ไปต่อ”",
		image: "/articles/4.jpg",
		url: "https://www.tcp.com/th/updates/tcp-updates/tcp-70-years/397/%E0%B9%80%E0%B8%9E%E0%B8%A3%E0%B8%B2%E0%B8%B0-%E0%B8%9E%E0%B8%A5%E0%B8%B1%E0%B8%87%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%99-%E0%B8%84%E0%B8%B7%E0%B8%AD%E0%B8%88%E0%B8%B8%E0%B8%94%E0%B9%80%E0%B8%A3%E0%B8%B4%E0%B9%88%E0%B8%A1%E0%B8%95%E0%B9%89%E0%B8%99%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B8%E0%B8%81%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%9B%E0%B8%95%E0%B9%88%E0%B8%AD-%E0%B8%84%E0%B8%A3%E0%B8%9A%E0%B8%A3%E0%B8%AD%E0%B8%9A-70-%E0%B8%9B%E0%B8%B5-%E0%B8%81%E0%B8%A5%E0%B8%B8%E0%B9%88%E0%B8%A1%E0%B8%98%E0%B8%B8%E0%B8%A3%E0%B8%81%E0%B8%B4%E0%B8%88-tcp-%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%97%E0%B8%AD%E0%B8%94-7-%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87-7-%E0%B9%81%E0%B8%A3%E0%B8%87%E0%B8%9A%E0%B8%B1%E0%B8%99%E0%B8%94%E0%B8%B2%E0%B8%A5%E0%B9%83%E0%B8%88-%E0%B8%8A%E0%B8%A7%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%99%E0%B8%AB%E0%B8%B2-%E0%B8%9E%E0%B8%A5%E0%B8%B1%E0%B8%87%E0%B9%83%E0%B8%99%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B9%80%E0%B8%AD%E0%B8%87-%E0%B8%9C%E0%B9%88%E0%B8%B2%E0%B8%99%E0%B8%AD%E0%B8%B4%E0%B8%99%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B9%81%E0%B8%AD%E0%B8%84%E0%B8%97%E0%B8%B5%E0%B8%9F%E0%B8%84%E0%B8%A7%E0%B8%B4%E0%B8%8B-%E0%B9%80%E0%B8%8A%E0%B9%87%E0%B8%84%E0%B8%9E%E0%B8%A5%E0%B8%B1%E0%B8%87%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B9%84%E0%B8%9B%E0%B8%95%E0%B9%88%E0%B8%AD",
	},
];

function SectionHeader({ title }: { title: string }) {
	return (
		<div className="mb-2 flex items-center justify-between pr-1">
			<h3 className="border-[#F28A00] border-l-4 pl-1.5 text-[#151F6D] text-[20px] leading-none">
				{title}
			</h3>
			<Link
				className="flex items-center gap-1 text-[#F28A00] text-[16px]"
				href="https://www.tcp.com/th/updates/tcp-updates?category=tcp-70-years&year="
				target="_blank"
				type="button"
			>
				ดูทั้งหมด
				<span className="flex size-5 items-center justify-center rounded-full bg-[#F28A00] text-white">
					<ChevronRightIcon className="size-3.5" />
				</span>
			</Link>
		</div>
	);
}

// TODO : Insert film video
// Biome-ignore lint/correctness/noUnusedVariables: not using
function _FilmCard({ image, title }: { image: string; title: string }) {
	return (
		<article className="overflow-hidden rounded-md bg-white shadow-[0_2px_8px_rgba(0,0,0,0.18)]">
			<div className="relative aspect-[1.62] w-full overflow-hidden">
				<Image alt="" className="object-cover" fill sizes="116px" src={image} />
			</div>
			<p className="line-clamp-2 min-h-8 px-2 py-1.5 text-[18px] leading-3">
				{title}
			</p>
		</article>
	);
}

function ArticleCard({
	image,
	title,
	url,
}: {
	image: string;
	title: string;
	url: string;
}) {
	return (
		<Link
			className="block overflow-hidden rounded-md bg-white"
			href={url}
			target="_blank"
		>
			<div className="relative aspect-[1.5] w-full overflow-hidden">
				<Image
					alt=""
					className="object-cover"
					height={732}
					src={image}
					width={1100}
				/>
			</div>
			<div className="flex min-h-9 items-center gap-1.5 px-2 py-1.5">
				<p className="line-clamp-5 flex-1 text-[18px] leading-3">{title}</p>
				<span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#F28A00] text-white">
					<ChevronRightIcon className="size-3.5" />
				</span>
			</div>
		</Link>
	);
}

export function SummaryFooterContentCarousel() {
	return (
		<section className="mt-5 w-full overflow-hidden rounded-sm bg-center bg-cover px-2.5 py-4">
			<div className="px-1 py-1">
				{/* <SectionHeader title="TCP 70 Years Short Films" />
				<div className="w-full">
					<FilmCard
						image="/bottom/desert.png"
						title="อิ่มใจและทราย คืนพลังอย่างไร?"
					/>
				</div> */}

				<div className="mt-4">
					<SectionHeader title="Articles" />
					<Carousel opts={{ align: "start", dragFree: true }}>
						<CarouselContent className="-ml-2">
							{articles.map((article) => (
								<CarouselItem className="basis-[44%] pl-2" key={article.title}>
									<ArticleCard {...article} />
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</div>
			</div>
		</section>
	);
}
