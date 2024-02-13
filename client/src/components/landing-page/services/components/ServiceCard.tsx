import React from "react";

interface Service {
  image: string;
  title: string;
  tag: string;
  description: string;
  btn: string;
}

interface ServiceCardProps{
  service: Service
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
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
            <h3 className="font-vt323 text-3xl xxl:text-4xl">
              { service?.title }
            </h3>
            <span className="font-vt323 bg-purplePrimary text-lg xxl:text-xl text-black">
              { service?.tag }
            </span>
          </div>
        </div>

        <div>
          <p className="font-zenKaku text-lg">
            { service?.description }
          </p>
        </div>
      </div>

      <div className="self-end flex justify-end pt-8">
        <button className="border-2 xs:w-full sm:w-full md:w-auto border-purplePrimary bg-purplePrimary text-black px-12 py-1 font-vt323 text-2xl">
          { service?.btn }
        </button>
      </div>
    </article>
  );
};

export default ServiceCard;
