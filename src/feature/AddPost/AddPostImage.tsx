import { MediaSVG } from "../../assets/svg/svg";

export default function AddPostImage(props: AddPostImageProps) {
	return (
		<div className="pb-4 min-w-[300px] sm:min-w-[380px] md:min-w-[420px]">
			<div className="text-center py-2 border-b">
				<h3 className="text-md font-semibold leading-6">Create new post</h3>
			</div>
			<div className="py-20 text-center">
				<MediaSVG
					aria-label="Icon to represent media such as images or videos"
					color="#262626"
					fill="#262626"
					height="77"
					width="96"
					className="mx-auto"
				/>
				<div className="my-5">
					<h2 className="text-2xl font-light">Drag phots and videos here</h2>
				</div>
				<label
					className="cursor-pointer bg-primary-main text-white py-1.5 px-2.5 text-sm capitalize rounded-md focus-within:outline outline-black outline-1"
					{...props}
				></label>
			</div>
		</div>
	);
}

interface AddPostImageProps {}
