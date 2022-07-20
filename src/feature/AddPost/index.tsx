import { AddPostSVG } from "../../assets/svg/svg";
import { Modal } from "../../components/modal";
import { ModalContent } from "../../components/modal/ModalContent";
import { ModalOpenButton } from "../../components/modal/ModalOpenButton";
import IdleState from "./IdleState";

export default function index() {
	return (
		<Modal>
			<ModalOpenButton>
				<AddPostSVG
					aria-label="New post"
					color="#262626"
					fill="#262626"
					width="24"
					height="24"
				/>
			</ModalOpenButton>
			<ModalContent>
				<IdleState />
			</ModalContent>
		</Modal>
	);
}
