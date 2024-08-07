import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SectionTag, TypeWritterEffect } from "../..";
import {
  InstagramIcon,
  LinkedinIcon,
  FacebookIcon,
  TwitterIcon,
} from "lucide-react";
import useWindowDimensions from "../../../lib/useWindowDimensions";
import { useSanity } from "../../../lib/useSanity";
import { HomeProps } from "../../../lib/types";

interface TestimonialsProps {
  _id: string;
  username: string;
  userIcon: string;
  description: string;
  testimonialLink: string;
  socialMedia: string;
}

interface ComponentProps {
  home: HomeProps[] | null;
}

const Testimonials: React.FC<ComponentProps> = ({ home }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [texts, setTexts] = useState<string[] | null>(null);
  const [testimonials, setTestimonials] = useState<TestimonialsProps[] | null>(
    null
  );
  const [showComponent, setShowComponent] = useState(true);

  const { windowWidth } = useWindowDimensions();
  const { t, i18n } = useTranslation("home");
  const { language } = useSanity();

  useEffect(() => {
    const updateTexts = () => {
      setTexts(null);

      setTimeout(() => {
        const testimonialsPurpleWord = t("testimonials_purple_word");
        const secondTestimonialsPurpleWord = t(
          "testimonials_purple_word_second"
        );
        setTexts([testimonialsPurpleWord, secondTestimonialsPurpleWord]);

        const testimonials: TestimonialsProps[] = t("testimonials", {
          returnObjects: true,
        });

        setTestimonials(testimonials);
      }, 500);
    };

    updateTexts();

    i18n.on("languageChanged loaded", updateTexts);

    return () => {
      i18n.off("languageChanged loaded", updateTexts);
    };
  }, [i18n, t]);

  useEffect(() => {
    setTexts(null);
  }, [language]);

  useEffect(() => {
    const component = home?.find((section) => section.type === "testimonials");
    if (component && component.showSection) setShowComponent(true);
    else setShowComponent(false);
  }, [home]);

  if (!showComponent) return null;

  return (
    <section className="w-full h-max py-24">
      <div className="section-container">
        <div className="flex flex-col items-center gap-5">
          <SectionTag index={4} label={t("testimonials_tag_label")} />
          <h2 className="xs:text-5xl sm:text-5xl lg:text-6xl text-center flex flex-col items-center font-vt323 text-pretty">
            {t("testimonials_title")} <TypeWritterEffect texts={texts} />
          </h2>
          <p className="xs:text-xl sm:text-xl md:text-2xl font-zenKaku text-balance text-center text-neutral/90 mt-5">
            {t("testimonials_description")}
          </p>
        </div>

        <div
          className={`grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-12 ${
            windowWidth < 768 && !isExpanded
              ? "h-screen overflow-hidden"
              : "h-auto"
          } `}
        >
          {testimonials && Array.isArray(testimonials)
            ? testimonials.map((testimonial) => (
                <article key={testimonial._id} className="testimonial-card">
                  <div className="flex items-center gap-6 w-full">
                    <img
                      src={testimonial.userIcon}
                      alt={`${testimonial.username} user icon`}
                      className="h-20 rounded-full"
                    />

                    <div className="flex flex-col justify-start">
                      <h3 className="font-vt323 text-2xl">
                        {testimonial.username}
                      </h3>
                      <span className="flex items-center text-lg gap-2 font-zenKaku">
                        {testimonial.socialMedia === "Facebook" && (
                          <FacebookIcon size={20} />
                        )}
                        {testimonial.socialMedia === "Instagram" && (
                          <InstagramIcon size={20} />
                        )}
                        {testimonial.socialMedia === "LinkedIn" && (
                          <LinkedinIcon size={20} />
                        )}
                        {testimonial.socialMedia === "Twitter" && (
                          <TwitterIcon size={20} />
                        )}
                        {testimonial.socialMedia}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="font-zenKaku text-md">
                      {testimonial.description}
                    </p>
                  </div>

                  <div className="w-full flex justify-end mt-4">
                    <a
                      target="_blank"
                      className="underline text-neutral/90 hover:text-neutral font-zenKaku text-md"
                      href={testimonial.testimonialLink}
                      aria-label={`${testimonial.username} testimonial`}
                    >
                      {language === "en" && "See Post"}
                      {language === "es" && "Ver Publicación"}
                      {language === "it" && "Vedi Post"}
                    </a>
                  </div>
                </article>
              ))
            : ""}
        </div>
        {windowWidth < 768 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-2 text-center font-semibold text-neutral/80 hover:text-neutral transition-colors duration-200 underline text-xl mt-6"
          >
            {isExpanded ? (
              <>
                {language === "en" && "Show More"}
                {language === "es" && "Ver Más"}
                {language === "it" && "Vedi altro"}
              </>
            ) : (
              <>
                {language === "en" && "Show Less"}
                {language === "es" && "Ver Menos"}
                {language === "it" && "Vedi di meno"}
              </>
            )}
          </button>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
