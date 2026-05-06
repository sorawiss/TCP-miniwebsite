import Image from "next/image";
import type { StoryStep } from "@/lib/config";

export function Story0({ story }: { story: StoryStep }) {
	return (
		<>
			<section className="relative z-10 flex h-full flex-col items-center justify-center space-y-4 px-6 pt-10 text-center">
				<h2 className="whitespace-pre-line font-bold text-2xl text-[#f26522] leading-relaxed sm:text-3xl">
					{story.body}
				</h2>
			</section>
			{story.bottomImage ? (
				<Image
					alt="Story background"
					className="pointer-events-none absolute bottom-0 left-0 z-0 w-full object-cover"
					height={800}
					src={story.bottomImage}
					width={800}
				/>
			) : null}
		</>
	);
}
