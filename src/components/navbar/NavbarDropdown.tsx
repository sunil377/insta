import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
	ProfileSVG,
	SavedSVG,
	SettingSVG,
	SwitchAccountSVG,
} from "assets/svg/svg";
import * as url from "data/url";
import { useAuthContext } from "context/AuthContext";
import useSignout from "hooks/useSignout";
import { getMediaURL } from "lib/firebase/storage";

export default function NavbarDropdown() {
	const user = useAuthContext();
	const handleSignout = useSignout();
	const [pic, setPic] = useState("");

	useEffect(() => {
		if (user && user.profile) {
			getMediaURL(user.profile).then(url => setPic(url));
		}
	}, [user]);

	if (!user) {
		return null;
	}

	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button className="rounded-full inline-grid place-items-center border focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-75 w-8 h-8">
					{pic ? (
						<img
							src={pic}
							alt={user.username}
							className="rounded-full object-cover aspect-square"
						/>
					) : (
						<FaUserAlt
							color="#262626"
							fill="#262626"
							aria-label={user.username}
							className="w-5 h-5"
						/>
					)}
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute z-10 right-0 mt-2 w-56 pt-4 pb-2 px-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div>
						<Menu.Item>
							{({ active }) => (
								<Link
									to={url.get_url_profile(user.id)}
									className={`${
										active ? "bg-gray-200" : ""
									} text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
								>
									<ProfileSVG
										className="mr-3.5 h-5 w-5"
										aria-label="Profile"
										color="#262626"
										fill="#262626"
										height="16"
										width="16"
									/>
									Profile
								</Link>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<Link
									to={url.get_url_saved(user.id)}
									className={`${
										active ? "bg-gray-200" : ""
									} text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
								>
									<SavedSVG
										className="mr-3.5 h-5 w-5"
										aria-label="saved"
										color="#262626"
										fill="#262626"
										height="16"
										width="16"
									/>
									Saved
								</Link>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<button
									className={`${
										active ? "bg-gray-200" : ""
									} text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
								>
									<SettingSVG
										className="mr-3.5 h-5 w-5"
										aria-label="settings"
										color="#262626"
										fill="#262626"
										height="16"
										width="16"
									/>
									Settings
								</button>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<button
									className={`${
										active ? "bg-gray-200" : ""
									} text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
								>
									<SwitchAccountSVG
										className="mr-3.5 h-5 w-5"
										aria-label="switch accounts"
										color="#262626"
										fill="#262626"
										height="16"
										width="16"
									/>
									Switch Accounts
								</button>
							)}
						</Menu.Item>
					</div>
					<div>
						<Menu.Item>
							{({ active }) => (
								<button
									className={`${
										active ? "bg-gray-200" : ""
									} text-gray-900 group flex w-full items-center rounded-md p-2 text-sm`}
									onClick={handleSignout}
								>
									Log Out
								</button>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
