import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SubSectionTranslation } from "../../lib/types";
import { useSanity } from "../../lib/useSanity";
import { LanguageSelector } from "..";
import { Link } from "react-router-dom";
import { MoveLeft } from "lucide-react";

const Terms: React.FC = () => {
    const [terms, setTerms] = useState<SubSectionTranslation[] | null>(null)
    const { t, i18n } = useTranslation("terms");
    const { language } = useSanity();

    useEffect(() => {
        const updateTexts = () => {    
          setTimeout(() => {
            const termsTranslations: SubSectionTranslation[] = t("subSections", {
              returnObjects: true,
            });
            setTerms(termsTranslations);
        }, 500);
        };
    
        updateTexts();
    
        i18n.on("languageChanged loaded", updateTexts);
    
        return () => {
          i18n.off("languageChanged loaded", updateTexts);
        };
      }, [i18n, t, language]);

  window.scrollTo(0,0)
  return (
    <section className="xs:w-full sm:w-full lg:w-[60%] mx-auto h-max xs:p-8 sm:p-8 xs:py-28 sm:py-28 py-32">
        <div className="flexCenter flex-col w-[50%] mx-auto gap-y-1 mb-20">
            <div className="flex items-center gap-x-2">
                <div className="flex items-center self-start gap-2">
                    <MoveLeft size={24} />
                    <Link className="font-zenKaku" to={"/"}>
                        {language === "en" && "Back Home"}{" "}
                        {language === "es" && "Volver al Inicio"}{" "}
                        {language === "it" && "Ritorno a casa"}
                    </Link>
                </div>

                <LanguageSelector />
            </div>


            <h1 className="font-bold text-neutral xs:text-2xl sm:text-2xl lg:text-5xl mb-4 text-pretty text-center">
                {t('section')}
            </h1>
            <h2 className="font-base xs:text-sm sm:text-sm lg:text-lg text-center">
                {t('lastUpdated')}
            </h2>
        </div>
        
        {terms && Array.isArray(terms)
            ? terms.map((item, itemIdx) => {
                return (
                <div className="xs:w-full sm:w-full w-[50%] my-8 mx-auto" key={itemIdx}>
                    <ol className="space-y-4">
                    <li>
                        <h3 className="font-bold text-neutral xs:text-lg sm:text-lg lg:text-2xl mb-2 text-pretty">{item.title}</h3>
                        <p className="text-balance mt-2 lg:text-lg xs:text-sm sm:text-sm">{item.content}</p>
                    </li>
                    </ol>
                </div>
                );
            })
            : ""}
    </section>
  );
};

export default Terms;