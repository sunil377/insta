import { Combobox, Transition } from "@headlessui/react";
import { get_url_profile } from "data/url";
import { Fragment } from "react";
import { FaCheck, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { User } from "services/user";
import { useCombo } from "./useCombo";

export function AutoComplete() {
	const { selected, query, setSelected, setQuery, options } = useCombo();

	return (
		<Combobox value={selected} onChange={setSelected}>
			<div className="relative mt-1">
				<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
					<Combobox.Input
						className="w-full border-none min-w-[260px] py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 focus:outline-none bg-gray-200/80"
						placeholder="Search"
						displayValue={(person: null | User) =>
							person ? person.username : query
						}
						onChange={event => setQuery(event.target.value)}
					/>
					<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
						<FaSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
					</Combobox.Button>
				</div>
				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
					afterLeave={() => {
						setQuery("");
					}}
				>
					<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm z-10">
						{options.length === 0 && query !== "" ? (
							<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
								Nothing found.
							</div>
						) : (
							options.map(user => (
								<Combobox.Option
									key={user.id}
									as={Link}
									to={get_url_profile(user.id)}
									className={({ active }) =>
										`relative block cursor-pointer select-none py-2 pl-10 pr-4 ${
											active ? "bg-teal-600 text-white" : "text-gray-900"
										}`
									}
									value={user}
									onClick={() => console.log({ user })}
								>
									{({ selected, active }) => (
										<>
											<span
												className={`block truncate ${
													selected ? "font-medium" : "font-normal"
												}`}
											>
												{user.username}
											</span>
											{selected ? (
												<span
													className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
														active ? "text-white" : "text-teal-600"
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
			</div>
		</Combobox>
	);
}
