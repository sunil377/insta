import { Menu as MenuComponent, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Button } from 'util/type'

function Menu({ ...props }) {
  return (
    <MenuComponent
      as="div"
      {...props}
      className={`relative inline-block text-left ${props.className || ''}`}
    />
  )
}

function MenuItem({ ...props }) {
  return <MenuComponent.Item {...props} />
}

function MenuButton({ className = '', ...props }: Button) {
  return (
    <MenuComponent.Button
      className={`rounded-full inline-grid place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-75 w-8 h-8 ${className}`}
      {...props}
    />
  )
}

function MenuItems({ ...props }) {
  return (
    <MenuTransition>
      <MenuComponent.Items
        {...props}
        className={`absolute z-10 right-0 mt-2 w-56 pt-4 pb-2 px-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
          props.className || ''
        }`}
      />
    </MenuTransition>
  )
}

function MenuTransition({ ...props }) {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
      {...props}
    />
  )
}

export { Menu, MenuButton, MenuItems, MenuItem }
