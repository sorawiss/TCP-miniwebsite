import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Creative Survey",
	description: "TCP Creative Survey",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
			lang="en"
		>
			<body className="flex min-h-full flex-col">
				<NuqsAdapter>{children}</NuqsAdapter>
			</body>
		</html>
	);
}
