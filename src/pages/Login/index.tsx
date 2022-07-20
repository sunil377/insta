import "firebaseui/dist/firebaseui.css";
import { Link } from "react-router-dom";
import { FormDivider } from "components/ui";

import AppStore from "components/AppStore";
import { URL_FORGOT_PASSWORD, URL_SIGNUP } from "data/url";
import GoogleProvider from "feature/GoogleProvider";
import { Form } from "./Form";
import Slider from "./Slider";
import instaImage from "assets/images/instagram.png";

export default function Login({ ...props }) {
	return (
		<div
			className="grid min-h-screen max-w-3xl mx-auto bg-gray-50 lg:gap-x-2 lg:grid-cols-2 text-sm"
			{...props}
		>
			<Slider />
			<main className="bg-gray-50 xs:pt-10 max-w-sm mx-auto">
				<section className="border-0 xs:border border-gray-300 bg-white px-8 pt-10 pb-6">
					<img src={instaImage} alt="instagram" className="mx-auto py-4" />
					<Form className="py-4" />
					<FormDivider />
					<div className="py-2 text-center">
						<GoogleProvider />
					</div>
					<div className="text-center">
						<a
							href={URL_FORGOT_PASSWORD}
							className={`text-primary-blue text-xs inline-block`}
						>
							Forgot password?
						</a>
					</div>
				</section>
				<section className="border-0 xs:border border-gray-300 text-center bg-white px-8 py-2 mt-4 xs:py-4">
					Don't have an account?{" "}
					<Link to={URL_SIGNUP} className="text-blue-500 font-semibold">
						Sign up
					</Link>
				</section>
				<section className="border-0 text-center bg-white px-8 py-4">
					<p className="mb-4">Get the app.</p>
					<AppStore />
				</section>
			</main>
		</div>
	);
}
