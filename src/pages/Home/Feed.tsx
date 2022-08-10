import placeholder from 'assets/images/placeholder.jpg'
import { CommentSvg, LikeSvg, RemoveSvg, SavedSvg, ShareSvg, UnLikeSvg } from 'assets/svg'
import { Picture } from 'components/Picture'
import { RenderDocOnce } from 'components/RenderDocOnce'
import { IconButton } from 'components/ui'
import { get_url_profile, get_url_single_post } from 'data/url'
import { useActionButton } from 'hooks/useAction'
import { Link } from 'react-router-dom'
import { IComment } from 'services/comment'
import { Post } from 'services/post'
import { formatDate } from 'util/util'
import { AddComment } from './AddComment'
import { FeedOption } from './FeedOption'

export default function Feed(post: Post) {
  const { username, userid, mediaPath, caption, likes, comments, createdAt, id: postId } = post
  const { isLiked, isSaved, toggleLike, toggleSaved } = useActionButton(post)

  return (
    <article className="overflow-hidden rounded-md border border-gray-300 bg-white">
      <header className="grid grid-cols-[32px,1fr,32px] items-center gap-x-4 px-4 py-2 text-sm">
        <img
          src={placeholder} /* replace src  */
          alt="random"
          className="aspect-square rounded-full object-cover"
        />
        <div>
          <Link to={get_url_profile(userid)} className="font-semibold text-gray-600">
            {username}
          </Link>
        </div>
        <FeedOption id={userid} />
      </header>

      <div className="border bg-white">
        <Picture
          path={mediaPath}
          className="aspect-square max-h-[500px] object-contain"
          alt={caption}
        />
      </div>
      <footer className="space-y-3 px-4 pt-4 text-sm">
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
        <div className="space-y-2 pb-2">
          <p className="font-semibold">{likes.length} likes</p>
          <p>
            <Link to={get_url_profile(userid)} className="font-semibold">
              {username}{' '}
            </Link>
            <span>{caption}</span>
          </p>
          <p>
            <Link
              to={get_url_single_post(postId)}
              className="cursor-pointer rounded border-0 font-semibold text-gray-500 outline-none focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-opacity-75"
            >
              {comments.length > 0 ? `view all ${comments.length} comments` : 'No comment'}{' '}
            </Link>
          </p>
          <div>
            {comments.slice(-2).map(argComment => (
              <RenderDocOnce
                database="comment"
                docId={argComment}
                key={argComment}
                renderDoc={CommentLayout}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500">{createdAt && formatDate(createdAt, true)}</p>
        </div>
        <AddComment postId={postId} />
      </footer>
    </article>
  )
}

function CommentLayout({ userId, title, username }: IComment) {
  return (
    <article className="grid grid-cols-1 items-center">
      <div className="space-y-2 text-left">
        <div className="flex gap-2">
          <Link to={get_url_profile(userId)} className="font-semibold">
            {username}{' '}
          </Link>
          <span>{title}</span>
        </div>
      </div>
    </article>
  )
}
