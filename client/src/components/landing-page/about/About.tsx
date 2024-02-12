import React from "react";
import { AboutImg } from "../../../lib/images";

const About: React.FC = () => {
  return (
    <section className="w-full h-screen">
      <div className="section-container container-grid">
        <div className="lg:col-span-3 flex xs:justify-end sm:justify-end md:justify-center flex-col gap-5">
          <div className="flex flex-col gap-5">
            <h2 className="xs:text-5xl sm:text-5xl lg:text-6xl font-vt323 text-pretty">
              Building Your Digital Opportunity{" "}
              <span className="bg-purplePrimary w-max text-black">
                Together
              </span>{" "}
            </h2>
            <p className="xs:text-xl sm:text-xl md:text-2xl font-zenKaku text-balance text-neutral/90">
              Our specialty lies in the search and selection of experts in
              information technology. We invest time in analyzing and
              understanding the business model of each client, as well as
              thoroughly getting to know the culture of their companies.
            </p>
            <p className="xs:text-xl sm:text-xl md:text-2xl font-zenKaku text-balance text-neutral/90">
              We establish a connection with exceptional talent that best suits
              the needs and specifics of each client.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 flexCenter">
          <img src={AboutImg} alt="hero image" className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
};

export default About;
