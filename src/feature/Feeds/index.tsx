import placeholder from "assets/images/placeholder.jpg";
import { CommentSVG, SharePostSVG } from "assets/svg/svg";
import { Spinner } from "components/ui";
import { useAuthContext } from "context/AuthContext";
import { get_url_profile } from "data/url";
import { getMediaURL } from "lib/firebase/storage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Post } from "services/post";
import FeedOptions from "./FeedOptions";
import LikeButton from "./LikeButton";
import SavedButton from "./SavedButton";

export default function Feed(post: Post) {
	const {
		caption,
		comments,
		createdAt,
		username,
		mediaPath,
		userid,
		likes,
		id: postId,
	} = post;
	const [mediaURL, setMediaURL] = useState("");
	const [isMediaLoading, setMediaLoading] = useState(true);

	const user = useAuthContext();

	useEffect(() => {
		getMediaURL(mediaPath)
			.then(url => setMediaURL(url))
			.then(() => setMediaLoading(false));
	}, [mediaPath]);

	if (!user) {
		return null;
	}

	const commentCount = comments?.length;

	function Username() {
		return (
			<Link to={get_url_profile(userid)}>
				<strong>{username} </strong>{" "}
			</Link>
		);
	}

	return (
		<article className="overflow-hidden bg-white border border-gray-300 rounded-md">
			<header className="grid grid-cols-[32px,1fr,32px] items-center px-4 py-2">
				<div className="">
					<img
						src={placeholder} /* replace src  */
						alt="random"
						className="rounded-full object-cover aspect-square"
					/>
				</div>
				<p className="px-5 text-sm">
					<Username />
				</p>
				<div>
					<FeedOptions />
				</div>
			</header>
			<div className="grid place-items-center aspect-square border">
				{isMediaLoading ? (
					<Spinner />
				) : (
					<img
						src={mediaURL}
						className="aspect-square object-contain"
						alt="random"
					/>
				)}
			</div>
			<footer className="p-4 text-sm space-y-3">
				<div className="flex gap-4 items-center">
					<LikeButton
						userId={user.id}
						postId={post.id}
						isLiked={post.likes?.includes(user.id) || false}
					/>
					<button>
						<CommentSVG
							aria-label="Comment"
							height="24"
							width="24"
							fill="currentColor"
							stroke="transparent"
							className="text-gray-900 hover:text-gray-500"
						/>
					</button>
					<button>
						<SharePostSVG
							aria-label="Share Post"
							height="24"
							width="24"
							fill="currentColor"
							stroke="transparent"
							className="text-gray-900 hover:text-gray-500"
						/>
					</button>
					<SavedButton
						postId={postId}
						userId={user.id}
						isSaved={user.saved?.includes(postId) || false}
					/>
				</div>
				<div className="space-y-2">
					<p>{likes?.length || 0} likes</p>
					<p className="font-semibold">8,256 views</p>
					<p>
						<Username />
						<span>{caption}</span>
					</p>
					<p>
						<button className=" text-gray-500">
							{commentCount && commentCount > 0
								? `view all ${commentCount} comments`
								: "No comment"}{" "}
						</button>
					</p>
					<p className="text-xs text-gray-500">
						{createdAt?.toDate().toDateString()}
					</p>
				</div>
			</footer>
		</article>
	);
}
