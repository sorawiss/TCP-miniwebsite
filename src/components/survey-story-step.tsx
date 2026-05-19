import type { ReactNode } from "react";
import type { StoryStep } from "@/lib/config";
import { Story0 } from "./story-steps/story-0";
import { StoryBridge } from "./story-steps/story-bridge";
import { NextButton } from "./ui/next-button";

interface SurveyStoryStepProps {
	onNext: () => void;
	story: StoryStep;
}

export function SurveyStoryStep({ onNext, story }: SurveyStoryStepProps) {
	const buttonLabel = story.id === "7" ? "เปิดพลังของฉัน!" : "ไปต่อ";
	let content: ReactNode;

	switch (story.id) {
		case "0":
			content = <Story0 story={story} />;
			break;
		case "story-1":
			content = <Story0 story={story} />;
			break;
		case "story-1-1":
			content = <StoryBridge story={story} />;
			break;
		case "story-1-2":
			content = <StoryBridge story={story} />;
			break;
		case "story-2":
			content = <Story0 story={story} />;
			break;
		default:
			content = <Story0 story={story} />;
			break;
	}

	return (
		<>
			{content}
			<div className="relative z-10 mt-auto flex w-full items-center justify-center pb-[3rem]">
				<NextButton onClick={onNext}>{buttonLabel}</NextButton>
			</div>
		</>
	);
}
