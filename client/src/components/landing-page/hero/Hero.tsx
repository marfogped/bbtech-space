import React, { Suspense, lazy, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TypeWritterEffect, ScrollTo } from "../..";
import { useSanity } from "../../../lib/useSanity";
const SplineModel = lazy(() => import("../../common/SplineModel"));

const Hero: React.FC = () => {
  const { t, i18n } = useTranslation("home");
  const { language } = useSanity();
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
            <h1 className="xs:text-6xl sm:text-6xl lg:text-8xl font-vt323">
              {t("hero_title")} <TypeWritterEffect texts={texts} />
            </h1>
            <p className="xs:text-xl sm:text-xl md:text-2xl font-zenKaku text-balance text-neutral/90">
              {t("description")}
            </p>
          </div>

          <div className="flex xs:flex-col sm:flex-col md:flex-row items-center gap-5">
            <button className="border-2 xs:w-full sm:w-full md:w-auto border-neutral px-12 py-2 font-vt323 text-2xl">
              <ScrollTo id="about">{t("btn_1")}</ScrollTo>
            </button>
            <button className="border-2 xs:w-full sm:w-full md:w-auto border-purplePrimary bg-purplePrimary text-black px-12 py-2 font-vt323 text-2xl">
              <ScrollTo id="services">{t("btn_2")}</ScrollTo>
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 relative flexCenter my-auto group h-[500px]">
          <Suspense fallback={<div>Cargando...</div>}>
            <SplineModel
              splineModelUrl={
                "https://prod.spline.design/jbbME-z8f2ozAgpR/scene.splinecode"
              }
            />
          </Suspense>
        </div>
      </div>
    </header>
  );
};

export default Hero;
