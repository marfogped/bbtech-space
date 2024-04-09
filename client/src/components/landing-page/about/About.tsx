import React, { Suspense, lazy, useEffect, useState } from "react";
import { SectionTag, TypeWritterEffect } from "../..";
import { useTranslation } from "react-i18next";
import { useSanity } from "../../../lib/useSanity";
const SplineModel = lazy(() => import("../../common/SplineModel"));

const About: React.FC = () => {
  const { t, i18n } = useTranslation("home");
  const { language } = useSanity();
  const [texts, setTexts] = useState<string[] | null>(null);

  useEffect(() => {
    const updateTexts = () => {
      setTexts(null);

      setTimeout(() => {
        const aboutPurpleWord = t("about_purple_word");
        const secondAboutPurpleWord = t("about_purple_word_second");

        setTexts([aboutPurpleWord, secondAboutPurpleWord]);
      }, 500);
    };

    i18n.on("languageChanged loaded", updateTexts);

    return () => {
      i18n.off("languageChanged loaded", updateTexts);
    };
  }, [i18n, t]);

  useEffect(() => {
    setTexts(null);
  }, [language]);

  return (
    <section className="w-full h-max py-24" id="about">
      <div className="section-container container-grid">
        <div className="lg:col-span-3 flex xs:justify-end sm:justify-end md:justify-center flex-col gap-5">
          <div className="flex flex-col gap-5">
            <SectionTag index={1} label={t("about_tag_label")} />
            <h2 className="xs:text-5xl sm:text-5xl lg:text-6xl font-vt323 text-pretty">
              {t("about_title")}{" "}
              <TypeWritterEffect texts={texts ? texts : null} />
            </h2>
            <p className="xs:text-xl sm:text-xl md:text-2xl font-zenKaku text-balance text-neutral/90">
              {t("description_1")}
            </p>
            <p className="xs:text-xl sm:text-xl md:text-2xl font-zenKaku text-balance text-neutral/90">
              {t("description_2")}
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 relative flexCenter overflow-hidden">
          <div className="w-[80%] h-[80%]">
            <Suspense fallback={<div>Cargando...</div>}>
              <SplineModel
                splineModelUrl={
                  "https://prod.spline.design/1mUP4c2L0lLRj1Z0/scene.splinecode"
                }
              />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
