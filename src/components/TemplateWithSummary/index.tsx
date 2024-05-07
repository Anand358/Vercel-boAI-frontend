import Header from "./Header";
import Navbar from "./Navbar";
import Summary from "../Summary";

const TemplateWithSummary = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="h-screen flex">
			<Navbar />
			<div className="bg-[#1c1c1c] h-full w-[33%]">
				<Summary />
			</div>
			<div className="bg-[#111111] h-full w-full text-white overflow-y-scroll py-2 no-scrollbar">
				{children}
			</div>
			<Header />
		</div>
	);
};

export default TemplateWithSummary;
