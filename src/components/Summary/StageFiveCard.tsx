import { useGlobalStore, useStageFour } from "../../store";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

const StageFiveCard = () => {
	const { files } = useStageFour((state) => state);
	const { setStage } = useGlobalStore((state) => state);

	const navigate = useNavigate();

	return (
		<Card
			onClick={() => {
				setStage(4);
				navigate("/shotlist");
			}}
		>
			<ul className="space-y-2.5">
				{files.map((file, index) => (
					<li key={index} className="text-base">
						<span className="text-white">File {index + 1} : </span>
						<span className="text-[#878787]">{file.name}</span>
					</li>
				))}
			</ul>
		</Card>
	);
};

export default StageFiveCard;
