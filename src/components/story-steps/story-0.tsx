import Image from "next/image";
import type { StoryStep } from "@/lib/config";

export function Story0({ story }: { story: StoryStep }) {
	return (
		<>
			<section className="relative z-10 flex h-full flex-col items-center justify-center space-y-4 px-6 pt-10 text-center">
				<Image
					alt="Story background"
					className="pointer-events-none absolute top-[40%] left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 object-contain p-10"
					height={800}
					src={story.body}
					width={800}
				/>
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
