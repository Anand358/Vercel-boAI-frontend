import { useEffect } from "react";
import { useStageFive } from "./stageFive";
import { useStageFour } from "./stageFour";
import { useStageOne } from "./stageOne";
import { useStageThree } from "./stageThree";
import { useStageTwo } from "./stageTwo";

export const ResetStates = () => {
  const { resetStageOne } = useStageOne();
  const { resetStageTwo } = useStageTwo();
  const { resetStageThree } = useStageThree();
  const { resetStageFour } = useStageFour();
  const { resetStageFive } = useStageFive();

  useEffect(() => {
    localStorage.removeItem("ideaToFootage");
    localStorage.removeItem("conversationId");
    localStorage.removeItem("screenplayId");

    resetStageOne();
    resetStageTwo();
    resetStageThree();
    resetStageFour();
    resetStageFive();
  }, []);
};
