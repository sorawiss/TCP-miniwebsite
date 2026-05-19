"use client";

import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";

const shortFilms = [
	{
		title: "อิ่มใจและทราย คืนพลังอย่างไร?",
		image: "/bottom/desert.webp",
	},
	{
		title: "อิ่มใจและถนน คืนพลังอย่างไร?",
		image: "/bottom/desert.webp",
	},
	{
		title: "อิ่มใจและเส้นทาง คืนพลังอย่างไร?",
		image: "/bottom/desert.webp",
	},
];

const articles = [
	{
		title: "อิ่มใจและทราย คืนพลังอย่างไร?",
		image: "/bottom/desert.webp",
	},
	{
		title: "Desert Marathon เติมพลังให้คุณอย่างไร",
		image: "/bottom/desert.webp",
	},
	{
		title: "รับมือวันที่เหนื่อยล้า ได้อย่างไร",
		image: "/bottom/desert.webp",
	},
];

function SectionHeader({ title }: { title: string }) {
	return (
		<div className="mb-2 flex items-center justify-between pr-1">
			<h3 className="border-[#F28A00] border-l-4 pl-1.5 text-[#151F6D] text-[20px] leading-none">
				{title}
			</h3>
			<button
				className="flex items-center gap-1 text-[#F28A00] text-[16px]"
				type="button"
			>
				ดูทั้งหมด
				<span className="flex size-5 items-center justify-center rounded-full bg-[#F28A00] text-white">
					<ChevronRightIcon className="size-3.5" />
				</span>
			</button>
		</div>
	);
}

function FilmCard({ image, title }: { image: string; title: string }) {
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

function ArticleCard({ image, title }: { image: string; title: string }) {
	return (
		<article className="overflow-hidden rounded-md bg-white shadow-[0_2px_8px_rgba(0,0,0,0.18)]">
			<div className="relative aspect-[1.5] w-full overflow-hidden">
				<Image alt="" className="object-cover" fill sizes="96px" src={image} />
			</div>
			<div className="flex min-h-9 items-center gap-1.5 px-2 py-1.5">
				<p className="line-clamp-2 flex-1 text-[18px] leading-3">{title}</p>
				<span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#F28A00] text-white">
					<ChevronRightIcon className="size-3.5" />
				</span>
			</div>
		</article>
	);
}

export function SummaryFooterContentCarousel() {
	return (
		<section className="mt-5 w-full max-w-[360px] overflow-hidden rounded-sm bg-center bg-cover px-2.5 py-4">
			<div className="px-1 py-1">
				<SectionHeader title="TCP 70 Years Short Films" />
				<Carousel opts={{ align: "start", dragFree: true }}>
					<CarouselContent className="-ml-2">
						{shortFilms.map((film) => (
							<CarouselItem className="basis-[52%] pl-2" key={film.title}>
								<FilmCard {...film} />
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>

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
