import { Picture } from 'components/Picture'
import { Button } from 'components/ui'
import { useSafeAuthContext } from 'context/AuthContext'
import { get_url_profile, URL_EXPLORE } from 'data/url'
import Container from 'feature/Feeds/Container'
import { useActionFollowing } from 'feature/Feeds/hooks'
import { useAsync } from 'hooks/useAsync'
import { useEffect } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { getUser, User } from 'services/user'

export default function Home() {
  const { following, followers } = useSafeAuthContext()
  const { username, fullName, profile } = useSafeAuthContext()
  const fiterNotFollowingUser = followers.filter(
    arg => !following.includes(arg),
  )

  return (
    <main className="max-w-5xl mx-auto">
      <div className="grid grid-cols-[10fr,8fr] gap-x-8 max-w-[90%] mx-auto">
        <section>
          <div className="grid gap-y-8 pb-10">
            {following.length === 0 ? (
              <div className="text-center capitalize text-base p-10 ">
                currently you are not following any user.{' '}
                <Link to={URL_EXPLORE} className="font-semibold">
                  try exploring some user
                </Link>
              </div>
            ) : (
              following.map(arg => <Container key={arg} id={arg} />)
            )}
          </div>
        </section>
        <section className="pt-8 text-sm">
          <div className="flex justify-start gap-4 items-center">
            <div>
              {profile && (
                <Picture
                  path={profile}
                  alt={username}
                  className="w-16 rounded-full aspect-square object-contain"
                />
              )}
            </div>
            <div className="inline-flex flex-col text-sm">
              <h2>{username}</h2>
              <p className="text-gray-light">{fullName}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-light flex justify-between capitalize">
              <span>Suggestion for you</span>
              <button className="text-gray-normal">See All</button>
            </p>
            <ul className="py-4 space-y-4">
              {fiterNotFollowingUser.map(arg => (
                <UserList key={arg} id={arg} info="follows you" />
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  )
}

function UserList({ id, info }: { id: string; info: string }) {
  const { data: ResponseUser, run } = useAsync<User>()
  const { toggleFollowing } = useActionFollowing(id)

  useEffect(() => {
    run(getUser(id))
  }, [run, id])

  return ResponseUser ? (
    <li className="flex text-sm gap-4 items-center">
      <p>
        {ResponseUser.profile ? (
          <Picture
            path={ResponseUser.profile}
            className="w-8 h-8 rounded-full object-contain"
          />
        ) : (
          <p className="border rounded-full border-gray-300 w-8 h-8 inline-grid place-items-center">
            <FaUserAlt width={32} height={32} />
          </p>
        )}
      </p>
      <p className="inline-flex flex-col">
        <Link to={get_url_profile(id)} className="hover:underline">
          {ResponseUser.username}
        </Link>
        <span className="text-gray-light">{info}</span>
      </p>
      <Button
        variant="text"
        size="small"
        className="ml-auto"
        onClick={toggleFollowing}
      >
        follow
      </Button>
    </li>
  ) : null
}
