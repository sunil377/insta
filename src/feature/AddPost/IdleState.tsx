import { useState } from "react";
import AddCaption from "./AddCaption";
import AddPostImage from "./AddPostImage";

export default function IdleState(props: IdleStateProps) {
	const [fileset, setFileset] = useState<FileList | null>(null);
	const file = fileset?.[0];

	return file ? (
		<AddCaption file={file} />
	) : (
		<AddPostImage>
			<strong className="font-semibold">select from computer</strong>
			<input
				type="file"
				onChange={({ target }) => setFileset(target.files)}
				accept="image/*"
				className="w-0 h-0 focus:outline-none"
			/>
		</AddPostImage>
	);
}

interface IdleStateProps {}
