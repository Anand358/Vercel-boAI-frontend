import { useState } from "react";
import {
	Tabs,
	TabsHeader,
	TabsBody,
	Tab,
	TabPanel,
} from "@material-tailwind/react";
import AllPageComponent from "./allPage";

export function AssetTab() {
	const data = [
		{
			label: "all",
			value: "all",
			desc: <AllPageComponent />,
		},
		{
			label: "videos",
			value: "videos",
			desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
		},
		{
			label: "images",
			value: "images",
			desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
		},
		{
			label: "sounds",
			value: "sounds",
			desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
		},
	];

	const [activeTab, setActiveTab] = useState("all"); // Initialize with the first tab as active

	return (
		<Tabs value={activeTab} onChange={setActiveTab} className="">
			<TabsHeader
				className="bg-transparent"
				indicatorProps={{
					className: "hidden", // Hide the indicator
				}}
			>
				{data.slice(0, 3).map(({ label, value }) => (
					<Tab
						key={value}
						value={value}
						onClick={() => setActiveTab(value)} // Set active tab on click
						className={`transition-colors duration-300 ${
							value === activeTab ? "text-[#ff6600]" : "text-[#666666]"
						} border-r border-[#333333] px-4 py-2`}
					>
						{label}
					</Tab>
				))}
				{data.slice(3, 4).map(({ label, value }) => (
					<Tab
						key={value}
						value={value}
						onClick={() => setActiveTab(value)} // Set active tab on click
						className={`transition-colors duration-300 ${
							value === activeTab ? "text-[#ff6600]" : "text-[#666666]"
						} px-4 py-2`}
					>
						{label}
					</Tab>
				))}
			</TabsHeader>
			<TabsBody>
				{data.map(({ value, desc }) => (
					<TabPanel key={value} value={value}>
						{desc}
					</TabPanel>
				))}
			</TabsBody>
		</Tabs>
	);
}
