import { Picture } from 'components/Picture'
import { useAuthContext } from 'context/AuthContext'
import { useModal } from 'hooks/hooks'
import { uploadProfile } from 'lib/firebase/storage'
import { ChangeEvent, useEffect, useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { updateUserProfile } from 'services/user'
import { Dialog, Transition } from '@headlessui/react'

export default function ProfilePic({ imageURL, username }: ProfilePicProps) {
  const user = useAuthContext()
  const [files, setFiles] = useState<FileList | null>(null)
  const { isOpen, openModal, closeModal } = useModal()

  const handleUpload = (ev: ChangeEvent<HTMLInputElement>) => {
    setFiles(ev.target.files)
  }

  useEffect(() => {
    if (user && files) {
      const file = files[0]
      uploadProfile(user.id, file).then(({ metadata: { fullPath } }) => {
        return updateUserProfile(user.id, fullPath)
      })
    }
  }, [user, files])

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        aria-label="change profile pic"
        className="block overflow-hidden rounded-full border border-gray-400 md:max-w-[180px]"
      >
        {imageURL ? (
          <Picture
            path={imageURL}
            className="aspect-square rounded-full object-contain"
            alt={username}
          />
        ) : (
          <div className="aspect-square w-20 md:w-36">
            <FaUserAlt className="h-full w-full" aria-label={username} />
          </div>
        )}
      </button>
      <Transition appear show={isOpen}>
        <Dialog onClose={closeModal}>
          <ul className="min-w-[280px] space-y-1 text-center text-sm">
            <li className="border-t border-gray-300">
              <label className="inline-block cursor-pointer py-2.5 text-blue-400">
                <strong>Upload Photo</strong>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="h-0 w-0 focus:outline-0"
                />
              </label>
            </li>
            <li className="border-t border-gray-300">
              <button className=" py-2.5 text-red-400">
                <strong>Remove Current Photo</strong>
              </button>
            </li>
            <li className="border-t border-gray-300">
              <button onClick={closeModal} className="py-2.5">
                Cancel
              </button>
            </li>
          </ul>
        </Dialog>
      </Transition>
    </>
  )
}

interface ProfilePicProps {
  imageURL?: string | null
  username: string
}
