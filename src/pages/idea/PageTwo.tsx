import { useStageFive } from "@/store/stageFive";
import { useStageFour } from "@/store/stageFour";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TemplateWithSummary from "../../components/TemplateWithSummary";
import {
	useGlobalStore,
	useStageOne,
	useStageThree,
	useStageTwo,
} from "../../store";
import Button from "../../utils/Buttons";
import Loader from "../../utils/Loader";

const PageTwo = () => {
	const { conversationId, setStage, stage, setConversationId } = useGlobalStore(
		(state) => state,
	);
	const { setLength, setPlatform, setIndustry } = useStageOne((state) => state);
	const { questions, answers, setQuestions, setAnswers } = useStageTwo(
		(state) => state,
	);
	const { briefs, resetStageThree } = useStageThree((state) => state);
	const { shots, resetStageFour } = useStageFour((state) => state);
	const { videoBlob, resetStageFive } = useStageFive((state) => state);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	const questionURL = `${
		import.meta.env.VITE_BASE_URL
	}/get_next_question/${conversationId}`;
	const answerURL = `${
		import.meta.env.VITE_BASE_URL
	}/submit_answer/${conversationId}`;

	const fetchQuestion = async () => {
		try {
			const response = await axios.get(questionURL);
			if (!response.data.options || response.data.options.length === 0)
				response.data.other = true;
			const newQuestions = [...questions, response.data];
			let newAnswers = [...answers];
			if (answers.length === 0) {
				newAnswers = newAnswers.concat({});
			} else if (answers.length > questions.length) {
				newAnswers = newAnswers.slice(0, questions.length);
			} else {
				newAnswers = newAnswers.concat({});
			}
			setAnswers(newAnswers);
			setQuestions(newQuestions);
			localStorage.setItem(
				"ideaToFootage",
				JSON.stringify({
					...JSON.parse(
						(localStorage.getItem("ideaToFootage") as string) || ({} as string),
					),
					stageTwo: { questions: newQuestions, answers: newAnswers },
				}),
			);
			setLoading(false);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	useEffect(() => {
		if (!stage) setStage(2);
		if (localStorage.getItem("conversationId")) {
			setConversationId(localStorage.getItem("conversationId") as string);
		}
		if (localStorage.getItem("ideaToFootage")) {
			const stageOne = JSON.parse(
				localStorage.getItem("ideaToFootage") as string,
			).stageOne;
			const stageTwo = JSON.parse(
				localStorage.getItem("ideaToFootage") as string,
			).stageTwo;
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
				setLoading(false);
			} else if (answers.length === 0) {
				fetchQuestion();
			}
		} else {
			navigate("/idea");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleButtonToggle = (option: string, idx: number) => {
		if (loading) return;

		resetStates();
		let newQuestions = [...questions];
		let newAnswers = [...answers];

		if (newAnswers[idx][option]) {
			delete newAnswers[idx][option];
			setAnswers(newAnswers);
			localStorage.setItem(
				"ideaToFootage",
				JSON.stringify({
					...JSON.parse(
						(localStorage.getItem("ideaToFootage") as string) || ({} as string),
					),
					stageTwo: { questions: newQuestions, answers: newAnswers },
				}),
			);
			return;
		}

		newAnswers[idx] = {};

		if (option === "Other") {
			const currentQuestion = newQuestions[idx];
			currentQuestion.other = !currentQuestion.other;
			setQuestions(newQuestions);
			if (!currentQuestion.other) {
				if (newAnswers[idx].Other) delete newAnswers[idx].Other;
			}
			setAnswers(newAnswers);
			localStorage.setItem(
				"ideaToFootage",
				JSON.stringify({
					...JSON.parse(
						(localStorage.getItem("ideaToFootage") as string) || ({} as string),
					),
					stageTwo: { questions: newQuestions, answers: newAnswers },
				}),
			);
		} else {
			const currentQuestion = newQuestions[idx];
			currentQuestion.other = false;

			const currAnswer = newAnswers[idx];
			if (currAnswer.Other) delete currAnswer.Other;
			if (currAnswer[option]) {
				delete currAnswer[option];
			} else {
				currAnswer[option] = option;
			}

			if (idx < questions.length - 1) {
				newQuestions = newQuestions.slice(0, idx + 1);
				newAnswers = newAnswers.slice(0, idx + 1);
			}
			setQuestions(newQuestions);
			setAnswers(newAnswers);
			localStorage.setItem(
				"ideaToFootage",
				JSON.stringify({
					...JSON.parse(
						(localStorage.getItem("ideaToFootage") as string) || ({} as string),
					),
					stageTwo: { questions: newQuestions, answers: newAnswers },
				}),
			);
		}
	};

	const handleSubmit = async () => {
		try {
			const selectedOptions = Object.values(answers[answers.length - 1]).join(
				", ",
			);

			const response = await axios.post(answerURL, selectedOptions);
			if (response.status === 200) {
				if (answers.length === 5) {
					setStage(3);
					navigate("/options");
				} else {
					setLoading(true);
					await fetchQuestion();
				}
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleSkip = async () => {
		try {
			const selectedOptions = Object.values(answers[answers.length - 1]).join(
				", ",
			);

			const response = await axios.post(answerURL, selectedOptions);
			if (response.status === 200) {
				setStage(3);
				navigate("/options");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const resetStates = () => {
		const ideaToFootage = JSON.parse(
			localStorage.getItem("ideaToFootage") as string,
		);
		delete ideaToFootage.stageThree;
		delete ideaToFootage.stageFour;
		localStorage.setItem("ideaToFootage", JSON.stringify(ideaToFootage));

		if (briefs.length > 0) resetStageThree();
		if (shots.length > 0) resetStageFour();
		if (videoBlob) resetStageFive();
	};

	const renderQuestions = () => {
		return (
			<>
				{questions?.map((question, idx) => {
					return (
						<div key={idx} className="mb-3">
							<h1 className="text-white text-xl mb-2">{question.question}</h1>
							<div className="flex ">
								{question?.options?.map((option, index) => {
									const id = Math.random();
									return (
										<div key={index} className="flex items-center text-xl">
											<button
												type="button"
												onClick={() =>
													!loading && handleButtonToggle(option, idx)
												}
												className={`rounded-xl px-5 py-3 m-2 flex items-center justify-center ${
													answers.length &&
													answers[idx] &&
													Object.keys(answers[idx]).length &&
													answers[idx][option]
														? "bg-gradient-to-br from-[#fd4f05] to-[#ff9b01]"
														: "bg-[#242424]"
												} text-hover`}
												disabled={loading}
											>
												<span
													onChange={id.toString()}
													className="text-lg text-manipulate text-hover"
												>
													{option}
												</span>
											</button>
										</div>
									);
								})}
								{question.other && (
									<div>
										<input
											type="text"
											value={answers[idx]?.Other || ""}
											onChange={(e) => {
												const newAnswers = [...answers];
												newAnswers[idx] = {};
												newAnswers[idx].Other = e.target.value;
												resetStates();
												setAnswers(newAnswers);
											}}
											placeholder="Please specify"
											className="bg-[#595854] placeholder:text-[#b5b5b4] p-3 rounded-lg w-full my-4"
										/>
									</div>
								)}
							</div>
						</div>
					);
				})}
				{loading && (
					<div className="flex justify-center items-center">
						<Loader />
					</div>
				)}
			</>
		);
	};

	const disableButtonNext = useCallback(() => {
		if (!answers || answers.length === 0) return true;
		if (Object.keys(answers[answers.length - 1]).length === 0) return true;
		if (
			Object.keys(answers[answers.length - 1]).length === 1 &&
			answers[answers.length - 1]?.Other === ""
		) {
			return true;
		}

		return false;
	}, [answers]);

	const disableButtonSkip = useCallback(() => {
		if (!answers || answers.length < 2) return true;
		if (Object.keys(answers[answers.length - 1]).length === 0) return true;
		if (
			Object.keys(answers[answers.length - 1]).length === 1 &&
			answers[answers.length - 1]?.Other === ""
		) {
			return true;
		}

		return false;
	}, [answers]);

	return (
		<div className="flex flex-col flex-grow justify-center place-content-start text-white text-2xl pl-12 py-12 relative h-100">
			{renderQuestions()}
			<div className="flex">
				<div className="mr-3">
					<Button
						onClickHandler={handleSubmit}
						disabled={disableButtonNext() || loading}
					/>
				</div>
				<Button
					onClickHandler={handleSkip}
					disabled={disableButtonSkip() || loading}
					title="skip to concepts"
				/>
			</div>
		</div>
	);
};

const PageTwoWithTemplate = () => {
	return (
		<TemplateWithSummary>
			<PageTwo />
		</TemplateWithSummary>
	);
};

export default PageTwoWithTemplate;
