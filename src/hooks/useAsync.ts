import { useCallback, useState } from "react";

type statusType = "idle" | "pending" | "resolved" | "rejected";
interface State<T> {
	data: T | null;
	error: null | string;
	status: statusType;
}

export function useAsync<T>(
	initialState: State<T> = {
		data: null,
		error: null,
		status: "idle",
	}
) {
	const [state, setState] = useState<State<T>>(initialState);

	const setData = useCallback(
		(arg: T | null) =>
			setState({
				data: arg,
				error: null,
				status: "resolved",
			}),
		[]
	);

	const run = useCallback((promise: Promise<any>) => {
		if (!promise || !promise.then) {
			throw new Error(
				"invalid promise provided in run function in useAsync hook"
			);
		}

		setState({
			data: null,
			error: null,
			status: "pending",
		});

		promise
			.then(data => {
				setState({
					data,
					error: null,
					status: "resolved",
				});
			})
			.catch(error => {
				setState({
					data: null,
					error,
					status: "rejected",
				});
			});
	}, []);

	const { data, error, status } = state;

	return {
		run,
		data,
		error,
		isIdle: status === "idle",
		isError: status === "rejected",
		isLoading: status === "pending",
		isSuccess: status === "resolved",
		setData,
	};
}
