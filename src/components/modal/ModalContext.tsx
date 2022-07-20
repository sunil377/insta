import { createContext, useCallback, useContext, useState } from "react";

const ModalContext = createContext<{
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
} | null>(null);

export function useModalContext() {
	const context = useContext(ModalContext);
	if (context === undefined) {
		throw new Error(`ModalContext is used outside of its boundary`);
	}
	return context;
}

export function ModalProvider({ ...props }) {
	const [isOpen, setOpen] = useState(false);
	const openModal = useCallback(() => setOpen(true), []);
	const closeModal = useCallback(() => setOpen(false), []);

	return (
		<ModalContext.Provider
			value={{ isOpen, openModal, closeModal }}
			{...props}
		/>
	);
}
