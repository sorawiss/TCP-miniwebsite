import Image from "next/image";
import { useEffect, useState } from "react";
import type { CountdownStep } from "@/lib/config";

interface SurveyCountdownStepProps {
	onNext: () => void;
	step: CountdownStep;
}

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
			if (index < step.images.length - 1) {
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
	}, [index, delay, step.images.length, onNext]);

	return (
		<div className="absolute inset-0 z-0 flex items-center justify-center">
			<Image
				alt={`countdown-${index}`}
				className="object-contain px-4"
				height={200}
				priority
				src={step.images[index]}
				style={{ opacity: visible ? 1 : 0 }}
				width={200}
			/>
		</div>
	);
}
