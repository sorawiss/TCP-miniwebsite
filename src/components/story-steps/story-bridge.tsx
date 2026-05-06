import Image from "next/image";
import type { StoryStep } from "@/lib/config";

export function StoryBridge({ story }: { story: StoryStep }) {
	return (
		<section className="relative z-10 flex h-screen flex-col items-center justify-center px-6">
			{story.bottomImage && (
				<div className="relative w-full max-w-[320px]">
					<Image
						alt="Bridge scene"
						className="h-auto w-full rounded-[2rem] object-cover shadow-lg"
						height={500}
						src={story.bottomImage}
						width={400}
					/>
				</div>
			)}
		</section>
	);
}
