import { Dialog, Transition } from '@headlessui/react'
import placeholder from 'assets/images/placeholder.jpg'
import { CommentSvg, LikeSvg, RemoveSvg, SavedSvg, ShareSvg, UnLikeSvg } from 'assets/svg'
import { Picture } from 'components/Picture'
import { RenderDoc } from 'components/RenderDoc'
import { RenderDocOnce } from 'components/RenderDocOnce'
import { IconButton, Spinner } from 'components/ui'
import Overlay from 'components/ui/Overlay'
import { get_url_profile } from 'data/url'
import { useActionButton } from 'hooks/useAction'
import { AddComment } from 'pages/Home/AddComment'
import { FeedOption } from 'pages/Home/FeedOption'
import { Fragment } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IComment } from 'services/comment'
import { Post } from 'services/post'
import { formatDate, formatDateStrict } from 'util/util'

export default function SinglePost({ ...props }) {
  const { postId } = useParams()
  const navigate = useNavigate()
  const handleClose = () => navigate(-1)

  if (!postId) return null

  return (
    <Fragment>
      <Transition appear show={true} as={Fragment}>
        <Dialog onClose={handleClose} className="relative z-10">
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
                <Dialog.Panel
                  as="div"
                  className="transform overflow-hidden rounded-2xl bg-white align-middle shadow-xl transition-all"
                >
                  <RenderDoc docId={postId} docName="post" RenderComponent={PostComponent} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  )
}

function PostComponent(post: Post) {
  const { id: postId, caption, username, userid, mediaPath, likes, comments, createdAt } = post
  const {
    toggleLike,
    isLiked,
    toggleSaved,
    isSaved,
    isFollowings,
    toggleFollowing,
    isActionPending,
  } = useActionButton(post)

  return (
    <article className="grid grid-cols-2 overflow-hidden rounded-md border border-gray-300 bg-white">
      <div className="border bg-black">
        <Picture
          path={mediaPath}
          className="aspect-square max-h-[500px] object-contain"
          alt={caption}
        />
      </div>
      <div className="flex flex-col">
        <header className="flex items-center gap-x-4 px-4 py-2 text-sm">
          <img
            src={placeholder} /* replace src  */
            alt="random"
            className="aspect-square h-8 w-8 rounded-full object-cover"
          />
          <div className="flex items-center gap-x-2">
            <Link to={get_url_profile(userid)} className="font-semibold text-gray-600">
              {username}{' '}
            </Link>

            <button
              className={`inline-flex items-center font-semibold ${
                isFollowings ? '' : 'text-blue-500'
              }`}
              type="button"
              onClick={!isActionPending ? toggleFollowing : void 0}
            >
              {isActionPending ? <Spinner /> : isFollowings ? 'Following' : 'Follow'}
            </button>
          </div>
          <div className="ml-auto">
            <FeedOption id={userid} />
          </div>
        </header>
        <div className="relative basis-full overflow-y-auto">
          <div className="absolute inset-0 space-y-2 text-sm">
            <div className="grid grid-cols-[64px,1fr] items-center">
              <img
                src={placeholder} /* replace src  */
                alt="random"
                className="mx-auto aspect-square h-8 w-8 self-center rounded-full object-cover"
              />
              <div className="text-left">
                <Link to={get_url_profile(userid)} className="font-semibold">
                  {username}{' '}
                </Link>
                <span>{caption}</span>
              </div>
            </div>
            {comments.map(argComment => (
              <RenderDocOnce
                database="comment"
                docId={argComment}
                key={argComment}
                renderDoc={CommentLayout}
              />
            ))}
          </div>
        </div>

        <footer className="mt-auto flex flex-col gap-y-3 px-4 pt-4 text-sm">
          <div className="flex items-center gap-4">
            <IconButton onClick={toggleLike}>{isLiked ? <UnLikeSvg /> : <LikeSvg />}</IconButton>
            <IconButton>
              <CommentSvg />
            </IconButton>
            <IconButton>
              <ShareSvg />
            </IconButton>
            <IconButton className="ml-auto" onClick={toggleSaved}>
              {isSaved ? <RemoveSvg /> : <SavedSvg />}
            </IconButton>
          </div>
          <div className="mt-auto space-y-2 pb-2 text-left">
            <p className="font-semibold">{likes.length} likes</p>
            <p className="font-semibold">8,256 views</p>

            <p className="text-xs text-gray-500">{createdAt && formatDate(createdAt, true)}</p>
          </div>
          <AddComment postId={postId} />
        </footer>
      </div>
    </article>
  )
}

function CommentLayout({ userId, title, createdAt, username }: IComment) {
  return (
    <article className="grid grid-cols-[64px,1fr] items-center">
      <img
        src={placeholder} /* replace src  */
        alt="random"
        className="mx-auto aspect-square h-8 w-8 self-center rounded-full object-cover"
      />
      <div className="space-y-2 text-left">
        <div className="flex gap-2">
          <Link to={get_url_profile(userId)} className="font-semibold">
            {username}{' '}
          </Link>
          <span>{title}</span>
        </div>
        <div className="inline-flex gap-4 text-xs">
          {createdAt && <span> {formatDateStrict(createdAt)} </span>}
          <button type="button" className="font-semibold text-gray-600">
            reply
          </button>
        </div>
      </div>
    </article>
  )
}
