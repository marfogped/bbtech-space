import React, { useEffect, useState } from "react";
import { LanguageSelector } from "../..";
import { MoveLeft, SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { JobsProps } from "../../../lib/types";
import { motion } from "framer-motion";
import { useSanity } from "../../../lib/useSanity";
import { ListFilterIcon } from "lucide-react";
import Spline from "@splinetool/react-spline";

interface SelectedFilterProps {
  [key: string]: boolean;
}

interface JobsAsideProps {
  jobs: JobsProps[] | null;
  inputSearch: string;
  handleUserSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFilters: SelectedFilterProps;
  handleFilterChange: (filter: string) => void;
}

const JobsAside: React.FC<JobsAsideProps> = ({
  jobs,
  inputSearch,
  handleUserSearch,
  selectedFilters,
  handleFilterChange,
}) => {
  const { language } = useSanity();
  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    const extractAreas = (jobs: JobsProps[]) => {
      const allAreas: string[] = [];

      jobs.forEach((job) => {
        job.areas?.forEach((areaObj) => {
          const area = areaObj.area;

          if (area && !allAreas.includes(area)) {
            allAreas.push(area);
          }
        });
      });

      return allAreas;
    };
    if (jobs) setFilters(extractAreas(jobs));
  }, [jobs, language]);

  const inputPlaceholder =
    language === "en"
      ? "Search Opportunity"
      : language === "es"
      ? "Buscar Oportunidad"
      : "Opportunità di ricerca";

  const jobBoard =
    language === "en"
      ? "Job Board"
      : language === "es"
      ? "Bolsa de trabajo"
      : "Bacheca di lavoro";

  return (
    <>
      <nav className="bg-bkgGray/70 h-max backdrop-blur flexCenter flex-col p-3">
        <div className="flex items-center self-start gap-2">
          <MoveLeft size={24} />
          <Link className="font-zenKaku" to={"/"}>
            {language === "en" && "Back Home"}{" "}
            {language === "es" && "Volver al Inicio"}{" "}
            {language === "it" && "Ritorno a casa"}
          </Link>
        </div>

        <div className="flex flex-col items-center mb-4">
          <div className='h-32 w-48'>
              <Spline scene="https://prod.spline.design/jbbME-z8f2ozAgpR/scene.splinecode" />
          </div>
          <div className="flex flex-col items-center">
            <h1>BBTECH Space</h1>
            <h2 className="font-vt323 bg-purplePrimary w-max mt-2 text-2xl text-black">
              {jobBoard}
            </h2>
          </div>
        </div>

        <LanguageSelector />
      </nav>

      <div className="flex-1 bg-bkgGray/70 backdrop-blur p-3">
        <div className="flex items-center gap-2">
          <SearchIcon size={28} />
          <input
            type="text"
            value={inputSearch}
            onChange={handleUserSearch}
            placeholder={inputPlaceholder}
            className="w-full bg-transparent text-neutral text-lg border-b border-neutral py-1.5 px-3"
          />
        </div>

        <div className="pt-5">
          <h3 className="flex items-center gap-3 text-xl font-medium">
            {" "}
            <ListFilterIcon size={28} /> Filters
          </h3>
          <ul className="pt-2">
            {filters && filters.length
              ? filters.map((filter, filterIdx) => (
                  <motion.li
                    key={filterIdx}
                    initial={{ opacity: 0, y: 10 }}
                    transition={{
                      duration: 0.5,
                      delay: filterIdx * 0.1,
                      ease: [0.87, 0, 0.13, 1],
                    }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex cursor-pointer items-center rounded-full p-3"
                        htmlFor="checkbox"
                      >
                        <input
                          type="checkbox"
                          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-purplePrimary checked:bg-purplePrimary checked:before:bg-purplePrimary hover:before:opacity-10"
                          id={`checkbox-${filterIdx}`}
                          checked={!!selectedFilters[filter]}
                          onChange={() => handleFilterChange(filter)}
                        />
                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </label>
                    </div>
                    {filter}
                  </motion.li>
                ))
              : ""}
          </ul>
        </div>
      </div>
    </>
  );
};

export default JobsAside;
