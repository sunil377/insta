import { RenderDoc } from 'components/RenderDoc'
import { Spinner } from 'components/ui'
import { useAuthContext } from 'context/AuthContext'
import { useAsync } from 'hooks/useAsync'
import { useEffect } from 'react'
import { getAllPosts, Post as PostType } from 'services/post'
import { ExplorePost } from './ExplorePost'

export default function Explore() {
  const {
    isIdle,
    isLoading,
    isError,
    isSuccess,
    run,
    error,
    data: posts,
  } = useAsync<PostType[]>()
  const auth = useAuthContext()

  useEffect(() => {
    run(getAllPosts())
  }, [run])

  switch (true) {
    case isIdle:
    case isLoading:
      return <Spinner fullScreen={true} />
    case isError:
      return <p role="alert">error has accur {error?.toString()} </p>
    case isSuccess:
      return (
        <main>
          <section className="pb-10 max-w-5xl mx-auto overflow-hidden p-5">
            {posts && posts.length > 0 ? (
              <article className="grid justify-items-center gap-4 justify-between grid-cols-[1fr,1fr,2fr] [&>:nth-child(3)]:row-span-2">
                {posts.map(arg =>
                  auth?.posts?.includes(arg.id) ? null : (
                    <RenderDoc
                      key={arg.id}
                      docId={arg.id}
                      docName="post"
                      RenderComponent={ExplorePost}
                    />
                  ),
                )}
              </article>
            ) : (
              <h1 className="text-center capitalize py-5">no post found</h1>
            )}
          </section>
        </main>
      )
    default:
      return null
  }
}
