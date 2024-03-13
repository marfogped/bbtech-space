import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useSanity } from '../../lib/useSanity';
import TypewriterEffect from './TypeWritterEffect';

const Contact: React.FC = () => {
    
    const { t, i18n } = useTranslation("contact");
    const { language } = useSanity();

    const [texts, setTexts] = useState<string[] | null>(null);

    useEffect(() => {
      const updateTexts = () => {
        setTexts(null); 
        
        setTimeout(() => {
          const contactPurpleWord = t("contact_purple_word");
          const secondContactPurpleWord = t("contact_purple_word_second");
          setTexts([contactPurpleWord, secondContactPurpleWord]);
        }, 500);
      };
  
      i18n.on("languageChanged loaded", updateTexts);
  
      return () => {
        i18n.off("languageChanged loaded", updateTexts);
      };
    }, [i18n, t, language]);
  
    const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <section className="section-container">
            <div className="flexCenter flex-col">
                <h2 className="xs:text-5xl sm:text-5xl lg:text-6xl font-vt323 text-pretty flex flex-col items-center">
                    {t("title")}
                    <TypewriterEffect texts={texts} />
                </h2>
                <p className='xs:text-xl sm:text-xl md:text-2xl font-zenKaku text-balance text-center text-neutral/90'>
                    {t("description")}
                </p>
            </div>

            <div className="col-span-3 md:col-span-3 xs:mt-10 sm:mt-10">
                <form
                action="POST"
                onSubmit={sendMessage}
                className="flex flex-col items-center gap-6 w-full"
                >
                    <div className="grid gap-6 sm:grid-cols-2 w-full">
                        <div className="relative z-0">
                            <input
                                type="text"
                                name="firstName"
                                className="peer form-input"
                                placeholder=" "
                            />
                            <label className="form-label">{t("name")}</label>
                        </div>

                        <div className="relative z-0">
                            <input
                                type="text"
                                name="lastName"
                                className="peer form-input"
                                placeholder=" "
                            />
                            <label className="form-label">Last name</label>
                        </div>

                        <div className="relative z-0">
                            <input
                                type="text"
                                name="email"
                                className="peer form-input"
                                placeholder=" "
                            />
                            <label className="form-label">{t("email")}</label>
                        </div>

                        <div className="relative z-0">
                            <input
                                type="text"
                                name="phone"
                                className="peer form-input"
                                placeholder=" "
                            />
                            <label className="form-label">{t("phone")}</label>
                        </div>

                        <div className="relative z-0 col-span-2">
                            <textarea
                                name="message"
                                className="peer resize-none h-32 form-input"
                                placeholder=" "
                            ></textarea>
                            <label className="form-label">{t("yourMessage")}</label>
                        </div>
                        
                        <button
                        type="submit"
                        className="mt-5 bg-purplePrimary px-10 py-2 text-neutral col-span-2"
                        >
                            {language === "en" && "Send Menssage"}{" "}
                            {language === "es" && "Enviar Mensaje"}{" "}
                            {language === "it" && "Invia messaggio"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Contact