import Image from "next/image";
import type { IntroStep } from "@/lib/config";

interface IntroPageProps {
	onNext: () => void;
	step: IntroStep;
}

export function SurveyIntroPage({ onNext, step }: IntroPageProps) {
	return (
		<button
			className="absolute inset-0 z-0 cursor-pointer outline-none"
			onClick={onNext}
			type="button"
		>
			{step.topImage && (
				<Image
					// TODO
					alt=""
					className="-mt-40 object-cover px-4"
					height={1024}
					priority
					src={step.topImage}
					width={1024}
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
		</button>
	);
}
