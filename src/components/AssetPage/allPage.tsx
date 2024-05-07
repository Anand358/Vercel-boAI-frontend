import axios from "axios";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const AllPageComponent = () => {
  const getAssetURL = `${import.meta.env.VITE_UPLOAD_URL}/workspaces/${
    import.meta.env.VITE_WORKSPACEID
  }/media`;

  const [videos, setVideos] = useState({});

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get(getAssetURL);
        if (response.data && response.data.videos) {
          setVideos(response.data.videos);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
        console.log("Assets response:", response);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
  }, []);

  console.log("Videos state:", videos); // Debug: log the videos state

  return (
    <div className="p-4 mx-auto">
      <div className="grid grid-cols-4 gap-x-7 gap-y-10 pb-10">
        {Object.entries(videos).map(([key, video]) => {
          console.log("Video:", video);

          return (
            <div
              key={key}
              className={`h-[380px] w-full p-2 rounded-lg cursor-pointer space-x-1 my-2`}
            >
              <ReactPlayer
                url={`${import.meta.env.VITE_UPLOAD_URL}${video.url}`}
                light={`${import.meta.env.VITE_UPLOAD_URL}${
                  video.url
                }/thumbnail`}
                // style={{ width: "100%" }}
                width="100%"
                controls
                playing={true}
              />
              <p className="text-white mt-2">
                {video.filename} ({video.resolution})
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllPageComponent;
