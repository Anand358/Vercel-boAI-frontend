import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Template from "../../components/TemplateWithSummary";
import {
	useGlobalStore,
	useStageFour,
	useStageOne,
	useStageThree,
	useStageTwo,
} from "../../store";
import Loader from "../../utils/Loader";
import { DialogCustomAnimation } from "@/components/ui/modal";
import Button from "@/utils/Buttons";
import { useStageFive } from "@/store/stageFive";

const PageThree = () => {
	const navigate = useNavigate();
	const { setLength, setPlatform, setIndustry } = useStageOne((state) => state);
	const { setQuestions, setAnswers } = useStageTwo((state) => state);
	const { briefs, setBriefs, selected, setSelected } = useStageThree(
		(state) => state,
	);

	const { resetStageFour, shots } = useStageFour((state) => state);
	const { videoBlob, resetStageFive } = useStageFive((state) => state);
	const {
		stage,
		setStage,
		setScreenplayId,
		conversationId,
		setConversationId,
	} = useGlobalStore((state) => state);
	const [isLoading, setIsLoading] = useState(true);
	const [open, setOpen] = useState(false);
	const [feedback, setFeedback] = useState("");
	const [currIndex, setCurrIndex] = useState<{
		index: number;
		brief: string;
		title: string;
	} | null>(null);

	const briefURL = `${
		import.meta.env.VITE_BASE_URL
	}/generate_brief_now/${conversationId}`;
	const refineURL = `${
		import.meta.env.VITE_BASE_URL
	}/refine_brief/${conversationId}`;

	const fetchBriefs = async () => {
		try {
			const responses = await Promise.all([
				axios.get(briefURL),
				axios.get(briefURL),
				axios.get(briefURL),
				axios.get(briefURL),
			]);
			const briefs = responses.map((response) => response.data);
			setBriefs(briefs);
			localStorage.setItem(
				"ideaToFootage",
				JSON.stringify({
					...JSON.parse(
						(localStorage.getItem("ideaToFootage") as string) || ({} as string),
					),
					stageThree: { briefs },
				}),
			);
			setIsLoading(false);
		} catch (error) {
			console.error("Error fetching briefs:", error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (!stage) setStage(3);
		if (localStorage.getItem("conversationId")) {
			setConversationId(localStorage.getItem("conversationId") as string);
		}
		if (localStorage.getItem("screenplayId")) {
			setScreenplayId(localStorage.getItem("screenplayId") as string);
		}
		if (localStorage.getItem("ideaToFootage")) {
			const stageOne = JSON.parse(
				localStorage.getItem("ideaToFootage") as string,
			).stageOne;
			const stageTwo = JSON.parse(
				localStorage.getItem("ideaToFootage") as string,
			).stageTwo;
			const stageThree = JSON.parse(
				localStorage.getItem("ideaToFootage") as string,
			).stageThree;
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
				if (selected && selected.index)
					setCurrIndex({
						index: selected.index ?? 0,
						brief: selected.briefText ?? "",
						title: selected.title ?? "",
					});
				setIsLoading(false);
			} else if (briefs.length === 0) {
				fetchBriefs();
			} else {
				if (selected.index)
					setCurrIndex({
						index: selected.index ?? 0,
						brief: selected.briefText ?? "",
						title: selected.title ?? "",
					});
				setIsLoading(false);
			}
		} else {
			navigate("/idea");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const createScreenplay = async (briefText: string, title: string) => {
		const ideaToFootage = JSON.parse(
			localStorage.getItem("ideaToFootage") as string,
		);
		delete ideaToFootage.stageFour;
		localStorage.setItem("ideaToFootage", JSON.stringify(ideaToFootage));

		const body = {
			brief: briefText,
			title: title,
		};

		try {
			setIsLoading(true); // Set loading to true when article is clicked
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/create_screenplay/${conversationId}`,
				body,
				{
					headers: {
						"Content-Type": "application/json",
						accept: "application/json",
					},
				},
			);
			const screenplayId = response.data.screenplay_id;			
			localStorage.setItem("screenplayId", screenplayId);
			setScreenplayId(screenplayId);
			setStage(4);
			navigate("/shotlist");
		} catch (error) {
			console.error("Error creating screenplay:", error);
		} finally {
			setIsLoading(false); // Reset loading state when API call is finished
		}
	};

	const handleArticleClick = (
		briefText: string,
		title: string,
		index: number,
	) => {
		if (selected && selected.index && selected.index === index) {
			setStage(4);
			navigate("/shotlist");
			return;
		}
		if (shots.length > 0) resetStageFour();
		if (videoBlob) resetStageFive();
		setSelected({ index, briefText, title });
		localStorage.setItem(
			"ideaToFootage",
			JSON.stringify({
				...JSON.parse(
					(localStorage.getItem("ideaToFootage") as string) || ({} as string),
				),
				stageThree: {
					...JSON.parse(localStorage.getItem("ideaToFootage") as string)
						.stageThree,
					selected: { index, briefText, title },
				},
			}),
		);
		createScreenplay(briefText, title);
	};

	function concatArrayBuffers(chunks: Uint8Array[]): Uint8Array {
		const result = new Uint8Array(chunks.reduce((a, c) => a + c.length, 0));
		let offset = 0;
		for (const chunk of chunks) {
			result.set(chunk, offset);
			offset += chunk.length;
		}
		return result;
	}

	async function streamToString(
		stream: ReadableStream<Uint8Array>,
	): Promise<string> {
		return await new Response(stream).text();
	}

	const refineHandler = async () => {
		setOpen(false);
		setIsLoading(true);
		try {
			const responses = await Promise.all([
				fetch(`${refineURL}`, {
					method: "POST",
					body: JSON.stringify({ Feedback: feedback }),
					headers: { "Content-Type": "text/plain" },
				}),
				fetch(`${refineURL}?persona="highly creative"`, {
					method: "POST",
					body: JSON.stringify({ Feedback: feedback }),
					headers: { "Content-Type": "text/plain" },
				}),
			]);
			const newbriefs = responses.map(async (response) => {
				const chunks: Uint8Array[] = [];
				const reader = response.body?.getReader();
				if (reader) {
					// eslint-disable-next-line no-constant-condition
					while (true) {
						const { done, value } = await reader.read();
						if (done) break;
						chunks.push(value);
					}
					return streamToString(new Response(concatArrayBuffers(chunks)).body!);
				}
			});
			const refinedBriefs = (await Promise.all(newbriefs)).map((brief) =>
				JSON.parse(brief!),
			);
			setBriefs([...briefs, ...refinedBriefs]);
			localStorage.setItem(
				"ideaToFootage",
				JSON.stringify({
					...JSON.parse(
						(localStorage.getItem("ideaToFootage") as string) || ({} as string),
					),
					stageThree: {
						...JSON.parse(localStorage.getItem("ideaToFootage") as string)
							.stageThree,
						briefs: [...briefs, ...refinedBriefs],
					},
				}),
			);
			setIsLoading(false);
		} catch (error) {
			console.error("Error fetching briefs:", error);
			setIsLoading(false);
		}
	};

	const renderArticle = (
		index: number,
		briefText: { brief: string; title: string },
		color?: string,
	) => {
		return (
			<article
				key={index}
				className={`p-4 rounded-lg text-white cursor-pointer ${
					currIndex && index === currIndex.index && "shadow-[0_0_20px_white]"
				}`}
				style={{
					backgroundImage:
						index > 4
							? "linear-gradient(to bottom, #f87171, #60a5fa)"
							: color === "red"
							? "linear-gradient(to bottom, #f87171, #ef4444, #b91c1c)"
							: "linear-gradient(to bottom, #60a5fa, #3b82f6, #2563eb)",
				}}
				onClick={() => {
					if (currIndex && index === currIndex.index) setCurrIndex(null);
					else
						setCurrIndex({
							index,
							brief: briefText.brief,
							title: briefText.title,
						});
				}}
			>
				<p className="text-2xl font-bold">{index < 10 ? `0${index}` : index}</p>
				<ul className="text-left">
					<p className="font-bold text-xl my-2">{briefText.title}</p>
					<p>{briefText.brief}</p>
				</ul>
			</article>
		);
	};

	return (
		<div className="bg-[#111111] h-full text-white py-12">
			{isLoading ? (
				<div className="flex justify-center items-center h-screen">
					<Loader />
				</div>
			) : (
				<div className="flex flex-col justify-center items-start w-full px-6 pb-8">
					<DialogCustomAnimation
						open={open}
						handleOpen={() => setOpen(!open)}
						handleConfirm={refineHandler}
						feedback={feedback}
						setFeedback={setFeedback}
					/>
					<div className="w-full flex flex-col items-center mb-10">
						<h1 className="text-white text-2xl">Select a concept</h1>
					</div>
					<div className="w-full grid grid-cols-4 gap-7 mb-10">
						<h1 className="text-2xl text-red-400 col-span-2 mx-auto">
							Bold Concepts
						</h1>
						<h1 className="text-2xl text-blue-400 col-span-2 mx-auto">
							Safe Concepts
						</h1>
					</div>
					<div className="w-full">
						<div className="grid grid-cols-4 gap-5">
							{briefs?.map((brief, idx) => {
								if (idx < 4) {
									return renderArticle(
										idx + 1,
										brief,
										idx % 4 < 2 ? "red" : "blue",
									);
								}
							})}
						</div>
						<div className="grid grid-cols-4 gap-5 my-4">
							{briefs?.map((brief, idx) => {
								if (idx > 3 && idx < 6) {
									return renderArticle(idx + 1, brief);
								}
							})}
						</div>
						<div className="grid grid-cols-4 gap-5 my-4">
							{briefs?.map((brief, idx) => {
								if (idx > 5) {
									return renderArticle(idx + 1, brief);
								}
							})}
						</div>
					</div>

					<div className="flex items-center">
						<div className="mr-4">
							<Button
								disabled={!currIndex}
								onClickHandler={() =>
									handleArticleClick(
										currIndex?.brief ?? "",
										currIndex?.title ?? "",
										currIndex?.index ?? 0,
									)
								}
							/>
						</div>
						{briefs.length < 8 && (
							<div className="flex">
								<p
									onClick={() => setOpen(true)}
									className="text-orange-600 cursor-pointer mr-2"
								>
									Click here
								</p>
								to refine concepts
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

const PageThreeWithTemplate = () => {
	return (
		<Template>
			<PageThree />
		</Template>
	);
};

export default PageThreeWithTemplate;
