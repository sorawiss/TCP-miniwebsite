import type { Metadata } from "next";
import CoinflipPreviewPage from "./_component/coinflip-preview";

export const metadata: Metadata = {
	title: "Coin Flip Preview Sandbox",
	robots: {
		index: false,
		follow: false,
	},
};

export default function Page() {
	return <CoinflipPreviewPage />;
}
