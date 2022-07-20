import SubmitButton from "components/SubmitButton";
import { FormError, TextField } from "components/ui";
import { Formik } from "formik";
import { signup } from "lib/firebase/auth";
import { signupValidationSchema } from "lib/validation";
import { useNavigate } from "react-router-dom";
import { createUser } from "services/user";
import { LogError } from "util/LogError";

const initialValues = {
	email: "",
	username: "",
	password: "",
	fullName: "",
};

export default function Form() {
	const navigate = useNavigate();
	return (
		<Formik
			initialValues={initialValues}
			validateOnMount={true}
			validationSchema={signupValidationSchema}
			onSubmit={async (
				{ email, password, fullName, username },
				{ setSubmitting, setErrors }
			) => {
				setSubmitting(true);
				try {
					const {
						user: { uid },
					} = await signup(email, password);
					navigate("/");
					await createUser(uid, {
						email,
						fullName,
						username,
					});
				} catch (error) {
					setErrors({ ...LogError("signup", error) });
					setSubmitting(false);
				}
			}}
		>
			{({ isSubmitting, submitCount, errors, handleSubmit }) => (
				<section className="py-4">
					<form
						className="flex flex-col gap-y-2 mx-auto px-2"
						onSubmit={handleSubmit}
					>
						<TextField
							type="email"
							label="email"
							name="email"
							autoComplete="email"
							aria-required={true}
						/>
						<TextField
							label="fullName"
							name="fullName"
							autoComplete="fullName"
							aria-required={true}
						/>
						<TextField
							label="username"
							name="username"
							autoComplete="username"
							aria-required={true}
						/>
						<TextField
							type="password"
							name="password"
							label="password"
							autoComplete="new-password"
							aria-required={true}
						/>
						<SubmitButton
							isSubmitting={isSubmitting}
							buttonText="Sign Up"
							hasError={Object.keys(errors).length > 0}
						/>
					</form>
					<FormError submitCount={submitCount} errors={errors} />
				</section>
			)}
		</Formik>
	);
}
