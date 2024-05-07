import Card from "./Card";

const StageOneCard = () => {
  return (
    <Card>
      <div className="h-[200px] flex flex-col items-center justify-center">
        <p className="text-4xl font-semibold">Welcome to BoAi.</p>
        <p className="text-xl text-[#7e7c74]">
          Let&apos;s start creating videos
        </p>
      </div>
    </Card>
  );
};

export default StageOneCard;
