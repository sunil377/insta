import { PostSVG, SavedSVG, TaggedSVG, VideosSVG } from "assets/svg/svg";
import * as url from "data/url";
import { Link, Outlet, useLocation } from "react-router-dom";
import { User } from "services/user";

export default function Main({ id }: Pick<User, "id">) {
	const { pathname } = useLocation();

	const base = "/" + id;
	const isPostActive = base === pathname;
	const isVideosActive = url.get_url_vidoes(id) === pathname;
	const isSavedActive = url.get_url_saved(id) === pathname;
	const isTaggedActive = url.get_url_tagged(id) === pathname;

	return (
		<section className="border-t">
			<ul className="flex justify-center gap-x-14 pb-4">
				<li>
					<Link
						to={url.get_url_posts(id)}
						className={`text-sm border-t py-2 items-center inline-flex gap-x-2 ${
							isPostActive
								? "text-gray-900 border-black"
								: "text-gray-500 borde-transparent"
						}`}
					>
						<PostSVG
							aria-label="posts"
							color="currentColor"
							fill="currentColor"
							height="12"
							width="12"
						/>
						POSTS
					</Link>
				</li>
				<li>
					<Link
						to={url.get_url_vidoes(id)}
						className={`text-sm border-t py-2 items-center inline-flex gap-x-2 ${
							isVideosActive
								? "text-gray-900 border-black"
								: "text-gray-500 borde-transparent"
						}`}
					>
						<VideosSVG
							aria-label="vidoes"
							color="currentColor"
							fill="currentColor"
							height="12"
							width="12"
						/>
						VIDEOS
					</Link>
				</li>
				<li>
					<Link
						to={url.get_url_saved(id)}
						className={`text-sm border-t py-2 items-center inline-flex gap-x-2 ${
							isSavedActive
								? "text-gray-900 border-black"
								: "text-gray-500 borde-transparent"
						}`}
					>
						<SavedSVG
							aria-label="saved"
							color="currentColor"
							fill="currentColor"
							height="12"
							width="12"
						/>
						SAVED
					</Link>
				</li>
				<li>
					<Link
						to={url.get_url_tagged(id)}
						className={`text-sm border-t py-2 items-center inline-flex gap-x-2 ${
							isTaggedActive
								? "text-gray-900 border-black"
								: "text-gray-500 borde-transparent"
						}`}
					>
						<TaggedSVG
							aria-label="tagged"
							color="currentColor"
							fill="currentColor"
							height="12"
							width="12"
						/>
						TAGGES
					</Link>
				</li>
			</ul>

			<Outlet />
		</section>
	);
}
