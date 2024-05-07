import { BsFillCollectionPlayFill } from "react-icons/bs";
import { FaPlay, FaDatabase } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logos/logoOne.png";
import { useGlobalStore } from "@/store";

const Navbar = () => {
	const { setStage } = useGlobalStore((state) => state);
	const navigate = useNavigate();
	const location = useLocation();

	const toHome = () => {
		setStage(1);
		navigate("/choose");
	};

	const toAssets = () => {
		navigate("/assets");
	};

	const toShotlistHistory = () => {
		navigate("/edit-shotlist");
	};

	const isActive = (path) => {
		if (Array.isArray(path)) {
			return path.some((p) => location.pathname.includes(p));
		}
		return location.pathname === path;
	};

	return (
		<div className="w-24 h-screen bg-[#111111] relative">
			<div className="absolute top-3">
				<img src={logo} alt="" className="w-full h-auto" />
			</div>
			<div className="h-full flex flex-col gap-10 justify-center items-center cursor-pointer">
				<IoMdHome
					className={`text-4xl ${
						isActive([
							"/choose",
							"/idea",
							"/response",
							"/footage",
							"/shotlist",
							"/concepts",
							"/options",
						])
							? "text-[#ff6000]"
							: "text-[#7e7c74]"
					}`}
					onClick={toHome}
				/>
				<FaPlay
					className={`text-3xl ${
						isActive("/play") ? "text-[#ff6000]" : "text-[#7e7c74]"
					}`}
				/>
				<BsFillCollectionPlayFill
					className={`text-3xl ${
						isActive(["/edit-shotlist", "/shotlist/:screenplayId"])
							? "text-[#ff6000]"
							: "text-[#7e7c74]"
					}`}
					onClick={toShotlistHistory}
				/>
				<FaDatabase
					className={`text-3xl ${
						isActive("/assets") ? "text-[#ff6000]" : "text-[#7e7c74]"
					}`}
					onClick={toAssets}
				/>
				<FaGear
					className={`text-3xl ${
						isActive("/settings") ? "text-[#ff6000]" : "text-[#7e7c74]"
					}`}
				/>
			</div>
		</div>
	);
};

export default Navbar;
