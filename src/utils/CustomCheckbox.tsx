import React, { useState } from "react";

const CustomCheckbox = ({ label }) => {
	const [checked, setChecked] = useState(false);

	const handleCheckboxChange = () => {
		setChecked(!checked);
	};

	return (
		<div className="flex items-center gap-4 cursor-pointer">
			<div
				className={`h-5 w-5 rounded-sm flex justify-center items-center ${
					checked ? "bg-blue-500" : "bg-[#242424] border-2 border-[#444444]"
				}`}
				onClick={handleCheckboxChange}
			>
				{checked && (
					<svg className="w-4 h-4 text-white" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
						/>
					</svg>
				)}
			</div>
			<label onClick={handleCheckboxChange} className="text-[#acacac] text-2xl">
				{label}
			</label>
		</div>
	);
};

export default CustomCheckbox;
