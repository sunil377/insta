import { HomeBlankSVG, HomeSVG, LikeSVG, MessengerSVG } from "assets/svg/svg";
import { URL_EXPLORE, URL_HOME, URL_MESSENGER, URL_SAVED } from "data/url";
import AddPost from "feature/AddPost";
import { AutoComplete } from "feature/AutoComplete";
import useMedia from "hooks/useMedia";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import NavbarDropdown from "./NavbarDropdown";

export default function Navbar() {
	const { pathname } = useLocation();
	const isHomePageActive = pathname === URL_HOME;
	const { isMatch } = useMedia("(min-width:768px)");

	return (
		<nav className="bg-white">
			<div className="flex px-5 py-3 mx-auto max-w-5xl">
				<Logo />
				{isMatch && (
					<div className="flex w-full items-center justify-center">
						<AutoComplete />
					</div>
				)}

				<ul className="inline-flex gap-x-5 items-center ml-auto">
					<li>
						<Link className="inline-block" to={URL_HOME}>
							{isHomePageActive ? (
								<HomeSVG
									aria-label="Home"
									color="#262626"
									fill="#262626"
									height="24"
									width="24"
								/>
							) : (
								<HomeBlankSVG
									aria-label="Home"
									color="#262626"
									fill="#262626"
									height="24"
									width="24"
								/>
							)}
						</Link>
					</li>
					<li>
						<Link className="inline-block" to={URL_MESSENGER}>
							<MessengerSVG
								aria-label="Messenger"
								color="#262626"
								fill="#262626"
								height="24"
								width="24"
							/>
						</Link>
					</li>
					<li>
						<Link to={URL_EXPLORE} className="inline-block">
							{/* <svg
								aria-label="Find People"
								color="#262626"
								fill="#262626"
								height="24"
								role="img"
								viewBox="0 0 24 24"
								width="24"
							>
								<path d="M13.173 13.164l1.491-3.829-3.83 1.49zM12.001.5a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012.001.5zm5.35 7.443l-2.478 6.369a1 1 0 01-.57.569l-6.36 2.47a1 1 0 01-1.294-1.294l2.48-6.369a1 1 0 01.57-.569l6.359-2.47a1 1 0 011.294 1.294z"></path>
							</svg> */}
							<svg
								aria-label="Find People"
								color="#262626"
								fill="#262626"
								height="24"
								role="img"
								viewBox="0 0 24 24"
								width="24"
							>
								<polygon
									fill="none"
									points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
								></polygon>
								<polygon
									fill-rule="evenodd"
									points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"
								></polygon>
								<circle
									cx="12.001"
									cy="12.005"
									fill="none"
									r="10.5"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
								></circle>
							</svg>
						</Link>
					</li>
					<li>
						<Link className="inline-block" to={URL_SAVED}>
							<LikeSVG
								aria-label="Activity Feed"
								color="#262626"
								fill="#262626"
								height="24"
								width="24"
							/>
						</Link>
					</li>

					<li>
						<AddPost />
					</li>
					<li>
						<NavbarDropdown />
					</li>
				</ul>
			</div>
			<hr />
		</nav>
	);
}
