import placeholder from "../../assets/images/placeholder.jpg";

export function Story() {
	return (
		<div className="overflow-hidden inline-block border border-blue-900 p-0.5 rounded-full shrink-0">
			<img
				src={placeholder}
				alt="ramdo pic"
				className="object-cover w-14 aspect-square rounded-full border border-red-900"
			/>
		</div>
	);
}
