import {
	addDoc,
	arrayRemove,
	arrayUnion,
	collection,
	doc,
	getDoc,
	limit,
	orderBy,
	Timestamp,
	updateDoc,
} from "firebase/firestore";
import { firestore, POST_DATABASE } from "../lib/firebase/firestore";
import { queryFor } from "./util";

export interface PostWithoutId {
	userid: string;
	username: string;
	mediaPath: string;
	caption?: string;
	comments?: string[];
	likes?: string[];
	createdAt?: Timestamp;
}

export interface Post extends PostWithoutId {
	id: string;
}

export function createPost({
	comments = [],
	likes = [],
	createdAt = Timestamp.fromDate(new Date()),
	...data
}: PostWithoutId) {
	return addDoc(collection(firestore, POST_DATABASE), {
		comments,
		likes,
		createdAt,
		...data,
	});
}

export async function getPost(docId: string) {
	const document = await getDoc(doc(firestore, POST_DATABASE, docId));
	return document.exists()
		? ({ ...document.data(), id: document.id } as Post)
		: Promise.reject(`document doesn't exists`);
}

export function getAllPosts() {
	return queryFor<Post>(POST_DATABASE, orderBy("createdAt", "desc"), limit(5));
}

export function updatePost(
	docId: string,
	field: "likes" | "comments",
	userId: string,
	config: "add" | "remove"
) {
	switch (config) {
		case "add":
			return updateDoc(doc(firestore, POST_DATABASE, docId), {
				[field]: arrayUnion(userId),
			});
		case "remove":
			return updateDoc(doc(firestore, POST_DATABASE, docId), {
				[field]: arrayRemove(userId),
			});
	}
}
