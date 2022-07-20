import { callAll } from "../../util/util";
import { useModalContext } from "./ModalContext";

export function ModalDissmissButton({ ...props }) {
	const context = useModalContext();
	if (!context) {
		return null;
	}
	return (
		<button
			{...props}
			type="button"
			onClick={callAll(context.closeModal, props?.onClick)}
		/>
	);
}
