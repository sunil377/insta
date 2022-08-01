import { Menu, MenuButton, MenuItem, MenuItems } from 'components/menu'
import { IconLink } from 'components/ui/IconButton'
import * as url from 'data/url'
import IdleState from 'feature/AddPost/IdleState'
import { AutoComplete } from 'feature/AutoComplete'
import useMedia from 'hooks/useMedia'
import { useLocation } from 'react-router-dom'
import { Modal, ModalContent, ModalOpenIconButton } from '../modal'
import { Dropdown } from './Dropdown'
import { Logo } from './Logo'
import * as icons from './svg'

export default function Navbar() {
  const isMatch = useMedia('(min-width:768px)')
  const { pathname } = useLocation()

  const isHomePageActive = pathname === url.URL_HOME
  const isMessengerPageActive = pathname === url.URL_MESSENGER
  const isExplorePageActive = pathname === url.URL_EXPLORE

  const search = isMatch && (
    <div className="inline-flex items-center justify-center">
      <AutoComplete />
    </div>
  )

  return (
    <nav className="bg-white sticky top-0">
      <div className="flex px-5 justify-between py-3 mx-auto max-w-5xl">
        <Logo />
        {search}
        <ul className="flex gap-x-3 items-center">
          <li>
            <IconLink to={url.URL_HOME}>
              {isHomePageActive ? icons.activeHomeIcon : icons.homeIcon}
            </IconLink>
          </li>
          <li>
            <IconLink to={url.URL_MESSENGER}>
              {isMessengerPageActive
                ? icons.activeMessenderIcon
                : icons.messenderIcon}
            </IconLink>
          </li>
          <li>
            <Modal>
              <ModalOpenIconButton>{icons.addPostIcon}</ModalOpenIconButton>
              <ModalContent>
                <IdleState />
              </ModalContent>
            </Modal>
          </li>
          <li>
            <IconLink to={url.URL_EXPLORE}>
              {isExplorePageActive
                ? icons.activeExploreIcon
                : icons.exploreIcon}
            </IconLink>
          </li>
          <li>
            <Menu>
              <MenuButton>{icons.likeIcon}</MenuButton>
              <MenuItems>
                <MenuItem>
                  <button>hello</button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </li>
          <li>
            <Dropdown />
          </li>
        </ul>
      </div>
      <hr />
    </nav>
  )
}
