import { gsap } from "gsap";
import type { RefObject } from "react";
import { defaultPatterns, WebHaptics } from "web-haptics";

const UNDERLINE_WAIT = 0.25;
const UNDERLINE_DURATION = 0.2;
const NUMBER_DURATION = 0.3;

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
		gsap.set('[data-animate="start-lines-container"]', {
			opacity: 0,
		});
		gsap.set("#start-reveal-rect", {
			attr: { y: 206, height: 0 },
		});

		// 2. Animate "3"
		tl.to('[data-animate="num-3"]', {
			opacity: 1,
			x: 0,
			y: 0,
			rotation: 0,
			scale: 1,
			duration: NUMBER_DURATION,
			ease: "back.out(1.5)",
			onStart: () => {
				haptics.trigger(defaultPatterns.medium);
			},
		})
			.to(
				'[data-animate="underline-container"]',
				{
					opacity: 1,
					duration: UNDERLINE_WAIT,
				},
				"<+=0.2"
			)
			.to(
				"#reveal-rect",
				{
					attr: { width: 112 },
					duration: UNDERLINE_DURATION,
					ease: "power2.out",
				},
				`<+=${UNDERLINE_WAIT}`
			)
			.to(
				'[data-animate="num-3"]',
				{
					opacity: 0,
					x: 250,
					y: -250,
					rotation: 30,
					scale: NUMBER_DURATION,
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
				`<+=${UNDERLINE_WAIT}`
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
					duration: NUMBER_DURATION,
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
					duration: UNDERLINE_DURATION,
					ease: "power2.out",
				},
				`<+=${UNDERLINE_WAIT}`
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
					duration: UNDERLINE_WAIT,
					ease: "power2.in",
				},
				`<+=${UNDERLINE_WAIT}`
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
					duration: UNDERLINE_DURATION,
					ease: "power2.out",
				},
				`-=${UNDERLINE_WAIT}`
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
					scale: 1.6,
					duration: 0.6,
					ease: "back.out(1.5)",
					onStart: () => {
						haptics.trigger(defaultPatterns.success);
					},
				},
				"-=0.1"
			)
			.to('[data-animate="start"]', {
				scale: 1.5,
				duration: 0.2,
				ease: "power1.inOut",
			})
			.to(
				'[data-animate="start-lines-container"]',
				{
					opacity: 1,
					duration: 0.1,
				},
				"-=0.2"
			)
			.to(
				"#start-reveal-rect",
				{
					attr: { y: 0, height: 206 },
					duration: 0.8,
					ease: "power2.out",
				},
				"<"
			)
			.to({}, { duration: 1.0 }); // Wait at the end so they can see "start" and the full decorative lines
	}, containerRef);

	return () => ctx.revert();
}
