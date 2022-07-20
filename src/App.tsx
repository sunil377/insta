import Authenticated from "container/Authenticated";
import UnAuthenticated from "container/UnAuthenticated";
import { useAuthContext } from "./context/AuthContext";

function App() {
	const context = useAuthContext();
	return context?.id ? <Authenticated /> : <UnAuthenticated />;
}

export default App;
