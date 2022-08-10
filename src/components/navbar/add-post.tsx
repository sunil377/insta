import { Dialog, Transition } from '@headlessui/react'
import { AddPostSvg, MediaSvg } from 'assets/svg'
import { Picture } from 'components/Picture'
import { IconButton, Spinner } from 'components/ui'
import { useSafeAuthContext } from 'context/AuthContext'
import { useModal } from 'hooks/hooks'
import { Fragment, useState } from 'react'
import { FaArrowLeft, FaUserAlt } from 'react-icons/fa'
import { useBase64, useCreatePost } from './hooks'

function AddPost() {
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <>
      <IconButton onClick={openModal}>
        <AddPostSvg />
      </IconButton>
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
            <button
              className="fixed top-4 right-4 text-2xl font-semibold text-white"
              onClick={closeModal}
              type="button"
              aria-label="close"
            >
              &times;
            </button>
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
                <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-white align-middle shadow-xl transition-all">
                  <DialogContent closeModal={closeModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

function DialogContent({ closeModal }: { closeModal: () => void }) {
  const [fileList, setFileList] = useState<FileList | null>(null)
  const resetFileList = () => setFileList(null)
  if (fileList)
    return <AddCaption file={fileList[0]} closeModal={closeModal} resetFileList={resetFileList} />

  return (
    <div className="w-screen max-w-[75vw] sm:max-w-lg">
      <Dialog.Title className="text-md border-b py-2 text-center font-semibold leading-6">
        Create new Post
      </Dialog.Title>
      <Dialog.Description as="div" className="grid place-items-center py-16 sm:py-32">
        <MediaSvg />
        <p className="my-5 text-2xl font-light">Drag phots and videos here</p>

        <label className="inline-flex cursor-pointer items-center rounded-md border-0 bg-primary-main py-1.5 px-2.5 align-middle text-sm font-semibold capitalize text-white outline-none focus-within:ring-1 focus-within:ring-black focus-within:ring-opacity-75">
          <span>select from computer</span>
          <input
            type="file"
            onChange={({ target }) => setFileList(target.files)}
            accept="image/*"
            className="h-0 w-0 focus:outline-none"
          />
        </label>
      </Dialog.Description>
    </div>
  )
}

function AddCaption({
  file,
  resetFileList,
  closeModal,
}: {
  file: File
  closeModal: () => void
  resetFileList: () => void
}) {
  const { base64, isSuccess } = useBase64(file)
  const { profile, username } = useSafeAuthContext()
  const { isLoading, handleCreatingPost } = useCreatePost(file)
  const [caption, setCaption] = useState('')

  return (
    <>
      <div className="w-screen max-w-[75vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        <div className="flex items-center justify-between border-b border-gray-300 px-4">
          <button type="button" title="previous" onClick={resetFileList}>
            <FaArrowLeft size="1.5rem" aria-label="previous" />
          </button>
          <Dialog.Title className="py-2 text-center text-base font-semibold">
            Create new Post
          </Dialog.Title>
          {isLoading ? (
            <Spinner />
          ) : (
            <button
              className="text-sm text-blue-500"
              type="button"
              onClick={() => {
                handleCreatingPost(caption).then(closeModal)
              }}
            >
              Share
            </button>
          )}
        </div>
        <div className="grid grid-cols-2">
          <div>
            {isSuccess && base64 && (
              <img
                src={base64.toString()}
                alt={file.name}
                className="aspect-square object-contain"
              />
            )}
          </div>
          <div className="border-l border-gray-300">
            <div className="flex items-center gap-x-4 p-2">
              {profile ? (
                <Picture path={profile} className="h-9 w-9 rounded-full object-contain" />
              ) : (
                <FaUserAlt size="1.8rem" />
              )}
              <p>
                <strong>{username}</strong>
              </p>
            </div>
            <div className="px-3 py-1">
              <textarea
                placeholder="Write a caption..."
                rows={5}
                cols={5}
                className="w-full outline-none"
                autoFocus
                value={caption}
                onChange={({ target }) => setCaption(target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddPost
