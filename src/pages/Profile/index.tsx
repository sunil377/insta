import { useAuthContext } from "context/AuthContext";
import { useParams } from "react-router-dom";
import MyProfile from "./MyProfile";
import OtherProfile from "./OtherProfile";

export default function Profile() {
	const user = useAuthContext();
	const { id } = useParams<{ id: string }>();
	if (!user || !id) return null;

	return (
		<main className="max-w-5xl mx-auto">
			{id === user.id ? <MyProfile {...user} /> : <OtherProfile id={id} />}
		</main>
	);
}
