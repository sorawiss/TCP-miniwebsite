import type { Metadata } from "next";
import PreviewSharesClient from "./preview-shares-client";

export const metadata: Metadata = {
	title: "Share Images Tester",
	robots: {
		index: false,
		follow: false,
	},
};

export default function PreviewSharesPage() {
	return <PreviewSharesClient />;
}
