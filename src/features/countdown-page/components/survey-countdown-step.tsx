import Image from "next/image";
import { useEffect, useState } from "react";
import type { CountdownStep } from "@/lib/config";

interface SurveyCountdownStepProps {
	onNext: () => void;
	step: CountdownStep;
}

const IMAGES = ["/text/3.svg", "/text/2.svg", "/text/1.svg", "/text/start.svg"];

export function SurveyCountdownStep({
	onNext,
	step,
}: SurveyCountdownStepProps) {
	const delay = step.delay ?? 1000;
	const [index, setIndex] = useState(0);
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		// Reset when the step changes
		setIndex(0);
		setVisible(true);
	}, [step.id]);

	useEffect(() => {
		// Fade out just before switching to the next image
		const fadeOut = setTimeout(() => {
			setVisible(false);
		}, delay);

		const advance = setTimeout(() => {
			if (index < IMAGES.length - 1) {
				setIndex((i) => i + 1);
				setVisible(true);
			} else {
				onNext();
			}
		}, delay);

		return () => {
			clearTimeout(fadeOut);
			clearTimeout(advance);
		};
	}, [index, delay, IMAGES.length, onNext]);

	return (
		<div className="relative inset-0 z-0 flex h-screen items-center justify-center">
			<Image
				alt={`countdown-${index}`}
				className="mb-[25vh] object-contain px-4"
				height={200}
				priority
				src={IMAGES[index]}
				style={{ opacity: visible ? 1 : 0 }}
				width={200}
			/>

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
