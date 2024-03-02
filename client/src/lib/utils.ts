export interface LocalizedString {
  en?: string;
  es?: string;
  it?: string;
  _type: "localizedString";
}

interface TranslationItem {
  [key: string]: LocalizedString | LocalizedString[];
}

export const transformSanityArrayToTranslationsObject = (
  sanityArray: TranslationItem[],
  language: string
): { [key: string]: string | LocalizedString[] } => {
  const translationsObject: { [key: string]: string | LocalizedString[] } = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isValidLanguageKey = (key: any): key is keyof LocalizedString => {
    return ["en", "es", "it"].includes(key);
  };

  sanityArray.forEach((item) => {
    Object.keys(item).forEach((key) => {
      const value = item[key];
      if (Array.isArray(value)) {
        // Asigna directamente el array sin modificar su contenido.
        translationsObject[key] = value;
      } else if (
        value &&
        typeof value === "object" &&
        value._type === "localizedString" &&
        isValidLanguageKey(language) &&
        value[language]
      ) {
        // Ahora es seguro acceder a 'value[language]' gracias a la comprobación de tipo.
        translationsObject[key] = value[language] as string;
      }
    });
  });

  return translationsObject;
};
