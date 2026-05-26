import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

import localFont from "next/font/local";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { BackgroundMusic } from "@/components/background-music";
import { OrientationLock } from "@/components/orientation-lock";

export const metadata: Metadata = {
	title: "Desert Marathon Quiz",
	description: "TCP Desert Marathon personality experience",
};

const HeaventRounded = localFont({
	src: [
		{
			path: "../../public/fonts/DB-HeaventRounded-Cond-v3.2.woff2",
			weight: "normal",
			style: "normal",
		},
	],
	variable: "--font-heavent-rounded",
	display: "swap",
});

const UidDeepSea = localFont({
	src: [
		{
			path: "../../public/fonts/uid-deepsea.woff2",
			weight: "normal",
			style: "normal",
		},
	],
	variable: "--font-uid-deepsea",
	display: "swap",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			className={`h-full antialiased ${HeaventRounded.variable} ${UidDeepSea.variable}`}
			lang="th"
		>
			<GoogleAnalytics gaId="GTM-PZ6FNHTZ" />
			<body className="flex min-h-full flex-col font-sans">
				<NuqsAdapter>{children}</NuqsAdapter>
				<BackgroundMusic />
				<OrientationLock />
			</body>
		</html>
	);
}
