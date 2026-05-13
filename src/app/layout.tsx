import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { NuqsAdapter } from "nuqs/adapters/next/app";

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className={`h-full antialiased ${HeaventRounded.variable}`} lang="th">
			<body className="flex min-h-full flex-col font-sans">
				<NuqsAdapter>{children}</NuqsAdapter>
			</body>
		</html>
	);
}
