import { Picture } from 'components/Picture'
import { Spinner } from 'components/ui'
import { useAsync } from 'hooks/useAsync'
import { useEffect } from 'react'
import { getPost, Post as PostType } from 'services/post'

import { ReactComponent as CommentSvg } from 'assets/svg/comment.svg'
import { ReactComponent as LikeSvg } from 'assets/svg/like.svg'
import { get_url_single_post } from 'data/url'
import { Link } from 'react-router-dom'

export default function Post({ id }: { id: string }) {
  const { data, run, isSuccess, isError, isIdle, isLoading, error } = useAsync<PostType>()

  useEffect(() => {
    run(getPost(id))
  }, [run, id])

  switch (true) {
    case isIdle:
    case isLoading:
      return (
        <div className="inline-grid place-items-center">
          <Spinner />
        </div>
      )
    case isError:
      return <p role="alert">something wrong happen: {error?.toString()}</p>
    case isSuccess:
      if (!data) return null

      return (
        <Link to={get_url_single_post(id)} className="relative block aspect-square overflow-hidden">
          <Picture path={data.mediaPath} className="aspect-square object-cover" />
          <div className="absolute inset-0 inline-grid place-content-center place-items-center bg-black bg-opacity-75 text-white opacity-0 hover:opacity-100">
            <div className="flex gap-x-4">
              <span className="inline-flex items-center gap-2">
                <LikeSvg fill="white" />
                <span className="font-semibold">{data.likes.length}</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <CommentSvg stroke="white" color="white" />
                <span className="font-semibold">{data.comments.length}</span>
              </span>
            </div>
          </div>
        </Link>
      )
    default:
      throw new Error("this is can't happen")
  }
}
