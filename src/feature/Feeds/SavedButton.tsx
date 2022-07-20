import { SavedSVG } from "assets/svg/svg";
import { updateUser } from "services/user";

interface Props {
	userId: string;
	postId: string;
	isSaved: boolean;
}

export default function SavedButton({ userId, postId, isSaved }: Props) {
	return (
		<button
			className="ml-auto"
			onClick={() => {
				return updateUser(userId, "saved", postId, isSaved ? "remove" : "add");
			}}
		>
			{isSaved ? (
				<svg
					aria-label="Remove"
					color="#262626"
					fill="#262626"
					height="24"
					role="img"
					viewBox="0 0 24 24"
					width="24"
				>
					<path d="M20 22a.999.999 0 01-.687-.273L12 14.815l-7.313 6.912A1 1 0 013 21V3a1 1 0 011-1h16a1 1 0 011 1v18a1 1 0 01-1 1z"></path>
				</svg>
			) : (
				<SavedSVG
					aria-label="save"
					height="24"
					width="24"
					fill="currentColor"
					stroke="transparent"
					className={
						isSaved
							? "text-blue-900 hover:text-blue-500"
							: "text-gray-900 hover:text-gray-500"
					}
				/>
			)}
		</button>
	);
}
