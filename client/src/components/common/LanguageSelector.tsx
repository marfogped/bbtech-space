import React from 'react';
import i18n from '../../lib/i18n';

const LanguageSelector: React.FC = () => {
  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = event.target.value;
    i18n.changeLanguage(selectedLang);
  };

  return (
    <select 
    id="countries" 
    className="border font-zenKaku text-sm block xs:w-full sm:w-full md:w-auto p-2.5 bg-bkgBlack border-bkgGray placeholder-gray-400 text-white focus:ring-purplePrimary focus:border-purplePrimary"
    onChange={changeLanguage} defaultValue={i18n.language}
    >
      <option value="es">🇪🇸 Español</option>
      <option value="en">🇬🇧 English</option>
      <option value="it">🇮🇹 Italiano</option>
    </select>
  );
};

export default LanguageSelector;