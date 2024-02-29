interface LocalizedString {
    en?: string;
    es?: string;
    it?: string;
    _type: "localizedString";
}

interface TranslationItem {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: LocalizedString | any;
}

export const transformSanityArrayToTranslationsObject = (
    sanityArray: TranslationItem[],
    language: string
): { [key: string]: string } => {
    const translationsObject: { [key: string]: string } = {};

    sanityArray.forEach((item) => {
        Object.keys(item).forEach((key) => {
            const value = item[key];

            if (
                value &&
                typeof value === "object" &&
                value._type === "localizedString" &&
                value[language]
            ) {
                translationsObject[key] = value[language];
            }
        });
    });

    return translationsObject;
};
