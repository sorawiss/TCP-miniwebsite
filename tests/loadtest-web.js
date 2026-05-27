// biome-ignore-all lint: biome ignore

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { check, sleep } from "k6";
import http from "k6/http";

export const options = {
	stages: [
		{ duration: "30s", target: 10 },
		{ duration: "1m", target: 50 },
		{ duration: "30s", target: 100 },
		{ duration: "1m", target: 200 },
		{ duration: "30s", target: 0 },
	],
	thresholds: {
		http_req_failed: ["rate<0.01"],
		http_req_duration: ["p(95)<1000"],
	},
};

export default function () {
	const response = http.get(__ENV.BASE_URL);

	check(response, {
		"homepage status is 200": (res) => res.status === 200,
		"homepage returns html": (res) =>
			res.headers["Content-Type"]?.includes("text/html"),
	});

	sleep(1);
}

export function handleSummary(data) {
	return {
		"load-test-web-report.html": htmlReport(data),
	};
}
