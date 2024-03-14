import React, { useEffect, useState, Suspense } from "react";
import { useSanity } from "../../lib/useSanity";
import { JobsProps } from "../../lib/types";
import JobsAside from "./aside/JobsAside";
import { AnimatePresence, motion } from "framer-motion";
import JobDetails from "./job-details/JobDetails";
import { JobCard } from "..";
import { Helmet } from 'react-helmet';
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
  window.scrollTo({ top: 0 }); 
  useEffect(() => {
    async function callJobs() {
      const allJobs = await getJobs(language);
      setJobs(allJobs);
    }
    callJobs();
  }, [language]);

  const filterJobs = (
    searchValue: string,
    filters: { [key: string]: boolean }
  ) => {
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

  const jobBoard =
    language === "en"
      ? "Job Board"
      : language === "es"
      ? "Bolsa de trabajo"
      : "Bacheca di lavoro";

  return (
    <>
      <Helmet>
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{ jobBoard } | IT Recruitment</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="description" content="Discover your next career opportunity with BBTECH Space Job Board. Specializing in IT recruitment, we connect top tech talents with innovative tech companies." />        <meta name="keywords" content="IT recruitment, technology, job opportunities, tech talent, innovative companies, software development, software engineering" />
        <meta property="og:title" content={`${ jobBoard } | IT Recruitment`} />
        <meta property="og:description" content="Discover your next career opportunity with BBTECH Space Job Board. Specializing in IT recruitment, we connect top tech talents with innovative tech companies." />
        <meta property="og:url" content="" />
        <meta property="og:image" content="/android-chrome-192x192.png" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content={language} />
        <meta name="theme-color" content="#0A0A0A" />
      </Helmet>

      <main>
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
                      <JobCard
                        job={job}
                        jobIdx={jobIdx}
                        key={job._id}
                        handleShowModal={handleShowModal}
                      />
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
      </main>
    </>
  );
};

export default JobsPage;
