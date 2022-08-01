import { Menu } from '@headlessui/react'
import { MenuButton, MenuItem, MenuItems } from 'components/menu'
import { Picture } from 'components/Picture'
import { useSafeAuthContext } from 'context/AuthContext'
import * as url from 'data/url'
import useSignout from 'hooks/useSignout'
import { FaUserAlt } from 'react-icons/fa'
import { Link, LinkProps } from 'react-router-dom'
import { Button } from 'util/type'
import { profileIcon, savedIcon, settingIcon, switchAccountIcon } from './svg'

function Dropdown() {
  const authUser = useSafeAuthContext()
  const handleSignout = useSignout()

  return (
    <Menu>
      <MenuButton>
        {authUser.profile ? (
          <Picture
            path={authUser.profile}
            alt={authUser.username}
            className="rounded-full overflow-hidden w-8 h-8 object-contain"
          />
        ) : (
          <FaUserAlt
            color="#262626"
            fill="#262626"
            aria-label={authUser.username}
          />
        )}
      </MenuButton>
      <MenuItems>
        <div>
          <MenuItem>
            {({ active }: any) => (
              <DropdownLink
                to={url.get_url_profile(authUser.id)}
                active={active}
              >
                {profileIcon}
                Profile
              </DropdownLink>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }: any) => (
              <DropdownLink to={url.get_url_saved(authUser.id)} active={active}>
                {savedIcon}
                Saved
              </DropdownLink>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }: any) => (
              <DropdownButton active={active}>
                {settingIcon}
                Settings
              </DropdownButton>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }: any) => (
              <DropdownButton active={active}>
                {switchAccountIcon}
                Switch Accounts
              </DropdownButton>
            )}
          </MenuItem>
        </div>
        <div>
          <MenuItem>
            {({ active }: any) => (
              <DropdownButton active={active} onClick={handleSignout}>
                Log Out
              </DropdownButton>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}

const DropdownButton = ({ active, ...props }: Button & { active: boolean }) => {
  return (
    <button
      className={`text-gray-900 gap-x-4 group flex w-full items-center rounded-md px-2 py-2 text-sm ${
        active ? 'bg-gray-200' : ''
      }`}
      {...props}
    />
  )
}

const DropdownLink = ({
  active,
  ...props
}: LinkProps & { active: boolean }) => {
  return (
    <Link
      className={`text-gray-900 gap-x-4 group flex w-full items-center rounded-md px-2 py-2 text-sm ${
        active ? 'bg-gray-200' : ''
      }`}
      {...props}
    />
  )
}

export { Dropdown }
