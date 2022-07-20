import {
	Modal,
	ModalContent,
	ModalDissmissButton,
	ModalOpenButton,
} from "components/modal";
import { useAuthContext } from "context/AuthContext";
import { getMediaURL, uploadProfile } from "lib/firebase/storage";
import { ChangeEvent, useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { updateUserProfile } from "services/user";

export default function ProfilePic({ imageURL, username }: ProfilePicProps) {
	const user = useAuthContext();
	const [pic, setPic] = useState("");

	const handleUpload = (ev: ChangeEvent<HTMLInputElement>) => {
		const files = ev.target.files;
		if (files && user) {
			const file = files[0];
			return uploadProfile(user.id, file).then(({ metadata: { fullPath } }) => {
				return updateUserProfile(user.id, fullPath);
			});
		}
	};

	useEffect(() => {
		if (imageURL) {
			getMediaURL(imageURL).then(url => {
				setPic(url);
			});
		}
	}, [imageURL]);

	return (
		<Modal>
			<ModalOpenButton aria-label="change profile pic">
				{pic ? (
					<img
						className="rounded-full w-20 md:w-36 object-contain aspect-square bg-gray-200"
						src={pic}
						alt={username}
					/>
				) : (
					<div className="w-20 md:w-36 aspect-square">
						<FaUserAlt className="w-full h-full" aria-label={username} />
					</div>
				)}
			</ModalOpenButton>
			<ModalContent>
				<ul className="min-w-[280px] text-sm text-center space-y-1">
					<li className="border-t border-gray-300">
						<label className="py-2.5 inline-block cursor-pointer text-blue-400">
							<strong>Upload Photo</strong>
							<input
								type="file"
								accept="image/*"
								onChange={handleUpload}
								className="w-0 h-0 focus:outline-0"
							/>
						</label>
					</li>
					<li className="border-t border-gray-300">
						<button className=" py-2.5 text-red-400">
							<strong>Remove Current Photo</strong>
						</button>
					</li>
					<li className="border-t border-gray-300">
						<ModalDissmissButton className="py-2.5">Cancel</ModalDissmissButton>
					</li>
				</ul>
			</ModalContent>
		</Modal>
	);
}

interface ProfilePicProps {
	imageURL?: string;
	username: string;
}
