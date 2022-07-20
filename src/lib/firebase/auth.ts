import {
	createUserWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	NextOrObserver,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	User,
} from "firebase/auth";
import { firebaseApp } from "./app";
import firebaseui, { auth as firebaseUiAuth } from "firebaseui";

const auth = getAuth(firebaseApp);

export const onAuthListener = (callback: NextOrObserver<User>) =>
	onAuthStateChanged(auth, callback, err => {
		throw new Error(`something worng with onAuthStateChanged ${err}`);
	});

export const signup = (username: string, password: string) =>
	createUserWithEmailAndPassword(auth, username, password);

export const login = (username: string, password: string) =>
	signInWithEmailAndPassword(auth, username, password);

export const logout = () => signOut(auth);

/* firebase ui */

export const authUI = new firebaseUiAuth.AuthUI(auth);

export const uiConfig: firebaseui.auth.Config = {
	signInFlow: "popup",
	signInOptions: [GoogleAuthProvider.PROVIDER_ID],
};
