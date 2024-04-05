import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Link as ExternalLink } from "lucide-react";
import {
  InstagramIcon,
  LinkedinIcon,
  FacebookIcon,
  MapPinned,
  MailIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Spline from "@splinetool/react-spline";
import { useSanity } from "../../lib/useSanity";
import { getFooterStrings, FooterTranslations } from "../../lib/utils";

const WhatsAppIcon = () => {
  return (
    <svg
      fill="#F5F5F5"
      height="32px"
      width="32px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 308 308"
      xmlSpace="preserve"
    >
      <g id="XMLID_468_">
        <path
          id="XMLID_469_"
          d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156
            c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687
            c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887
            c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153
            c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348
            c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802
            c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922
            c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0
            c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458
            C233.168,179.508,230.845,178.393,227.904,176.981z"
        />
        <path
          id="XMLID_470_"
          d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716
            c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396
            c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z
            M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188
            l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677
            c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867
            C276.546,215.678,222.799,268.994,156.734,268.994z"
        />
      </g>
    </svg>
  );
};

const DiscordIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32px"
      height="32px"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
      <path d="M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
      <path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-.972 1.923a11.913 11.913 0 0 0 -4.053 0l-.975 -1.923c-1.5 .16 -3.043 .485 -4.5 1.5c-2 5.667 -2.167 9.833 -1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2 -2 2 -3" />
      <path d="M7 16.5c3.5 1 6.5 1 10 0" />
    </svg>
  );
};

interface OfficesProps {
  country: string;
  address: string;
}

const Footer: React.FC = () => {
  const { t } = useTranslation("home");
  const { language } = useSanity();
  const [translations, setTranslations] = useState<
    FooterTranslations | undefined
  >(undefined);
  const [offices, setOffices] = useState<OfficesProps[] | null>(null);

  useEffect(() => {
    const foooterTranslations = getFooterStrings(language);
    setTranslations(foooterTranslations);

    const officcesArr: OfficesProps[] = t("offices", {
      returnObjects: true,
    });

    if (typeof officcesArr !== "string") {
      setOffices(officcesArr);
    }
  }, [language, t]);

  return (
    <footer className="w-full h-max bg-bkgGray/70 backdrop-blur rounded-t-[3rem] mt-24">
      <div className="section-container">
        <header className="grid xs:grid-cols-1 sm:grid-cols-1 lg:grid-cols-6 gap-10 pt-8">
          <div className="col-span-1 flex items-center justify-start">
            <div className="h-32 w-48">
              <Spline scene="https://prod.spline.design/jbbME-z8f2ozAgpR/scene.splinecode" />
            </div>
          </div>

          <div className="col-span-4 items-center justify-start xs:hidden sm:hidden lg:flex">
            <h3 className="font-vt323 text-5xl">{translations?.ourOffices}</h3>
          </div>

          <div className="col-span-1 flex items-center justify-start xs:hidden sm:hidden lg:flex">
            <h3 className="font-vt323 text-5xl">{translations?.contact}</h3>
          </div>
        </header>

        <section className="grid xs:grid-cols-1 sm:grid-cols-1 lg:grid-cols-6 gap-10 py-12">
          <div className="col-span-1 flex flex-col items-start justify-start gap-4">
            <div className="flex items-center gap-2 font-zenKaku xs:text-md sm:text-md xl:text-lg hover:scale-125">
              <a
                target="_blank"
                aria-label="Chat in WhatsApp"
                content="Chat in WhatsApp"
                href="https://wa.me/+5491165689687"
              >
                <WhatsAppIcon />
              </a>
            </div>
            <div className="flex items-center gap-2 font-zenKaku xs:text-md sm:text-md xl:text-lg hover:scale-125">
              <a
                target="_blank"
                aria-label="Instagram Official Website"
                content="Instagram Official Website"
                href="https://www.linkedin.com/in/barbitech/"
              >
                <InstagramIcon size={32} />
              </a>
            </div>
            <div className="flex items-center gap-2 font-zenKaku xs:text-md sm:text-md xl:text-lg hover:scale-125">
              <a
                target="_blank"
                href="https://www.facebook.com/bbtech.space"
                aria-label="Facebook Official Website"
                content="Facebook Official Website"
              >
                <FacebookIcon size={32} />
              </a>
            </div>
            <div className="flex items-center gap-2 font-zenKaku xs:text-md sm:text-md xl:text-lg hover:scale-125">
              <a
                target="_blank"
                href="https://www.linkedin.com/in/barbitech/"
                aria-label="LinkedIn Official Website"
                content="LinkedIn Official Website"
              >
                <LinkedinIcon size={32} />
              </a>
            </div>

            <div className="flex items-center gap-2 font-zenKaku xs:text-md sm:text-md xl:text-lg hover:scale-125">
              <a
                target="_blank"
                href="https://discord.com/channels/@me/1215722896442269696/1225505074785157172"
                aria-label="Discord Group"
                content="Discord Group"
              >
                <DiscordIcon />
              </a>
            </div>
          </div>

          <div className="col-span-4 flex items-start justify-between flex-wrap gap-4">
            {offices && offices.length
              ? offices.map((office, officeIdx) => (
                  <div
                    key={officeIdx}
                    className="flex flex-col items-start justify-start gap-4"
                  >
                    <div className="flex items-center gap-2 font-zenKaku xs:text-xl sm:text-xl xl:text-2xl font-semibold">
                      <MapPinned size={32} /> {office.country}
                    </div>
                    <div className="flex items-center text-wrap w-full gap-2 font-zenKaku xs:text-md sm:text-md xl:text-lg">
                      {office.address}
                    </div>
                  </div>
                ))
              : ""}
          </div>

          <div className="col-span-1 flex flex-col items-start justify-start">
            <div className="flex flex-col items-start justify-start gap-4">
              <div className="flex items-center gap-2 font-zenKaku xs:text-xl sm:text-xl xl:text-2xl font-semibold">
                <MailIcon size={32} /> {translations?.forCompanies}
              </div>
              <div className="flex items-center gap-2 font-zenKaku xs:text-md sm:text-md xl:text-lg">
                <a
                  className="underline flex items-center gap-2"
                  href="mailto:barbi@bbtech.space"
                  aria-label="companies mail redirect"
                >
                  barbi@bbtech.space
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            <div className="flex flex-col items-start justify-start gap-4 mt-4">
              <div className="flex items-center gap-2 font-zenKaku xs:text-xl sm:text-xl xl:text-2xl font-semibold">
                <MailIcon size={32} /> {translations?.forWorkers}
              </div>
              <div className="flex items-center gap-2 font-zenKaku xs:text-md sm:text-md xl:text-lg">
                <a
                  className="underline flex items-center gap-2"
                  href="mailto:cv@bbtech.space"
                  aria-label="workers mail redirect"
                >
                  cv@bbtech.space
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="w-full py-2 bg-purplePrimary">
        <div className="section-container flex xs:flex-col sm:flex-col lg:flex-row items-center justify-between">
          <div>
            <p>{translations?.copy}</p>
          </div>

          <ul className="flex items-center xs:pt-4 sm:pt-4 lg:pt-0 lg:gap-16 xs:flex-col sm:flex-col lg:flex-row xs:gap-y-1 sm:gap-y-1">
            <li>
              <Link to={`/terms-of-service`}>{translations?.terms}</Link>
            </li>
            <li>
              <Link to={`/privacy-policy`}>{translations?.privacy}</Link>
            </li>
            <li>
              <Link to={`/faq`}>{translations?.faq}</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
