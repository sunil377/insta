import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { URL_HOME } from "data/url";
import { logout } from "lib/firebase/auth";

export default function useSignout() {
	const navigate = useNavigate();

	return useCallback(
		() =>
			logout()
				.then(() => navigate(URL_HOME))
				.catch(console.log),
		[navigate]
	);
}
