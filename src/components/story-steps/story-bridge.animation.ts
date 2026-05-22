import { gsap } from "gsap";
import type { RefObject } from "react";

export function playSandstormPopupAnimation(
	popupRef: RefObject<HTMLDivElement | null>,
	initialDelay: number
) {
	let timeoutId: ReturnType<typeof setTimeout>;
	let activeTimeline: gsap.core.Timeline | null = null;

	const element = popupRef.current;
	if (!element) {
		return () => {
			// No-op cleanup
		};
	}

	// Set initial state to invisible and scaled down
	gsap.set(element, { opacity: 0, scale: 0.5 });

	const runAnimationCycle = () => {
		const target = popupRef.current;
		if (!target) {
			return;
		}

		// Generate random positions (e.g. top: 20% to 55%, left: 10% to 60% to avoid edges/next button)
		const randomTop = Math.floor(Math.random() * 35) + 20; // 20% to 55%
		const randomLeft = Math.floor(Math.random() * 50) + 10; // 10% to 60%
		const randomScale = Math.random() * 0.4 + 0.8; // 0.8 to 1.2
		const randomRotate = Math.floor(Math.random() * 30) - 15; // -15deg to 15deg

		// Set random position and starting properties immediately before animating
		gsap.set(target, {
			top: `${randomTop}%`,
			left: `${randomLeft}%`,
			rotation: randomRotate,
			scale: 0.5,
			opacity: 0,
			y: 20, // slide-up entrance
		});

		// Create timeline for appearance
		activeTimeline = gsap.timeline({
			onComplete: () => {
				// Schedule next appearance (2s to 4s silent interval)
				const nextDelay = Math.random() * 2000 + 2000;
				timeoutId = setTimeout(runAnimationCycle, nextDelay);
			},
		});

		activeTimeline
			// Fade & Scale in + slide up
			.to(target, {
				opacity: 1,
				scale: randomScale,
				y: 0,
				duration: 0.5,
				ease: "back.out(1.5)",
			})
			// Stay visible for 1.5s
			.to({}, { duration: 1.5 })
			// Fade & Scale out + slide up/away
			.to(target, {
				opacity: 0,
				scale: 0.5,
				y: -20,
				duration: 0.4,
				ease: "power2.in",
			});
	};

	// Schedule first cycle
	timeoutId = setTimeout(runAnimationCycle, initialDelay);

	return () => {
		clearTimeout(timeoutId);
		if (activeTimeline) {
			activeTimeline.kill();
		}
	};
}
