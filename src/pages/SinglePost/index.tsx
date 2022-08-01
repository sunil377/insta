import { URL_EXPLORE } from 'data/url'
import Feed from 'feature/Feeds'
import { RenderDoc } from 'components/RenderDoc'
import { Fragment } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Modal, ModalContent } from 'components/modal'

export default function SinglePost({ ...props }) {
  const { postId } = useParams()
  const navigate = useNavigate()

  return (
    <Fragment>
      <div className="fixed inset-0 bg-black/40"></div>
      <div className="fixed inset-0 grid place-items-center">
        <div className="max-w-5xl bg-white">
          {postId && (
            <RenderDoc docId={postId} docName="post" RenderComponent={Feed} />
          )}
        </div>
      </div>
      <button
        className="fixed top-[10%] text-4xl align-middle leading-6 right-[10%] text-white"
        onClick={() => navigate(URL_EXPLORE)}
      >
        &times;
      </button>
    </Fragment>
  )
}
