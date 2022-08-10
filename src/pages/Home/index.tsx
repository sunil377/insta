import { useSafeAuthContext } from 'context/AuthContext'
import { media_query_sm } from 'data/mediaQuery'
import { URL_EXPLORE } from 'data/url'
import useMedia from 'hooks/useMedia'
import { Link } from 'react-router-dom'
import Feeds from './Feeds'
import { Suggestion } from './Suggestion'

export default function Home() {
  const { following } = useSafeAuthContext()
  const isSmall = useMedia(media_query_sm)

  return (
    <main className="mx-auto max-w-5xl">
      <div className="grid justify-center gap-x-4 p-4 md:grid-cols-8">
        <section className="md:col-span-5">
          <div className="mx-auto max-w-lg">
            <div className="grid gap-y-8 pb-10">
              {following.length === 0 ? (
                <div className="p-10 text-center text-base capitalize ">
                  currently you are not following any user.{' '}
                  <Link to={URL_EXPLORE} className="font-semibold">
                    try exploring some user
                  </Link>
                </div>
              ) : (
                following.map(arg => <Feeds key={arg} id={arg} />)
              )}
            </div>
          </div>
        </section>
        {isSmall && (
          <div className="col-span-3">
            <Suggestion />
          </div>
        )}
      </div>
    </main>
  )
}
