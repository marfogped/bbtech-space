import React, { useState, ReactNode } from "react";
import { client } from "../api/sanityClient";
import { HomeProps } from "../lib/types";
import { useTranslation } from "react-i18next";
import { transformSanityArrayToTranslationsObject } from "../lib/utils";

interface SanityContextProps {
  getHomePage: (language: string) => Promise<HomeProps[]>;
  setLanguage: (language: string) => void;
  isLoading: boolean;
  fetchError: boolean;
  language: string;
  translationsAreReady: boolean;
}

interface SanityProviderProps {
  children: ReactNode;
}

export const SanityContext = React.createContext<SanityContextProps | null>(
  null
);

export const SanityProvider = ({ children }: SanityProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const { i18n } = useTranslation();
  const [translationsAreReady, setTranslationsAreReady] = useState(false);
  const [language, setLanguage] = useState(i18n.language);

  const getHomePage = async (language: string) => {
    setTranslationsAreReady(false);
    try {
      const query = `*[_type == "home"]{
          ...,
          "services": services[]-> {
            ...,
            "description": description.${language},
            "title": title.${language},
            "tag": tag.${language},
            "btn": btn.${language}
          },
          "testimonials": testimonials[]-> {
            ...,
            "description": description.${language}
          },
          "jobs": jobs[]-> {
            ...,
            "areas": areas[]{
              "${language}": ${language}
            },
            "companyIcon" : companyIcon.asset->url
          },
        }`;

      const homeResult = await client.fetch(query);

      if (homeResult) {
        const translations = transformSanityArrayToTranslationsObject(
          homeResult,
          language
        );
        i18n.changeLanguage(language);
        setIsLoading(false);
        console.log(translations);
        setTranslationsAreReady(true);
        i18n.addResourceBundle(language, "home", translations);
        return homeResult;
      }
      return;
    } catch (error) {
      setIsLoading(false);
      setFetchError(true);
      console.log(error);
    }
  };

  const value: SanityContextProps = {
    getHomePage,
    setLanguage,
    isLoading,
    fetchError,
    language,
    translationsAreReady,
  };

  return (
    <SanityContext.Provider value={value}>{children}</SanityContext.Provider>
  );
};
