import { Link } from "react-router-dom";
import { FormDivider } from "components/ui";
import AppStore from "components/AppStore";
import { URL_LOGIN } from "data/url";
import GoogleProvider from "feature/GoogleProvider";
import Form from "./Form";
import instaImage from "assets/images/instagram.png";

export default function Signup(props: SignupProps) {
	return (
		<div
			className="grid min-h-screen max-w-[22rem] mx-auto bg-gray-50 text-sm"
			{...props}
		>
			<main className="bg-gray-50 xs:pt-10">
				<section className="border-0 xs:border border-gray-300 bg-white px-8 pt-10 pb-6">
					<img src={instaImage} alt="instagram" className="mx-auto" />;
					<h2 className="font-medium text-gray-500/90 text-center text-lg px-1.5 mt-2 leading-5">
						Sign up to see photos and videos from your friends.
					</h2>
					<div className="text-center">
						<GoogleProvider />
					</div>
					<FormDivider />
					<Form />
				</section>
				<section className="border-0 xs:border border-gray-300 text-center bg-white px-8 py-2 mt-4 xs:py-4">
					Have an account?{" "}
					<Link to={URL_LOGIN} className="text-blue-500 font-semibold">
						Log in
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

interface SignupProps {}
