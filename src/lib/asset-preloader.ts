"use client";

import { getImageProps } from "next/image";
import type { SurveyStep } from "@/lib/config";

const preloadedImages = new Set<string>();
const stepImageSizes = "(max-width: 403px) 100vw, 403px";

export function getStepImageSources(step: SurveyStep | undefined) {
	if (!step) {
		return [];
	}

	const sources: string[] = [];

	if ("bottomImage" in step && step.bottomImage) {
		sources.push(step.bottomImage);
	}

	if ("topImage" in step && step.topImage) {
		sources.push(step.topImage);
	}

	if ("promptImage" in step && step.promptImage) {
		sources.push(step.promptImage);
	}

	if (step.type === "result") {
		sources.push("/results/bg.png");
	}

	return sources;
}

export function preloadImage(src: string | undefined) {
	if (!src || preloadedImages.has(src) || typeof document === "undefined") {
		return;
	}

	preloadedImages.add(src);

	const {
		props: { src: fallbackSrc, srcSet },
	} = getImageProps({
		alt: "",
		height: 800,
		sizes: stepImageSizes,
		src,
		width: 800,
	});

	const link = document.createElement("link");
	link.as = "image";
	link.fetchPriority = "low";
	link.href = fallbackSrc;
	link.rel = "preload";

	if (srcSet) {
		link.imageSrcset = srcSet;
		link.imageSizes = stepImageSizes;
	}

	document.head.appendChild(link);
}

export function preloadStepImages(steps: (SurveyStep | undefined)[]) {
	for (const step of steps) {
		for (const src of getStepImageSources(step)) {
			preloadImage(src);
		}
	}
}
