import { IoCloudUploadOutline } from "react-icons/io5";
interface ShotCardProps {
  idx: number;
  src: string | null;
  shot: {
    [key: string]: string | number;
  };
  file?: File;
  handleFileInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
}

const ShotCard = ({
  idx,
  src,
  shot,
  file,
  handleFileInputChange,
}: ShotCardProps) => {
  return (
    <div className="max-w-sm h-full px-4 flex flex-col justify-around items-start pb-3">
      <div className="w-full pb-8 mx-auto ">
        {src ? (
          <img className="h-full rounded-xl" src={src} alt="video-image" />
        ) : (
          <div className="h-full mx-auto place-items-center animate-pulse rounded-lg bg-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-12 w-12 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>
        )}
      </div>
      <p className="max-w-xs h-[30%] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-custom-light hover:scrollbar-thumb-[#059669] active:scrollbar-thumb-emerald-500/50 overflow-y-scroll">
        {shot.description}
      </p>
      <div className="mt-3 text-sm">
        <h1 className="text-white font-semibold my-2">Criteria</h1>
        <h1>
          Start - End: {shot.start_time} - {shot.end_time}
        </h1>
      </div>
      <div className="text-sm">
        <h1>Shot Type - {shot.shot_type}</h1>
      </div>
      <div className="text-sm">
        <h1>Camera Movement - {shot.camera_movement}</h1>
      </div>
      <div className="mt-8 flex flex-col justify-start items-start w-full">
        <input
          type="file"
          id={idx.toString()}
          onChange={(e) => {
            console.log(idx);

            handleFileInputChange(e, idx);
          }}
          hidden
        />
        <label
          htmlFor={idx.toString()}
          className="inline-flex justify-center items-center flex-row-reverse gap-3.5 text-slate-500 mr-4 py-2 px-4
            rounded-md border-0 text-sm font-semibold bg-orange-500 hover:bg-orange-300 cursor-pointer"
        >
          <IoCloudUploadOutline className="inline-block text-3xl" />
          <span className="ml-2">Upload Media</span>
        </label>
        <label className="text-sm text-slate-500 mt-2 w-full overflow-auto no-scrollbar">
          {file ? file.name : "Choose file"}
        </label>
      </div>
    </div>
  );
};

export default ShotCard;
