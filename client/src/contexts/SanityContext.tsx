import React, { useState, ReactNode } from "react";
import { client } from "../api/sanityClient";
import { HomeProps, JobsProps } from "../lib/types";
import { useTranslation } from "react-i18next";
import { transformSanityArrayToTranslationsObject } from "../lib/utils";

interface SanityContextProps {
  getHomePage: (language: string) => Promise<HomeProps[]>;
  getJobs: (language: string) => Promise<JobsProps[]>;
  setLanguage: (language: string) => void;
  isLoading: boolean;
  fetchError: boolean;
  language: string;
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
  const [language, setLanguage] = useState(i18n.language);

  const getHomePage = async (language: string) => {
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

  const getJobs = async (language: string) => {
    try {
      const query = `*[_type == "jobs"]{
        ...,
        "areas": areas[]{
          "area": ${language}
        }, 
        "aboutWork": aboutWork.${language},
        "responsibilities": responsibilities[]{
          "responsibility": ${language}
        }, 
        "requirements": requirements[]{
          "requirement": ${language}
        }, 
        "workBenefits": workBenefits[]{
          "workBenefit": ${language}
        }, 
        "companyIcon" : companyIcon.asset->url
      }`;

      const jobsResult = await client.fetch(query);

      if (jobsResult) {
        const translations = transformSanityArrayToTranslationsObject(
          jobsResult,
          language
        );


        i18n.changeLanguage(language);
        i18n.addResourceBundle(language, "jobs", translations);
        setIsLoading(false);
        return jobsResult
      }
    } catch (error) {
      console.log(error)
    }
  }

  const value: SanityContextProps = {
    getHomePage,
    getJobs,
    setLanguage,
    isLoading,
    fetchError,
    language,
  };

  return (
    <SanityContext.Provider value={value}>{children}</SanityContext.Provider>
  );
};
