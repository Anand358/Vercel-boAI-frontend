import { useAssets, useConcepts } from "@/store";
import { useMemo } from "react";
import ReactPlayer from "react-player";

const Library = () => {
  const { assets, selected, setSelected } = useAssets((state) => state);
  const { concepts, resetConcepts } = useConcepts((state) => state);

  const allAssetIds = useMemo(
    () => (assets ? Object.keys(assets.videos) : []),
    [assets]
  );

  const handleSelect = (id) => {
    if (concepts) resetConcepts();
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      if (selected.length < 100) {
        setSelected([...selected, id]);
      }
    }
  };

  console.log("selected", selected);

  return (
    <div className="h-1/2 grid grid-cols-3 gap-x-10 gap-y-4 pr-2">
      {assets &&
        allAssetIds.map((video) => {
          return (
            <div
              key={video}
              className={`h-[350px] px-2 rounded-lg cursor-pointer space-x-3 my-4 ${
                selected.includes(video) && "border-2 border-orange-500"
              }`}
              onClick={() => handleSelect(video)}
            >
              <ReactPlayer
                light={`${
                  import.meta.env.VITE_UPLOAD_URL
                }/media/${video}/thumbnail`}
                url={`${import.meta.env.VITE_UPLOAD_URL}/media/${video}`}
                controls
                width={340}
                height={300}
              />
              <p className="pt-2">
                {assets.videos[video].filename} (
                {assets.videos[video].resolution})
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default Library;
