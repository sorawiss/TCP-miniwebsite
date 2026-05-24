// biome-ignore-all lint : ignore
import { expect, test } from "@playwright/test";

test("user can complete survey and submit payload", async ({ page }) => {
	let submittedPayload: unknown;

	await page.route("**/api/submissions", async (route) => {
		submittedPayload = route.request().postDataJSON();

		await route.fulfill({
			status: 201,
			contentType: "application/json",
			body: JSON.stringify({ id: "test-submission-id" }),
		});
	});

	await page.goto("/");

	await page
		.getByRole("button", { name: /เริ่มเลย|Next button background/ })
		.click();
	await page.getByRole("button", { name: "อนุญาตทั้งหมด" }).click();
	await page
		.getByRole("button", { name: /ก้าวสู่ทะเลทราย|Next button background/ })
		.click();

	// Countdown step.
	await page
		.getByRole("button", { name: /ไปต่อ|Next button background/ })
		.click();

	await page.getByRole("textbox", { name: "ชื่อของคุณ" }).fill("Playwright");
	await page.getByRole("button", { name: /ไปต่อ/ }).click();

	const skipBirthDateButton = page.getByRole("button", {
		name: "ไม่ระบุวันเกิดและอายุ",
	});

	await skipBirthDateButton.click();
	await expect(skipBirthDateButton).toBeHidden();

	await page.getByRole("button", { name: /ไปต่อ/ }).click();
	await expect(page.locator('label[for="1-D"]')).toBeVisible();

	await page.locator('label[for="1-D"]').click();
	await page.locator('label[for="2-D"]').click();

	await page.getByRole("button", { name: /ไปต่อ/ }).click();
	await page.getByRole("button", { name: /ไปต่อ/ }).click();

	await page.locator('label[for="3-C"]').click();

	await page.getByRole("button", { name: /ไปต่อ/ }).click();

	await page.locator('label[for="4-D"]').click();
	await page.locator('label[for="5-D"]').click();

	await page.getByRole("textbox", { name: /ทำได้ แล้ว/ }).fill("Playwright");
	await page.getByRole("button", { name: /ไปต่อ/ }).click();

	await page
		.getByRole("button", { name: /เปิดพลัง|Next button background/ })
		.click();

	await expect.poll(() => submittedPayload).toBeTruthy();

	expect(submittedPayload).toMatchObject({
		profile: {
			name: "Playwright",
			birthDate: "",
			skipsBirthDate: true,
		},
		choiceAnswers: {
			"1": "D",
			"2": "D",
			"3": "C",
			"4": "D",
			"5": "D",
		},
		textAnswers: {
			"6": "Playwright",
		},
	});
});
