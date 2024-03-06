import React, { Suspense, useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import { useTranslation } from "react-i18next";
import { Satelite1 } from "../../../lib/images";
import { TypeWritterEffect } from "../..";
import { useEnhancerMode } from "../../../lib/useEnhancerMode";
import { useSanity } from "../../../lib/useSanity";

const Hero: React.FC = () => {
  const { t, i18n } = useTranslation("home");
  const { language } = useSanity();
  const { enhancedMode, internetSpeed } = useEnhancerMode();
  const [texts, setTexts] = useState<string[] | null>(null);

  useEffect(() => {
    const updateTexts = () => {
      setTexts(null); 
      
      setTimeout(() => {
        const heroPurpleWord = t("hero_purple_word");
        const secondHeroPurpleWord = t("hero_purple_word_second");
        setTexts([heroPurpleWord, secondHeroPurpleWord]);
      }, 500);
    };

    i18n.on("languageChanged loaded", updateTexts);

    return () => {
      i18n.off("languageChanged loaded", updateTexts);
    };
  }, [i18n, t, language]);


  return (
    <header className="w-full h-screen">
      <div className="section-container container-grid">
        <div className="lg:col-span-3 flex xs:justify-end sm:justify-end md:justify-center flex-col gap-5">
          <div className="flex flex-col gap-5 xs:pt-16 sm:pt-16 lg:pt-0">
            <h1 className="xs:text-6xl sm:text-7xl lg:text-8xl font-vt323">
              {t("hero_title")}{" "}
              <TypeWritterEffect
                texts={texts}
                typingSpeed={100}
                deletingSpeed={100}
              />
            </h1>
            <p className="xs:text-xl sm:text-xl md:text-2xl font-zenKaku text-balance text-neutral/90">
              {t("description")}
            </p>
          </div>

          <div className="flex xs:flex-col sm:flex-col md:flex-row items-center gap-5">
            <button className="border-2 xs:w-full sm:w-full md:w-auto border-neutral px-12 py-2 font-vt323 text-2xl">
              {t("btn_1")}
            </button>
            <button className="border-2 xs:w-full sm:w-full md:w-auto border-purplePrimary bg-purplePrimary text-black px-12 py-2 font-vt323 text-2xl">
              {t("btn_2")}
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 relative flexCenter group">
          
              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flexCenter">
                <img
                  src={Satelite1}
                  alt={"Satelite image"}
                  className="w-[60%] h-auto group-hover:-translate-y-10 group-hover:scale-150 opacity-50 group-hover:opacity-100 transition duration-150 group-hover:drop-shadow-[0_35px_35px_rgba(154,17,217,0.80)]"
                />
              </div>
              {
                enhancedMode || internetSpeed !== "4G" ? (
                  ""
                ) : (
                  <Suspense>
                    <Spline scene="https://prod.spline.design/9vcpFirxkk4xMJe4/scene.splinecode" />
                  </Suspense>
                )
              }
        </div>
      </div>
    </header>
  );
};

export default Hero;
