import React, { useEffect, useState } from "react";
import { SectionTag, TypeWritterEffect } from "../..";
import ServiceCard from "./components/ServiceCard";
import { useTranslation } from "react-i18next";
import { useSanity } from "../../../lib/useSanity";

interface ServiceProps {
  image: string;
  title: string;
  tag: string;
  description: string;
  btn: string;
  splineModelUrl: string;
}

const Services: React.FC = () => {
  const { t } = useTranslation("home");
  const { translationsAreReady } = useSanity();
  const [texts, setTexts] = useState<string[] | null>(null);
  const [services, setServices] = useState<ServiceProps[] | null>(null);

  const servicesPurpleWord = t("services_purple_word");
  const secondServicesPurpleWord = t("services_purple_word_second");

  useEffect(() => {
    if (servicesPurpleWord && secondServicesPurpleWord) {
      setTexts([servicesPurpleWord, secondServicesPurpleWord]);
    }

    const services: ServiceProps[] = t("services", {
      returnObjects: true,
    });

    setServices(services);
  }, [translationsAreReady, servicesPurpleWord, secondServicesPurpleWord, t]);

  return (
    <section className="w-full h-max py-24" id="services">
      <div className="section-container container-grid">
        <div className="col-span-full flex xs:justify-end sm:justify-end md:justify-center flex-col gap-5">
          <div className="flex flex-col items-center gap-5">
            <SectionTag index={2} label={t("tag-label")} />
            <h2 className="xs:text-5xl sm:text-5xl lg:text-6xl text-center font-vt323 flex flex-col items-center text-pretty">
              {t("services_title")}{" "}
              <TypeWritterEffect
                texts={texts ? texts : null}
                typingSpeed={100}
                deletingSpeed={100}
              />
            </h2>
          </div>
        </div>

        <div className="col-span-full grid xs:grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-5 xs:pt-10 sm:pt-16 md:pt-0">
          {services && Array.isArray(services)
            ? services.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))
            : ""}
        </div>
      </div>
    </section>
  );
};

export default Services;
