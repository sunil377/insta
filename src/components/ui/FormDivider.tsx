export default function FormDivider({ ...props }) {
	return (
		<div
			{...props}
			className={`flex gap-x-4 items-center ${props.className ?? ""}`}
		>
			<span className="border-t border-gray-300 w-full"></span>
			<span className="text-xs font-semibold text-gray-400">OR</span>
			<span className="border-t border-gray-300 w-full"></span>
		</div>
	);
}
