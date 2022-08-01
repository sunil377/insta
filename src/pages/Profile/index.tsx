import { RenderDoc } from 'components/RenderDoc'
import { useSafeAuthContext } from 'context/AuthContext'
import { useParams } from 'react-router-dom'
import MyProfile from './MyProfile'

const message = (
  <div className="text-center" role="alert">
    <h1 className="text-2xl font-semibold py-5">
      Sorry, this page isn't available.
    </h1>
    <p>
      The link you followed may be broken, or the page may have been removed. Go
      back to Instagram.
    </p>
  </div>
)

export default function Profile() {
  const user = useSafeAuthContext()
  const { id } = useParams<{ id: string }>()
  if (!id) return message

  return (
    <main className="max-w-5xl mx-auto">
      {id === user.id ? (
        <MyProfile {...user} />
      ) : (
        <RenderDoc
          docId={id}
          docName="user"
          RenderComponent={MyProfile}
          error={message}
        />
      )}
    </main>
  )
}
