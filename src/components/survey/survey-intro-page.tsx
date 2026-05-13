import Image from "next/image";
import type { IntroStep } from "@/lib/config";

interface IntroPageProps {
	step: IntroStep;
}

export function SurveyIntroPage({ step }: IntroPageProps) {
	return (
		<div className="absolute inset-0 z-0">
			{step.topImage && (
				<Image
					// TODO
					alt=""
					className="mt-[25vh] object-cover px-4"
					height={380}
					priority
					src={step.topImage}
					width={512}
				/>
			)}
			{step.bottomImage && (
				<Image
					alt={step.id}
					className="object-cover"
					fill
					priority
					src={step.bottomImage}
				/>
			)}
		</div>
	);
}
