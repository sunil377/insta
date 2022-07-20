import { Route, Routes } from "react-router-dom";
import { URL_SIGNUP } from "../data/url";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import Signup from "../pages/Signup";

export default function UnAuthenticated(props: UnAuthenticatedProps) {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path={URL_SIGNUP} element={<Signup />} />
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
}

interface UnAuthenticatedProps {}
