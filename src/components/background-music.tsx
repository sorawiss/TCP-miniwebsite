"use client";

import { useEffect, useRef } from "react";

export function BackgroundMusic() {
	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		const handleInteraction = () => {
			if (audioRef.current?.paused) {
				audioRef.current.play().catch((err) => {
					console.error("Failed to play audio:", err);
				});
			}
		};

		// Listen for user interactions to start playing the audio
		document.addEventListener("click", handleInteraction);
		document.addEventListener("touchstart", handleInteraction);

		return () => {
			document.removeEventListener("click", handleInteraction);
			document.removeEventListener("touchstart", handleInteraction);
		};
	}, []);

	return (
		// biome-ignore lint/a11y/useMediaCaption: Background music does not require captions
		<audio loop ref={audioRef} src="/sound/rhythm-revolution.wav" />
	);
}
