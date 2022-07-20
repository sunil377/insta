import { CommentSVG, LikeSVG } from "assets/svg/svg";
import { Spinner } from "components/ui";
import { useAsync } from "hooks/useAsync";
import { useEffect } from "react";
import { getPost, Post as PostType } from "services/post";
import { FetchImage } from "./FetchImage";

export default function Post({ id }: { id: string }) {
	const { data, run, isSuccess, isError, isIdle, isLoading, error } =
		useAsync<PostType>();

	useEffect(() => {
		run(getPost(id));
	}, [run, id]);

	switch (true) {
		case isIdle:
		case isLoading:
			return <Spinner />;
		case isError:
			return <h1>something wrong happen: {error}</h1>;
		case isSuccess:
			return (
				<div className="overflow-hidden">
					<div className="relative">
						<div>
							<FetchImage path={data?.mediaPath} />
						</div>
						<div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 inline-grid place-content-center place-items-center text-white">
							<div className="flex gap-x-4">
								<span className="inline-flex items-center gap-2">
									<LikeSVG
										fill="currentColor"
										stroke="currentColor"
										width="20"
										height="20"
									/>
									<span className="font-semibold">
										{data?.likes?.length || 0}
									</span>
								</span>
								<span className="inline-flex items-center gap-2">
									<CommentSVG
										fill="currentColor"
										stroke="currentColor"
										width="20"
										height="20"
									/>
									<span className="font-semibold">
										{data?.comments?.length || 0}
									</span>
								</span>
							</div>
						</div>
					</div>
				</div>
			);
		default:
			throw new Error("impossiable");
	}
}
