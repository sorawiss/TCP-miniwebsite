import { sql } from "@/lib/db";

export async function POST(request: Request) {
	try {
		// Auto-create table if not exists to avoid manual migration steps
		await sql`
			CREATE TABLE IF NOT EXISTS survey_images (
				id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
				image_data TEXT NOT NULL,
				created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
			)
		`;

		let body: unknown;
		try {
			body = await request.json();
		} catch {
			return Response.json({ error: "Invalid JSON body" }, { status: 400 });
		}

		if (!body || typeof body !== "object" || !("image" in body)) {
			return Response.json(
				{ error: "Image data is required" },
				{ status: 400 }
			);
		}

		const { image } = body as { image: string };

		if (typeof image !== "string" || !image.startsWith("data:image/")) {
			return Response.json(
				{ error: "Invalid image format. Expected data URL" },
				{ status: 400 }
			);
		}

		// Insert the image data into database
		const rows = await sql`
			INSERT INTO survey_images (image_data)
			VALUES (${image})
			RETURNING id
		`;

		const id = rows[0]?.id;
		if (!id) {
			throw new Error("Failed to insert image");
		}

		// Get base URL for absolute or relative URL
		const origin = request.headers.get("origin") || "";
		const url = `${origin}/api/images/${id}.png`;

		return Response.json({ id, url }, { status: 201 });
	} catch (error) {
		console.error("Failed to upload image:", error);
		return Response.json({ error: "Failed to upload image" }, { status: 500 });
	}
}
