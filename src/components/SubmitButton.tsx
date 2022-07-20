import { Button, Spinner } from "./ui";

export default function SubmitButton({
	buttonText,
	isSubmitting,
	hasError,
}: SubmitButtonProps) {
	return (
		<Button type="submit" disabled={hasError || isSubmitting}>
			{isSubmitting ? <Spinner size="1.25rem" className="ml-2" /> : buttonText}
		</Button>
	);
}

interface SubmitButtonProps {
	buttonText: string;
	isSubmitting: boolean;
	hasError: boolean;
}
