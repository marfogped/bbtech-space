import React from "react";
import { HeroImg } from "../../../lib/images";

const Hero: React.FC = () => {
  return (
    <header className="w-full h-screen">
      <div className="section-container container-grid">
        <div className="lg:col-span-3 flex xs:justify-end sm:justify-end md:justify-center flex-col gap-5">
          <div className="flex flex-col gap-5">
            <h1 className="xs:text-6xl sm:text-7xl lg:text-8xl font-vt323">
              Next Level of{" "}
              <span className="bg-purplePrimary block w-max text-black">
                IT RECRUITMENT
              </span>{" "}
            </h1>
            <p className="xs:text-xl sm:text-xl md:text-2xl font-zenKaku text-balance text-neutral/90">
              We connect the objectives of companies with the goals and
              aspirations of candidates, thereby fostering mutual growth and
              success.
            </p>
          </div>

          <div className="flex xs:flex-col sm:flex-col md:flex-row items-center gap-5">
            <button className="border-2 xs:w-full sm:w-full md:w-auto border-neutral px-12 py-2 font-vt323 text-2xl">
              Learn More
            </button>
            <button className="border-2 xs:w-full sm:w-full md:w-auto border-purplePrimary bg-purplePrimary text-black px-12 py-2 font-vt323 text-2xl">
              Get Started
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 flexCenter">
          <img src={HeroImg} alt="hero image" className="w-full h-auto" />
        </div>
      </div>
    </header>
  );
};

export default Hero;
