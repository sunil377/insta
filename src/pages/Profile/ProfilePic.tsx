import {
  Modal,
  ModalContent,
  ModalDismissButton,
  ModalOpenButton,
} from 'components/modal'
import { Picture } from 'components/Picture'
import { useAuthContext } from 'context/AuthContext'
import { uploadProfile } from 'lib/firebase/storage'
import { ChangeEvent, useEffect, useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { updateUserProfile } from 'services/user'

export default function ProfilePic({ imageURL, username }: ProfilePicProps) {
  const [files, setFiles] = useState<FileList | null>(null)
  const handleUpload = (ev: ChangeEvent<HTMLInputElement>) => {
    setFiles(ev.target.files)
  }
  const user = useAuthContext()

  useEffect(() => {
    if (user && files) {
      const file = files[0]
      uploadProfile(user.id, file).then(({ metadata: { fullPath } }) => {
        return updateUserProfile(user.id, fullPath)
      })
    }
  }, [user, files])

  return (
    <Modal>
      <ModalOpenButton
        aria-label="change profile pic"
        className="border rounded-full block md:max-w-[180px] border-gray-400 overflow-hidden"
      >
        {imageURL ? (
          <Picture
            path={imageURL}
            className="rounded-full object-contain aspect-square"
            alt={username}
          />
        ) : (
          <div className="w-20 md:w-36 aspect-square">
            <FaUserAlt className="w-full h-full" aria-label={username} />
          </div>
        )}
      </ModalOpenButton>
      <ModalContent>
        <ul className="min-w-[280px] text-sm text-center space-y-1">
          <li className="border-t border-gray-300">
            <label className="py-2.5 inline-block cursor-pointer text-blue-400">
              <strong>Upload Photo</strong>
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="w-0 h-0 focus:outline-0"
              />
            </label>
          </li>
          <li className="border-t border-gray-300">
            <button className=" py-2.5 text-red-400">
              <strong>Remove Current Photo</strong>
            </button>
          </li>
          <li className="border-t border-gray-300">
            <ModalDismissButton className="py-2.5">Cancel</ModalDismissButton>
          </li>
        </ul>
      </ModalContent>
    </Modal>
  )
}

interface ProfilePicProps {
  imageURL?: string
  username: string
}
