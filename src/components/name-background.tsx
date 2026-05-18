function NameBackground({ className }: { className?: string }) {
	return (
		<svg
			aria-label="name box"
			className={className}
			fill="none"
			preserveAspectRatio="none"
			viewBox="0 0 351 107"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter="url(#filter0_ding_1569_4254)">
				<g clip-path="url(#clip0_1569_4254)">
					<rect
						fill="url(#paint0_radial_1569_4254)"
						height="102"
						rx="12"
						width="349"
						x="1"
						y="1"
					/>
					<g filter="url(#filter1_n_1569_4254)">
						<ellipse
							cx="100"
							cy="142"
							fill="url(#paint1_radial_1569_4254)"
							rx="182"
							ry="83"
						/>
					</g>
				</g>
				<rect
					height="100"
					rx="11"
					stroke="#FFC560"
					stroke-width="2"
					width="347"
					x="2"
					y="2"
				/>
			</g>
			<defs>
				<filter
					color-interpolation-filters="sRGB"
					filterUnits="userSpaceOnUse"
					height="107"
					id="filter0_ding_1569_4254"
					width="351"
					x="0"
					y="0"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						result="hardAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					/>
					<feOffset dy="4" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.54988 0 0 0 0 0.280331 0 0 0 0 0 0 0 0 0.8 0"
					/>
					<feBlend
						in2="BackgroundImageFix"
						mode="normal"
						result="effect1_dropShadow_1569_4254"
					/>
					<feBlend
						in="SourceGraphic"
						in2="BackgroundImageFix"
						mode="normal"
						result="shape"
					/>
					<feColorMatrix
						in="SourceAlpha"
						result="hardAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					/>
					<feOffset dy="4" />
					<feGaussianBlur stdDeviation="2.5" />
					<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
					/>
					<feBlend
						in2="shape"
						mode="normal"
						result="effect2_innerShadow_1569_4254"
					/>
					<feTurbulence
						baseFrequency="0.20000000298023224 0.20000000298023224"
						numOctaves="3"
						result="noise"
						seed="7370"
						stitchTiles="stitch"
						type="fractalNoise"
					/>
					<feColorMatrix
						in="noise"
						result="alphaNoise"
						type="luminanceToAlpha"
					/>
					<feComponentTransfer in="alphaNoise" result="coloredNoise1">
						<feFuncA
							tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "
							type="discrete"
						/>
					</feComponentTransfer>
					<feComposite
						in="coloredNoise1"
						in2="effect2_innerShadow_1569_4254"
						operator="in"
						result="noise1Clipped"
					/>
					<feFlood
						flood-color="rgba(255, 255, 255, 0.1)"
						result="color1Flood"
					/>
					<feComposite
						in="color1Flood"
						in2="noise1Clipped"
						operator="in"
						result="color1"
					/>
					<feMerge result="effect3_noise_1569_4254">
						<feMergeNode in="effect2_innerShadow_1569_4254" />
						<feMergeNode in="color1" />
					</feMerge>
					<feBlend
						in="effect3_noise_1569_4254"
						in2="effect1_dropShadow_1569_4254"
						mode="normal"
						result="effect3_noise_1569_4254"
					/>
					<feTurbulence
						baseFrequency="0.05000000074505806 0.05000000074505806"
						numOctaves="3"
						seed="6311"
						type="fractalNoise"
					/>
					<feDisplacementMap
						height="100%"
						in="effect3_noise_1569_4254"
						result="displacedImage"
						scale="2"
						width="100%"
						xChannelSelector="R"
						yChannelSelector="G"
					/>
					<feMerge result="effect4_texture_1569_4254">
						<feMergeNode in="displacedImage" />
					</feMerge>
				</filter>
				<filter
					color-interpolation-filters="sRGB"
					filterUnits="userSpaceOnUse"
					height="166"
					id="filter1_n_1569_4254"
					width="364"
					x="-82"
					y="59"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feBlend
						in="SourceGraphic"
						in2="BackgroundImageFix"
						mode="normal"
						result="shape"
					/>
					<feTurbulence
						baseFrequency="0.3333333432674408 0.3333333432674408"
						numOctaves="3"
						result="noise"
						seed="5439"
						stitchTiles="stitch"
						type="fractalNoise"
					/>
					<feColorMatrix
						in="noise"
						result="alphaNoise"
						type="luminanceToAlpha"
					/>
					<feComponentTransfer in="alphaNoise" result="coloredNoise1">
						<feFuncA
							tableValues="0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "
							type="discrete"
						/>
					</feComponentTransfer>
					<feComposite
						in="coloredNoise1"
						in2="shape"
						operator="in"
						result="noise1Clipped"
					/>
					<feFlood flood-color="#FF8200" result="color1Flood" />
					<feComposite
						in="color1Flood"
						in2="noise1Clipped"
						operator="in"
						result="color1"
					/>
					<feMerge result="effect1_noise_1569_4254">
						<feMergeNode in="shape" />
						<feMergeNode in="color1" />
					</feMerge>
				</filter>
				<radialGradient
					cx="0"
					cy="0"
					gradientTransform="translate(175.5 103) rotate(-90) scale(102 186.678)"
					gradientUnits="userSpaceOnUse"
					id="paint0_radial_1569_4254"
					r="1"
				>
					<stop stop-color="white" />
					<stop offset="1" stop-color="#FFC55E" />
				</radialGradient>
				<radialGradient
					cx="0"
					cy="0"
					gradientTransform="matrix(-128.693 -58.6899 128.693 -58.6899 100 142)"
					gradientUnits="userSpaceOnUse"
					id="paint1_radial_1569_4254"
					r="1"
				>
					<stop stop-color="#FFFBED" />
					<stop offset="1" stop-color="#FFFBED" stop-opacity="0" />
				</radialGradient>
				<clipPath id="clip0_1569_4254">
					<rect fill="white" height="102" rx="12" width="349" x="1" y="1" />
				</clipPath>
			</defs>
		</svg>
	);
}

export default NameBackground;
