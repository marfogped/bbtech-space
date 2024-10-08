import React from "react";
import { JobsProps } from "../../lib/types";
import { useSanity } from "../../lib/useSanity";
import { motion } from "framer-motion";
import { StaircaseVideo } from "../../lib/images";

interface JobCardProps {
  job: JobsProps;
  jobIdx: number;
  handleShowModal: (job: JobsProps | undefined) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, jobIdx, handleShowModal }) => {
  const { language } = useSanity();
  return (
    <motion.article
      className="container"
      layout
      key={job._id}
      initial={{ opacity: 0, y: 10 }}
      viewport={{ once: true }}
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
          <h3 className="heading text-neutral/90 w-full">{job?.title}</h3>
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

        <div className="back relative">
          <div className="absolute top-1/2 left-0 -z-[10] -translate-y-1/2 h-full w-full scale-150">
            <video autoPlay muted playsInline loop>
              <source src={StaircaseVideo} />
            </video>
          </div>
          <div className="absolute top-1/2 left-1/2 -z-[9] -translate-y-1/2 -translate-x-1/2 bg-black/40 h-full w-full"></div>

          <button
            className="font-zenKaku font-medium text-lg xxl:text-xl bg-purplePrimary w-10/12 py-1 flexCenter gap-4"
            type="button"
            onClick={() => {
              handleShowModal(job);
            }}
          >
            {language === "en" && "Apply Now"}{" "}
            {language === "es" && "Aplicar Ahora"}{" "}
            {language === "it" && "Applica Ora"}
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default JobCard;
