"use client";

import dynamic from "next/dynamic";

const OrientationLockView = dynamic(
	() =>
		import("./orientation-lock-view").then((mod) => mod.OrientationLockView),
	{ ssr: false }
);

export function OrientationLock() {
	return <OrientationLockView />;
}
