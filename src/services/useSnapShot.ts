import { doc, onSnapshot } from "firebase/firestore";
import {
	firestore,
	POST_DATABASE,
	USER_DATABASE,
} from "lib/firebase/firestore";
import { useEffect, useState } from "react";

export default function useSnapShot<T>(
	database: typeof USER_DATABASE | typeof POST_DATABASE,
	docId: string
) {
	const [state, setState] = useState<T | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		return onSnapshot(
			doc(firestore, database, docId),
			document => {
				document.exists()
					? setState({ ...document.data() } as T)
					: setState(null);
			},
			err => {
				setError(err.message);
			}
		);
	}, [docId, database]);

	return [state, error];
}
