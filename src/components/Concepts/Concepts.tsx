import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/utils/Loader";
import { useAssets, useConcepts, useMedia, useVideo } from "@/store";
import { useNavigate } from "react-router-dom";

const Concepts = () => {
  const mediaToConceptsURL = `${import.meta.env.VITE_UPLOAD_URL}/workspaces/${
    import.meta.env.VITE_WORKSPACEID
  }/media2concepts`;

  const { media } = useMedia((state) => state);
  const { selected } = useAssets((state) => state);
  const [loading, setLoading] = useState(true);
  const { concepts, setConcepts } = useConcepts((state) => state);
  const { setVideoBlob } = useVideo((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if ((!media || media.length === 0) && selected.length === 0)
      navigate("/footage");

    console.log("media", media);
    console.log("selected", selected);

    let media_ids: string[] = [];
    if (media && media.length > 0) media_ids = [...media];
    else if (selected && selected.length > 0) media_ids = [...selected];

    console.log("media_ids", media_ids);

    const uploadMedia = async () => {
      setLoading(true);
      const requestBody = {
        video_profile: {
          platform: "Instagram",
          length: "15 - 60 seconds",
          purpose: "Promotional",
          audience: "General",
        },
        media_ids,
      };

      try {
        const response = await axios.post(mediaToConceptsURL, requestBody);
        setConcepts(response.data);
        setLoading(false);
        console.log("Media to Concepts API called:", response.data);
      } catch (error) {
        setLoading(false);
        console.error("Error posting to media2concepts:", error);
      }
    };

    if (!concepts || concepts.length === 0) {
      uploadMedia();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const conceptClick = async (lineupId: string) => {
    console.log("lineupID", lineupId);
    console.log("click");
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_UPLOAD_URL}/lineup/${lineupId}/export_video`,
        {
          headers: { Accept: "video/mp4;charset=UTF-8" },
          responseType: "blob",
        }
      );
      setVideoBlob(response.data);
      setLoading(false);
      navigate("/video-footage");
    } catch (error) {
      setLoading(false);
      console.error("Error posting to media2concepts:", error);
    }
  };

  return (
    <div className="grid place-items-center place-content-center bg-[#111111] h-screen text-white">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="pl-8">
            <h1 className="text-white text-2xl">Select a Concept</h1>
          </div>
          <div className="flex justify-evenly items-center gap-5 pt-6 px-8">
            {concepts?.map((concept, idx) => {
              return (
                <article
                  className="max-w-sm h-auto bg-gradient-to-br from-red-400 to-blue-400 p-6 rounded-lg text-white cursor-pointer hover:border-1 hover:border-white hover:shadow-[0_0_6px_white]"
                  onClick={() => conceptClick(concept.lineup_id as string)}
                >
                  <p className="text-3xl font-bold">{idx + 1}</p>
                  <ul className="text-left">
                    <span className="font-semibold">
                      {String(concept.concept)}
                    </span>{" "}
                  </ul>
                </article>
              );
            })}
          </div>
          {/* <div className="flex justify-start items-center gap-3 pl-8 pt-7">
            <Link to="/video-footage">
              <button className="bg-gradient-to-r from-orange-600 to-orange-400 p-4 rounded-xl font-medium text-4xl flex items-center justify-center">
                next
              </button>
            </Link>
          </div> */}
        </>
      )}
    </div>
  );
};

export default Concepts;
