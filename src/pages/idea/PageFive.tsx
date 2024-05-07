import Template from "../../components/TemplateWithSummary";
import { useState, useEffect } from "react";
import Loader from "../../utils/Loader";
import { useStageFour } from "@/store/stageFour";
import { useStageFive } from "@/store/stageFive";
import { useGlobalStore } from "@/store";
import axios from "axios";

const PageFive = () => {
	const { screenplayId, setLineupId } = useGlobalStore((state) => state);
	const { files } = useStageFour((state) => state);
	const { videoBlob, setVideoBlob } = useStageFive((state) => state);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchVideo = async () => {
			try {
				if (!screenplayId) {
					throw new Error("Screenplay ID not found");
				}

				let mediaIds = []; // Array to store media ids
				for (const file of files) {
					const formData = new FormData();
					formData.append("file", file); // 'file' should match the expected key on the server side

					// Upload one file at a time
					const uploadRes = await axios.post(
						`${import.meta.env.VITE_UPLOAD_URL}/upload_media`,
						formData,
						{
							headers: {
								"Content-Type": "multipart/form-data",
							},
						},
					);

					// Log response and extract media_id
					console.log(uploadRes);
					if (uploadRes.data && uploadRes.data._id) {
						const mediaId = uploadRes.data._id;
						mediaIds.push(mediaId);
					} else {
						throw new Error("Invalid upload response, no ID found");
					}
				}

				console.log(mediaIds);

				const createLineupRes = await axios.post(
					`${import.meta.env.VITE_UPLOAD_URL}/create_lineup/${screenplayId}`,
					mediaIds,
					{ headers: { "Content-Type": "application/json" } },
				);

				console.log(createLineupRes);

				const lineupId = createLineupRes.data.lineup_id;
				setLineupId(lineupId);

				console.log("Lineup ID: ", lineupId);

				// Exporting video
				const exportVideoRes = await axios.get(
					`${import.meta.env.VITE_UPLOAD_URL}/lineup/${lineupId}/export_video`,
					{ responseType: "blob" },
				);

				setVideoBlob(exportVideoRes.data);
				setLoading(false);
			} catch (error) {
				console.error(error);
				setError(error);
				setLoading(false);
			}
		};

		if (!videoBlob) fetchVideo();
		else setLoading(false);
	}, [screenplayId, files, videoBlob]);

	const handleDownload = () => {
		if (videoBlob && window.URL && window.URL.createObjectURL) {
			const url = window.URL.createObjectURL(videoBlob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", "video.mp4");
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link); // Cleanup
		}
	};

	if (loading) return <Loader />;

	if (error) {
		return (
			<div className="bg-[#111111] h-full text-white">
				Error: {error.message}
			</div>
		);
	}
	return (
		<div
			className="grid place-items-center gap-y-10 pl-6 pb-8 h-full"
			// style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
		>
			<div>
				<div className="border-2 border-[#ff6000] rounded">
					<video controls style={{ width: "442px", height: "763px" }}>
						{videoBlob && (
							<source
								src={window.URL.createObjectURL(videoBlob)}
								type="video/mp4"
							/>
						)}
					</video>
				</div>
			</div>

			<a
				className="bg-gradient-to-r from-orange-600 to-orange-400 p-3 rounded-xl font-medium text-sm flex items-center justify-center gap-4 text-white cursor-pointer"
				onClick={handleDownload}
				download
			>
				export video
			</a>
		</div>
	);
};

const PageFiveWithTemplate = () => {
	return (
		<Template>
			<PageFive />
		</Template>
	);
};

export default PageFiveWithTemplate;
