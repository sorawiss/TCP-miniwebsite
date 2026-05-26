"use client";

import Link from "next/link";
import { useState } from "react";
import { CoinFlip } from "@/features/summary-page/components/coin-flip";
import { resultPowers } from "@/lib/config";

export default function CoinflipPreviewPage() {
	// A master flip count key to force-remount all coins at once
	const [allFlipKey, setAllFlipKey] = useState(0);

	// Individual flip keys for resetting individual coins
	const [individualKeys, setIndividualKeys] = useState<Record<string, number>>(
		{}
	);

	const handleFlipAll = () => {
		setAllFlipKey((prev) => prev + 1);
		// Also reset individual keys
		setIndividualKeys({});
	};

	const handleFlipIndividual = (id: string) => {
		setIndividualKeys((prev) => ({
			...prev,
			[id]: (prev[id] || 0) + 1,
		}));
	};

	const powers = Object.values(resultPowers);

	return (
		<div className="relative min-h-screen bg-[url('/svg/background.svg')] bg-repeat pb-20 font-sans text-[#2f1b09]">
			{/* Top Header */}
			<header className="sticky top-0 z-40 border-[#FFB500]/20 border-b bg-white/80 px-6 py-4 shadow-sm backdrop-blur-md">
				<div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
					<div className="flex items-center gap-4">
						<Link
							className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FF8200] text-[#FF8200] transition-all duration-200 hover:bg-[#FF8200] hover:text-white"
							href="/"
							title="Back to Home"
						>
							<svg
								className="h-5 w-5"
								fill="none"
								stroke="currentColor"
								strokeWidth={2.5}
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>Back to Home</title>
								<path
									d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</Link>
						<div>
							<h1 className="font-bold font-uid text-2xl text-[#151f6d] leading-tight">
								Coin Flip Preview Sandbox
							</h1>
							<p className="font-medium text-[#6B3E1F] text-sm">
								Preview and interact with all 7 3D bottle cap coinflips
							</p>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<button
							className="cursor-pointer rounded-full bg-[#FF8200] px-6 py-2.5 font-bold text-base text-white shadow-md transition-all duration-200 hover:bg-[#E60000] hover:shadow-lg active:scale-95"
							onClick={handleFlipAll}
							type="button"
						>
							✨ Spin All Coins
						</button>
					</div>
				</div>
			</header>

			{/* Info instructions */}
			<div className="mx-auto mt-8 max-w-7xl px-6">
				<div className="max-w-3xl rounded-2xl border border-[#FFB500]/30 bg-[#FFEFC7]/60 p-5 shadow-sm">
					<h2 className="mb-1 font-bold text-[#151f6d] text-lg">
						💡 Interaction Tips
					</h2>
					<ul className="list-inside list-disc space-y-1 text-[#6B3E1F] text-sm">
						<li>Every coin spins automatically when loaded or remounted.</li>
						<li>
							Click on a coin itself to flip it back and forth between the{" "}
							<strong>TCP Logo (Back)</strong> and the{" "}
							<strong>Character Result (Front)</strong>.
						</li>
						<li>
							Use the individual <strong>Spin Again</strong> button under each
							coin to trigger the entry flip animation for that specific coin.
						</li>
					</ul>
				</div>
			</div>

			{/* Coins Grid */}
			<main className="mx-auto mt-8 max-w-7xl px-6">
				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{powers.map((power) => {
						const coinKey = `${power.id}-${allFlipKey}-${individualKeys[power.id] || 0}`;

						return (
							<div
								className="relative flex flex-col items-center rounded-3xl border border-[#FFB500]/30 bg-white/70 p-6 shadow-md backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
								key={power.id}
							>
								{/* Coin ID Badge */}
								<div className="absolute top-4 left-4 rounded-full bg-[#151f6d] px-3 py-1 font-bold text-white text-xs shadow-sm">
									ID: {power.id}
								</div>

								{/* Power Title */}
								<h3 className="mt-4 mb-1 flex min-h-[50px] items-center justify-center px-4 text-center font-bold font-uid text-[#ee1c25] text-xl leading-tight">
									{power.title}
								</h3>

								{/* Coin Container with fixed dimension */}
								<div className="my-6 flex h-[220px] w-[220px] items-center justify-center">
									<CoinFlip
										key={coinKey}
										powerId={power.id}
										sideTextureUrl={`/results/cap-${power.id}.png`}
									/>
								</div>

								{/* Controls & Details */}
								<div className="mt-2 flex w-full flex-grow flex-col items-center justify-between gap-4">
									<button
										className="w-full max-w-[150px] cursor-pointer rounded-full border-2 border-[#FF8200] py-1.5 text-center font-bold text-[#FF8200] text-sm transition-all duration-200 hover:bg-[#FF8200] hover:text-white active:scale-95"
										onClick={() => handleFlipIndividual(power.id)}
										type="button"
									>
										🔄 Spin Again
									</button>

									{/* Description */}
									<p className="flex w-full flex-grow items-center justify-center border-gray-100 border-t pt-3 text-center text-[#4A4A4A] text-sm leading-relaxed">
										{power.description}
									</p>

									{/* Asset Paths Debug View */}
									<div className="mt-2 w-full space-y-1 rounded-xl bg-[#151f6d]/5 p-2.5 font-mono text-[#6B3E1F] text-[0.65rem]">
										<div className="truncate">
											<span className="font-bold text-[#151f6d]">Front:</span>{" "}
											/results/{power.id}.png
										</div>
										<div className="truncate">
											<span className="font-bold text-[#151f6d]">Side:</span>{" "}
											cap-{power.id}.png
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</main>
		</div>
	);
}
