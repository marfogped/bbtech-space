import React, { useEffect, useState } from "react";
import { AboutImg } from "../../../lib/images";
import { SectionTag, TypeWritterEffect } from "../..";
import { useTranslation } from "react-i18next";
import { useSanity } from "../../../lib/useSanity";

const About: React.FC = () => {
  const { t } = useTranslation("home");
  const { translationsAreReady } = useSanity();
  const [texts, setTexts] = useState<string[] | null>(null);

  const aboutPurpleWord = t("about_purple_word");
  const secondAboutPurpleWord = t("about_purple_word_second");

  useEffect(() => {
    if (aboutPurpleWord && secondAboutPurpleWord) {
      setTexts([aboutPurpleWord, secondAboutPurpleWord]);
    }
  }, [translationsAreReady, aboutPurpleWord, secondAboutPurpleWord]);

  return (
    <section className="w-full h-max py-24" id="about">
      <div className="section-container container-grid">
        <div className="lg:col-span-3 flex xs:justify-end sm:justify-end md:justify-center flex-col gap-5">
          <div className="flex flex-col gap-5">
            <SectionTag index={1} label={t("tag-label")} />
            <h2 className="xs:text-5xl sm:text-5xl lg:text-6xl font-vt323 text-pretty">
              {t("about_title")}{" "}
              <TypeWritterEffect
                texts={texts ? texts : null}
                typingSpeed={100}
                deletingSpeed={100}
              />
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
          <img
            src={AboutImg}
            alt="hero image"
            className="w-full h-auto aspect-square object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
