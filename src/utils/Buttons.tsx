const Button = ({
  onClickHandler,
  disabled,
  title,
}: {
  onClickHandler?: () => void;
  disabled?: boolean;
  title?: string;
}) => {
  return (
    <div>
      <button
        type="submit"
        className={`${
          disabled
            ? "bg-gray-500"
            : "bg-gradient-to-br from-[#fd4f05] to-[#ff9b01]"
        } p-2 px-4 rounded-xl font-bold`}
        onClick={onClickHandler}
        disabled={disabled}
      >
        {title || "next"}
      </button>
    </div>
  );
};

export default Button;
