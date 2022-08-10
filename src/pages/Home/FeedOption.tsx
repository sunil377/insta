import { Dialog, Transition } from '@headlessui/react'
import { FeedMenuSvg } from 'assets/svg'
import { IconButton } from 'components/ui'
import Overlay from 'components/ui/Overlay'

import { useModal } from 'hooks/hooks'
import { useActionFollowing } from 'hooks/useAction'
import { Fragment } from 'react'

function FeedOption({ id }: { id: string }) {
  const { toggleFollowing } = useActionFollowing(id)
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <>
      <IconButton type="button" onClick={openModal} title="more options">
        <FeedMenuSvg />
      </IconButton>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Overlay />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-100"
                enterFrom="opacity-0 scale-125"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[16rem] transform overflow-hidden rounded-2xl bg-white align-middle shadow-xl transition-all">
                  <ul className="flex flex-col divide-y-[1px] divide-gray-300 text-sm">
                    <li>
                      <button
                        type="button"
                        className="block w-full py-3.5 capitalize text-red-500 focus:outline-none focus-visible:bg-gray-200"
                      >
                        <strong>Report</strong>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="block w-full py-3.5 capitalize text-red-500 focus:outline-none focus-visible:bg-gray-200"
                        onClick={toggleFollowing}
                      >
                        <strong>unfollow</strong>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="block w-full py-3.5 capitalize focus:outline-none focus-visible:bg-gray-200"
                      >
                        go to post
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="block w-full py-3.5 capitalize focus:outline-none focus-visible:bg-gray-200"
                      >
                        share to...
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="block w-full py-3.5 capitalize focus:outline-none focus-visible:bg-gray-200"
                      >
                        copy link
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="block w-full py-3.5 capitalize focus:outline-none focus-visible:bg-gray-200"
                      >
                        embed
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="block w-full rounded-md py-3.5 font-medium capitalize focus:outline-none focus-visible:bg-gray-200"
                      >
                        cancel
                      </button>
                    </li>
                  </ul>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export { FeedOption }
