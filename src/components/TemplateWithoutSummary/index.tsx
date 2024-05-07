import Header from "./Header";
import Navbar from "./Navbar";

const TemplateWithoutSummary = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<div className="h-screen flex">
			<Navbar />
			<div className="h-full bg-[#111111] w-full text-white overflow-y-scroll no-scrollbar">
				{children}
			</div>
			<Header />
		</div>
	);
};

export default TemplateWithoutSummary;
