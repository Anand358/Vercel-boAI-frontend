import { Link } from "react-router-dom";
import choice from "../../assets/logos/choice-image.jpeg";
import { ResetStates } from "@/store/resetStates";

const Choice = () => {
  ResetStates();

  return (
    <div className="bg-[#212121] h-screen">
      <div className="flex justify-center items-center h-screen gap-10">
        <div className="text-center">
          <Link to="/footage">
            <div className="flex justify-center items-center tracking-tighter mb-2">
              <h1 className="text-[#c2c2c2] font-bold text-5xl">Clips</h1>
              <h1 className="text-[#c2c2c2] font-bold text-7xl">2</h1>
              <h1 className="text-[#c2c2c2] font-bold text-5xl">video</h1>
            </div>
            <p className="text-[#646464]">Upload clips and get your video</p>
            <p className="text-[#646464] text-center">in an instant!!</p>
          </Link>
        </div>
        <div>
          <img src={choice} alt="image" />
        </div>
        <Link to="/idea">
          <div className="">
            <div className="flex justify-center items-center tracking-tighter mb-2">
              <h1 className="text-[#c2c2c2] font-bold text-5xl">idea</h1>
              <h1 className="text-[#c2c2c2] font-bold text-7xl">2</h1>
              <h1 className="text-[#c2c2c2] font-bold text-5xl">video</h1>
            </div>
            <p className="text-[#646464]">
              Ideation, Concept Creation, Shoot guidance
            </p>
            <p className="text-[#646464] text-center">We got it all!</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Choice;
