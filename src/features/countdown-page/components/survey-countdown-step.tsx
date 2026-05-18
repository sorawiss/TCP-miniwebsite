import Image from "next/image";
import { useEffect, useRef } from "react";
import type { CountdownStep } from "@/lib/config";
import { playCountdownAnimation } from "./survey-countdown-step.animation";

interface SurveyCountdownStepProps {
	onNext: () => void;
	step: CountdownStep;
}

export function SurveyCountdownStep({ onNext }: SurveyCountdownStepProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => playCountdownAnimation(containerRef, onNext), [onNext]);

	return (
		<div
			className="relative inset-0 z-0 flex h-screen items-center justify-center overflow-hidden"
			ref={containerRef}
		>
			{/* Countdown container absolute center */}
			<div className="absolute mb-[25vh] flex h-[200px] w-[200px] items-center justify-center">
				<Image
					alt="3"
					className="absolute object-contain px-4"
					data-animate="num-3"
					height={200}
					priority
					src="/text/3.svg"
					width={200}
				/>
				<Image
					alt="2"
					className="absolute object-contain px-4"
					data-animate="num-2"
					height={200}
					priority
					src="/text/2.svg"
					width={200}
				/>
				<Image
					alt="1"
					className="absolute object-contain px-4"
					data-animate="num-1"
					height={200}
					priority
					src="/text/1.svg"
					width={200}
				/>
				<Image
					alt="Start"
					className="absolute object-contain px-4"
					data-animate="start"
					height={200}
					priority
					src="/text/start.svg"
					width={200}
				/>
			</div>

			<Image
				alt="Desert background"
				className="pointer-events-none absolute bottom-0 left-0 z-0 w-full object-cover"
				height={500}
				src="/intro/intro1.png"
				width={800}
			/>
		</div>
	);
}
