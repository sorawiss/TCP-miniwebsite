import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Script from "next/script";
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
			<body className="flex min-h-full flex-col font-sans">
				<Script id="google-consent-mode" strategy="beforeInteractive">
					{`
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
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
