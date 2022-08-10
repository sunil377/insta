import { useSafeAuthContext } from 'context/AuthContext'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUser } from 'services/user'
import Post from './Post'

export default function Posts({ which }: { which: 'posts' | 'saved' }) {
  const authUser = useSafeAuthContext()
  const { id } = useParams<{ id: string }>()
  const [ids, setIds] = useState<string[]>([])

  useEffect(() => {
    if (!id) return

    switch (which) {
      case 'posts':
        authUser.id === id
          ? authUser.posts && setIds(authUser.posts)
          : getUser(id).then(res => res.posts && setIds(res.posts))
        break
      case 'saved':
        authUser.id === id
          ? authUser.saved && setIds(authUser.saved)
          : getUser(id).then(res => res.saved && setIds(res.saved))
        break
      default:
        throw new Error("this can't happen")
    }
  }, [authUser, id, which])

  return (
    <section className="pb-10">
      {ids.length > 0 ? (
        <div className="grid grid-cols-3 place-items-center gap-6 overflow-hidden">
          {ids.map(arg => (
            <Post id={arg} key={arg} />
          ))}
        </div>
      ) : (
        <h1 className="py-5 text-center capitalize">no post found</h1>
      )}
    </section>
  )
}
