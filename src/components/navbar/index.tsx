import { Menu, Transition } from '@headlessui/react'
import sprite2 from 'assets/images/sprite2.png'
import {
  ActiveExploreSvg,
  ActiveHomeSvg,
  ActiveMessengerSvg,
  ExploreSvg,
  HomeSvg,
  LikeSvg,
  MessengerSvg,
  ProfileSvg,
  SavedSvg,
  SettingSvg,
  SwitchAccountSvg,
} from 'assets/svg'
import { Picture } from 'components/Picture'
import { IconLink } from 'components/ui/IconButton'
import { useSafeAuthContext } from 'context/AuthContext'
import { media_query_xs } from 'data/mediaQuery'
import * as url from 'data/url'
import { AutoComplete } from 'feature/AutoComplete'
import useMedia from 'hooks/useMedia'
import useSignout from 'hooks/useSignout'
import { Fragment } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import AddPost from './add-post'

export default function Navbar() {
  const authUser = useSafeAuthContext()
  const handleSignout = useSignout()
  const isMatch = useMedia(media_query_xs)

  const { pathname } = useLocation()

  const isHomePageActive = pathname === url.URL_HOME
  const isMessengerPageActive = pathname === url.URL_MESSENGER
  const isExplorePageActive = pathname === url.URL_EXPLORE

  const search = isMatch && (
    <div className="inline-flex items-center">
      <AutoComplete />
    </div>
  )

  return (
    <nav className="sticky top-0 z-10 bg-white">
      <div className="mx-auto flex max-w-5xl justify-between gap-x-3 px-5 py-3">
        <Link to={url.URL_LOGIN} className="inline-flex">
          <i
            className="inline-block h-[36px] w-[105px] bg-no-repeat"
            style={{
              backgroundImage: `url(${sprite2})`,
              backgroundPosition: 'left -193px top -563px',
            }}
            aria-label="instagram"
            role="img"
          />
        </Link>
        {search}
        <ul className="flex items-center gap-x-3">
          <li>
            <IconLink to={url.URL_HOME}>
              {isHomePageActive ? <ActiveHomeSvg /> : <HomeSvg />}
            </IconLink>
          </li>
          <li>
            <IconLink to={url.URL_MESSENGER}>
              {isMessengerPageActive ? <ActiveMessengerSvg /> : <MessengerSvg />}
            </IconLink>
          </li>
          <li>
            <AddPost />
            {/* <Modal>
              <ModalOpenIconButton>
                <AddPostSvg />
              </ModalOpenIconButton>
              <ModalContent>
                <IdleState />
              </ModalContent>
            </Modal> */}
          </li>
          <li>
            <IconLink to={url.URL_EXPLORE}>
              {isExplorePageActive ? <ActiveExploreSvg /> : <ExploreSvg />}
            </IconLink>
          </li>
          <li>
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-grid h-8 w-8 place-items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-75">
                <LikeSvg />
              </Menu.Button>
              <Menu.Items className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white px-2 pt-4 pb-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  <button type="button">Activity feed show here</button>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </li>
          <li>
            <Menu as="div" className="relative z-10 inline-block text-left">
              <Menu.Button className="inline-grid h-8 w-8 place-items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-75">
                {authUser.profile ? (
                  <Picture
                    path={authUser.profile}
                    alt={authUser.username}
                    className="h-6 w-6 rounded-full border border-gray-500 object-contain"
                  />
                ) : (
                  <FaUserAlt color="#262626" fill="#262626" aria-label={authUser.username} />
                )}
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y-[1px] rounded-md bg-white px-2 pt-4 pb-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={url.get_url_profile(authUser.id)}
                          className={`inline-flex w-full items-center gap-x-4 rounded-md px-2 py-2 text-sm text-gray-900 ${
                            active ? 'bg-gray-200' : ''
                          }`}
                        >
                          <ProfileSvg width="16" height="16" />
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={url.get_url_saved(authUser.id)}
                          className={`inline-flex w-full items-center gap-x-4 rounded-md px-2 py-2 text-sm text-gray-900 ${
                            active ? 'bg-gray-200' : ''
                          }`}
                        >
                          <SavedSvg width="16" height="16" />
                          Saved
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          className={`inline-flex w-full items-center gap-x-4 rounded-md px-2 py-2 text-sm text-gray-900 ${
                            active ? 'bg-gray-200' : ''
                          }`}
                        >
                          <SettingSvg width="16" height="16" />
                          Settings
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          className={`inline-flex w-full items-center gap-x-4 rounded-md px-2 py-2 text-sm text-gray-900 ${
                            active ? 'bg-gray-200' : ''
                          }`}
                        >
                          <SwitchAccountSvg width="16" height="16" />
                          Switch Accounts
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  <div>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={handleSignout}
                          className={`block w-full rounded-md px-2 py-2 text-left text-sm text-gray-900 ${
                            active ? 'bg-gray-200' : 'bg-white'
                          }`}
                        >
                          Log Out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </li>
        </ul>
      </div>
      <hr />
    </nav>
  )
}
