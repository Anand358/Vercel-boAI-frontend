import StageTwoCard from "./StageTwoCard";
import StageOneCard from "./StageOneCard";
import StageThreeCard from "./StageThreeCard";
import { useGlobalStore } from "../../store";
import StageFourCard from "./StageFourCard";
import StageFiveCard from "./StageFiveCard";

const Summary = () => {
  const { stage } = useGlobalStore((state) => state);
  return (
    <div className={`h-full ${stage === 1 && "justify-center"} flex flex-col items-center overflow-y-scroll no-scrollbar py-2`}>
      {stage === 1 && <StageOneCard />}
      {stage >= 4 && <StageFourCard />}
      {stage >= 2 && <StageTwoCard />}
      {stage >= 3 && <StageThreeCard />}
      {stage >= 5 && <StageFiveCard />}
    </div>
  );
};

export default Summary;
