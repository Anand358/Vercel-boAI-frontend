import { CiEdit } from "react-icons/ci";

const Card = ({
	children,
	onClick,
}: {
	children: React.ReactNode;
	onClick?: () => void;
}) => {
	return (
		<div className="bg-[#282828] w-[90%] p-8 rounded-lg flex justify-between items-center text-white mt-3">
			<div className={`self-center ${!onClick && "w-full"}`}>{children}</div>
			{onClick && (
				<div className="self-end">
					<CiEdit className="text-orange-500 text-3xl" onClick={onClick} />
				</div>
			)}
		</div>
	);
};

export default Card;
