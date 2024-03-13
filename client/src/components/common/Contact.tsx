import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useSanity } from '../../lib/useSanity';
import { Link, useParams, useNavigate } from 'react-router-dom';
import TypewriterEffect from './TypeWritterEffect';
import { SectionTag } from '..';
import { JobsProps } from '../../lib/types';
import { ChevronDown, CheckCircle, XCircleIcon, MoveLeft } from 'lucide-react';
import emailjs from "@emailjs/browser";


const Contact: React.FC = () => {
    
    const [isSubdirectory, setIsSubdirectory] = useState<boolean>(false);
    const [selectedJob, setSelectedJob] = useState<JobsProps | null>(null)
    const [showResponse, setShowResponse] = useState({ response: '', text: '', show: false})
    const [texts, setTexts] = useState<string[] | null>(null);
    const [errors, setErrors] = useState({
        firstName: '',
        email: '',
        phone: '',
        message: '',
        type: ''
    });
    const navigate = useNavigate();
    const { t, i18n } = useTranslation("contact");
    const { language, jobs, getJobs } = useSanity();
    const { jobId } = useParams();


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

    useEffect(() => {
        const filterJob = () =>{
            if(jobId){
                setIsSubdirectory(true);
                const filteredJob = jobs.find( job => job._id === jobId);
                if(filteredJob) setSelectedJob(filteredJob)
              }
        }
        const getAllJobs = async () => {
            const result = await getJobs(language)
            if(result) filterJob()
        }
    if(!jobs || !jobs.length) getAllJobs()
    else filterJob()
    }, [jobId, jobs])
    
    const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formElement = event.currentTarget; 
        const localErrors = { firstName: '', email: '', phone: '', message: '', type: '' };

        const firstName = formData.get('firstName')?.toString().trim() || '';
        const type = formData.get('type')?.toString().trim() || '';
        const email = formData.get('email')?.toString().trim() || '';
        const phone = formData.get('phone')?.toString().trim() || '';
        const message = formData.get('message')?.toString().trim() || '';

        let formIsValid = true;
        if (!firstName) {
            localErrors.firstName = t("formValidations.firstName");
            formIsValid = false;
        }
        if (!email) {
            localErrors.email = t("formValidations.email");
            formIsValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            localErrors.email = t("formValidations.invalidEmail");
            formIsValid = false;
        }
        if (!phone) {
            localErrors.phone = t("formValidations.phone");
            formIsValid = false;
        }
        if (!message) {
            localErrors.message = t("formValidations.message");
            formIsValid = false;
        }

        setErrors(localErrors);

        if (formIsValid) {
            setErrors({ firstName: '', email: '', phone: '', message: '', type: '' });
            
            const form = document.createElement("form");
            let emailMessage: undefined | string

            if(isSubdirectory && selectedJob){
                emailMessage = `
                Nombre: ${firstName}
                Email: ${email}
                Teléfono: ${phone}
                Mensaje: ${message}
                Tipo de usuario: ${type}
                Idioma: ${language}
                Oportunidad de interés: ${selectedJob.company} - ${selectedJob.areas} 
                Puestos disponibles de la oportunidad: ${selectedJob.jobs}
                `;

                form.innerHTML = `
                    <input type="hidden" name="from_name" value="${firstName}">
                    <input type="hidden" name="from_email" value="${email}">
                    <input type="hidden" name="message_html" value="${emailMessage}">
                    `;
            } else {
                emailMessage = `
                Nombre: ${firstName}
                Email: ${email}
                Teléfono: ${phone}
                Mensaje: ${message}
                Tipo de usuario: ${type}
                Idioma: ${language}
                `;

                form.innerHTML = `
                    <input type="hidden" name="from_name" value="${firstName}">
                    <input type="hidden" name="from_email" value="${email}">
                    <input type="hidden" name="message_html" value="${emailMessage}">
                    `;
            }
          
            emailjs
            .sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                form,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
            .then(
              (result) => {
                setShowResponse({ response: 'success', text: t("emailSenderResponse.success"), show: true})
                formElement.reset();
                setTimeout(() => {
                    setShowResponse({ response: '', text: '', show: false})
                    if(isSubdirectory) navigate("/");
                }, 15000);
              },
              (error) => {
                console.log(error.text);
                setShowResponse({ response: 'error', text: t("emailSenderResponse.error"), show: false})
              }
            );
        }
    };

    const workerOpt = t("userType.worker");
    const companyOpt = t("userType.company")

    return (
        <section className={`section-container ${isSubdirectory ? "h-screen flexCenter flex-col" : "py-24"}`}>
            <div className="flexCenter flex-col">
                {
                    !isSubdirectory ? (
                        <SectionTag index={5} label={t("contact_tag_label")} />
                    ) : (
                        <div className="flex items-center gap-2 mb-5">
                            <MoveLeft size={24} />
                            <Link className="font-zenKaku" to={"/"}>
                                {language === "en" && "Back Home"}{" "}
                                {language === "es" && "Volver al Inicio"}{" "}
                                {language === "it" && "Ritorno a casa"}
                            </Link>
                        </div>
                    )
                }
                <h2 className="xs:text-5xl sm:text-5xl lg:text-6xl font-vt323 text-pretty flex flex-col items-center">
                    {t("title")}
                    <TypewriterEffect texts={texts} />
                </h2>
                <p className='xs:text-xl sm:text-xl md:text-2xl font-zenKaku text-balance text-center text-neutral/90 mt-5'>
                    {t("description")}
                </p>
            </div>

            <div className="mt-10 w-[70%] mx-auto">
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
                            {errors.firstName && <span className='text-red-500 text-md'>{errors.firstName}</span>}
                        </div>

                        <div className="relative z-0">
                            <ChevronDown 
                            size={28} 
                            className='absolute right-2 top-2' 
                            />
                            {
                                isSubdirectory ? (
                                    <select
                                        name="type"
                                        className="peer form-input font-zenKaku bg-bkgBlack"
                                        disabled
                                    >
                                        <option defaultValue="worker">{workerOpt}</option>
                                        <option value="company">{companyOpt}</option>
                                    </select>
                                ) : (

                                    <select
                                        name="type"
                                        className="peer form-input font-zenKaku bg-bkgBlack"
                                    >
                                        <option value="worker">{workerOpt}</option>
                                        <option defaultValue="company">{companyOpt}</option>
                                    </select>
                                )
                            }
                            <label className="form-label">{t("userType.label")}</label>
                            {errors.firstName && <span className='text-red-500 text-md'>{errors.type}</span>}
                        </div>

                        <div className="relative z-0">
                            <input
                                type="text"
                                name="email"
                                className="peer form-input"
                                placeholder=" "
                            />
                            <label className="form-label">{t("email")}</label>
                            {errors.firstName && <span className='text-red-500 text-md'>{errors.email}</span>}
                        </div>

                        <div className="relative z-0">
                            <input
                                type="text"
                                name="phone"
                                className="peer form-input"
                                placeholder=" "
                            />
                            <label className="form-label">{t("phone")}</label>
                            {errors.firstName && <span className='text-red-500 text-md'>{errors.phone}</span>}
                        </div>

                        <div className="relative z-0 col-span-2">
                            <textarea
                                name="message"
                                className="peer resize-none h-32 form-input"
                                placeholder=" "
                            ></textarea>
                            <label className="form-label">{t("yourMessage")}</label>
                            {errors.firstName && <span className='text-red-500 text-md'>{errors.message}</span>}
                        </div>
                        
                        <div className='col-span-2 flex flex-col items-end justify-start'>
                            {
                                showResponse.show ? (
                                    <div className='flex items-center gap-2'>
                                        {
                                            showResponse.response === "success" ? (
                                                <CheckCircle className='text-green-600' size={24} />
                                            ) : (
                                                <XCircleIcon className='text-green-600' size={24} />
                                            )
                                        }
                                        { showResponse.text }
                                    </div>
                                ) : ("")
                            }
                            <button
                            type="submit"
                            className="mt-5 bg-purplePrimary px-10 py-2 text-neutral xs:w-full sm:w-full md:w-auto font-medium"
                            >
                                {language === "en" && "Send Menssage"}{" "}
                                {language === "es" && "Enviar Mensaje"}{" "}
                                {language === "it" && "Invia messaggio"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Contact