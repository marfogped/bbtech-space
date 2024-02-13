import React from "react";
import { AboutImg } from "../../../lib/images";
import { SectionTag } from "../..";
import { useTranslation } from 'react-i18next';


const About: React.FC = () => {
  const { t } = useTranslation('about');
  return (
    <section className="w-full h-screen">
      <div className="section-container container-grid">
        <div className="lg:col-span-3 flex xs:justify-end sm:justify-end md:justify-center flex-col gap-5">
          <div className="flex flex-col gap-5">
            <SectionTag index={1} label="About" />
            <h2 className="xs:text-5xl sm:text-5xl lg:text-6xl font-vt323 text-pretty">
              {t('title')}{" "}
              <span className="bg-purplePrimary w-max text-black">
                {t('purple-word')}
              </span>{" "}
            </h2>
            <p className="xs:text-xl sm:text-xl md:text-2xl font-zenKaku text-balance text-neutral/90">
              {t('description-1')}
            </p>
            <p className="xs:text-xl sm:text-xl md:text-2xl font-zenKaku text-balance text-neutral/90">
              {t('description-2')}
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
