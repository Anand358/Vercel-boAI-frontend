import TemplateWithoutSummary from "@/components/TemplateWithoutSummary";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGlobalStore } from "@/store";
import { useStageFive } from "@/store/stageFive";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStageFour } from "../../store/stageFour";
import Button from "../../utils/Buttons";
import ShotCard from "../../utils/ShotCard";

const Shotlist = () => {
  const { setStage } = useGlobalStore((state) => state);
  const {
    setLen,
    setPacing,
    setResolution,
    setShots,
    shots,
    setImages,
    images,
    files,
    setFiles,
  } = useStageFour((state) => state);
  const { videoBlob, resetStageFive } = useStageFive((state) => state);
  const [loading, setLoading] = useState(true);
  // const [isLoading, setIsLoading] = useState(true);
  const [display, setDisplay] = useState("");
  const navigate = useNavigate();

  const { screenplayId } = useParams();

  useEffect(() => {
    setFiles([]);
    const fetchData = async (screenplayId) => {
      console.log("fetching data");

      try {
        fetch(
          `${
            import.meta.env.VITE_BASE_URL
          }/get_reference_images/${screenplayId}`
        ).then((response) => {
          response.json().then((data) => {
            setImages(data.reference_images.map((img) => img.base64));
          });
        });
      } catch (error) {
        console.error("Error creating screenplay:", error);
      }

      try {
        console.log("Screenplay", screenplayId);
        if (!screenplayId) {
          throw new Error("Screenplay ID not found");
        }
        const shotsResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/get_screenplay/${screenplayId}`
        );
        console.log(shotsResponse);

        const { shots, resolution, length, pacing } = shotsResponse.data;
        setShots(shots);
        setResolution(resolution);
        setLen(length);
        setPacing(pacing);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData(screenplayId);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenplayId]);

  const saveScreenplay = async (screenplayId) => {
    try {
      if (!screenplayId) {
        throw new Error("Screenplay ID not found");
      }
      const saveResponse = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/workspaces/${
          import.meta.env.VITE_WORKSPACEID
        }/screenplays/${screenplayId}`
      );
      console.log(saveResponse);
      setDisplay(saveResponse.data.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const newFiles = [...files];
    console.log(newFiles, idx);
    newFiles[idx] = e.target.files![0];
    setFiles(newFiles);
    videoBlob && resetStageFive();
  };

  const handleNext = async () => {
    try {
      setStage(5);
      navigate(`/video/${screenplayId}`);
    } catch (error) {
      console.error("Error uploading shots:", error);
    }
  };

  console.log();

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <div className="flex flex-col justify-between h-[80%]">
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
                    file={files[idx]}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="flex items-center ml-8 mt-8">
            <Button
              disabled={
                loading ||
                files.length < shots.length ||
                !files.every((file) => file !== undefined)
              }
              onClickHandler={handleNext}
            />
            <button
              className="bg-green-500 text-white fomt-semibold px-5 py-3 mx-4 rounded-xl"
              onClick={saveScreenplay}
            >
              Save Shotlist
            </button>
            <p className="">{display}</p>
          </div>
        </div>
      )}
    </>
  );
};

const SavedShotlist = () => {
  return (
    <TemplateWithoutSummary>
      <Shotlist />
    </TemplateWithoutSummary>
  );
};

export default SavedShotlist;
