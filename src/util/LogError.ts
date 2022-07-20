import {
	ERROR_EMAIL_ALREADY_EXITES,
	ERROR_NETWORK_FAILED,
	ERROR_USER_NOT_FOUND,
	ERROR_WRONG_PASSWORD,
} from "../data/errors";

function LogError(type: "login" | "signup", error: any) {
	switch (type) {
		case "login":
			return getLoginPrettyError(error);

		case "signup":
			return getSignupPrettyError(error);

		default:
			throw new Error("unknown type in LogError");
	}
}

function getSignupPrettyError(error: any) {
	switch (error.code) {
		case "auth/email-already-in-use":
			return { email: ERROR_EMAIL_ALREADY_EXITES };
		case "auth/network-request-failed":
			return { email: ERROR_NETWORK_FAILED };
		default:
			return { email: error.code };
	}
}

function getLoginPrettyError(error: any) {
	switch (error.code) {
		case "auth/network-request-failed":
			return { email: ERROR_NETWORK_FAILED };
		case "auth/user-not-found":
			return { email: ERROR_USER_NOT_FOUND };
		case "auth/wrong-password":
			return { password: ERROR_WRONG_PASSWORD };
		default:
			return { email: error.code };
	}
}

export { LogError };
