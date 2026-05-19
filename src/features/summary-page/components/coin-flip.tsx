"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./coin-flip.module.css";

interface CoinFlipProps {
	powerId: string | number;
	sideTextureUrl?: string;
}

export function CoinFlip({ powerId, sideTextureUrl }: CoinFlipProps) {
	const [isFlipping, setIsFlipping] = useState(true);

	// Trigger automatic spin on mount
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsFlipping(false);
		}, 2500); // matches the 2.5s duration of the coinSpin animation in CSS
		return () => clearTimeout(timer);
	}, []);

	const handleFlip = () => {
		if (isFlipping) {
			return;
		}
		setIsFlipping(true);
		setTimeout(() => {
			setIsFlipping(false);
		}, 2500);
	};

	// 24 panels to form a smooth 3D tapered cylinder/frustum (bottle cap side)
	const N = 24;
	const panels = Array.from({ length: N }, (_, i) => {
		const angle = i * (360 / N);
		const width = ((2 * Math.PI * 84) / N) * 1.1;
		return { angle, width, i };
	});

	return (
		<button className={styles.coinContainer} onClick={handleFlip} type="button">
			<div className={styles.coinBounds}>
				<div
					className={`${styles.coin} ${
						isFlipping ? styles.coinSpin : styles.coinIdle
					}`}
				>
					{/* Back face (Mystery / Start state) */}
					<div className={styles.back}>
						<span className={styles.mysteryText}>?</span>
					</div>

					{/* Multi-faceted 3D Tapered Cylinder Side Panels (Bottle Cap Crimps/Texture) */}
					{panels.map(({ angle, width, i }) => (
						<div
							className={styles.capPanel}
							key={i}
							style={{
								width: `${width}px`,
								transform: `translate(-50%, -50%) rotateZ(${angle}deg) translateY(-84px) rotateX(63deg)`,
								...(sideTextureUrl
									? {
											backgroundImage: `url(${sideTextureUrl})`,
											backgroundSize: "100% 100%",
											backgroundPosition: "center",
											backgroundRepeat: "no-repeat",
										}
									: {}),
							}}
						/>
					))}

					{/* Front face (Power character result) */}
					<div className={styles.front}>
						<Image
							alt="Power result"
							className="pointer-events-none size-full select-none object-cover"
							height={200}
							preload
							src={`/results/${powerId}.png`}
							width={200}
						/>
					</div>
				</div>
			</div>
		</button>
	);
}
