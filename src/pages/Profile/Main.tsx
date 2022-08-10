import * as url from 'data/url'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { User } from 'services/user'

import { ReactComponent as PostSvg } from 'assets/svg/post.svg'
import { ReactComponent as VideoSvg } from 'assets/svg/video.svg'
import { ReactComponent as SavedSvg } from 'assets/svg/saved.svg'
import { ReactComponent as TaggedSvg } from 'assets/svg/tagged.svg'

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
      Icon: PostSvg,
      active: isPostActive,
    },
    {
      name: 'videos',
      to: url.get_url_vidoes(id),
      Icon: VideoSvg,
      active: isVideosActive,
    },
    {
      name: 'saved',
      to: url.get_url_saved(id),
      Icon: SavedSvg,
      active: isSavedActive,
    },
    {
      name: 'tagged',
      to: url.get_url_tagged(id),
      Icon: TaggedSvg,
      active: isTaggedActive,
    },
  ]

  return (
    <section>
      <ul className="flex justify-center space-x-14 px-4 text-center md:border-t md:border-gray-separator">
        {content.map(({ name, active, Icon, to }) => (
          <li key={name}>
            <Link
              to={to}
              className={`inline-flex items-center py-2.5 text-sm sm:gap-x-2 ${
                active ? 'border-t border-black text-black' : 'text-gray-light'
              }`}
            >
              <Icon
                aria-label={name}
                height="12"
                width="12"
                className={active ? 'text-black' : 'text-gray-light'}
              />
              <span className="hidden uppercase md:inline">{name}</span>
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
