import { cookies } from "next/headers";
import { sql } from "@/lib/db";
import { getSubmissionResult, parseSurveySubmission } from "@/lib/submission";

const DEVICE_ID_COOKIE = "survey_device_id";
const DEVICE_ID_MAX_AGE_SECONDS = 60 * 60 * 24 * 90;
const UUID_PATTERN =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function getCookieDeviceId(value: string | undefined) {
	return value && UUID_PATTERN.test(value) ? value : null;
}

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
	const cookieStore = await cookies();
	const cookieDeviceId = getCookieDeviceId(
		cookieStore.get(DEVICE_ID_COOKIE)?.value
	);
	const deviceId = cookieDeviceId ?? crypto.randomUUID();

	try {
		const rows = await sql`
			insert into survey_submissions (
				name,
				birth_date,
				skipped_birth_date,
				choice_answers,
				text_answers,
				winning_power_id,
				device_id
			)
			values (
				${submission.profile.name},
				${birthDate},
				${submission.profile.skipsBirthDate},
				${JSON.stringify(submission.choiceAnswers)}::jsonb,
				${JSON.stringify(submission.textAnswers)}::jsonb,
				${winningPowerId},
				${deviceId}
			)
			returning id
		`;

		console.log("Submitted successfully", rows[0]?.id);

		if (!cookieDeviceId) {
			cookieStore.set(DEVICE_ID_COOKIE, deviceId, {
				httpOnly: true,
				maxAge: DEVICE_ID_MAX_AGE_SECONDS,
				path: "/",
				sameSite: "lax",
				secure: true,
			});
		}

		return Response.json({ id: rows[0]?.id }, { status: 201 });
	} catch (error) {
		console.error("Failed to create survey submission", error);
		return Response.json(
			{ error: "Failed to create survey submission" },
			{ status: 500 }
		);
	}
}
