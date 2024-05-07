import Library from "@/components/AssetPage/Library";
import { useAssets, useConcepts, useMedia, useVideo } from "@/store";
import Loader from "@/utils/Loader";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import render from "./render.png";

const Footage = () => {
  const getAssetURL = `${import.meta.env.VITE_UPLOAD_URL}/workspaces/${
    import.meta.env.VITE_WORKSPACEID
  }/media`;

  const { media, setMedia } = useMedia((state) => state);
  const { setVideoBlob } = useVideo((state) => state);
  const { selected, assets, setSelected, setAssets } = useAssets(
    (state) => state
  );
  const { resetConcepts } = useConcepts((state) => state);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [showOrDivider, setShowOrDivider] = useState(true); // State to manage the OR divider visibility
  const navigate = useNavigate();

  useEffect(() => {
    if (!assets) {
      axios
        .get(getAssetURL)
        .then((res) => {
          setAssets(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const allAssetIds = useMemo(
    () => (assets ? Object.keys(assets.videos) : []),
    [assets]
  );
  useEffect(() => {
    async function fetchWorkspace() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_UPLOAD_URL}/workspaces/${
            import.meta.env.VITE_WORKSPACEID
          }`
        );
        console.log("Workspace response:", response);
      } catch (error) {
        console.error("Error fetching workspace:", error);
      }
    }

    fetchWorkspace();
  }, []);

  const handleFilesChange = (event) => {
    setSelected([]);
    setFiles([...event.target.files]);
    setUserInteracted(true);
    setShowOrDivider(false); // Hide OR divider on file upload
  };

  useEffect(() => {
    async function uploadAssets() {
      if (files.length > 0) {
        setLoading(true);
        resetConcepts();
        const formData = new FormData();
        files.forEach((file) => formData.append("media_files", file));

        try {
          const response = await axios.post(
            `${import.meta.env.VITE_UPLOAD_URL}/workspaces/${
              import.meta.env.VITE_WORKSPACEID
            }/media`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          setLoading(false);
          console.log("File upload success:", response.data);
          const mediaIds = response.data.videos
            .map((video) => video._id)
            .concat(response.data.images.map((image) => image._id));
          setMedia(mediaIds);
          setUserInteracted(true);
          setShowOrDivider(false); // Hide OR divider on file upload success
        } catch (error) {
          setLoading(false);
          console.error("File upload error:", error);
        }
      }
    }

    uploadAssets();
  }, [files, resetConcepts, setMedia]);

  const toggleModal = () => {
    setShowModal(!showModal);
    setShowOrDivider(showModal); // Only show the OR divider when the modal is closed
  };

  const handleModalNextClick = (next: boolean) => {
    // Assuming that selections from the modal are stored or updated in a way accessible here.
    // You might be pulling selected IDs from the Library component or similar.
    if (selected && selected.length > 0) {
      // If 'Select All' is used, assume all are selected or fetch accordingly
      // Simulate fetching all media IDs from the library
      const allMediaIds = []; // You should replace this with actual fetching logic
      setMedia(allMediaIds);
    }
    // Additional logic to fetch selected media if not 'selectAll'
    // Example: setMedia(selectedMediaFromLibrary);

    setShowModal(false);
    setShowOrDivider(false);
    if (next) setUserInteracted(true);
    // This should lead to displaying the next set of options
  };

  return (
    <div className="h-full bg-[#111111]">
      {loading ? (
        <div className="absolute inset-0 flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="flex items-center justify-center relative gap-4">
            {/* Upload clips */}
            {!userInteracted && (
              <div className="w-[24rem] h-[24rem] grid place-content-center place-items-center bg-[#ff6600] rounded-xl">
                <label htmlFor="file-input" className="cursor-pointer mb-4">
                  <FiPlusCircle className="text-5xl text-white" />
                </label>
                <input
                  id="file-input"
                  type="file"
                  multiple
                  onChange={handleFilesChange}
                  style={{ display: "none" }}
                />
                <p className="text-2xl text-[#ff9567]">Upload video clips</p>
                {files.length > 0 && (
                  <ul className="text-sm text-white mt-4">
                    {files.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* OR Divider (styled with absolute positioning to appear over the cards) */}
            {!userInteracted && showOrDivider && (
              <div className="absolute w-20 h-20 rounded-full bg-black flex justify-center items-center z-10">
                <span className="text-[#ff6000] text-xl font-bold">OR</span>
              </div>
            )}

            {/* Select video clips card */}
            {!userInteracted && (
              <div
                className="w-[24rem] h-[24rem] flex flex-col place-content-center place-items-center bg-[#2d2d2d] rounded-xl cursor-pointer"
                onClick={toggleModal}
              >
                <div className="flex flex-col">
                  <h1 className="text-[#acacac] text-2xl">
                    Select video clips
                  </h1>
                  <h1 className="text-[#acacac] text-2xl text-center">
                    from Library
                  </h1>
                </div>
                <div
                  className="flex items-center gap-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={
                      selected &&
                      selected.length > 0 &&
                      selected.length === allAssetIds.length
                    }
                    onChange={(e) => {
                      e.stopPropagation();
                      if (selected.length === allAssetIds.length) {
                        setSelected([]);
                      } else {
                        setSelected(allAssetIds);
                      }
                    }}
                  />
                  <label
                    className="text-[#acacac] text-center text-2xl cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (selected.length === allAssetIds.length) {
                        setSelected([]);
                      } else {
                        setSelected(allAssetIds);
                      }
                    }}
                  >
                    Select entire library
                  </label>
                </div>
                {selected && selected.length > 0 && (
                  <button
                    className="mt-4 px-4 py-2 bg-[#ff6600] text-white rounded"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    Proceed
                  </button>
                )}
              </div>
            )}

            {userInteracted && (
              <>
                <div className="max-w-sm h-[24rem] p-8 grid items-center justify-center bg-black rounded-xl ml-1">
                  <div className="text-xl text-[#454545] mb-1.5">
                    Duration of the Video
                  </div>
                  <div className="flex justify-center items-center gap-4">
                    {[15, 30, 60].map((duration) => (
                      <button
                        key={duration}
                        className={`px-4 py-3 rounded-xl text-base ${
                          selectedDuration === duration
                            ? "bg-[#ff6600] text-white"
                            : "bg-[#151515] text-[#909090]"
                        }`}
                        onClick={() => setSelectedDuration(duration)}
                      >
                        {duration} secs
                      </button>
                    ))}
                  </div>
                  <div className="m-2">
                    <p className="text-[#454545]">Target Audience</p>
                    <input
                      type="text"
                      placeholder="Type here..."
                      className="bg-[#1a1a1a] placeholder:text-[#333333] p-3 rounded-lg w-full my-2 text-[#acacac]"
                    />
                  </div>
                  <div className="m-2">
                    <p className="text-[#454545]">Describe your video</p>
                    <textarea
                      placeholder="Type here..."
                      className="bg-[#1a1a1a] placeholder:text-[#333333] p-3 rounded-lg w-full my-2 h-24 text-[#acacac]"
                    ></textarea>
                  </div>
                </div>
                <div className="ml-4 flex flex-col justify-center items-center">
                  <button
                    className="px-5 py-4 bg-gradient-to-br from-[#ff4f05] to-[#ffad00] rounded-xl font-bold tracking-widest disabled:opacity-50"
                    onClick={() => {
                      console.log("Media to Concepts:", media, selected);
                      navigate("/concepts");
                    }}
                  >
                    Next: Customize
                  </button>

                  <p className="text-[#616161] text-center py-8">
                    or skip the steps and...
                  </p>
                  <div
                    className="cursor-pointer"
                    onClick={async () => {
                      //   if (loading || !media || media.length === 0) return;
                      setLoading(true);
                      let media_ids: string[] = [];
                      if (media && media.length > 0) media_ids = [...media];
                      else if (selected && selected.length > 0)
                        media_ids = [...selected];
                      try {
                        const res = await axios.post(
                          `${import.meta.env.VITE_UPLOAD_URL}/workspaces/${
                            import.meta.env.VITE_WORKSPACEID
                          }/media2concepts`,
                          {
                            video_profile: {
                              platform: "Instagram",
                              length: "15 - 60 seconds",
                              purpose: "Promotional",
                              audience: "General",
                            },
                            media_ids,
                          }
                        );
                        const lineupId = res.data[0].lineup_id;
                        try {
                          const response = await axios.get(
                            `${
                              import.meta.env.VITE_UPLOAD_URL
                            }/lineup/${lineupId}/export_video`,
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
                          console.error(
                            "Error posting to media2concepts:",
                            error
                          );
                        }
                        // const response = await axios.get(
                        //   `${import.meta.env.VITE_UPLOAD_URL}/create_video/${
                        //     res.data[0].lineup_id
                        //   }`,
                        //   {
                        //     headers: { Accept: "video/mp4;charset=UTF-8" },
                        //     responseType: "blob",
                        //   }
                        // );
                        // setVideoBlob(response.data);
                        // setLoading(false);
                        // navigate("/video-footage");
                      } catch (error) {
                        setLoading(false);
                        console.error("Error creating quick video:", error);
                      }
                    }}
                  >
                    <img src={render} alt="Render" />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showModal && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#2d2d2d] w-[1280px] h-[720px] p-8 rounded-lg">
            <div className="bg-[#242424] w-[1214px] h-[656px] p-8 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Select Your Assets</h2>
              <div className="w-[1175px] h-[480px] overflow-y-scroll">
                <Library />
              </div>
              <button
                onClick={() => handleModalNextClick(false)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              >
                Close
              </button>
              <button
                onClick={() => handleModalNextClick(true)}
                className={`mt-4 ml-4 px-4 py-2 bg-[#ff6600] text-white rounded ${
                  selected.length === 0 && "opacity-50"
                }`}
                disabled={selected.length === 0}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footage;
