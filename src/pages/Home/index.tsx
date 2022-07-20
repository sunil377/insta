import { Spinner } from "components/ui";
import Feed from "feature/Feeds";
import { useAsync } from "hooks/useAsync";
import { useEffect } from "react";
import { getAllPosts, Post } from "services/post";
import { Story } from "./Story";

export default function Home() {
	const {
		isIdle,
		isLoading,
		isError,
		isSuccess,
		run,
		error,
		data: posts,
	} = useAsync<Post[]>();

	useEffect(() => {
		run(getAllPosts());
	}, [run]);

	switch (true) {
		case isIdle:
		case isLoading:
			return <Spinner fullScreen={true} />;
		case isError:
			return <h1>error has accur Home.tsx {error} </h1>;
		case isSuccess:
			return (
				<main>
					<section>
						<div className="max-w-md mx-auto">
							<div className="flex gap-2 overflow-x-scroll my-4 sm:my-10  p-4 rounded-md bg-white border border-gray-300 relative">
								<Story />
								<Story />
							</div>
							<div className="grid gap-8">
								{posts && posts.map(post => <Feed key={post.id} {...post} />)}
							</div>
						</div>
					</section>
				</main>
			);
		default:
			return null;
	}
}
