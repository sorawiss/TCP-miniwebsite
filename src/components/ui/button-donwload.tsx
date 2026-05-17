import type React from "react";

function ButtonDonwload(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-label="Download button background"
			fill="none"
			height="62"
			role="img"
			viewBox="0 0 369 62"
			width="369"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>Download button</title>
			<g filter="url(#filter0_ding_1760_222)">
				<g clip-path="url(#clip0_1760_222)">
					<rect
						fill="url(#paint0_radial_1760_222)"
						height="57"
						rx="24"
						width="367"
						x="1"
						y="1"
					/>
					<path
						d="M-58.4248 59.0737C-48.9709 50.7453 -19.8623 41.9348 7.41468 49.9575C36.1139 58.3985 132.003 75.6179 117.147 53.6714C102.291 31.7249 39.828 51.9833 89.4608 65.1512C129.167 75.6855 149.786 54.5719 155.976 39.1531"
						opacity="0.5"
						stroke="white"
						stroke-dasharray="6.75 6.75"
						stroke-width="2.70111"
					/>
					<rect
						height="56.7232"
						rx="6.98708"
						stroke="url(#paint1_linear_1760_222)"
						stroke-width="2.02583"
						width="247.827"
						x="11.0129"
						y="2.01292"
					/>
					<path
						d="M349.41 35.2511V42.2514C349.41 43.1797 349.041 44.07 348.384 44.7264C347.728 45.3828 346.838 45.7516 345.909 45.7516H321.408C320.48 45.7516 319.59 45.3828 318.933 44.7264C318.277 44.07 317.908 43.1797 317.908 42.2514V35.2511M342.409 26.5008L333.659 35.2511L324.908 26.5008M333.659 35.2511V14.2502"
						stroke="#FF8200"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="3.50015"
					/>
				</g>
				<rect
					height="55"
					rx="23"
					stroke="#FFC560"
					stroke-width="2"
					width="365"
					x="2"
					y="2"
				/>
			</g>
			<defs>
				<filter
					color-interpolation-filters="sRGB"
					filterUnits="userSpaceOnUse"
					height="62"
					id="filter0_ding_1760_222"
					width="369"
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
						result="effect1_dropShadow_1760_222"
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
						result="effect2_innerShadow_1760_222"
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
						in2="effect2_innerShadow_1760_222"
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
					<feMerge result="effect3_noise_1760_222">
						<feMergeNode in="effect2_innerShadow_1760_222" />
						<feMergeNode in="color1" />
					</feMerge>
					<feBlend
						in="effect3_noise_1760_222"
						in2="effect1_dropShadow_1760_222"
						mode="normal"
						result="effect3_noise_1760_222"
					/>
					<feTurbulence
						baseFrequency="0.05000000074505806 0.05000000074505806"
						numOctaves="3"
						seed="6311"
						type="fractalNoise"
					/>
					<feDisplacementMap
						height="100%"
						in="effect3_noise_1760_222"
						result="displacedImage"
						scale="2"
						width="100%"
						xChannelSelector="R"
						yChannelSelector="G"
					/>
					<feMerge result="effect4_texture_1760_222">
						<feMergeNode in="displacedImage" />
					</feMerge>
				</filter>
				<radialGradient
					cx="0"
					cy="0"
					gradientTransform="translate(184.5 58) rotate(-90) scale(57 196.306)"
					gradientUnits="userSpaceOnUse"
					id="paint0_radial_1760_222"
					r="1"
				>
					<stop stop-color="white" />
					<stop offset="1" stop-color="#FFC55E" />
				</radialGradient>
				<linearGradient
					gradientUnits="userSpaceOnUse"
					id="paint1_linear_1760_222"
					x1="46.2914"
					x2="51.5277"
					y1="-8.39985"
					y2="18.8146"
				>
					<stop stop-color="white" />
					<stop offset="1" stop-color="white" stop-opacity="0" />
				</linearGradient>
				<clipPath id="clip0_1760_222">
					<rect fill="white" height="57" rx="24" width="367" x="1" y="1" />
				</clipPath>
			</defs>
		</svg>
	);
}

export default ButtonDonwload;
