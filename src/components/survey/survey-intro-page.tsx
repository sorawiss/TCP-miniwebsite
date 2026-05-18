import Image from "next/image";
import Intro0 from "@/components/text/intro0";
import Intro1 from "@/components/text/intro1";
import type { IntroStep } from "@/lib/config";

interface IntroPageProps {
	step: IntroStep;
}

export function SurveyIntroPage({ step }: IntroPageProps) {
	return (
		<div className="absolute inset-0 z-0">
			{step.topImage === "/intro/intro0-text.svg" && (
				<Intro0
					className={`w-full object-cover px-4 ${step.className ?? ""}`}
				/>
			)}
			{step.topImage === "/intro/intro1-text.svg" && (
				<Intro1
					className={`w-full object-cover px-4 ${step.className ?? ""}`}
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
