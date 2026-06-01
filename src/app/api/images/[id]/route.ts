import { sql } from "@/lib/db";

const PNG_SUFFIX_REGEX = /\.png$/;
const UUID_PATTERN =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const BASE64_PREFIX_REGEX = /^data:image\/png;base64,/;

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const uuid = id.replace(PNG_SUFFIX_REGEX, "");

		// Validate UUID format before querying
		if (!UUID_PATTERN.test(uuid)) {
			return new Response("Invalid image ID", { status: 400 });
		}

		const rows = await sql`
			SELECT image_data FROM survey_images WHERE id = ${uuid}
		`;

		if (!rows || rows.length === 0) {
			return new Response("Image not found", { status: 404 });
		}

		const dataUrl = rows[0].image_data;

		// Extract raw base64 data from dataUrl
		const base64Data = dataUrl.replace(BASE64_PREFIX_REGEX, "");
		const buffer = Buffer.from(base64Data, "base64");

		return new Response(buffer, {
			headers: {
				"Content-Type": "image/png",
				"Cache-Control": "public, max-age=31536000, immutable",
			},
		});
	} catch (error) {
		console.error("Failed to retrieve image:", error);
		return new Response("Internal Server Error", { status: 500 });
	}
}
