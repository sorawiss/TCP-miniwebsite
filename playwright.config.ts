import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./tests/e2e",
	timeout: 60_000,
	expect: {
		timeout: 10_000,
	},
	use: {
		baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",
		trace: "on-first-retry",
		screenshot: "only-on-failure",
		video: "retain-on-failure",
	},
	webServer: process.env.PLAYWRIGHT_BASE_URL
		? undefined
		: {
				command: "bun run dev",
				url: "http://localhost:3000",
				reuseExistingServer: true,
			},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "mobile-chrome",
			use: { ...devices["Pixel 7"] },
		},
	],
});
