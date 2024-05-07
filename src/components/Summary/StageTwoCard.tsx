import { useGlobalStore, useStageOne } from "../../store";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

const StageTwoCard = () => {
	const { length, industry, platform } = useStageOne((state) => state);
	const { setStage } = useGlobalStore((state) => state);

	const navigate = useNavigate();

	return (
		<Card
			onClick={() => {
				setStage(1);
				navigate("/idea");
			}}
		>
			<ul className="space-y-2.5">
				<li className="text-base">
					<span className="text-white">Industry : </span>
					<span className="text-[#878787]">{industry}</span>
				</li>
				<li className="text-base">
					<span className="text-white">Platform : </span>
					<span className="text-[#878787]">{platform}</span>
				</li>
				<li className="text-base">
					<span className="text-white">Length : </span>
					<span className="text-[#878787]">{length} Seconds</span>
				</li>
			</ul>
		</Card>
	);
};

export default StageTwoCard;
