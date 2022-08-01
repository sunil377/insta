import { Dialog, Transition } from '@headlessui/react'
import { createContext, Fragment, useContext, useState } from 'react'
import { Button } from 'util/type'
import { IconButton } from './ui'

const callAll =
  (...fns: any) =>
  (...arg: any) =>
    fns.forEach((fn: any) => fn?.(...arg))

interface Props {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const ModalContext = createContext<Props | null>({
  isOpen: false,
  openModal: () => void 0,
  closeModal: () => void 0,
})

function useModalContext() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('ModalContext is used outside of its boundary')
  }
  return context
}

function Modal({
  initialState = false,
  ...props
}: { initialState?: boolean } & any) {
  let [isOpen, setIsOpen] = useState(initialState)

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
      }}
      {...props}
    />
  )
}

function ModalOpenButton({ onClick, className = '', ...props }: Button) {
  const { openModal } = useModalContext()

  return (
    <button
      type="button"
      onClick={callAll(openModal, onClick)}
      {...props}
      className={`text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-75 ${className}`}
    />
  )
}

function ModalOpenIconButton({ onClick, ...props }: Button) {
  const { openModal } = useModalContext()

  return (
    <IconButton
      type="button"
      onClick={callAll(openModal, onClick)}
      {...props}
    />
  )
}

function ModalDismissButton({ onClick, className = '', ...props }: Button) {
  const { closeModal } = useModalContext()

  return (
    <button
      type="button"
      onClick={callAll(closeModal, onClick)}
      {...props}
      className={`inline-flex justify-center border-0 px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-black ${className}`}
    />
  )
}

function ModalContent({ ...props }) {
  const { isOpen, closeModal } = useModalContext()

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                {...props}
                className={`transform overflow-hidden rounded-2xl bg-white align-middle shadow-xl transition-all ${
                  props.className || ''
                }`}
              />
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export {
  ModalOpenButton,
  ModalDismissButton,
  Modal,
  ModalContent,
  ModalOpenIconButton,
}
