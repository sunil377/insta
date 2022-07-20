import { ImSpinner3 } from "react-icons/im";

export default function Spinner({
	fullScreen = false,
	size = "1.8rem",
	className = "",
}: SpinnerProps) {
	const icon = (
		<ImSpinner3 size={size} className={`animate-spin ${className}`} />
	);

	if (fullScreen) {
		return (
			<div className="grid min-h-[90vh] w-full  place-items-center">{icon}</div>
		);
	}
	return icon;
}

interface SpinnerProps {
	fullScreen?: boolean;
	size?: string;
	className?: string;
}
