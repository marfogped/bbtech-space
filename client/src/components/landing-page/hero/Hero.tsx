import React from "react";
import { HeroImg } from "../../../lib/images";

const Hero: React.FC = () => {
  return (
    <header className="w-full h-screen">
      <div className="section-container grid grid-cols-5 gap-5">
        <div className="col-span-3 flex justify-center flex-col gap-5">
          <div className="flex flex-col gap-5">
            <h1 className="text-8xl font-vt323">
              Next Level of{" "}
              <span className="bg-purplePrimary block w-max text-black">
                IT RECRUITMENT
              </span>{" "}
            </h1>
            <p className="text-2xl text-balance text-neutral/90">
              We connect the objectives of companies with the goals and
              aspirations of candidates, thereby fostering mutual growth and
              success.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <button className="border-2 border-neutral px-12 py-2 font-vt323 text-2xl">
              Learn More
            </button>
            <button className="border-2 border-purplePrimary bg-purplePrimary text-black px-12 py-2 font-vt323 text-2xl">
              Get Started
            </button>
          </div>
        </div>

        <div className="col-span-2 flexCenter">
          <img src={HeroImg} alt="hero image" className="w-full h-auto" />
        </div>
      </div>
    </header>
  );
};

export default Hero;
