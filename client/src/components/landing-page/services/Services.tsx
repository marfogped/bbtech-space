import React from "react";
import { SectionTag } from "../..";
import ServiceCard from "./components/ServiceCard";

const Services: React.FC = () => {
  return (
    <section className="w-full h-screen">
      <div className="section-container container-grid">
        <div className="col-span-full flex xs:justify-end sm:justify-end md:justify-center flex-col gap-5">
          <div className="flex flex-col items-center gap-5">
            <SectionTag index={2} label="Services" />
            <h2 className="xs:text-5xl sm:text-5xl lg:text-6xl text-center font-vt323 text-pretty">
              Crafting Pathways to <br />
              Connect Talent and{" "}
              <span className="bg-purplePrimary block w-max mx-auto text-black">
                Opportunities
              </span>{" "}
            </h2>
          </div>
        </div>

        <div className="col-span-full grid xs:grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-5">
          <ServiceCard />
          <ServiceCard />
        </div>
      </div>
    </section>
  );
};

export default Services;
