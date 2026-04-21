import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { ageRanges, type ProfileAnswers } from "@/lib/survey";

interface SurveyIntroStepProps {
	canContinue: boolean;
	onNext: () => void;
	onProfileChange: (
		field: keyof ProfileAnswers,
		value: string | boolean
	) => void;
	profile: ProfileAnswers;
}

export function SurveyIntroStep({
	profile,
	onProfileChange,
	canContinue,
	onNext,
}: SurveyIntroStepProps) {
	return (
		<section className="relative min-h-screen overflow-hidden bg-[#f8f7f2] text-[#222222]">
			<div
				className="absolute inset-0 bg-[length:cover] bg-center bg-no-repeat opacity-70"
				style={{ backgroundImage: "url('/svg/background.svg')" }}
			/>
			<div className="absolute -bottom-8 -left-10 h-44 w-44 rounded-full border border-[#f0a400]/40" />
			<div className="absolute -bottom-14 -left-2 h-32 w-32 rounded-full border border-[#2536a7]/40" />
			<div className="absolute -bottom-10 left-8 h-24 w-24 rounded-full border border-[#ef3d17]/30" />

			<div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pt-8 pb-10">
				<div className="flex justify-center">
					<Image
						alt="TCP Years logo"
						height={84}
						priority
						src="/logo.svg"
						width={68}
					/>
				</div>

				<div className="mt-20 space-y-5">
					<div className="space-y-1">
						<Label
							className="font-medium text-[#141414] text-base"
							htmlFor="name"
						>
							ชื่อ
						</Label>
						<Input
							className="h-13 rounded-[14px] border-2 border-[#263fb3] bg-white/95 px-4 text-base placeholder:text-[#8f8f8f] focus:border-[#263fb3]"
							id="name"
							onChange={(event) => onProfileChange("name", event.target.value)}
							placeholder="ชื่อของคุณ"
							value={profile.name}
						/>
					</div>

					<div className="space-y-2">
						<div className="flex items-center justify-between gap-3">
							<Label
								className="font-medium text-[#141414] text-base"
								htmlFor="birthDate"
							>
								อายุของคุณ
							</Label>
							<label
								className="flex items-center gap-2 text-[#747474] text-sm"
								htmlFor="prefersAgeRange"
							>
								<span className="relative inline-flex items-center">
									<Checkbox
										checked={profile.prefersAgeRange}
										className="peer sr-only"
										id="prefersAgeRange"
										onChange={(event) =>
											onProfileChange("prefersAgeRange", event.target.checked)
										}
									/>
									<span className="h-7 w-12 rounded-full bg-[#cfcfcf] transition peer-checked:bg-[#8f8f8f]" />
									<span className="pointer-events-none absolute left-1 h-5 w-5 rounded-full bg-white shadow-sm transition peer-checked:translate-x-5" />
								</span>
								ไม่สะดวกกรอกวันที่
							</label>
						</div>

						{profile.prefersAgeRange ? (
							<Select
								className="h-13 rounded-[14px] border-2 border-[#263fb3] bg-white/95 px-4 text-[#5d5d5d] text-base focus:border-[#263fb3]"
								onChange={(event) =>
									onProfileChange("ageRange", event.target.value)
								}
								value={profile.ageRange}
							>
								<option value="">เลือกช่วงอายุ</option>
								{ageRanges.map((range) => (
									<option key={range} value={range}>
										{range}
									</option>
								))}
							</Select>
						) : (
							<Input
								className="h-13 rounded-[14px] border-2 border-[#263fb3] bg-white/95 px-4 text-[#5d5d5d] text-base focus:border-[#263fb3]"
								id="birthDate"
								onChange={(event) =>
									onProfileChange("birthDate", event.target.value)
								}
								type="date"
								value={profile.birthDate}
							/>
						)}
					</div>

					<label
						className="flex items-start gap-3 rounded-[16px] border border-[#9f9f9f] bg-white/85 px-4 py-4 text-[#7b7b7b] text-sm leading-6 shadow-[0_4px_8px_rgba(0,0,0,0.04)]"
						htmlFor="consent"
					>
						<Checkbox
							checked={profile.consent}
							className="mt-1 h-5 w-5 shrink-0 rounded-md border border-[#c0c0c0] accent-[#263fb3]"
							onChange={(event) =>
								onProfileChange("consent", event.target.checked)
							}
						/>
						<span>
							ฉันได้อ่านและยอมรับข้อกำหนดและ
							<a
								className="text-[#2d66d3] underline underline-offset-2"
								// TODO: Add actual links
								// biome-ignore lint: Don't have a real link
								href="#"
							>
								เงื่อนไขการบริการ
							</a>
							<br />
							และนโยบายความเป็นส่วนตัวแล้ว
						</span>
					</label>
				</div>

				<div className="mt-auto pt-10">
					<Button
						className="h-14 w-full rounded-full bg-[#ffb300] font-semibold text-black text-lg shadow-[0_10px_18px_rgba(255,179,0,0.3)] hover:bg-[#f0ab00]"
						disabled={!canContinue}
						onClick={onNext}
					>
						ถัดไป
					</Button>
				</div>
			</div>
		</section>
	);
}
