import { PostSVG, SavedSVG, TaggedSVG, VideosSVG } from 'assets/svg/svg'
import * as url from 'data/url'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { User } from 'services/user'

export default function Main({ id }: Pick<User, 'id'>) {
  const { pathname } = useLocation()

  const base = '/' + id
  const isPostActive = base === pathname
  const isVideosActive = url.get_url_vidoes(id) === pathname
  const isSavedActive = url.get_url_saved(id) === pathname
  const isTaggedActive = url.get_url_tagged(id) === pathname

  const content = [
    {
      name: 'posts',
      to: url.get_url_posts(id),
      Icon: PostSVG,
      active: isPostActive,
    },
    {
      name: 'videos',
      to: url.get_url_vidoes(id),
      Icon: VideosSVG,
      active: isVideosActive,
    },
    {
      name: 'saved',
      to: url.get_url_saved(id),
      Icon: SavedSVG,
      active: isSavedActive,
    },
    {
      name: 'tagged',
      to: url.get_url_tagged(id),
      Icon: TaggedSVG,
      active: isTaggedActive,
    },
  ]

  return (
    <section>
      <ul className="flex justify-around text-center px-4 py-1 md:border-gray-separator md:border-t">
        {content.map(({ name, active, Icon, to }) => (
          <li key={name}>
            <Link
              to={to}
              className={`text-sm py-2.5 items-center inline-flex sm:gap-x-2`}
            >
              <Icon
                aria-label={name}
                color={active ? '#0095f6' : 'currentColor'}
                fill={active ? '#0095f6' : 'currentColor'}
                height="24"
                width="24"
              />
              <span className="hidden md:inline uppercase">{name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <section className="md:pt-5">
        <Outlet />
      </section>
    </section>
  )
}
