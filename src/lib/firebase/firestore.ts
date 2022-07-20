import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "./app";

export const firestore = getFirestore(firebaseApp);
export const USER_DATABASE = "user";
export const POST_DATABASE = "post";
