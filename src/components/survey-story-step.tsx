import Image from "next/image";
import type { StoryStep } from "@/lib/config";

interface SurveyStoryStepProps {
	story: StoryStep;
}

export function SurveyStoryStep({ story }: SurveyStoryStepProps) {
	switch (story.id) {
		case "0":
			return <Story0 story={story} />;
		case "story-1":
			return <Story1 story={story} />;
		default:
			return <StoryDefault story={story} />;
	}
}

function Story0({ story }: { story: StoryStep }) {
	return (
		<>
			<section className="relative z-10 flex flex-col items-center justify-center space-y-4 px-6 pt-10 text-center">
				<h2 className="whitespace-pre-line font-bold text-2xl text-[#f26522] leading-relaxed sm:text-3xl">
					{story.body}
				</h2>
				<div className="mt-4 h-[2px] w-12 bg-[#f26522]" />
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

function Story1({ story }: { story: StoryStep }) {
	return (
		<>
			<section className="relative z-10 flex flex-col items-center justify-center px-6 pt-10 text-center">
				<h2 className="whitespace-pre-line font-bold text-3xl text-[#f26522] leading-relaxed sm:text-4xl">
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

function StoryDefault({ story }: { story: StoryStep }) {
	return (
		<>
			<section className="relative z-10 flex min-h-[50svh] flex-col justify-center space-y-6 px-4">
				{story.title ? (
					<h2 className="max-w-2xl font-black text-4xl text-[#2f1b09] leading-tight sm:text-5xl">
						{story.title}
					</h2>
				) : null}
				<p className="max-w-3xl text-[#5f4630] text-lg leading-9 sm:text-2xl">
					{story.body}
				</p>
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
