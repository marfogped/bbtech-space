import React, { useEffect, useState, Suspense } from "react";
import { useSanity } from "../../lib/useSanity";
import { JobsProps } from "../../lib/types";
import JobsAside from "./aside/JobsAside";
import { AnimatePresence, motion } from "framer-motion";
import JobDetails from "./job-details/JobDetails";
import "./JobsPage.css";

const JobsPage: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<JobsProps | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [jobs, setJobs] = useState<JobsProps[] | null>(null);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [filteredJobs, setFilteredJobs] = useState<JobsProps[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: boolean;
  }>({});

  const { getJobs, language } = useSanity();

  useEffect(() => {
    async function callJobs() {
      const allJobs = await getJobs(language);
      console.log(allJobs);
      setJobs(allJobs);
    }
    callJobs();
  }, [language]);

  const filterJobs = (
    searchValue: string,
    filters: { [key: string]: boolean }
  ) => {
    console.log(searchValue, filters);

    let result = jobs || [];

    if (searchValue) {
      result = result.filter((job) =>
        Object.values(job).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }

    const activeFilters = Object.entries(filters)
      .filter(([_, value]) => value)
      .map(([key]) => key);
    if (activeFilters.length > 0) {
      result = result.filter((job) =>
        activeFilters.some((filter) => {
          console.log(job.areas?.some((area) => area.area === filter));
          return job.areas?.some((area) => area.area === filter);
        })
      );
    }

    setFilteredJobs(result);
  };

  const handleUserSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputSearch(value);
    filterJobs(value, selectedFilters);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev, [filter]: !prev[filter] };
      filterJobs(inputSearch, newFilters);
      return newFilters;
    });
  };

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
    <section className="w-full h-max overflow-hidden py-5">
      <div className="section-container container-grid">
        <aside className="col-span-1 h-max flex flex-col gap-y-5">
          <JobsAside
            jobs={jobs}
            inputSearch={inputSearch}
            handleUserSearch={handleUserSearch}
            selectedFilters={selectedFilters}
            handleFilterChange={handleFilterChange}
          />
        </aside>

        <motion.section
          layout
          className="col-span-4 grid xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="wait">
            <Suspense fallback="loading">
              {jobs &&
              filteredJobs &&
              (inputSearch || Object.keys(selectedFilters).length
                ? filteredJobs
                : jobs
              )?.length > 0 ? (
                (inputSearch || Object.keys(selectedFilters).length
                  ? filteredJobs
                  : jobs
                ).map((job, jobIdx) => (
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
                        <ul className="font-zenKaku flex items-center gap-x-1 flex-wrap justify-center">
                          {job.areas
                            ? job.areas.map((area, areaIdx) => (
                                <React.Fragment key={areaIdx}>
                                  <li className="text-neutral/90">
                                    {area.area}
                                  </li>
                                  {job.areas &&
                                    areaIdx < job.areas.length - 1 && (
                                      <span>-</span>
                                    )}
                                </React.Fragment>
                              ))
                            : ""}
                        </ul>
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
                          {language === "es" && "Trabajos"}{" "}
                          {language === "it" && "Lavori"}
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
                ))
              ) : (
                <div className="text-3xl font-bold col-span-full flexCenter text-pretty">
                  {language === "en" && "No matches found"}{" "}
                  {language === "es" && "No se encontraron coincidencias"}{" "}
                  {language === "it" && "Nessun risultato trovato"}
                </div>
              )}
            </Suspense>
          </AnimatePresence>
        </motion.section>
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

export default JobsPage;
