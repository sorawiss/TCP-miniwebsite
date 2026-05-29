import type { Metadata } from "next";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import Script from "next/script";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { BackgroundMusic } from "@/components/background-music";
import { OrientationLock } from "@/components/orientation-lock";

export const metadata: Metadata = {
	metadataBase: new URL("https://70years.tcp.com"),
	title: "Desert Marathon Quiz",
	description: "TCP Desert Marathon personality experience",
	openGraph: {
		title: "Desert Marathon Quiz",
		description: "TCP Desert Marathon personality experience",
		url: "https://70years.tcp.com",
		siteName: "Desert Marathon Quiz",
		images: [
			{
				url: "/bottom/story-0.webp",
				width: 1919,
				height: 787,
				alt: "Desert Marathon Quiz",
			},
		],
		locale: "th_TH",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Desert Marathon Quiz",
		description: "TCP Desert Marathon personality experience",
		images: ["/bottom/story-0.webp"],
	},
	icons: {
		icon: "/logo.png",
		apple: "/logo.png",
	},
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
			<Analytics />
			<GoogleTagManager gtmId="GTM-PZ6FNHTZ" />
			<body className="flex min-h-full flex-col font-sans">
				<Script id="google-consent-mode" strategy="beforeInteractive">
					{`
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('consent', 'update', {
  ad_storage: 'granted',
  analytics_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted'
});
`}
				</Script>
				<NuqsAdapter>{children}</NuqsAdapter>
				<BackgroundMusic />
				<OrientationLock />
			</body>
		</html>
	);
}
