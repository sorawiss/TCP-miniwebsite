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
	const payload = JSON.stringify({
		uuid: `${__VU}-${__ITER}-${Date.now()}`,
		profile: {
			name: `Load User ${__VU}-${__ITER}`,
			birthDate: "1995-01-01",
			skipsBirthDate: false,
		},
		choiceAnswers: {
			1: "A",
			2: "A",
			3: "A",
			4: "A",
			5: "A",
		},
		textAnswers: {
			6: "test answer",
		},
	});

	const response = http.post(`${__ENV.BASE_URL}/api/submissions`, payload, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	check(response, {
		"status is 201": (res) => res.status === 201,
	});

	sleep(1);
}

export function handleSummary(data) {
	return {
		"load-test-report.html": htmlReport(data),
	};
}
