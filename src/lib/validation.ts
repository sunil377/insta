import * as yup from "yup";

const email = yup.string().email().required();
const password = yup.string().min(6).required();
const username = yup.string().required();
const fullName = yup.string().required();

export const signupValidationSchema = yup.object().shape({
	email,
	password,
	username,
	fullName,
});

export const loginValidationSchema = yup.object().shape({
	email,
	password,
});
