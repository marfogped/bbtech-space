import React from "react";

const ServiceCard: React.FC = () => {
  return (
    <article className="bg-bkgGray/70 backdrop-blur hover:shadow-xl shadow-purplePrimary p-4 h-max">
      <div className="grid grid-rows-2 gap-4">
        <div className="grid grid-cols-4">
          <div className="col-span-1 flexCenter">
            <img
              src=""
              alt="service"
              className="rounded-full bg-purplePrimary w-28 h-28"
            />
          </div>

          <div className="col-span-3">
            <h3 className="font-vt323 text-3xl">
              Discover Your Next Professional Opportunity
            </h3>
            <span className="font-vt323 bg-purplePrimary text-lg text-black">
              For workers
            </span>
          </div>
        </div>

        <div>
          <p className="font-zenKaku text-lg">
            In the ever-changing tech landscape, finding the perfect role that
            aligns with your skills and aspirations can be daunting. Our
            opportunity search service is tailored for IT professionals aiming
            to advance their careers. We connect you with leading companies in
            search of your unique talents, ensuring your next career move is a
            triumph.
          </p>
        </div>
      </div>

      <div className="self-end flex justify-end pt-8">
        <button className="border-2 xs:w-full sm:w-full md:w-auto border-purplePrimary bg-purplePrimary text-black px-12 py-1 font-vt323 text-2xl">
          Get Started
        </button>
      </div>
    </article>
  );
};

export default ServiceCard;
