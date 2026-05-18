import { toPng } from "html-to-image";

/**
 * Generates a PNG data URL from an HTML element with a render stability delay.
 *
 * @param element The DOM element to capture.
 * @param options Additional options for toPng.
 */
export async function generateImageFromElement(
	element: HTMLElement | null,
	options: Parameters<typeof toPng>[1] = {}
): Promise<string | null> {
	if (!element) {
		return null;
	}
	try {
		// Small delay to ensure the DOM has completed rendering/state updates
		await new Promise((resolve) => setTimeout(resolve, 150));

		return await toPng(element, {
			cacheBust: true,
			pixelRatio: 2,
			style: {
				fontFamily: "inherit",
			},
			...options,
		});
	} catch (error) {
		console.error("Failed to generate image from element", error);
		return null;
	}
}

/**
 * Triggers a browser-based download for the provided image data URL.
 *
 * @param dataUrl The data URL of the image.
 * @param filename The name of the downloaded file.
 */
export function downloadImage(
	dataUrl: string,
	filename = "download.png"
): void {
	if (typeof document === "undefined") {
		return;
	}
	const link = document.createElement("a");
	link.download = filename;
	link.href = dataUrl;
	link.click();
}

interface ShareData {
	filename?: string;
	text: string;
	title: string;
}

/**
 * Attempts to share the image data URL using the Web Share API.
 * Returns true if shared successfully, or false if not supported or failed.
 *
 * @param dataUrl The data URL of the image.
 * @param shareData Metadata for sharing (title, text, and optional filename).
 */
export async function shareImage(
	dataUrl: string,
	shareData: ShareData
): Promise<boolean> {
	try {
		const filename = shareData.filename || "image.png";
		const response = await fetch(dataUrl);
		const blob = await response.blob();
		const file = new File([blob], filename, { type: "image/png" });

		if (
			typeof navigator !== "undefined" &&
			navigator.share &&
			navigator.canShare?.({ files: [file] })
		) {
			await navigator.share({
				title: shareData.title,
				text: shareData.text,
				files: [file],
			});
			return true;
		}
	} catch (error) {
		console.error("Failed to share image", error);
	}
	return false;
}
