import { FeedMenuSVG } from "assets/svg/svg";
import {
	Modal,
	ModalOpenButton,
	ModalContent,
	ModalDissmissButton,
} from "components/modal";

export default function FeedOptions() {
	return (
		<Modal>
			<ModalOpenButton>
				<FeedMenuSVG
					aria-label="More options"
					color="#262626"
					fill="#262626"
					width="24"
					height="24"
				/>
			</ModalOpenButton>
			<ModalContent className="bg-white max-w-[16rem] w-full rounded-2xl transform overflow-hidden shadow-xl transition-all">
				<ul className="flex flex-col ">
					<li>
						<button className="text-sm py-3.5 capitalize w-full text-red-500">
							<strong>Report</strong>
						</button>
					</li>
					<li>
						<button className="border-t border-gray-300 text-sm py-3.5 capitalize w-full text-red-500">
							<strong>unfollow</strong>
						</button>
					</li>
					<li>
						<button className="border-t border-gray-300 text-sm py-3.5 capitalize w-full">
							go to post
						</button>
					</li>
					<li>
						<button className="border-t border-gray-300 text-sm py-3.5 capitalize w-full">
							share to...
						</button>
					</li>
					<li>
						<button className="border-t border-gray-300 text-sm py-3.5 capitalize w-full">
							copy link
						</button>
					</li>
					<li>
						<button className="border-t border-gray-300 text-sm py-3.5 capitalize w-full">
							embed
						</button>
					</li>
					<li>
						<ModalDissmissButton className="border-t border-gray-300 text-sm py-3.5 capitalize w-full">
							cancel
						</ModalDissmissButton>
					</li>
				</ul>
			</ModalContent>
		</Modal>
	);
}
