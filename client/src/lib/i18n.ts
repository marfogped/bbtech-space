import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
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
        interpolation: {
            escapeValue: false,
        },
        react: {
            bindI18n: "languageChanged",
            useSuspense: true,
        },
    });

export default i18n;
