import { Transition } from '@headlessui/react'
import { Fragment } from 'react'

function Overlay() {
  return (
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-100"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-black bg-opacity-25" />
    </Transition.Child>
  )
}

export default Overlay