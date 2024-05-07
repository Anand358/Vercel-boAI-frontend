import { useGlobalStore, useStageThree } from "../../store";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

const StageFourCard = () => {
  const { selected } = useStageThree((state) => state);
  const { setStage } = useGlobalStore((state) => state);

  const navigate = useNavigate();

  return (
    <Card
      onClick={() => {
        setStage(3);
        navigate("/options");
      }}
    >
      <p className="text-base">{selected.briefText}</p>
    </Card>
  );
};

export default StageFourCard;
