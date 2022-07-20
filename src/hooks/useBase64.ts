import { useCallback, useEffect, useState } from "react";

export function useBase64(file: File) {
	const [state, setState] = useState<{
		base64: string | ArrayBuffer | null;
		error: null | string;
		status: "idle" | "pending" | "resolved" | "rejected";
	}>({
		base64: null,
		error: null,
		status: "idle",
	});

	const handleLoadListener = useCallback(
		({ target }: ProgressEvent<FileReader>) => {
			const result = target?.result;
			result &&
				setState({
					base64: result,
					error: null,
					status: "resolved",
				});
		},
		[]
	);

	const handleErrorListener = useCallback((ev: ProgressEvent<FileReader>) => {
		console.log({
			"error in fileReader": ev,
		});
	}, []);

	useEffect(() => {
		const fileReader = new FileReader();
		fileReader.addEventListener("load", handleLoadListener);
		fileReader.addEventListener("error", handleErrorListener);
		fileReader.readAsDataURL(file);

		return function cleanup() {
			fileReader.removeEventListener("load", handleLoadListener);
			fileReader.removeEventListener("error", handleErrorListener);
		};
	}, [handleLoadListener, handleErrorListener, file]);

	const { base64, status, error } = state;

	return {
		base64,
		isIdle: status === "idle",
		isLoading: status === "pending",
		isSuccess: status === "resolved",
		isError: status === "rejected",
		error,
	};
}
