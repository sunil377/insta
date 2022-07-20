import { getDocs, query, collection } from "firebase/firestore";
import { firestore } from "lib/firebase/firestore";

export async function queryFor<T>(database: string, ...rest: any) {
	const documents = await getDocs(
		query(collection(firestore, database), ...rest)
	);
	let result: T[] = [];
	documents.forEach(document => {
		result = document.exists()
			? ([...result, { ...document.data(), id: document.id }] as T[])
			: result;
	});
	return result;
}
