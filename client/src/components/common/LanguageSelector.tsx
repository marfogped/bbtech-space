import React from "react";
import i18n from "../../lib/i18n";
import { useSanity } from "../../lib/useSanity";

const LanguageSelector: React.FC<{ onLanguageChange?: () => void }> = ({ onLanguageChange }) => {
  const { setLanguage, getHomePage } = useSanity();

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = event.target.value;
    setLanguage(selectedLang);
    getHomePage(selectedLang);
    if(onLanguageChange) onLanguageChange();
  };

  return (
    <select
      id="countries"
      className="border font-zenKaku text-sm block xs:w-full sm:w-full md:w-auto p-2.5 bg-bkgBlack border-bkgGray placeholder-gray-400 text-white focus:ring-purplePrimary focus:border-purplePrimary"
      onChange={changeLanguage}
      defaultValue={i18n.language}
    >
      <option aria-label="Español-option" value="es">🇪🇸 Español</option>
      <option aria-label="English-option" value="en">🇬🇧 English</option>
      <option aria-label="Italiano-option" value="it">🇮🇹 Italiano</option>
    </select>
  );
};

export default LanguageSelector;
