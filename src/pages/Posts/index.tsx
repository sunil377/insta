import { useAuthContext } from "context/AuthContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "services/user";
import Post from "./Post";

export default function Posts({ which }: { which: "posts" | "saved" }) {
	const authUser = useAuthContext();
	const { id } = useParams<{ id: string }>();
	const [ids, setIds] = useState<string[]>([]);

	useEffect(() => {
		if (!authUser || !id) {
			return;
		}

		switch (which) {
			case "posts":
				authUser.id === id
					? authUser.posts && setIds(authUser.posts)
					: getUser(id).then(res => res.posts && setIds(res.posts));
				break;
			case "saved":
				authUser.id === id
					? authUser.saved && setIds(authUser.saved)
					: getUser(id).then(res => res.saved && setIds(res.saved));
				break;
		}
	}, [authUser, id, which]);

	return (
		<section className="pb-10 overflow-hidden">
			{ids.length > 0 ? (
				<div className="grid grid-cols-3 justify-items-center gap-10">
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
