import { sql } from "@/lib/db";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const name = searchParams.get("name")?.trim();

	if (!name) {
		return Response.json({ available: false }, { status: 400 });
	}

	try {
		const rows = await sql`
			select exists(
				select 1
				from survey_submissions
				where name = ${name}
			) as "isTaken"
		`;

		return Response.json({ available: !rows[0]?.isTaken });
	} catch (error) {
		console.error("Failed to check name availability", error);
		return Response.json(
			{ error: "Failed to check name availability" },
			{ status: 500 }
		);
	}
}
