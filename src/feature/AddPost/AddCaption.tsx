import { ModalDissmissButton } from "components/modal/ModalDismissButton";
import { Spinner } from "components/ui";
import { useAuthContext } from "context/AuthContext";
import { useBase64 } from "hooks/useBase64";
import { uploadPostMedia } from "lib/firebase/storage";
import { ChangeEvent, useState } from "react";
import { createPost } from "services/post";
import { updateUser } from "services/user";

export default function AddCaption({ file }: AddCaptionProps) {
	const user = useAuthContext();
	const [caption, setCaption] = useState("");
	const handleCaption = (ev: ChangeEvent<HTMLTextAreaElement>) =>
		setCaption(ev.target.value);

	const handleCreatingPost = () => {
		if (user) {
			uploadPostMedia(user.id, file).then(({ metadata: { fullPath } }) => {
				return createPost({
					mediaPath: fullPath,
					userid: user.id,
					username: user.username,
					caption: caption,
				}).then(({ id }) => {
					return updateUser(user.id, "posts", id, "add");
				});
			});
		}
	};

	const { base64, isSuccess } = useBase64(file);

	return (
		<section>
			<div className="flex justify-between px-3 py-2 border-b border-gray-300">
				<ModalDissmissButton>arrowleft</ModalDissmissButton>
				<h3 className="text-center">create new post</h3>
				<ModalDissmissButton
					className="text-primary-main text-sm"
					onClick={handleCreatingPost}
				>
					Share
				</ModalDissmissButton>
			</div>
			<div className="grid grid-cols-2 ">
				<div className="px-4 bg-gray-50 border-r border-gray-300">
					{isSuccess ? (
						<img
							src={base64?.toString()}
							alt={file.name}
							className="max-h-[280px] mx-auto"
						/>
					) : (
						<Spinner />
					)}
				</div>
				<div className="bg-white">
					<div className="flex gap-2">
						<img src="" alt="" />
						<h4 className="text-sm">{user?.email}</h4>
					</div>
					<hr className="border-gray-300 my-1.5" />
					<div className="px-2">
						<textarea
							className="text-sm w-full px-2 py-0.5"
							value={caption}
							rows={5}
							onChange={handleCaption}
							placeholder="write caption..."
						/>
					</div>
					<hr className="border-gray-300 my-1.5" />
				</div>
			</div>
		</section>
	);
}

interface AddCaptionProps {
	file: File;
}
