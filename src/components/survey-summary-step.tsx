import { questionPages } from "@/lib/config";
import type { SurveyState } from "@/lib/survey";

interface SurveySummaryStepProps {
	state: SurveyState;
}

export function SurveySummaryStep({ state }: SurveySummaryStepProps) {
	return (
		<section className="space-y-6">
			<div className="space-y-2">
				<p className="text-sm text-zinc-500 uppercase tracking-[0.2em]">
					Final Results
				</p>
				<h2 className="font-semibold text-2xl">All answers in state</h2>
			</div>

			<div className="grid gap-4 sm:grid-cols-2">
				<div className="rounded-lg border border-zinc-200 p-4">
					<h3 className="mb-3 font-semibold text-sm text-zinc-500 uppercase tracking-[0.2em]">
						Profile
					</h3>
					<dl className="space-y-3 text-sm">
						<div>
							<dt className="text-zinc-500">Name</dt>
							<dd>{state.profile.name || "-"}</dd>
						</div>
						<div>
							<dt className="text-zinc-500">Birth date</dt>
							<dd>{state.profile.birthDate || "-"}</dd>
						</div>
						<div>
							<dt className="text-zinc-500">Age range</dt>
							<dd>{state.profile.ageRange || "-"}</dd>
						</div>
						<div>
							<dt className="text-zinc-500">Consent</dt>
							<dd>{state.profile.consent ? "Yes" : "No"}</dd>
						</div>
					</dl>
				</div>

				<div className="rounded-lg border border-zinc-200 p-4">
					<h3 className="mb-3 font-semibold text-sm text-zinc-500 uppercase tracking-[0.2em]">
						Question Answers
					</h3>
					<div className="space-y-4 text-sm">
						{questionPages.map((question) => (
							<div key={question.id}>
								<p className="text-zinc-500">{question.prompt}</p>
								<p>{state.questionAnswers[question.id] || "-"}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
				<p className="mb-2 font-medium text-sm text-zinc-700">Raw state</p>
				<pre className="overflow-x-auto text-xs text-zinc-700">
					{JSON.stringify(state, null, 2)}
				</pre>
			</div>
		</section>
	);
}
