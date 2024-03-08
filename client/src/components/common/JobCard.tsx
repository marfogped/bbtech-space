import React from 'react'
import { JobsProps } from '../../lib/types';
import { MoveRight } from 'lucide-react';
import { useSanity } from '../../lib/useSanity';
import { motion } from "framer-motion"

interface JobCardProps{
    job: JobsProps
    jobIdx: number
    handleShowModal: (job: JobsProps | undefined) => void;
}   

const JobCard: React.FC<JobCardProps> = ({ job, jobIdx, handleShowModal }) => {
    const { language } = useSanity()

    return (
        <motion.article 
        className="flex flex-col p-4 relative w-full bg-bkgGray/70 backdrop-blur h-96"
        layout
        key={job._id}
        initial={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5, delay: jobIdx * 0.1, ease: [0.87, 0, 0.13, 1] }}
        whileInView={{ opacity: 1, y: 0 }}
        >
            <div className="flexCenter flex-col">
                <img
                    src={job.companyIcon}
                    alt={job.company}
                    className="h-16 w-auto"
                />

                <div className="pt-4 flexCenter flex-col">
                    <h3 className="font-vt323 text-2xl xxl:text-3xl">
                        {job.company}
                    </h3>
                    <ul className="font-zenKaku flex items-center gap-x-1 flex-wrap justify-center">
                        {job.areas ? job.areas.map((area, areaIdx) => (
                            <React.Fragment key={areaIdx}>
                            <li className="text-neutral/90">
                                { area.area }
                            </li>
                            {
                                job.areas && areaIdx < job.areas.length - 1 && (
                                    <span>-</span>
                                )
                            }
                            </React.Fragment>
                        )) : ""
                        }
                    </ul>
                </div>
            </div>

            <div className="mt-10 flex flex-col flex-grow">
                <p className="font-lato text-lg font-zenKaku text-start text-neutral/90">
                    {job.employees} {language === "en" && "Employees"} {language === "es" && "Empleados"} {language === "it" && "Dipendenti"}
                </p>
                <p className="font-lato text-lg font-zenKaku text-start text-neutral/90">
                    {job.offices} {language === "en" && "Offices"} {language === "es" && "Oficinas"} {language === "it" && "Uffici"}
                </p>
            </div>

            <div className="pt-2">
                <button 
                className="font-zenKaku font-medium text-lg xxl:text-xl bg-purplePrimary w-full py-1 flexCenter gap-4"
                type='button'
                onClick={()=> {
                    handleShowModal(job)
                }}
                >
                    {job.jobs} {language === "en" && "Jobs"} {language === "es" && "Trabajos"} {language === "it" && "Lavori"}
                    <MoveRight size={28} />
                </button>
            </div>
        </motion.article>
    )
}

export default JobCard