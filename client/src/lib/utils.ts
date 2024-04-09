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
        translationsObject[key] = value;
      } else if (
        value &&
        typeof value === "object" &&
        value._type === "localizedString" &&
        isValidLanguageKey(language) &&
        value[language]
      ) {
        translationsObject[key] = value[language] as string;
      }
    });
  });

  return translationsObject;
};

interface Strings {
  [language: string]: {
    userType: {
      label: string;
      company: string;
      worker: string;
    };
    formValidations: {
      firstName: string;
      email: string;
      invalidEmail: string;
      phone: string;
      message: string;
      type: string;
    };
    emailSenderResponse: {
      success: string;
      error: string;
    };
    yourMessage: string;
    description: string;
    name: string;
    emailField: string;
    phoneField: string;
  };
}

export interface Translations {
  userType: {
    label: string;
    company: string;
    worker: string;
  };
  formValidations: {
    firstName: string;
    email: string;
    invalidEmail: string;
    phone: string;
    message: string;
    type: string;
  };
  emailSenderResponse: {
    success: string;
    error: string;
  };
  yourMessage: string;
  description: string;
  name: string;
  emailField: string;
  phoneField: string;
}

export function getLocalizedStrings(
  language: string
): Translations | undefined {
  const strings: Strings = {
    en: {
      userType: {
        label: "Type",
        company: "Company",
        worker: "Talent",
      },
      formValidations: {
        firstName: "Please enter your name.",
        email: "Please enter your email.",
        invalidEmail: "Your email is not valid.",
        phone: "Please enter your phone number.",
        message: "Please enter your message.",
        type: "Please select a type.",
      },
      emailSenderResponse: {
        success: "Email sent successfully.",
        error: "Oops! We encountered a problem while sending your message.",
      },
      yourMessage: "Write your message here...",
      description:
        "Ready to take the next big step in your career? At BBTECH Space, your potential knows no bounds. Connect with us today and discover how we can open doors to unparalleled opportunities in the tech world. Don't miss your chance to shine. Contact us now, and together we'll launch your career!",
      name: "Full Name",
      emailField: "Email",
      phoneField: "Phone",
    },
    es: {
      userType: {
        label: "Tipo",
        company: "Empresa",
        worker: "Talento",
      },
      formValidations: {
        firstName: "Por favor, ingrese su nombre.",
        email: "Por favor, ingrese su correo electrónico.",
        invalidEmail: "Su correo electrónico no es válido.",
        phone: "Por favor, ingrese su número de teléfono.",
        message: "Por favor, ingrese su mensaje.",
        type: "Por favor, seleccione un tipo.",
      },
      emailSenderResponse: {
        success: "Correo electrónico enviado con éxito.",
        error: "¡Ups! Hubo un problema al enviar su mensaje.",
      },
      yourMessage: "Escribe tu mensaje aquí...",
      description:
        "¿Listo para dar el siguiente gran paso en tu carrera? En BBTECH Space, tu potencial no conoce límites. Conéctate con nosotros hoy mismo y descubre cómo podemos abrir puertas a oportunidades incomparables en el mundo tecnológico. No pierdas tu oportunidad de brillar. ¡Contáctanos ahora y juntos lanzaremos tu carrera!",
      name: "Nombre Completo",
      emailField: "Email",
      phoneField: "Teléfono",
    },
    it: {
      userType: {
        label: "Tipo",
        company: "Azienda",
        worker: "Talento",
      },
      formValidations: {
        firstName: "Per favore, inserisci il tuo nome.",
        email: "Per favore, inserisci la tua email.",
        invalidEmail: "La tua mail non è valida.",
        phone: "Per favore, inserisci il tuo numero di telefono.",
        message: "Per favore, inserisci il tuo messaggio.",
        type: "Per favore, seleziona un tipo.",
      },
      emailSenderResponse: {
        success: "Email inviata con successo.",
        error: "Ops! Abbiamo avuto un problema nell'invio del tuo messaggio.",
      },
      yourMessage: "Scrivi il tuo messaggio qui...",
      description:
        "Pronto a fare il grande passo successivo nella tua carriera? In BBTECH Space, il tuo potenziale non conosce limiti. Connettiti con noi oggi e scopri come possiamo aprire le porte a opportunità senza pari nel mondo tecnologico. Non perdere la tua chance di brillare. Contattaci ora e insieme lanceremo la tua carriera!",
      name: "Nome Completo",
      emailField: "Email",
      phoneField: "Telefono",
    },
  };

  const translations: Translations = strings[language];

  return translations;
}

interface FooterStrings {
  [language: string]: {
    ourOffices: string;
    contact: string;
    forCompanies: string;
    forWorkers: string;
    copy: string;
    terms: string;
    privacy: string;
    faq: string;
  };
}

export interface FooterTranslations {
  ourOffices: string;
  contact: string;
  forCompanies: string;
  forWorkers: string;
  copy: string;
  terms: string;
  privacy: string;
  faq: string;
}

export function getFooterStrings(
  language: string
): FooterTranslations | undefined {
  const footerStrings: FooterStrings = {
    en: {
      ourOffices: "Command Centers",
      contact: "Contact",
      forCompanies: "Company",
      forWorkers: "Talents",
      copy: "© 2024 All Rights Reserved.",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
      faq: "FAQ",
    },
    es: {
      ourOffices: "Centros de Comando",
      contact: "Contacto",
      forCompanies: "Empresa",
      forWorkers: "Talento",
      copy: "© 2024 Todos los Derechos Reservados.",
      terms: "Términos de Servicio",
      privacy: "Política de Privacidad",
      faq: "Preguntas Frecuentes",
    },
    it: {
      ourOffices: "Centri di Comando",
      contact: "Contatto",
      forCompanies: "Aziende",
      forWorkers: "Talento",
      copy: "© 2024 Tutti i Diritti Riservati.",
      terms: "Termini di Servizio",
      privacy: "Politica sulla Privacy",
      faq: "FAQ",
    },
  };
  const translations: FooterTranslations = footerStrings[language];
  return translations;
}
