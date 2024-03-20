import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const customLanguageDetector = {
    name: "customLanguageDetector",
    lookup() {
        const storedLang = localStorage.getItem("i18nextLng");
        if (storedLang) {
            return storedLang.split("-")[0];
        }

        return null;
    },
    cacheUserLanguage(lng: string) {
        localStorage.setItem("i18nextLng", lng.split("-")[0]);
    },
};

i18n.use(HttpBackend)
    .use(LanguageDetector)

    .use({
        type: "languageDetector",
        async: false,
        init: () => {},
        detect: customLanguageDetector.lookup,
        cacheUserLanguage: customLanguageDetector.cacheUserLanguage,
    })
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        load: "languageOnly",
        detection: {
            order: [
                "customLanguageDetector",
                "navigator",
                "querystring",
                "cookie",
                "localStorage",
                "sessionStorage",
                "htmlTag",
            ],
            caches: ["localStorage"],
        },
        ns: [
            "navbar",
            "hero",
            "about",
            "services",
            "jobs",
            "testimonials",
            "footer",
            "terms",
            "privacy",
            "contact",
        ],
    });

export default i18n;
