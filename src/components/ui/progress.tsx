interface ProgressProps {
	value: number;
}

export function Progress({ value }: ProgressProps) {
	const safeValue = Math.max(0, Math.min(100, value));

	return (
		<div
			aria-label="Survey progress"
			aria-valuemax={100}
			aria-valuemin={0}
			aria-valuenow={safeValue}
			className="h-3 w-full overflow-hidden rounded-full bg-zinc-200"
			role="progressbar"
		>
			<div
				className="h-full rounded-full bg-black transition-all"
				style={{ width: `${safeValue}%` }}
			/>
		</div>
	);
}
