import { CommentSvg, LikeSvg } from 'assets/svg'
import { Picture } from 'components/Picture'
import { RenderDoc } from 'components/RenderDoc'
import { Spinner } from 'components/ui'
import { useSafeAuthContext } from 'context/AuthContext'
import { get_url_single_post } from 'data/url'
import { useAsync } from 'hooks/useAsync'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts, Post as PostType } from 'services/post'

export default function Explore() {
  const { isIdle, isLoading, isError, isSuccess, run, error, data: posts } = useAsync<PostType[]>()
  const authUser = useSafeAuthContext()

  useEffect(() => {
    run(getAllPosts(authUser.id))
  }, [run, authUser])

  switch (true) {
    case isIdle:
    case isLoading:
      return <Spinner fullScreen={true} />
    case isError:
      return <p role="alert">error has accur {error?.toString()} </p>
    case isSuccess:
      return (
        <main>
          <section className="mx-auto max-w-5xl overflow-hidden p-5 pb-10">
            {posts && posts.length > 0 ? (
              <article className="grid grid-cols-[1fr,1fr,1fr,1fr] justify-between justify-items-center gap-4 [&>*:nth-child(3)]:col-span-2 [&>*:nth-child(3)]:row-span-2">
                {posts.map(argPost =>
                  authUser.posts.includes(argPost.id) ? null : (
                    <RenderDoc
                      key={argPost.id}
                      docId={argPost.id}
                      docName="post"
                      RenderComponent={ExplorePost}
                    />
                  ),
                )}
              </article>
            ) : (
              <h1 className="py-5 text-center capitalize">no post found</h1>
            )}
          </section>
        </main>
      )
    default:
      return null
  }
}

function ExplorePost({ id, mediaPath, likes, comments }: PostType) {
  return (
    <Link
      to={get_url_single_post(id)}
      className="relative inline-grid w-full place-items-center bg-white shadow-xl"
    >
      <Picture path={mediaPath} className="aspect-square object-cover" />
      <div className="absolute inset-0 grid h-full w-full place-content-center place-items-center gap-2 bg-black/50 text-white opacity-0 hover:opacity-100">
        <span className="inline-flex items-center gap-2">
          <LikeSvg color="white" fill="white" />
          <span className="font-semibold">{likes.length}</span>
        </span>
        <span className="inline-flex items-center gap-2">
          <CommentSvg color="white" />
          <span className="font-semibold">{comments.length}</span>
        </span>
      </div>
    </Link>
  )
}
