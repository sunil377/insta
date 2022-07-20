import { useEffect, useState } from "react";
import { getMediaURL } from "./storage";

export default function useFetchMedia(path?: string) {
	const [url, setUrl] = useState("");

	useEffect(() => {
		if (!path) return;
		getMediaURL(path).then(setUrl);
	}, [path]);

	return url;
}
