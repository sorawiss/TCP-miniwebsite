import Image from "next/image";
import Link from "next/link";
import Intro0 from "@/components/text/intro0";
import Intro1 from "@/components/text/intro1";
import { NextButton } from "@/components/ui/next-button";
import type { IntroStep } from "@/lib/config";

interface IntroPageProps {
	onNext: () => void;
	step: IntroStep;
}

export function SurveyIntroPage({ onNext, step }: IntroPageProps) {
	return (
		<div className="absolute inset-0 z-0 overflow-hidden">
			{step.topImage === "/intro/intro0-text.svg" && (
				<>
					<Intro0
						className={`w-full object-cover px-4 ${step.className ?? ""}`}
					/>
					<Image
						alt="sun"
						className="absolute top-0 left-0 size-32 -translate-x-1/3 -translate-y-1/3"
						height={64}
						src="/intro/sun.svg"
						width={64}
					/>
					<p className="absolute bottom-2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-[#151F6D] text-[1rem]">
						โปรดศึกษาน{" "}
						<Link
							className="underline"
							href="https://privacy.tcp.com/privacy/4ddf1f02-9722-4fe8-d135-08ddb905412e"
							target="_blank"
						>
							นโยบายความเป็นส่วนตัว privacy notice
						</Link>
					</p>
				</>
			)}
			{step.topImage === "/intro/intro1-text.svg" && (
				<Intro1
					className={`w-full object-cover px-4 ${step.className ?? ""} [@media(max-height:576px)]:mt-[12vh]`}
				/>
			)}

			{step.bottomImage && (
				<Image
					alt={step.id}
					className="pointer-events-none absolute bottom-0 left-0 -z-10 w-full object-cover object-top [@media(max-height:560px)]:h-[45dvh]"
					fetchPriority="high"
					height={500}
					loading="eager"
					sizes="(max-width: 403px) 100vw, 403px"
					src={step.bottomImage}
					width={800}
				/>
			)}
			<div className="absolute inset-x-0 bottom-[3rem] z-10 flex justify-center">
				<NextButton onClick={onNext}>
					{step.id === "intro" ? "เริ่มเลย!" : "ก้าวสู่ทะเลทราย"}
				</NextButton>
			</div>
		</div>
	);
}
