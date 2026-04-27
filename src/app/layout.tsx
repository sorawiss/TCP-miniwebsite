import type { Metadata } from "next";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata: Metadata = {
	title: "Desert Marathon Quiz",
	description: "TCP Desert Marathon personality experience",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className="h-full antialiased" lang="th">
			<body className="flex min-h-full flex-col">
				<NuqsAdapter>{children}</NuqsAdapter>
			</body>
		</html>
	);
}
