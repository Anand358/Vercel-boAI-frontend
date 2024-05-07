import { useGlobalStore, useStageTwo } from "../../store";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

const StageThreeCard = () => {
	const { questions, answers } = useStageTwo((state) => state);
	const { setStage } = useGlobalStore((state) => state);
	const navigate = useNavigate();

	return (
		<Card
			onClick={() => {
				setStage(2);
				navigate("/response");
			}}
		>
			<ul className="space-y-2.5">
				{questions.map((question, idx) => (
					<li key={idx} className="text-base">
						<span className="text-white">{question.title} : </span>
						<span className="text-[#878787]">
							{Object.values(answers[idx]).join(", ")}
						</span>
					</li>
				))}
			</ul>
		</Card>
	);
};

export default StageThreeCard;
