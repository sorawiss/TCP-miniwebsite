import type { StoryStep } from "@/lib/config";
import { Story0 } from "./story-steps/story-0";
import { StoryBridge } from "./story-steps/story-bridge";

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
