import React, { Suspense, lazy } from "react";
import { useEnhancerMode } from "../../../../lib/useEnhancerMode";
import {
  WorkersServiceImage,
  CompaniesServiceImage,
} from "../../../../lib/images";
const SplineModel = lazy(() => import("../../../common/SplineModel"));

interface Service {
  image: string;
  title: string;
  tag: string;
  description: string;
  btn: string;
  splineModelUrl: string;
}

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { internetSpeed, enhancedMode } = useEnhancerMode();

  const isForWorkers =
    service.tag === "For Workers" ||
    service.tag === "Per Lavoratori" ||
    service.tag === "Para Trabajadores"
      ? true
      : false;

  return (
    <article className="bg-bkgGray/70 backdrop-blur hover:shadow-xl shadow-purplePrimary flex flex-col justify-between p-4 h-full">
      <div className="flex flex-col gap-4">
        <div className="grid md:grid-cols-4 xs:grid-cols-1 xs:gap-0 sm:gap-0 md:gap-4 sm:grid-cols-1">
          <div className="col-span-1 flexCenter w-full">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-purplePrimary/60 flexCenter">
              {(internetSpeed === "4G" || internetSpeed === "unknown") &&
              !enhancedMode ? (
                <Suspense fallback={<div>Cargando...</div>}>
                  <SplineModel splineModelUrl={service.splineModelUrl} />
                </Suspense>
              ) : (
                <img
                  src={
                    isForWorkers ? WorkersServiceImage : CompaniesServiceImage
                  }
                  alt={
                    isForWorkers
                      ? "Workers Service Image"
                      : "Companies Service Image"
                  }
                  className="w-24 h-24 aspect-square object-contain"
                />
              )}
            </div>
          </div>

          <div className="col-span-3 flex flex-col xs:items-center sm:items-center md:items-start xs:text-center sm:text-center md:text-start">
            <h3 className="font-vt323 text-3xl xxl:text-4xl">
              {service?.title}
            </h3>
            <span className="font-vt323 bg-purplePrimary w-max mt-4 text-2xl text-black">
              {service?.tag}
            </span>
          </div>
        </div>

        <p className="font-zenKaku text-balance text-lg">
          {service?.description}
        </p>
      </div>

      <div className="self-end flex justify-end pt-8">
        <button className="border-2 xs:w-full sm:w-full md:w-auto border-purplePrimary bg-purplePrimary text-black px-12 py-1 font-vt323 text-2xl">
          {service?.btn}
        </button>
      </div>
    </article>
  );
};

export default ServiceCard;
