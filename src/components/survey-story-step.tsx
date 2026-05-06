import Image from "next/image";
import type { StoryStep } from "@/lib/config";

interface SurveyStoryStepProps {
	onNext?: () => void;
	story: StoryStep;
}

export function SurveyStoryStep({ story }: SurveyStoryStepProps) {
	switch (story.id) {
		case "0":
			return <Story0 story={story} />;
		case "story-1":
			return <Story0 story={story} />;
		case "story-1-1":
			return <StoryBridge story={story} />;
		case "story-1-2":
			return <StoryBridge story={story} />;
		case "story-2":
			return <Story0 story={story} />;
		default:
			return <Story0 story={story} />;
	}
}

function Story0({ story }: { story: StoryStep }) {
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

function StoryBridge({ story }: { story: StoryStep }) {
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
