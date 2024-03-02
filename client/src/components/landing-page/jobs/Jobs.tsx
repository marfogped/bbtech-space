import React, { useRef, useEffect, useState } from "react";
import { SectionTag, TypeWritterEffect } from "../..";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSanity } from "../../../lib/useSanity";
import { LocalizedString } from "../../../lib/utils";

interface JobsProps {
  company: string;
  companyIcon: string;
  areas: string[];
  offices: number;
  employees: number;
  jobs: number;
  btn: string;
}

const Jobs: React.FC = () => {
  const swiperRef = useRef(null);
  const { t } = useTranslation("home");
  const { translationsAreReady, language } = useSanity();
  const [texts, setTexts] = useState<string[] | null>(null);
  const [jobs, setJobs] = useState<JobsProps[] | null>(null);

  const jobsPurpleWord = t("jobs_purple_word");
  const secondJobsPurpleWord = t("jobs_purple_word_second");

  useEffect(() => {
    if (jobsPurpleWord && secondJobsPurpleWord) {
      setTexts([jobsPurpleWord, secondJobsPurpleWord]);
    }

    const jobs: JobsProps[] = t("jobs", {
      returnObjects: true,
    });

    setJobs(jobs);
  }, [translationsAreReady, jobsPurpleWord, secondJobsPurpleWord, t]);

  const lang: any = language as keyof LocalizedString;

  return (
    <section className="w-full h-max py-24" id="jobs">
      <div className="section-container container-grid">
        <div className="col-span-full flex xs:justify-end sm:justify-end md:justify-center flex-col gap-5">
          <div className="flex flex-col items-center gap-5">
            <SectionTag index={3} label={t("jobs_tag_label")} />
            <h2 className="xs:text-5xl sm:text-5xl lg:text-6xl text-center font-vt323 text-pretty flex flex-col items-center">
              {t("jobs_title")}{" "}
              <TypeWritterEffect
                texts={texts ? texts : null}
                typingSpeed={100}
                deletingSpeed={100}
              />
            </h2>
          </div>
        </div>

        <div className="col-span-full flex flex-col">
          <div className="self-end py-2">
            <Link
              to={"/jobs"}
              className="text-neutral underline font-zenKaku text-xl"
            >
              {t("all_jobs")}
            </Link>
          </div>
          <Swiper
            ref={swiperRef}
            slidesPerView={4}
            centeredSlides={false}
            spaceBetween={20}
            grabCursor={true}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Navigation]}
            className="xs:w-[90%] sm:w-[90%] md:w-full"
            breakpoints={{
              992: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
            }}
          >
            {jobs && Array.isArray(jobs)
              ? jobs.map((job, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex flex-col p-4 relative w-full">
                      <div className="flexCenter flex-col">
                        <img
                          src={job.companyIcon}
                          alt={job.company}
                          className="h-16 w-auto"
                        />

                        <div className="pt-4">
                          <h3 className="font-vt323 text-2xl xxl:text-3xl">
                            {job.company}
                          </h3>
                          <ul className="font-zenKaku flex items-center gap-2 flex-wrap">
                            {job.areas.map((area, areaIdx) => (
                              <React.Fragment key={areaIdx}>
                                <li className="text-neutral/90">
                                  {area[lang]}
                                </li>
                                {areaIdx < job.areas.length - 1 && (
                                  <span>-</span>
                                )}
                              </React.Fragment>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-10 flex flex-col flex-grow">
                        <p className="font-lato text-lg font-zenKaku text-start text-neutral/90">
                          {job.employees} {t("employees")}
                        </p>
                        <p className="font-lato text-lg font-zenKaku text-start text-neutral/90">
                          {job.offices} {t("offices")}
                        </p>
                      </div>

                      <div className="pt-4">
                        <button className="font-zenKaku font-medium text-lg xxl:text-xl bg-purplePrimary w-full py-1 flexCenter gap-4">
                          {job.jobs} {job.btn}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mt-1"
                          >
                            <path d="M18 8L22 12L18 16" />
                            <path d="M2 12H22" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              : ""}
          </Swiper>

          <div className="text-center mt-4 flex items-center justify-center mb-10 gap-2 py-4">
            <button className="swiper-button-prev">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-left"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button className="swiper-button-next">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jobs;
