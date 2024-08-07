import React from "react";
import { Modal } from "../..";
import { JobsProps } from "../../../lib/types";
import { useSanity } from "../../../lib/useSanity";

interface JobDetailsProps {
  selectedJob: JobsProps | null;
  setSelectedJob: (job: JobsProps | null) => void;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({
  selectedJob,
  setSelectedJob,
  showModal,
  setShowModal,
}) => {
  const { language } = useSanity();

  return (
    <Modal
      height="75vh"
      width="100vw"
      show={showModal}
      onClose={() => {
        setShowModal(false);
        setTimeout(() => {
          setSelectedJob(null);
        }, 400);
      }}
    >
      <section className="xs:w-full sm:w-full lg:w-[50%] lg:mx-auto h-full px-4">
        <div className="pt-12">
          <h3 className="text-lg lg:text-xl font-bold font-zenKaku">
            {language === "en" && "About the Opportunity"}{" "}
            {language === "es" && "Acerca de la Oportunidad"}{" "}
            {language === "it" && "Informazioni sull'opportunità"}
          </h3>
          <p className="text-balance pt-5 text-neutral/90 text-md lg:text-lg font-zenKaku">
            {selectedJob?.aboutWork}
          </p>
        </div>

        <div className="pt-12">
          <h3 className="text-lg lg:text-xl font-bold font-zenKaku">
            {language === "en" && "Responsibilities"}{" "}
            {language === "es" && "Responsabilidades"}{" "}
            {language === "it" && "Responsabilità"}
          </h3>
          <ul className="list-disc list-inside pt-5 w-full text-balance flex flex-col gap-2 text-neutral/90 text-md lg:text-lg font-zenKaku">
            {selectedJob && selectedJob.responsibilities
              ? selectedJob.responsibilities.map(
                  (responsibility, responsibilityIdx) => (
                    <li key={responsibilityIdx}>
                      {responsibility.responsibility}
                    </li>
                  )
                )
              : ""}
          </ul>
        </div>

        <div className="pt-12">
          <h3 className="text-lg lg:text-xl font-bold font-zenKaku">
            {language === "en" && "Requirements"}{" "}
            {language === "es" && "Requerimientos"}{" "}
            {language === "it" && "Requisiti"}
          </h3>
          <ul className="list-disc list-inside pt-5 w-full text-balance flex flex-col gap-2 text-neutral/90 text-md lg:text-lg font-zenKaku">
            {selectedJob && selectedJob.requirements
              ? selectedJob.requirements.map((requirement, requirementIdx) => (
                  <li key={requirementIdx}>{requirement.requirement}</li>
                ))
              : ""}
          </ul>
        </div>

        <div className="pt-12">
          <h3 className="text-lg lg:text-xl font-bold font-zenKaku">
            {language === "en" && "Opportunity Benefits"}{" "}
            {language === "es" && "Beneficios de la Oportunidad"}{" "}
            {language === "it" && "Vantaggi dell'opportunità"}
          </h3>
          <ul className="list-disc list-inside pt-5 w-full text-balance flex flex-col gap-2 text-neutral/90 text-md lg:text-lg font-zenKaku">
            {selectedJob && selectedJob.workBenefits
              ? selectedJob.workBenefits.map((workBenefit, workBenefitIdx) => (
                  <li key={workBenefitIdx}>{workBenefit.workBenefit}</li>
                ))
              : ""}
          </ul>
        </div>

        <p className="text-lg lg:text-xl font-zenKaku pt-16 font-bold">
          {language === "en" && (
            <span
              dangerouslySetInnerHTML={{
                __html:
                  'Send your application to <a href="mailto:cv@bbtech.space" class="underline font-bold">cv@bbtech.space</a>',
              }}
            />
          )}
          {language === "es" && (
            <span
              dangerouslySetInnerHTML={{
                __html:
                  'Envia tu postulacion a <a href="mailto:cv@bbtech.space" class="underline font-bold">cv@bbtech.space</a>',
              }}
            />
          )}
          {language === "it" && (
            <span
              dangerouslySetInnerHTML={{
                __html:
                  'Invia la tua candidatura a <a href="mailto:cv@bbtech.space" class="underline font-bold">cv@bbtech.space</a>',
              }}
            />
          )}
        </p>
      </section>
    </Modal>
  );
};

export default JobDetails;
