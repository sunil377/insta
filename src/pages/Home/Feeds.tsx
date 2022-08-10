import { RenderDoc } from 'components/RenderDoc'
import { Spinner } from 'components/ui'
import { useEffect, useState } from 'react'
import { getUser } from 'services/user'
import Feed from './Feed'

function Feeds({ id }: { id: string }) {
  const [allFollowingsPostsId, setAllFollowingsPostId] = useState<string[]>([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getUser(id).then(argUser => {
      setAllFollowingsPostId(argUser.posts.reverse() || [])
      setLoading(false)
    })
  }, [id])

  return isLoading ? (
    <Spinner fullScreen={true} />
  ) : (
    <>
      {allFollowingsPostsId.map(argPost => (
        <article key={argPost} className="mt-2">
          <RenderDoc docId={argPost} docName={'post'} RenderComponent={Feed} />
        </article>
      ))}
    </>
  )
}

export default Feeds
