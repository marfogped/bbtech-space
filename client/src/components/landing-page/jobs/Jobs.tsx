import React, { useRef, useEffect, useState } from "react";
import { JobCard, SectionTag, TypeWritterEffect } from "../..";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSanity } from "../../../lib/useSanity";
import { ChevronRight, ChevronLeft } from "lucide-react";
import JobDetails from "../../jobs/job-details/JobDetails";
import { JobsProps } from "../../../lib/types";
import "swiper/css";
import "swiper/css/pagination";

const Jobs: React.FC = () => {
  const swiperRef = useRef(null);
  const { t, i18n } = useTranslation("home");
  const { language } = useSanity();
  const [texts, setTexts] = useState<string[] | null>(null);
  const [jobs, setJobs] = useState<JobsProps[] | null>(null);

  const [selectedJob, setSelectedJob] = useState<JobsProps | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const updateTexts = () => {
      setTexts(null);

      setTimeout(() => {
        const jobsPurpleWord = t("jobs_purple_word");
        const secondJobsPurpleWord = t("jobs_purple_word_second");

        setTexts([jobsPurpleWord, secondJobsPurpleWord]);
        const jobs: JobsProps[] = t("jobs", {
          returnObjects: true,
        });

        setJobs(jobs);
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

  const handleShowModal = (job: JobsProps | undefined) => {
    if (job) {
      setSelectedJob(job);
      setShowModal(true);
    } else {
      setSelectedJob(null);
      setShowModal(false);
    }
  };

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
              {language === "en" && "See All Jobs"}
              {language === "es" && "Ver todos los Trabajos"}
              {language === "it" && "Vedi tutti i lavori"}
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
              ? jobs.map((job, jobIdx) => (
                  <SwiperSlide key={jobIdx}>
                    <JobCard
                      job={job}
                      jobIdx={jobIdx}
                      handleShowModal={handleShowModal}
                    />
                  </SwiperSlide>
                ))
              : ""}
          </Swiper>

          <div className="text-center mt-4 flex items-center justify-center mb-10 gap-2 py-4">
            <div aria-label="previous-jobs-button" className="swiper-button-prev cursor-pointer">
              <ChevronLeft size={48} />
            </div>
            <div aria-label="next-jobs-button" className="swiper-button-next cursor-pointer">
              <ChevronRight size={48} />
            </div>
          </div>
        </div>
      </div>
      <JobDetails
        selectedJob={selectedJob}
        setSelectedJob={setSelectedJob}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </section>
  );
};

export default Jobs;
