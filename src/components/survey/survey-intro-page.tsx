import Image from "next/image";
import Intro0 from "@/components/text/intro0";
import Intro1 from "@/components/text/intro1";
import { NextButton } from "@/components/ui/next-button";
import type { IntroStep } from "@/lib/config";

interface IntroPageProps {
	onNext: () => void;
	step: IntroStep;
}

export function SurveyIntroPage({ onNext, step }: IntroPageProps) {
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
					className="pointer-events-none absolute bottom-0 left-0 z-0 w-full object-cover"
					fetchPriority="high"
					height={500}
					loading="eager"
					sizes="(max-width: 403px) 100vw, 403px"
					src={step.bottomImage}
					width={800}
				/>
			)}
			<div className="absolute inset-x-0 bottom-[3rem] z-10 flex justify-center">
				<NextButton onClick={onNext}>
					{step.id === "intro" ? "เริ่มเลย!" : "ก้าวสู่ทะเลทราย"}
				</NextButton>
			</div>
		</div>
	);
}
