import { gsap } from "gsap";
import type { RefObject } from "react";
import { defaultPatterns, WebHaptics } from "web-haptics";

export function playCountdownAnimation(
	containerRef: RefObject<HTMLElement | null>,
	onComplete: () => void
) {
	const haptics = new WebHaptics();

	const ctx = gsap.context(() => {
		const tl = gsap.timeline({
			onComplete,
		});

		// 1. Initial states
		gsap.set('[data-animate="num-3"]', {
			opacity: 0,
			x: -250,
			y: 250,
			rotation: -30,
			scale: 0.5,
		});
		gsap.set('[data-animate="num-2"]', {
			opacity: 0,
			x: -250,
			y: 250,
			rotation: -30,
			scale: 0.5,
		});
		gsap.set('[data-animate="num-1"]', {
			opacity: 0,
			x: -250,
			y: 250,
			rotation: -30,
			scale: 0.5,
		});
		gsap.set('[data-animate="start"]', {
			opacity: 0,
			y: 350,
			scale: 0.7,
		});
		gsap.set('[data-animate="underline-container"]', {
			opacity: 0,
		});
		gsap.set("#reveal-rect", {
			attr: { x: 0, width: 0 },
		});

		// 2. Animate "3"
		tl.to('[data-animate="num-3"]', {
			opacity: 1,
			x: 0,
			y: 0,
			rotation: 0,
			scale: 1,
			duration: 0.5,
			ease: "back.out(1.5)",
			onStart: () => {
				haptics.trigger(defaultPatterns.medium);
			},
		})
			.to(
				'[data-animate="underline-container"]',
				{
					opacity: 1,
					duration: 0.2,
				},
				"<"
			)
			.to(
				"#reveal-rect",
				{
					attr: { width: 112 },
					duration: 0.5,
					ease: "power2.out",
				},
				"-=0.2"
			)
			.to(
				'[data-animate="num-3"]',
				{
					opacity: 0,
					x: 250,
					y: -250,
					rotation: 30,
					scale: 0.5,
					duration: 0.4,
					ease: "power2.in",
				},
				"+=0.3"
			) // Pause at center for 0.3s before exiting
			.to(
				"#reveal-rect",
				{
					attr: { x: 112, width: 0 },
					duration: 0.35,
					ease: "power2.in",
				},
				"<"
			)

			// 3. Animate "2"
			.set("#reveal-rect", {
				attr: { x: 0, width: 0 },
			})
			.to(
				'[data-animate="num-2"]',
				{
					opacity: 1,
					x: 0,
					y: 0,
					rotation: 0,
					scale: 1,
					duration: 0.5,
					ease: "back.out(1.5)",
					onStart: () => {
						haptics.trigger(defaultPatterns.medium);
					},
				},
				"-=0.1"
			) // Overlap entry slightly with "3" exiting
			.to(
				"#reveal-rect",
				{
					attr: { width: 112 },
					duration: 0.5,
					ease: "power2.out",
				},
				"-=0.2"
			)
			.to(
				'[data-animate="num-2"]',
				{
					opacity: 0,
					x: 250,
					y: -250,
					rotation: 30,
					scale: 0.5,
					duration: 0.4,
					ease: "power2.in",
				},
				"+=0.3"
			)
			.to(
				"#reveal-rect",
				{
					attr: { x: 112, width: 0 },
					duration: 0.35,
					ease: "power2.in",
				},
				"<"
			)

			// 4. Animate "1"
			.set("#reveal-rect", {
				attr: { x: 0, width: 0 },
			})
			.to(
				'[data-animate="num-1"]',
				{
					opacity: 1,
					x: 0,
					y: 0,
					rotation: 0,
					scale: 1,
					duration: 0.5,
					ease: "back.out(1.5)",
					onStart: () => {
						haptics.trigger(defaultPatterns.medium);
					},
				},
				"-=0.1"
			)
			.to(
				"#reveal-rect",
				{
					attr: { width: 112 },
					duration: 0.5,
					ease: "power2.out",
				},
				"-=0.2"
			)
			.to(
				'[data-animate="num-1"]',
				{
					opacity: 0,
					x: 250,
					y: -250,
					rotation: 30,
					scale: 0.5,
					duration: 0.4,
					ease: "power2.in",
				},
				"+=0.3"
			)
			.to(
				"#reveal-rect",
				{
					attr: { x: 112, width: 0 },
					duration: 0.35,
					ease: "power2.in",
				},
				"<"
			)
			.to(
				'[data-animate="underline-container"]',
				{
					opacity: 0,
					duration: 0.3,
				},
				"<"
			)

			// 5. Animate "start"
			.to(
				'[data-animate="start"]',
				{
					opacity: 1,
					y: 0,
					scale: 1.1,
					duration: 0.6,
					ease: "back.out(1.5)",
					onStart: () => {
						haptics.trigger(defaultPatterns.success);
					},
				},
				"-=0.1"
			)
			.to('[data-animate="start"]', {
				scale: 1.0,
				duration: 0.2,
				ease: "power1.inOut",
			})
			.to({}, { duration: 0.8 }); // Wait at the end so they can see "start"
	}, containerRef);

	return () => ctx.revert();
}
