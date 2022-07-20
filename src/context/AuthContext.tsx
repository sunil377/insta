import { Spinner } from "components/ui";
import { useAsync } from "hooks/useAsync";
import { onAuthListener } from "lib/firebase/auth";
import { createContext, useContext, useEffect } from "react";
import { getUser, User as AuthorType } from "services/user";

const AuthContext = createContext<AuthorType | null>(null);

function useAuthContext() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error(`context is used outside of AuthContext Provider`);
	}
	return context;
}

function AuthProvider({ ...props }) {
	const { data, run, isLoading, isSuccess, isError, error, isIdle, setData } =
		useAsync<AuthorType>();

	useEffect(() => {
		return onAuthListener(user => {
			user ? run(getUser(user.uid)) : setData(null);
		});
	}, [run, setData]);

	switch (true) {
		case isIdle:
		case isLoading:
			return <Spinner fullScreen={true} />;
		case isError:
			return <h1>something wrong {error?.toString()}</h1>;

		case isSuccess:
			return <AuthContext.Provider value={data} {...props} />;

		default:
			throw new Error("unkown error");
	}
}

export { useAuthContext, AuthProvider };
