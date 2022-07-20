import { useEffect, useState } from "react";
import { getAllUserByUsername, User } from "services/user";

export function useCombo() {
	const [selected, setSelected] = useState("");
	const [query, setQuery] = useState("");
	const [options, setOptions] = useState<User[]>([]);

	useEffect(() => {
		if (!query) return;
		getAllUserByUsername(query).then(res => setOptions(res));
	}, [query]);

	return {
		selected,
		setSelected,
		query,
		setQuery,
		options,
	};
}
