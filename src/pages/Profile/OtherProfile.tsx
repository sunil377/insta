import { Spinner } from "components/ui";
import { useAsync } from "hooks/useAsync";
import { useEffect } from "react";
import { getUser, User } from "services/user";
import MyProfile from "./MyProfile";

export default function OtherProfile({ id }: { id: string }) {
	const { run, data, isLoading, isSuccess, isError, isIdle } = useAsync<User>();

	useEffect(() => {
		run(getUser(id));
	}, [run, id]);

	switch (true) {
		case isIdle:
		case isLoading:
			return <Spinner fullScreen={true} />;
		case isError:
			return (
				<div className="text-center">
					<h1 className="text-2xl font-semibold py-5">
						Sorry, this page isn't available.
					</h1>
					<p>
						The link you followed may be broken, or the page may have been
						removed. Go back to Instagram.
					</p>
				</div>
			);
		case isSuccess:
			return data && <MyProfile {...data} />;
		default:
			throw new Error("impossiable");
	}
}
