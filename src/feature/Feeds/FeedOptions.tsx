import { FeedMenuSVG } from 'assets/svg/svg'
import {
  Modal,
  ModalContent,
  ModalDismissButton,
  ModalOpenIconButton,
} from 'components/modal'
import { useActionFollowing } from './hooks'

interface Props {
  id: string
}

export default function FeedOptions({ id }: Props) {
  const { toggleFollowing } = useActionFollowing(id)
  return (
    <Modal>
      <ModalOpenIconButton>
        <FeedMenuSVG
          aria-label="More options"
          color="#262626"
          fill="#262626"
          width="24"
          height="24"
        />
      </ModalOpenIconButton>
      <ModalContent className="bg-white max-w-[16rem] w-full rounded-2xl transform overflow-hidden shadow-xl transition-all">
        <ul className="flex flex-col">
          <li>
            <button className="text-sm py-3.5 capitalize w-full text-red-500">
              <strong>Report</strong>
            </button>
          </li>
          <li>
            <ModalDismissButton
              className="border-t border-gray-300 text-sm py-3.5 capitalize w-full text-red-500"
              onClick={toggleFollowing}
            >
              <strong>unfollow</strong>
            </ModalDismissButton>
          </li>
          <li>
            <button className="border-t border-gray-300 text-sm py-3.5 capitalize w-full">
              go to post
            </button>
          </li>
          <li>
            <button className="border-t border-gray-300 text-sm py-3.5 capitalize w-full">
              share to...
            </button>
          </li>
          <li>
            <button className="border-t border-gray-300 text-sm py-3.5 capitalize w-full">
              copy link
            </button>
          </li>
          <li>
            <button className="border-t border-gray-300 text-sm py-3.5 capitalize w-full">
              embed
            </button>
          </li>
          <li>
            <ModalDismissButton className="border-t border-gray-300 text-sm py-3.5 capitalize w-full">
              cancel
            </ModalDismissButton>
          </li>
        </ul>
      </ModalContent>
    </Modal>
  )
}
