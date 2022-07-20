import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import { useModalContext } from "./ModalContext";

export function ModalContent({ ...props }) {
	const context = useModalContext();
	if (!context) {
		return null;
	}
	const { isOpen, closeModal } = context;

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={closeModal}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-100"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-50" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-100"
							enterFrom="opacity-0 scale-125"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-100"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-125"
						>
							<Dialog.Panel
								{...props}
								className={`transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all w-auto ${
									props.className || ""
								}`}
							/>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
