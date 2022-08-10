import { Picture } from 'components/Picture'
import { RenderDocOnce } from 'components/RenderDocOnce'
import { useSafeAuthContext } from 'context/AuthContext'
import { get_url_profile } from 'data/url'
import { useActionFollowing } from 'hooks/useAction'
import { useEffect, useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { getUsers, User } from 'services/user'

function Suggestion() {
  const { username, fullName, profile, followers, following, id: authUserId } = useSafeAuthContext()
  const fiterNotFollowingUser = followers.filter(arg => !following.includes(arg))
  const [allUsers, setAllUsers] = useState<User[]>([])

  useEffect(() => {
    getUsers().then(responseAllUser => setAllUsers(responseAllUser))
  }, [])

  return (
    <section className="pt-8 text-sm">
      <div className="flex items-center justify-start gap-4">
        <div className="h-16 w-16">
          {profile ? (
            <Picture
              path={profile}
              alt={username}
              className="aspect-square rounded-full object-contain"
            />
          ) : (
            <div className="grid h-full place-items-center">
              <div className="overflow-hidden rounded-full border border-gray-300 p-3">
                <FaUserAlt size={'3rem'} />
              </div>
            </div>
          )}
        </div>
        <div className="inline-flex flex-col text-sm">
          <h2 className="font-semibold">{username}</h2>
          <p className="text-gray-light">{fullName}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="flex justify-between capitalize text-gray-light">
          <span>Suggestion for you</span>
          <button type="button" className="text-gray-normal">
            See All
          </button>
        </p>
        <ul className="space-y-4 py-4">
          {fiterNotFollowingUser.map(arg => (
            <RenderDocOnce key={arg} docId={arg} database="user" renderDoc={SuggestionList} />
          ))}
          {allUsers.map(
            arg =>
              arg.id !== authUserId &&
              !followers.includes(arg.id) &&
              !following.includes(arg.id) && (
                <SuggestionList key={arg.id} {...arg} info="New To Instagram" />
              ),
          )}
        </ul>
      </div>
    </section>
  )
}

function SuggestionList({ id, profile, username, info = 'Follows you' }: User & { info?: string }) {
  const { toggleFollowing, isFollowings } = useActionFollowing(id)

  if (isFollowings) return null

  return (
    <li className="flex items-center gap-4 text-sm">
      <div className="h-8 w-8">
        {profile ? (
          <Picture
            path={profile}
            className="h-8 w-8 rounded-full border border-gray-300 object-contain"
          />
        ) : (
          <p className="inline-grid h-8 w-8 place-items-center rounded-full border border-gray-300">
            <FaUserAlt width={16} height={16} />
          </p>
        )}
      </div>
      <div className="inline-flex flex-col">
        <Link to={get_url_profile(id)} className="font-semibold hover:underline">
          {username}
        </Link>
        <p className="text-xs text-gray-light">{info}</p>
      </div>
      <button
        type="button"
        className="ml-auto text-xs font-bold text-blue-600"
        onClick={toggleFollowing}
      >
        Follow
      </button>
    </li>
  )
}

export { Suggestion }
