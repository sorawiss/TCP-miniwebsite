import type { ReactNode } from "react";
import { Button } from "../ui/button";

export interface SurveyLayoutProps {
	children: ReactNode;
	className?: string;
	isNextDisabled?: boolean;
	nextLabel: string;
	onNext: () => void;
}

export function SurveyLayout({
	children,
	className = "",
	isNextDisabled,
	nextLabel,
	onNext,
}: SurveyLayoutProps) {
	return (
		<section className={`flex flex-col justify-between ${className}`.trim()}>
			{children}
			<div className="pt-10">
				<Button
					className="h-14 rounded-full bg-[#2f1b09] px-8 text-base text-white hover:bg-[#4a2a11]"
					disabled={isNextDisabled}
					onClick={onNext}
				>
					{nextLabel}
				</Button>
			</div>
		</section>
	);
}

export interface SurveyStepLayoutProps extends SurveyLayoutProps {
	pageLabel: string;
	title: string;
}

export function SurveyStepLayout({
	children,
	isNextDisabled,
	nextLabel,
	onNext,
	pageLabel,
	title,
}: SurveyStepLayoutProps) {
	return (
		<SurveyLayout
			className="gap-8"
			isNextDisabled={isNextDisabled}
			nextLabel={nextLabel}
			onNext={onNext}
		>
			<div className="space-y-5">
				<p className="text-[#9d6b2f] text-sm uppercase tracking-[0.35em]">
					{pageLabel}
				</p>
				<h2 className="max-w-2xl font-bold text-3xl text-[#2f1b09] leading-tight sm:text-5xl">
					{title}
				</h2>
				{children}
			</div>
		</SurveyLayout>
	);
}
