import React from "react";
import { HeroImg } from "../../../lib/images";
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation('hero');

  return (
    <header className="w-full h-screen">
      <div className="section-container container-grid">
        <div className="lg:col-span-3 flex xs:justify-end sm:justify-end md:justify-center flex-col gap-5">
          <div className="flex flex-col gap-5 xs:pt-16 sm:pt-16 lg:pt-0">
            <h1 className="xs:text-6xl sm:text-7xl lg:text-8xl font-vt323">
              {t('title')}{" "}
              <span className="bg-purplePrimary block w-max text-black">
                {t('purple-word')}
              </span>{" "}
            </h1>
            <p className="xs:text-xl sm:text-xl md:text-2xl font-zenKaku text-balance text-neutral/90">
              {t('description')}
            </p>
          </div>

          <div className="flex xs:flex-col sm:flex-col md:flex-row items-center gap-5">
            <button className="border-2 xs:w-full sm:w-full md:w-auto border-neutral px-12 py-2 font-vt323 text-2xl">
              {t('btn-1')}
            </button>
            <button className="border-2 xs:w-full sm:w-full md:w-auto border-purplePrimary bg-purplePrimary text-black px-12 py-2 font-vt323 text-2xl">
              {t('btn-2')}
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
