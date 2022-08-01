import {
  Modal,
  ModalContent,
  ModalDismissButton,
  ModalOpenButton,
} from 'components/modal'
import { Picture } from 'components/Picture'
import { FaUserAlt } from 'react-icons/fa'
import { useUploadProfile } from './hooks'

export default function ProfilePic({ imageURL, username }: ProfilePicProps) {
  const handleUpload = useUploadProfile()

  return (
    <Modal>
      <ModalOpenButton aria-label="change profile pic">
        {imageURL ? (
          <Picture
            className="rounded-full w-20 md:w-36 object-contain aspect-square bg-gray-200"
            path={imageURL}
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
