import { gsap } from "gsap";
import type { RefObject } from "react";

export function playSummaryEntranceAnimation(
	containerRef: RefObject<HTMLElement | null>
) {
	const ctx = gsap.context(() => {
		const tl = gsap.timeline({
			defaults: { ease: "power3.out", duration: 0.8 },
		});

		// 1. Initial states
		gsap.set('[data-animate="cap"]', {
			opacity: 0,
			scale: 0.3,
			y: 350,
			rotation: -45,
		});
		gsap.set('[data-animate="title"]', { opacity: 0, y: -30 });
		gsap.set('[data-animate="subtitle"]', { opacity: 0, y: -20 });
		gsap.set('[data-animate="info-box"]', { opacity: 0, scale: 0.8, y: -30 });
		gsap.set('[data-animate="separator"]', { opacity: 0, scaleX: 0 });
		gsap.set('[data-animate="power-title"]', {
			opacity: 0,
			scale: 0.9,
			y: 20,
		});
		gsap.set('[data-animate="power-desc"]', { opacity: 0, y: 20 });
		gsap.set('[data-animate="buttons"]', { opacity: 0, y: 30 });

		// 2. Timeline sequence
		tl.to('[data-animate="cap"]', {
			opacity: 1,
			scale: 1,
			y: 0,
			rotation: 0,
			duration: 1.2,
			ease: "back.out(1.5)",
		})
			.to(
				['[data-animate="title"]', '[data-animate="subtitle"]'],
				{
					opacity: 1,
					y: 0,
					stagger: 0.15,
					duration: 0.6,
				},
				"-=0.4"
			)
			.to(
				'[data-animate="info-box"]',
				{
					opacity: 1,
					scale: 1,
					y: 0,
					duration: 0.6,
				},
				"+=0.3"
			)
			.to(
				'[data-animate="separator"]',
				{
					opacity: 1,
					scaleX: 1,
					duration: 0.6,
					ease: "power2.inOut",
				},
				"-=0.4"
			)
			.to(
				'[data-animate="power-title"]',
				{
					opacity: 1,
					scale: 1,
					y: 0,
					duration: 0.6,
					ease: "back.out(1.7)",
				},
				"-=0.3"
			)
			.to(
				'[data-animate="power-desc"]',
				{
					opacity: 1,
					y: 0,
					duration: 0.6,
				},
				"-=0.4"
			)
			.to(
				'[data-animate="buttons"]',
				{
					opacity: 1,
					y: 0,
					duration: 0.6,
				},
				"-=0.3"
			);
	}, containerRef);

	return () => ctx.revert();
}
