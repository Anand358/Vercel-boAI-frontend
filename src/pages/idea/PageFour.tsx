import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	useGlobalStore,
	useStageOne,
	useStageThree,
	useStageTwo,
} from "@/store";
import { useStageFour } from "../../store/stageFour";
import { useStageFive } from "@/store/stageFive";
import Button from "../../utils/Buttons";
import ShotCard from "../../utils/ShotCard";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Template from "../../components/TemplateWithSummary";
import axios from "axios";

const PageFour = () => {
	const { stage, setStage, screenplayId, setConversationId, setScreenplayId } =
		useGlobalStore((state) => state);
	const { setLength, setIndustry, setPlatform } = useStageOne((state) => state);
	const { setQuestions, setAnswers } = useStageTwo((state) => state);
	const { setBriefs, setSelected } = useStageThree((state) => state);
	const {
		setLen,
		setPacing,
		setResolution,
		setShots,
		shots,
		files,
		setFiles,
		images,
		setImages,
	} = useStageFour((state) => state);
	const { videoBlob, resetStageFive } = useStageFive((state) => state);
	const [loading, setLoading] = useState(true);
	const [display, setDisplay] = useState("");
	const navigate = useNavigate();

	const fetchData = async () => {
		setLoading(true);
		try {
			if (!screenplayId) {
				throw new Error("Screenplay ID not found");
			}
			console.log(screenplayId);
			const response = await axios.get(
				`${import.meta.env.VITE_BASE_URL}/get_screenplay/${screenplayId}`,
			);
			const { shots, resolution, length, pacing } = response.data;
			setShots(shots);
			setResolution(resolution);
			setLen(length);
			setPacing(pacing);
			localStorage.setItem(
				"ideaToFootage",
				JSON.stringify({
					...JSON.parse(localStorage.getItem("ideaToFootage") as string),
					stageFour: {
						...JSON.parse(localStorage.getItem("ideaToFootage") as string)
							.stageFour,
						shots,
						resolution,
						length,
						pacing,
					},
				}),
			);
		} catch (error) {
			console.error("Error fetching screenplay:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const unloadCallback = (event) => {
			event.preventDefault();
			event.returnValue = "something";
			return "";
		};

		window.addEventListener("beforeunload", unloadCallback);
		return () => window.removeEventListener("beforeunload", unloadCallback);
	}, []);

  useEffect(() => {
    setLoading(true);
    if (!stage) setStage(4);
    if (localStorage.getItem("conversationId")) {
      setConversationId(localStorage.getItem("conversationId") as string);
    }
    if (localStorage.getItem("screenplayId")) {
      setScreenplayId(localStorage.getItem("screenplayId") as string);
    }
    if (localStorage.getItem("ideaToFootage")) {
      const stageOne = JSON.parse(
        localStorage.getItem("ideaToFootage") as string
      ).stageOne;
      const stageTwo = JSON.parse(
        localStorage.getItem("ideaToFootage") as string
      ).stageTwo;
      const stageThree = JSON.parse(
        localStorage.getItem("ideaToFootage") as string
      ).stageThree;
      const stageFour = JSON.parse(
        localStorage.getItem("ideaToFootage") as string
      ).stageFour;
      if (stageOne && Object.keys(stageOne).length > 0) {
        const { industry, platform, length } = stageOne;
        setIndustry(industry);
        setPlatform(platform);
        setLength(length);
      }
      if (stageTwo && Object.keys(stageTwo).length > 0) {
        const { questions, answers } = stageTwo;
        setQuestions(questions);
        setAnswers(answers);
      }
      if (stageThree && Object.keys(stageThree).length > 0) {
        const { briefs, selected } = stageThree;
        setBriefs(briefs);
        setSelected(selected);
      }
      if (stageFour && Object.keys(stageFour).length > 0) {
        const { shots, resolution, length, pacing } = stageFour;
        setShots(shots);
        setResolution(resolution);
        setLen(length);
        setPacing(pacing);
      } else if (shots.length === 0) {
        fetchData();
      }
    } else {
      navigate("/idea");
    }

    fetch(
      `${import.meta.env.VITE_BASE_URL}/generate_reference_images/${
        screenplayId || localStorage.getItem("screenplayId")
      }`
    ).then((response) => {
      response.json().then((data) => {
        setImages(data.reference_images.map((img) => img.base64));
      });
    });

    setLoading(false);
  }, []);

	const handleInputChange = (e, idx) => {
		const newFiles = [...files];
		newFiles[idx] = e.target.files[0];
		setFiles(newFiles);
		videoBlob && resetStageFive();
	};

	const handleNext = async () => {
		try {
			setStage(5);
			navigate("/video");
		} catch (error) {
			console.error("Error uploading shots:", error);
		}
	};

	const saveScreenplay = async () => {
		setLoading(true);
		try {
			if (!screenplayId) {
				throw new Error("Screenplay ID not found");
			}
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/workspaces/${
					import.meta.env.VITE_WORKSPACEID
				}/screenplays/${screenplayId}`,
			);
			setDisplay(response.data.message);
		} catch (error) {
			console.error("Error saving screenplay:", error);
		} finally {
			setLoading(false);
		}
	};

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col justify-between h-[95%]">
          <h1 className="mx-20 mt-10 text-3xl">Shotlist</h1>
          <Carousel className="flex mx-16 my-10 w-[88%] h-full">
            <CarouselContent className="-ml-1 h-full">
              {shots?.map((shot, idx) => (
                <CarouselItem
                  key={idx}
                  className="pl-1 md:basis-1/2 lg:basis-1/5 h-full"
                >
                  <ShotCard
                    shot={shot}
                    handleFileInputChange={handleInputChange}
                    idx={idx}
                    src={
                      images && images.length > 0
                        ? `data:image/jpeg;base64,${images[idx]}`
                        : null
                    }
                    file={files && files[idx]}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="flex items-center ml-8">
            <Button
              onClickHandler={handleNext}
              disabled={
                loading ||
                !files ||
                !shots ||
                files.length !== shots.length ||
                (files && shots && files.length < shots.length) ||
                (files && !files.every((file) => file !== undefined))
              }
            />
            <button
              className="bg-green-500 text-white font-semibold px-5 py-3 mx-4 rounded-xl"
              onClick={saveScreenplay}
            >
              Save Shotlist
            </button>
            <button
              className="bg-blue-500 text-white font-semibold px-5 py-3 rounded-xl"
              onClick={() => navigate("/options")}
            >
              Regenerate Shotlist
            </button>
            <p>{display}</p>
          </div>
        </div>
      )}
    </>
  );
};

const PageFourWithTemplate = () => (
	<Template>
		<PageFour />
	</Template>
);

export default PageFourWithTemplate;
