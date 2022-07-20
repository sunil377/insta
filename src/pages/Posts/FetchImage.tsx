import useFetchMedia from "lib/firebase/useFetchMedia";

export function FetchImage({ path }: { path?: string }) {
	if (!path) {
		throw new Error("path is invalid");
	}
	const url = useFetchMedia(path);
	return <img src={url} alt={""} className="aspect-square object-cover" />;
}
