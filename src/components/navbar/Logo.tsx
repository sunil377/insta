import { Link } from "react-router-dom";
import { URL_LOGIN } from "../../data/url";
import sprite2 from "../../assets/images/sprite2.png";

export default function Logo() {
	return (
		<Link to={URL_LOGIN}>
			<i
				className="h-[36px] w-[105px] inline-block bg-no-repeat"
				style={{
					backgroundImage: `url(${sprite2})`,
					backgroundPosition: "left -193px top -563px",
				}}
				aria-label="instagram"
				role="img"
			></i>
		</Link>
	);
}
