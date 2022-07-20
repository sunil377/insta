import { useAuthContext } from "context/AuthContext";
import { URL_EXPLORE } from "data/url";
import Container from "feature/Feeds/Container";
import { Link } from "react-router-dom";
import { Story } from "./Story";

export default function Home() {
	const auth = useAuthContext();
	if (!auth) return null;
	const followings = auth.following || [];

	return (
		<main>
			<section>
				<div className="max-w-md mx-auto">
					<div className="flex gap-2 overflow-x-scroll my-4 sm:my-10  p-4 rounded-md bg-white border border-gray-300 relative">
						<Story />
						<Story />
					</div>
					<div className="grid gap-8">
						{followings.length === 0 ? (
							<div className="text-center capitalize text-base">
								currently you are not following any user.{" "}
								<Link to={URL_EXPLORE} className="font-semibold">
									try exploring some user
								</Link>
							</div>
						) : (
							followings.map(arg => <Container key={arg} id={arg} />)
						)}
					</div>
				</div>
			</section>
		</main>
	);
}
