import React, { useRef } from 'react';
import { SectionTag } from '../..';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

const Jobs: React.FC = () => {
    const swiperRef = useRef(null);
    const { t } = useTranslation('jobs');
    
    const jobs: {
        company: string;
        companyIcon: string;
        areas: string[];
        offices: number;
        employees: number;
        jobs: number;
        btn: string;
      }[] = t('jobs', { returnObjects: true });

  return (
    <section className="w-full h-max py-24">
        <div className="section-container container-grid">
            <div className="col-span-full flex xs:justify-end sm:justify-end md:justify-center flex-col gap-5">
                <div className="flex flex-col items-center gap-5">
                <SectionTag index={3} label={t('tag-label')} />
                <h2 className="xs:text-5xl sm:text-5xl lg:text-6xl text-center font-vt323 text-pretty">
                    {t('title')}{" "}
                    <span className="bg-purplePrimary block w-max mx-auto text-black">
                        {t('purple-word')}
                    </span>{" "}
                </h2>
                </div>
            </div>

            <div className="col-span-full flex flex-col">
                <div className='self-end py-2'>
                    <Link 
                    to={"/jobs"} 
                    className='text-neutral underline font-zenKaku text-xl'>
                        See All Jobs
                    </Link>
                </div>
                <Swiper
                ref={swiperRef}
                slidesPerView={4}
                centeredSlides={false}
                spaceBetween={20}
                grabCursor={true}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Navigation]}
                className="xs:w-[90%] sm:w-[90%] md:w-full"
                breakpoints={{
                    640: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                }}
                >
                    {
                        jobs.map((job, index) => (
                            <SwiperSlide key={index}>
                                <div className='flex flex-col p-4 relative w-full'>
                                    
                                    <div className='flexCenter flex-col'>
                                        <img 
                                        src={job.companyIcon} 
                                        alt={job.company}
                                        className='h-16 w-16 bg-purplePrimary rounded-full'
                                        />

                                        <div className='pt-4'>
                                            <h3 className='font-vt323 text-2xl xxl:text-3xl'>{job.company}</h3>
                                            <ul className='font-zenKaku flex items-center gap-2 flex-wrap'>
                                                {job.areas.map((area, areaIdx) => (
                                                    <React.Fragment key={areaIdx}>
                                                    <li className='text-neutral/90'>
                                                        {area}
                                                    </li>
                                                    {areaIdx < job.areas.length - 1 && <span>-</span>} {/* Agrega un guion después de cada elemento excepto el último */}
                                                    </React.Fragment>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className='mt-10 flex flex-col flex-grow'>
                                        <p className='font-lato text-lg font-zenKaku text-start text-neutral/90'>{job.employees} Employees</p>
                                        <p className='font-lato text-lg font-zenKaku text-start text-neutral/90'>{job.offices} Offices</p>
                                    </div>

                                    <div className='pt-4'>
                                        <button className='font-zenKaku font-medium text-lg xxl:text-xl bg-purplePrimary w-full py-1 flexCenter gap-4'>
                                            {job.jobs} {job.btn} 

                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1">
                                                <path d="M18 8L22 12L18 16"/>
                                                <path d="M2 12H22"/>
                                            </svg>

                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>

                <div className='text-center mt-4 flex items-center justify-center mb-10 gap-2 py-4'>
                    <button className="swiper-button-prev">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
                            <path d="m15 18-6-6 6-6"/>
                        </svg>
                    </button>
                    <button className="swiper-button-next"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                            <path d="m9 18 6-6-6-6"/>
                        </svg> 
                    </button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Jobs