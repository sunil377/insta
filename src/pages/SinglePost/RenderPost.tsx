import { Post } from "services/post";

export default function RenderPost({ username }: Post) {
	return (
		<div className="min-w-[300px]">
			<h2>{username}</h2>
		</div>
	);
}
