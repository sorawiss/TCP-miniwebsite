"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { StoryStep } from "@/lib/config";
import { playSandstormPopupAnimation } from "./story-bridge.animation";

export function StoryBridge({ story }: { story: StoryStep }) {
	const popupRef1 = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const cleanup1 = playSandstormPopupAnimation(popupRef1, 700);

		return () => {
			cleanup1();
		};
	}, []);

	return (
		<div className="absolute inset-0 overflow-hidden">
			{story.bottomImage && (
				<video
					autoPlay
					className="h-full w-full object-cover"
					loop
					muted
					playsInline
				>
					<source src={story.bottomImage} type="video/mp4" />
				</video>
			)}

			{/* Sandstorm sound effect popup 1 */}
			<div
				className="pointer-events-none absolute z-20 opacity-0"
				ref={popupRef1}
			>
				<Image
					alt="Sandstorm sound effect"
					className="drop-shadow-lg"
					height={69}
					src="/sandstorm-sound.svg"
					width={172}
				/>
			</div>
		</div>
	);
}
