import Image from "next/image";
import LastTextSvg from "@/components/text/last-text";

import Story0Svg from "@/components/text/story0";
import Story1Svg from "@/components/text/story1";
import Story2Svg from "@/components/text/story2";
import type { StoryStep } from "@/lib/config";

function getStoryComponent(id: string) {
	switch (id) {
		case "0":
			return Story0Svg;
		case "story-1":
			return Story1Svg;
		case "story-2":
			return Story2Svg;
		case "7":
			return LastTextSvg;
		default:
			return null;
	}
}

export function Story0({ story }: { story: StoryStep }) {
	const StoryComponent = getStoryComponent(story.id);

	return (
		<>
			<section className="relative z-10 flex h-full flex-col items-center justify-center space-y-4 px-6 pt-10 text-center">
				{StoryComponent ? (
					<StoryComponent className="pointer-events-none absolute top-[40%] left-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 px-2" />
				) : null}
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
