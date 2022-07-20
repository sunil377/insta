import { OptionSVG } from "assets/svg/svg";
import { useAuthContext } from "context/AuthContext";
import { Fragment } from "react";
import { User } from "services/user";
import FollowingButton from "./FollowingButton";
import Main from "./Main";
import ProfilePic from "./ProfilePic";

export default function MyProfile({
	username,
	posts,
	profile,
	fullName,
	followers,
	following,
	id,
}: User) {
	const auth = useAuthContext();
	if (!auth) {
		return null;
	}
	const isSelf = id === auth.id;
	const postsCount = posts?.length || 0;
	const followersCount = followers?.length || 0;
	const followingsCount = following?.length || 0;
	const isFollowings = auth.followers && auth.followers.includes(id);

	return (
		<Fragment>
			<section className="py-4 md:py-10 text-gray-700 grid sm:grid-cols-12 gap-y-5">
				<div className="sm:col-span-9 md:col-span-10 px-4 md:px-0">
					<div className="grid grid-cols-4 gap-y-2">
						{/* profile images  */}

						<div className="col-span-1 md:row-span-2 md:col-span-2">
							<div className="grid place-items-center">
								<ProfilePic imageURL={profile} username={username} />
							</div>
						</div>

						{/* title,editbutton */}

						<div className="col-span-3 max-w-[16rem] md:col-span-2 md:max-w-[32rem]">
							<div className="grid pl-4 md:pl-0 grid-cols-4 md:grid-cols-6 gap-2">
								<div className="col-span-3 md:order-1">
									<h1 className="text-xl md:text-2xl lg:text-3xl font-thin">
										{username}
									</h1>
								</div>
								{isSelf ? (
									<Fragment>
										<div className="col-span-1 md:order-3">
											<div>
												<OptionSVG
													aria-label="Options"
													color="#262626"
													fill="#262626"
													height="24"
													width="24"
													className="w-6 h-6"
												/>
											</div>
										</div>
										<div className="col-span-4 md:col-span-2 md:order-2">
											<button className="border block w-full col-span-2 md:col-span-1 border-gray-300 rounded font-semibold text-sm py-1">
												Edit Profile
											</button>
										</div>
									</Fragment>
								) : (
									<div className="col-span-1 md:order-2">
										<FollowingButton
											userId={auth.id}
											id={id}
											username={username}
											isFollowings={isFollowings || false}
										/>
									</div>
								)}
								<div className="md:col-span-6 hidden md:block md:order-4">
									<div className="flex gap-x-4 border-gray-300 py-4">
										<button>
											<span className="font-semibold text-black">
												{postsCount}
											</span>
											<span className="ml-1.5 text-gray-900">posts</span>
										</button>

										<button>
											<span className="font-semibold text-black">
												{followersCount}
											</span>
											<span className="ml-1.5 text-gray-900">followers</span>
										</button>

										<button>
											<span className="font-semibold text-black">
												{followingsCount}
											</span>
											<span className="ml-1.5 text-gray-900">followings</span>
										</button>
									</div>
								</div>
							</div>
						</div>

						{/* name,bio */}

						<div className="col-span-4 text-sm md:text-base md:col-span-2">
							<h4 className="font-semibold capitalize text-gray-900">
								{fullName}
							</h4>
							<p>Genuine and funny that's what i think anyway...</p>
							<p>You naver wrong to do the right thing...</p>
						</div>
					</div>
				</div>
				{/* <div className="col-span-9 md:col-span-10 px-4 md:px-0 md:my-8">
					<div className="flex gap-x-4 md:gap-x-10 justify-start md:justify-center">
						<button className="border w-16 md:w-[5rem] aspect-square rounded-full overflow-hidden border-gray-400 inline-flex">
							<img src={profile} alt="" />
						</button>

						<button className="border w-16 md:w-[5rem] aspect-square rounded-full overflow-hidden border-gray-400 inline-flex">
							<img src={profile} alt="" />
						</button>

						<button className="border w-16 md:w-[5rem] aspect-square rounded-full overflow-hidden border-gray-400 inline-flex">
							<img src={profile} alt="" />
						</button>

						<button className="border w-16 md:w-[5rem] aspect-square rounded-full overflow-hidden border-gray-400 inline-flex">
							<img src={profile} alt="" />
						</button>
					</div>
				</div> */}
				<div className="col-span-12 text-sm md:hidden">
					<div className="grid grid-cols-3 border place-items-center border-gray-300 py-2">
						<button className="inline-grid place-items-center">
							<span className="font-semibold text-black">{postsCount}</span>
							<span className="text-gray-400">posts</span>
						</button>

						<button className="inline-grid place-items-center">
							<span className="font-semibold text-black">{followersCount}</span>
							<span className="text-gray-400">followers</span>
						</button>

						<button className="inline-grid place-items-center">
							<span className="font-semibold text-black">
								{followingsCount}
							</span>
							<span className="text-gray-400">followings</span>
						</button>
					</div>
				</div>
			</section>
			<Main id={id} />
		</Fragment>
	);
}
