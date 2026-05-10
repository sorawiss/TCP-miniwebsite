import type { StoryStep } from "@/lib/config";

interface SurveyStoryStepProps {
	story: StoryStep;
}

export function SurveyStoryStep({ story }: SurveyStoryStepProps) {
	return (
		<section className="flex min-h-[60svh] flex-col justify-center space-y-6">
			{story.kicker ? (
				<p className="text-[#9d6b2f] text-sm uppercase tracking-[0.35em]">
					{story.kicker}
				</p>
			) : null}
			{story.title ? (
				<h2 className="max-w-2xl font-black text-4xl text-[#2f1b09] leading-tight sm:text-5xl">
					{story.title}
				</h2>
			) : null}
			<p className="max-w-3xl text-[#5f4630] text-lg leading-9 sm:text-2xl">
				{story.body}
			</p>
		</section>
	);
}
