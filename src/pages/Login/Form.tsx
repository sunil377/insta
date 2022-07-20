import { Formik, FormikHelpers } from "formik";
import SubmitButton from "components/SubmitButton";

import { LogError } from "util/LogError";
import { loginValidationSchema } from "lib/validation";
import { FormError, TextField } from "components/ui";
import { login } from "lib/firebase/auth";

const initialValues = {
	email: "",
	password: "",
};

function handleSubmit(
	values: typeof initialValues,
	helpers: FormikHelpers<typeof initialValues>
) {
	const { setSubmitting, setErrors } = helpers;
	setSubmitting(true);
	login(values.email, values.password)
		.then(console.log)
		.catch(error => {
			const msg = LogError("login", error);
			setErrors({ ...msg });
			setSubmitting(false);
		});
}

export function Form({ ...props }) {
	return (
		<Formik
			initialValues={initialValues}
			validateOnMount={true}
			validationSchema={loginValidationSchema}
			onSubmit={handleSubmit}
		>
			{({ isSubmitting, errors, submitCount, handleSubmit }) => (
				<section {...props}>
					<form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
						<TextField
							type="email"
							name="email"
							label="Mobile Number or Email"
							aria-required={true}
							autoComplete="email"
						/>
						<TextField
							type="password"
							name="password"
							label="password"
							aria-required={true}
							autoComplete="current-password"
						/>
						<SubmitButton
							hasError={Object.keys(errors).length > 0}
							isSubmitting={isSubmitting}
							buttonText="Log In"
						/>
					</form>
					<FormError submitCount={submitCount} errors={errors} />
				</section>
			)}
		</Formik>
	);
}
