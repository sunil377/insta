import { useEffect, useRef } from "react";
import { authUI, uiConfig } from "../lib/firebase/auth";

export default function GoogleProvider() {
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (ref.current) {
			authUI.start(ref.current, uiConfig);
		}

		return function cleanup() {
			authUI.reset();
		};
	}, [ref]);

	return <div ref={ref} />;
}
