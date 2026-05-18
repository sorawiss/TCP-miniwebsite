"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Name from "@/components/name";
import { TextInput } from "@/components/ui/text-input";
import type { NameStep } from "@/lib/config";
import { isProfanityFilterReady, profanityFilter } from "@/lib/profanity";
import type { ProfileAnswers } from "@/lib/survey";
import NextButton from "../ui/next-button";

interface NameStepProps {
	onNext: () => void;
	onProfileChange: (
		field: keyof ProfileAnswers,
		value: string | boolean
	) => void;
	profile: ProfileAnswers;
	step: NameStep;
}

export function SurveyNameStep({
	step,
	profile,
	onProfileChange,
	onNext,
}: NameStepProps) {
	const [error, setError] = useState<string | null>(null);
	const [availability, setAvailability] = useState<
		"checking" | "error" | "idle" | "taken" | "available"
	>("idle");

	useEffect(() => {
		const name = profile.name.trim();

		if (!name || error) {
			setAvailability("idle");
			return;
		}

		setAvailability("checking");

		const controller = new AbortController();
		const timeout = setTimeout(async () => {
			try {
				const response = await fetch(
					`/api/names/availability?name=${encodeURIComponent(name)}`,
					{ signal: controller.signal }
				);

				if (!response.ok) {
					throw new Error(
						`Availability check failed with status ${response.status}`
					);
				}

				const result = (await response.json()) as { available: boolean };
				setAvailability(result.available ? "available" : "taken");
			} catch (availabilityError) {
				if (!controller.signal.aborted) {
					console.error("Failed to check name availability", availabilityError);
					setAvailability("error");
				}
			}
		}, 300);

		return () => {
			clearTimeout(timeout);
			controller.abort();
		};
	}, [error, profile.name]);

	let availabilityError: string | null = null;

	if (availability === "taken") {
		availabilityError = "ชื่อนี้ถูกใช้แล้ว โปรดเปลี่ยนชื่อของคุณ";
	}

	if (availability === "error") {
		availabilityError = "เกิดข้อผิดพลาดในการตรวจสอบชื่อ กรุณาลองใหม่อีกครั้ง";
	}
	const isNextDisabled =
		!profile.name.trim() ||
		Boolean(error) ||
		availability === "checking" ||
		availability === "taken" ||
		availability === "error" ||
		availability === "idle";

	return (
		<>
			<div className="relative z-10 flex h-full flex-col items-center px-6 pt-[15vh]">
				<h2 className="text-[#151F6D] text-[2.5rem] drop-shadow-sm">
					{step.label}
				</h2>
				<div className="relative flex h-[129px] w-[134px] items-center justify-center">
					<Name className="absolute inset-0 h-full w-full object-contain" />
				</div>

				<div className="mt-12 w-full max-w-md space-y-4">
					<TextInput
						autoFocus
						containerClassName="h-[6rem]"
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							const value = event.target.value;
							onProfileChange("name", value);
							if (isProfanityFilterReady) {
								const result = profanityFilter.check(value);
								if (result.isClean) {
									setError(null);
								} else {
									setError("กรุณาใช้คำที่สุภาพ");
								}
							}
						}}
						placeholder={step.placeholder}
						value={profile.name}
					/>
					{error && (
						<p className="text-center font-medium text-[#ee1c25] text-[1.5rem]">
							{error}
						</p>
					)}
					{availabilityError && (
						<p className="text-center font-medium text-[#ee1c25] text-[1.5rem]">
							{availabilityError}
						</p>
					)}
				</div>

				<div className="mt-10">
					<NextButton disabled={isNextDisabled} onClick={onNext} />
				</div>
			</div>
			<Image
				alt="Desert background"
				className="pointer-events-none absolute bottom-0 left-0 z-0 w-full object-cover"
				height={800}
				src="/intro/intro1.png"
				width={800}
			/>
		</>
	);
}
