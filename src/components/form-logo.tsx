"use client";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";

export const FormLogo = () => {
	// TODO: make sure this logic is robust when client can't get url param using useSearchParams
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentStepParam = searchParams.get("step");

	// Show logo if on homepage (pathname is '/') and no step parameter
	if (pathname === "/" && currentStepParam === null) {
		return null;
	}

	return (
		<Image
			alt="Logo"
			className="absolute inset-x-1/2 top-4 z-10 h-auto w-12 -translate-x-1/2 md:w-14"
			height={128}
			src="/logo.png"
			width={128}
		/>
	);
};
