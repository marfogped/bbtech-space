import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSanity } from "../../lib/useSanity";
import { Link, useParams, useNavigate } from "react-router-dom";
import TypewriterEffect from "./TypeWritterEffect";
import { SectionTag } from "..";
import { HomeProps, JobsProps } from "../../lib/types";
import { ChevronDown, CheckCircle, XCircleIcon, MoveLeft } from "lucide-react";
import emailjs from "@emailjs/browser";
import { getLocalizedStrings, Translations } from "../../lib/utils";

interface ComponentProps {
  home?: HomeProps[] | null;
}

const Contact: React.FC<ComponentProps> = ({ home }) => {
  const [isSubdirectory, setIsSubdirectory] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<JobsProps | null>(null);
  const [showResponse, setShowResponse] = useState({
    response: "",
    text: "",
    show: false,
  });
  const [texts, setTexts] = useState<string[] | null>(null);
  const [errors, setErrors] = useState({
    firstName: "",
    email: "",
    phone: "",
    message: "",
    type: "",
  });

  const [translations, setTranslations] = useState<Translations | undefined>();
  const [showComponent, setShowComponent] = useState(true);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("home");
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
  }, [jobId]);

  useEffect(() => {
    const filterJob = () => {
      if (jobId) {
        setIsSubdirectory(true);
        const filteredJob = jobs.find((job) => job._id === jobId);
        if (filteredJob) setSelectedJob(filteredJob);
      }
    };
    const getAllJobs = async () => {
      const result = await getJobs(language);
      if (result) filterJob();
    };
    if (!jobs || !jobs.length) getAllJobs();
    else filterJob();

    const contactTranslations = getLocalizedStrings(language);
    setTranslations(contactTranslations);
  }, [jobId, jobs]);

  useEffect(() => {
    const component = home?.find((section) => section.type === "contact");
    if (component && component.showSection) setShowComponent(true);
    else setShowComponent(false);
  }, [home]);

  if (!showComponent) return null;

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formElement = event.currentTarget;
    const localErrors = {
      firstName: "",
      email: "",
      phone: "",
      message: "",
      type: "",
    };

    const firstName = formData.get("firstName")?.toString().trim() || "";
    const type = formData.get("type")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const phone = formData.get("phone")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";

    let formIsValid = true;
    if (!firstName) {
      localErrors.firstName = translations?.formValidations?.firstName || "";
      formIsValid = false;
    }
    if (!email) {
      localErrors.email = translations?.formValidations.email || "";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      localErrors.email = translations?.formValidations.invalidEmail || "";
      formIsValid = false;
    }
    if (!phone) {
      localErrors.phone = translations?.formValidations.phone || "";
      formIsValid = false;
    }
    if (!message) {
      localErrors.message = translations?.formValidations.message || "";
      formIsValid = false;
    }

    setErrors(localErrors);

    if (formIsValid) {
      setErrors({ firstName: "", email: "", phone: "", message: "", type: "" });

      const form = document.createElement("form");
      let emailMessage: undefined | string;

      if (isSubdirectory && selectedJob) {
        emailMessage = `
                Nombre: ${firstName}
                Email: ${email}
                Teléfono: ${phone}
                Mensaje: ${message}
                Tipo de usuario: ${type}
                Idioma: ${language}
                Oportunidad de interés: ${selectedJob.title} - ${selectedJob.areas} 
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
          (result: { status: number; text: string }) => {
            console.log(result);
            setShowResponse({
              response: "success",
              text: translations?.emailSenderResponse.success || "",
              show: true,
            });
            formElement.reset();
            setTimeout(() => {
              setShowResponse({ response: "", text: "", show: false });
              if (isSubdirectory) navigate("/");
            }, 15000);
          },
          (error) => {
            console.log(error.text);
            setShowResponse({
              response: "error",
              text: translations?.emailSenderResponse.error || "",
              show: false,
            });
          }
        );
    }
  };

  const workerOpt = translations ? translations?.userType.worker : "";
  const companyOpt = translations ? translations?.userType.company : "";
  const userTypeLabel = translations ? translations?.userType.label : "";

  return (
    <section
      className={`section-container ${
        isSubdirectory ? "h-screen flexCenter flex-col" : "py-24"
      }`}
    >
      <div className="flexCenter flex-col">
        {!isSubdirectory ? (
          <SectionTag index={5} label={t("contact_tag_label")} />
        ) : (
          <Link className="font-zenKaku flex items-center gap-2 mb-5" to={"/"}>
            <MoveLeft size={24} />
            {language === "en" && "Back Home"}{" "}
            {language === "es" && "Volver al Inicio"}{" "}
            {language === "it" && "Ritorno a casa"}
          </Link>
        )}
        <h2 className="xs:text-5xl sm:text-5xl lg:text-6xl font-vt323 text-pretty flex flex-col items-center">
          {t("contact_title")}
          <TypewriterEffect texts={texts} />
        </h2>
        <p className="xs:text-xl sm:text-xl md:text-2xl font-zenKaku text-balance text-center text-neutral/90 mt-5 lg:w-[70%]">
          {t("contact_description")}
        </p>
      </div>

      <div className="mt-10 w-full lg:w-[70%] mx-auto">
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
              <label className="form-label">{translations?.name}</label>
              {errors.firstName && (
                <span className="text-red-500 text-md">{errors.firstName}</span>
              )}
            </div>

            <div className="relative z-0">
              <ChevronDown size={28} className="absolute right-2 top-2" />
              {isSubdirectory ? (
                <select
                  name="type"
                  className="peer block w-full appearance-none border border-neutral bg-transparent p-1.5 text-lg text-neutral focus:border-purplePrimary focus:outline-none focus:ring-0 font-zenKaku"
                  disabled
                >
                  <option defaultValue="worker">{workerOpt}</option>
                  <option value="company">{companyOpt}</option>
                </select>
              ) : (
                <select
                  name="type"
                  className="peer block w-full appearance-none border border-neutral bg-transparent p-1.5 text-lg text-neutral focus:border-purplePrimary focus:outline-none focus:ring-0 font-zenKaku"
                >
                  <option value="worker">{workerOpt}</option>
                  <option defaultValue="company">{companyOpt}</option>
                </select>
              )}
              <label className="form-label">{userTypeLabel}</label>
              {errors.firstName && (
                <span className="text-red-500 text-md">{errors.type}</span>
              )}
            </div>

            <div className="relative z-0">
              <input
                type="text"
                name="email"
                className="peer form-input"
                placeholder=" "
              />
              <label className="form-label">{translations?.emailField}</label>
              {errors.firstName && (
                <span className="text-red-500 text-md">{errors.email}</span>
              )}
            </div>

            <div className="relative z-0">
              <input
                type="text"
                name="phone"
                className="peer form-input"
                placeholder=" "
              />
              <label className="form-label">{translations?.phoneField}</label>
              {errors.firstName && (
                <span className="text-red-500 text-md">{errors.phone}</span>
              )}
            </div>

            <div className="relative z-0 col-span-2">
              <textarea
                name="message"
                className="peer resize-none h-32 form-input"
                placeholder=" "
              ></textarea>
              <label className="form-label">{translations?.yourMessage}</label>
              {errors.message && (
                <span className="text-red-500 text-md">{errors.message}</span>
              )}
            </div>

            <div className="col-span-2 flex flex-col items-end justify-start">
              {showResponse.show ? (
                <div className="flex items-center gap-2">
                  {showResponse.response === "success" ? (
                    <CheckCircle className="text-green-600" size={24} />
                  ) : (
                    <XCircleIcon className="text-green-600" size={24} />
                  )}
                  {showResponse.text}
                </div>
              ) : (
                ""
              )}
              <button
                type="submit"
                className="mt-5 bg-purplePrimary px-10 py-2 text-neutral xs:w-full sm:w-full md:w-auto font-medium"
              >
                {language === "en" && "Send"} {language === "es" && "Enviar"}{" "}
                {language === "it" && "Invia"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
