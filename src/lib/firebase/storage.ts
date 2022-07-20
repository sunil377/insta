import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { firebaseApp } from "./app";

const storage = getStorage(firebaseApp);
const POST_PATH = "post";
const PROFILE_PATH = "profile";

export function getMediaURL(fullPath: string) {
	return getDownloadURL(ref(storage, fullPath));
}

export function uploadPostMedia(userid: string, file: File) {
	return uploadBytes(
		ref(storage, POST_PATH + "/" + userid + "/" + file.name),
		file
	);
}

export function uploadProfile(userid: string, file: File) {
	return uploadBytes(
		ref(storage, PROFILE_PATH + "/" + userid + "/" + file.name),
		file
	);
}
