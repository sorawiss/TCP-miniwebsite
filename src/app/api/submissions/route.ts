import { sql } from "@/lib/db";
import { getSubmissionResult, parseSurveySubmission } from "@/lib/submission";

export async function POST(request: Request) {
	let body: unknown;

	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "Invalid JSON body" }, { status: 400 });
	}

	const submission = parseSurveySubmission(body);

	if (!submission) {
		return Response.json(
			{ error: "Invalid survey submission" },
			{ status: 400 }
		);
	}

	const { winningPowerId } = getSubmissionResult(submission);
	const birthDate = submission.profile.skipsBirthDate
		? null
		: submission.profile.birthDate;

	try {
		const rows = await sql`
			insert into survey_submissions (
				name,
				birth_date,
				skipped_birth_date,
				choice_answers,
				text_answers,
				winning_power_id
			)
			values (
				${submission.profile.name},
				${birthDate},
				${submission.profile.skipsBirthDate},
				${JSON.stringify(submission.choiceAnswers)}::jsonb,
				${JSON.stringify(submission.textAnswers)}::jsonb,
				${winningPowerId}
			)
			returning id
		`;

		return Response.json({ id: rows[0]?.id }, { status: 201 });
	} catch (error) {
		console.error("Failed to create survey submission", error);
		return Response.json(
			{ error: "Failed to create survey submission" },
			{ status: 500 }
		);
	}
}
