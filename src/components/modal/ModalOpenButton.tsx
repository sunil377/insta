import { callAll } from "../../util/util";
import { useModalContext } from "./ModalContext";

export function ModalOpenButton({ ...props }) {
	const context = useModalContext();
	if (!context) {
		return null;
	}
	return (
		<button
			type="button"
			{...props}
			onClick={callAll(context.openModal, props?.onClick)}
		/>
	);
}
