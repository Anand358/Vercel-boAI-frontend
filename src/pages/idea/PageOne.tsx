import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios directly
import TemplateWithSummary from "../../components/TemplateWithSummary";
import {
	useGlobalStore,
	useStageFour,
	useStageOne,
	useStageThree,
	useStageTwo,
	useStageFive,
} from "../../store";
import Button from "../../utils/Buttons";
import Loader from "@/utils/Loader";

const PageOne = () => {
	const navigate = useNavigate();

	const { length, platform, industry } = useStageOne((state) => state);
	const { setLength, setPlatform, setIndustry } = useStageOne((state) => state);
	const { questions, resetStageTwo } = useStageTwo((state) => state);
	const { briefs, resetStageThree } = useStageThree((state) => state);
	const { shots, resetStageFour } = useStageFour((state) => state);
	const { videoBlob, resetStageFive } = useStageFive((state) => state);
	const { stage, setStage, setConversationId } = useGlobalStore(
		(state) => state,
	);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);
		if (!stage) setStage(1);
		if (localStorage.getItem("conversationId")) {
			setConversationId(localStorage.getItem("conversationId") as string);
		}
		if (localStorage.getItem("ideaToFootage")) {
			const stageOne = JSON.parse(
				localStorage.getItem("ideaToFootage") as string,
			).stageOne;
			if (stageOne && Object.keys(stageOne).length > 0) {
				const { industry, platform, length } = stageOne;
				setIndustry(industry);
				setPlatform(platform);
				setLength(length);
			}
		} else
			localStorage.setItem("ideaToFootage", JSON.stringify({ stageOne: {} }));
		setLoading(false);
	}, []);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const formData = {
				industry,
				platform,
				length,
			};

			const profileResponse = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/profile/`,
				formData,
				{
					headers: {
						"Content-Type": "application/json",
						accept: "application/json",
					},
				},
			);

			const contentDirectorResponse = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/create_content_director/`,
				formData,
				{
					headers: {
						"Content-Type": "application/json",
						accept: "application/json",
					},
				},
			);

			const conversationId = contentDirectorResponse.data.conversation_id;
			setConversationId(conversationId); // Set conversation_id globally
			localStorage.setItem("conversationId", conversationId);
			console.log(conversationId);

			if (contentDirectorResponse.status === 200) {
				const ideaToFootage = JSON.parse(
					localStorage.getItem("ideaToFootage") as string,
				);
				localStorage.setItem(
					"ideaToFootage",
					JSON.stringify({
						...ideaToFootage,
						stageOne: formData,
					}),
				);

				setStage(2);
				navigate("/response");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = event.target;

		if (questions.length > 0) resetStageTwo();
		if (briefs.length > 0) resetStageThree();
		if (shots.length > 0) resetStageFour();
		if (videoBlob) resetStageFive();

		const ideaToFootage = JSON.parse(
			localStorage.getItem("ideaToFootage") as string,
		);
		const localStageOne = ideaToFootage.stageOne;

		switch (name) {
			case "length":
				setLength(value);
				localStorage.setItem(
					"ideaToFootage",
					JSON.stringify({
						stageOne: { ...localStageOne, length: value },
					}),
				);
				break;
			case "industry":
				setIndustry(value);
				localStorage.setItem(
					"ideaToFootage",
					JSON.stringify({
						stageOne: { ...localStageOne, industry: value },
					}),
				);
				break;
			case "platform":
				setPlatform(value);
				localStorage.setItem(
					"ideaToFootage",
					JSON.stringify({
						...ideaToFootage,
						stageOne: { ...localStageOne, platform: value },
					}),
				);
				break;
			default:
				break;
		}
	};

	return (
		<div className="flex flex-col flex-grow justify-center place-content-start h-full text-white text-2xl pl-12 relative">
			{loading ? (
				<div className="flex justify-center items-center">
					<Loader />
				</div>
			) : (
				<form onSubmit={handleSubmit}>
					<div className="grid grid-rows-2 items-center gap-2 accent-orange-500">
						{/* Row 1 */}
						<div className="flex gap-2 items-center">
							<p className="w-full p-2">
								I want to create a{" "}
								<select
									name="length"
									className="bg-[#595854] rounded-lg p-1"
									onChange={handleInputChange}
									value={length}
								>
									<option value="">Select Length</option>
									<option value="15">15</option>
									<option value="15-30">15-30</option>
									<option value="30-45">30-45</option>
									<option value="45-60">45-60</option>
								</select>{" "}
								seconds for my{" "}
								<select
									name="industry"
									className="bg-[#595854] rounded-lg p-1"
									onChange={handleInputChange}
									value={industry}
								>
									<option value="">Select Industry</option>
									<option value="restaurant">Restaurant</option>
									<option value="tech">Tech</option>
									<option value="education">Education</option>
								</select>{" "}
								business
							</p>
						</div>
						{/* Row 2 */}
						<p className="w-full p-2 md:col-span-2">
							The video is{" "}
							<select
								name="platform"
								className="bg-[#595854] rounded-lg p-1"
								onChange={handleInputChange}
								value={platform}
							>
								<option value="">Select Platform</option>
								<option value="Instagram">Instagram</option>
								<option value="YouTube">YouTube</option>
								<option value="WhatsApp">WhatsApp</option>
							</select>{" "}
							platform.
						</p>
					</div>
					<Button />
				</form>
			)}
		</div>
	);
};

const PageOneWithTemplate = () => {
	return (
		<TemplateWithSummary>
			<PageOne />
		</TemplateWithSummary>
	);
};

export default PageOneWithTemplate;
