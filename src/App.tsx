import { Route, Routes, useNavigate } from "react-router-dom";
import ConceptsFour from "./pages/footage/ConceptsFour";
import FootageThree from "./pages/footage/FootageThree";
import VideoFootageFive from "./pages/footage/VideoFootageFive";
import AssetsSidebar from "./pages/global/AssetsSidebar";
import ChoiceTwo from "./pages/global/ChoiceTwo";
import LoginOne from "./pages/global/LoginOne";
import PageFive from "./pages/idea/PageFive";
import PageFiveSH from "./pages/idea/PageFiveSH";
import PageFour from "./pages/idea/PageFour";
import PageOne from "./pages/idea/PageOne";
import PageThree from "./pages/idea/PageThree";
import PageTwo from "./pages/idea/PageTwo";
import ShotlistHistory from "./pages/global/ShotlistHistory";
import SavedShotlist from "./pages/global/SavedShotlist";
import { useEffect } from "react";

const App = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const isLoggedIn = localStorage.getItem("loggedIn");
		if (!isLoggedIn || isLoggedIn !== "true") {
			navigate("/");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Routes>
			{/* global */}
			<Route path="/" element={<LoginOne />} />
			<Route path="/choose" element={<ChoiceTwo />} />
			<Route path="/assets" element={<AssetsSidebar />} />
			<Route path="/edit-shotlist" element={<ShotlistHistory />} />

			{/* footage routing */}
			<Route path="/footage" element={<FootageThree />} />
			<Route path="/concepts" element={<ConceptsFour />} />
			<Route path="/video-footage" element={<VideoFootageFive />} />

			{/* idea routing */}
			<Route path="/idea" element={<PageOne />} />
			<Route path="/response" element={<PageTwo />} />
			<Route path="/options" element={<PageThree />} />
			<Route path="/shotlist" element={<PageFour />} />
			<Route path="/shotlist/:screenplayId" element={<SavedShotlist />} />
			<Route path="/video" element={<PageFive />} />
			<Route path="/video/:screenplayId" element={<PageFiveSH />} />
		</Routes>
	);
};

export default App;
