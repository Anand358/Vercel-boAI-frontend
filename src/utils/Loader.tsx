import catGif from ".././assets/loader.gif";

const Loader = () => {
	return (
		<div className="flex flex-col justify-center items-center overflow-hidden">
			<button
				type="button"
				className="bg-gradient-to-br from-[#fd4f05] to-[#ff9b01] px-4 py-2 rounded-lg flex items-center justify-center w-1/2"
				disabled
			>
				<svg
					className="animate-spin h-5 w-5 mr-3 text-white"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					/>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4c-2.646 0-5.086-1.062-6.869-2.786l2.508-2.508a3.993 3.993 0 005.657 5.657l2.508-2.508A7.96 7.96 0 018 17.291z"
					/>
				</svg>
				Processing...
			</button>
			<img src={catGif} alt="" className="w-1/2" />
		</div>
	);
};

export default Loader;
