import { Combobox, Transition } from '@headlessui/react'
import { get_url_profile } from 'data/url'
import { useFocus } from 'hooks/useFocus'
import { Fragment } from 'react'
import { FaCheck, FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { User } from 'services/user'
import { useCombo } from './useCombo'

export function AutoComplete() {
  const { selected, query, setSelected, setQuery, options } = useCombo()
  const { focusRef, isFocus } = useFocus()

  return (
    <Combobox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full min-w-[200px] border-none bg-gray-200/80 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-0"
              placeholder="Search"
              ref={focusRef}
              displayValue={(person: null | User) => (person ? person.username : query)}
              onChange={event => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <FaSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>
          </div>
          {
            <Transition
              as={Fragment}
              show={isFocus}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => {
                setQuery('')
              }}
            >
              <Combobox.Options
                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                static
              >
                {options.length === 0 ? (
                  <div className="relative h-56 cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  options.map(user => (
                    <Combobox.Option
                      key={user.id}
                      as={Link}
                      to={get_url_profile(user.id)}
                      className={({ active }) =>
                        `relative block cursor-pointer select-none py-2 pl-10 pr-4 text-gray-900 ${
                          active ? 'bg-gray-200' : ''
                        }`
                      }
                      value={user}
                      onClick={() => console.log({ user })}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                          >
                            {user.username}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? 'text-white' : 'text-teal-600'
                              }`}
                            >
                              <FaCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          }
        </div>
      )}
    </Combobox>
  )
}
