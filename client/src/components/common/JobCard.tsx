import React from "react";
import { JobsProps } from "../../lib/types";
import { useSanity } from "../../lib/useSanity";
import { motion } from "framer-motion";

interface JobCardProps {
  job: JobsProps;
  jobIdx: number;
  handleShowModal: (job: JobsProps | undefined) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, jobIdx, handleShowModal }) => {
  const { language } = useSanity();

  console.log(job);

  return (
    <motion.article
      className="container"
      layout
      key={job._id}
      initial={{ opacity: 0, y: 10 }}
      transition={{
        duration: 0.5,
        delay: jobIdx * 0.1,
        ease: [0.87, 0, 0.13, 1],
      }}
      whileInView={{ opacity: 1, y: 0 }}
      onClick={() => {
        handleShowModal(job);
      }}
    >
      <div className="card">
        <div className="front font-zenKaku">
          <h3 className="heading">
            {language === "en" && "Opportunity Areas"}{" "}
            {language === "es" && "Áreas de la Oportunidad"}{" "}
            {language === "it" && "Aree di opportunità"}
          </h3>
          <div className="font-zenKaku flex items-center gap-x-1 flex-wrap justify-center">
            {job.areas
              ? job.areas.map((area, areaIdx) => (
                  <React.Fragment key={areaIdx}>
                    <p className="text-neutral/90">{area.area}</p>
                    {job.areas && areaIdx < job.areas.length - 1 && (
                      <span>-</span>
                    )}
                  </React.Fragment>
                ))
              : ""}
          </div>
        </div>

        <div className="back">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="72"
            height="72"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
            <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
            <path d="M10 6h4" />
            <path d="M10 10h4" />
            <path d="M10 14h4" />
            <path d="M10 18h4" />
          </svg>

          <p className="heading">
            {job.jobs} {language === "en" && "Jobs"}{" "}
            {language === "es" && "Trabajos"} {language === "it" && "Lavori"}
          </p>

          <button
            className="font-zenKaku font-medium text-lg xxl:text-xl bg-purplePrimary w-10/12 py-1 flexCenter gap-4"
            type="button"
            onClick={() => {
              handleShowModal(job);
            }}
          >
            {language === "en" && "See Opportunity"}{" "}
            {language === "es" && "Ver Oportunidad"}{" "}
            {language === "it" && "Vedi Opportunità"}
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default JobCard;
