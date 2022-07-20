import { HomeBlankSVG, HomeSVG, LikeSVG, MessengerSVG } from "assets/svg/svg";
import { URL_HOME, URL_MESSENGER, URL_SAVED } from "data/url";
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
