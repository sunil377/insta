import { useAuthContext } from "context/AuthContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "services/user";
import Post from "./Post";

export default function Posts({ which }: { which: "posts" | "saved" }) {
	const user = useAuthContext();
	const { id } = useParams<{ id: string }>();
	const [ids, setIds] = useState<string[]>([]);

	useEffect(() => {
		if (!user || !id) {
			return;
		}

		switch (which) {
			case "posts":
				user.id === id
					? user.posts && setIds(user.posts)
					: getUser(id).then(res => res.posts && setIds(res.posts));
				break;
			case "saved":
				user.id === id
					? user.saved && setIds(user.saved)
					: getUser(id).then(res => res.saved && setIds(res.saved));
				break;
		}
	}, [user, id, which]);

	return (
		<section className="pb-10 overflow-hidden">
			{ids.length > 0 ? (
				<div className="grid grid-cols-3 justify-items-center gap-1.5">
					{ids.map(arg => (
						<Post id={arg} key={arg} />
					))}
				</div>
			) : (
				<h1 className="text-center capitalize py-5">no post found</h1>
			)}
		</section>
	);
}
