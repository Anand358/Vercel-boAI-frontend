import { useVideo } from "@/store";
import bg from "../../assets/vid-interface.png";

const Video = () => {
	const { videoBlob } = useVideo((state) => state);
	console.log(videoBlob);

	return (
		<div
			className="bg-[#111] h-screen flex justify-center items-center"
			// style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
		>
			<div className="border-2 border-[#ff6000] rounded">
				<video controls style={{ width: "460px", height: "820px" }}>
					{videoBlob && (
						<source
							src={window.URL.createObjectURL(videoBlob)}
							type="video/mp4"
						/>
					)}
				</video>
			</div>
		</div>
	);
};

export default Video;
