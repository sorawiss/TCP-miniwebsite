import Image from "next/image";
import type { StoryStep } from "@/lib/config";

export function StoryBridge({ story }: { story: StoryStep }) {
	return (
		<div className="absolute inset-0">
			{story.bottomImage && (
				<Image
					alt="Bridge scene"
					className="pointer-events-none object-cover"
					fetchPriority="high"
					fill
					loading="eager"
					sizes="(max-width: 403px) 100vw, 403px"
					src={story.bottomImage}
				/>
			)}
		</div>
	);
}
