import type { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { defaultPatterns, WebHaptics } from "web-haptics";
import type { CountdownStep } from "@/lib/config";
import {
	Countdown1,
	Countdown2,
	Countdown3,
	CountdownStart,
	CountdownStartLines,
	CountdownUnderline,
} from "./countdown-svgs";
import { playCountdownAnimation } from "./survey-countdown-step.animation";

interface SurveyCountdownStepProps {
	onNext: () => void;
	step: CountdownStep;
}

export function SurveyCountdownStep({ onNext }: SurveyCountdownStepProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const timelineRef = useRef<gsap.core.Timeline | null>(null);

	useEffect(() => {
		const anim = playCountdownAnimation(containerRef, onNext);
		timelineRef.current = anim.timeline;
		return () => {
			anim.revert();
		};
	}, [onNext]);

	const handleClick = () => {
		if (timelineRef.current) {
			const haptics = new WebHaptics();
			haptics.trigger(defaultPatterns.light);
			const currentScale = timelineRef.current.timeScale();
			timelineRef.current.timeScale(currentScale + 0.5);
		}
	};

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: countdown overlay click mechanic is a screen-wide clicker interaction
		// biome-ignore lint/a11y/noStaticElementInteractions: countdown overlay click mechanic is a screen-wide clicker interaction
		// biome-ignore lint/a11y/noNoninteractiveElementInteractions: countdown overlay click mechanic is a screen-wide clicker interaction
		<div
			className="relative inset-0 z-0 flex h-screen cursor-pointer select-none items-center justify-center overflow-hidden"
			onClick={handleClick}
			ref={containerRef}
		>
			{/* Countdown container absolute center */}
			<div className="absolute mb-[25vh] flex flex-col items-center justify-center">
				<div className="relative flex h-[200px] w-[200px] items-center justify-center">
					<Countdown3
						className="absolute h-full w-full object-contain px-4"
						data-animate="num-3"
					/>
					<Countdown2
						className="absolute h-full w-full object-contain px-4"
						data-animate="num-2"
					/>
					<Countdown1
						className="absolute h-full w-full object-contain px-4"
						data-animate="num-1"
					/>
					<CountdownStart
						className="absolute h-full w-full object-contain px-4"
						data-animate="start"
					/>

					{/* Start Lines Decorative SVG */}
					<div
						className="pointer-events-none absolute z-[-1] flex -translate-y-1/2 scale-75 items-center justify-center opacity-0"
						data-animate="start-lines-container"
					>
						<CountdownStartLines aria-hidden="true" height={206} width={358} />
					</div>
				</div>

				{/* Underline decorative SVG */}
				<div className="-mt-2 opacity-0" data-animate="underline-container">
					<CountdownUnderline aria-hidden="true" height={18} width={112} />
				</div>
			</div>

			<Image
				alt="Desert background"
				className="pointer-events-none absolute bottom-0 left-0 z-0 w-full object-cover"
				fetchPriority="high"
				height={500}
				loading="eager"
				sizes="(max-width: 403px) 100vw, 403px"
				src="/bottom/desert.png"
				width={800}
			/>
		</div>
	);
}
