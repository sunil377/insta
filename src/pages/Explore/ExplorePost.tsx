import { CommentSVG, LikeSVG } from 'assets/svg/svg'
import { Picture } from 'components/Picture'
import { get_url_explore_post } from 'data/url'
import { Link } from 'react-router-dom'
import { Post as PostType } from 'services/post'

function ExplorePost({ id, mediaPath, likes, comments }: PostType) {
  return (
    <div className="overflow-hidden">
      <Link to={get_url_explore_post(id)} className="relative block w-full">
        <div>
          <Picture path={mediaPath} className="object-cover aspect-auto" />
        </div>
        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 inline-grid place-content-center place-items-center text-white">
          <div className="flex gap-x-4">
            <span className="inline-flex items-center gap-2">
              <LikeSVG
                fill="currentColor"
                stroke="currentColor"
                width="20"
                height="20"
              />
              <span className="font-semibold">{likes.length}</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <CommentSVG
                fill="currentColor"
                stroke="currentColor"
                width="20"
                height="20"
              />
              <span className="font-semibold">{comments.length}</span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export { ExplorePost }
