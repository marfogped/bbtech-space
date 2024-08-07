import React, { useEffect, useState, useRef, lazy, Suspense } from "react";
import { LanguageSelector, ScrollTo } from "..";
import useWindowDimensions from "../../lib/useWindowDimensions";
import { useTranslation } from "react-i18next";
const SplineModel = lazy(() => import("../common/SplineModel"));

const Navbar: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [color, setColor] = useState<boolean>(false);

  const { windowWidth } = useWindowDimensions();
  const { t } = useTranslation("home");
  const navRef = useRef<HTMLElement | null>(null);

  const openNav = () => {
    setIsActive(!isActive);
  };

  const changeColor = () => {
    if (window.scrollY >= 60) {
      setColor(true);
    } else if (window.scrollY <= 60) {
      setColor(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return () => {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    if (isActive && windowWidth < 768) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive, windowWidth]);

  return (
    <>
      <header
        className={`z-50 w-screen h-max fixed transition-all duration-300 ${
          color && !isActive ? "backdrop-blur-md" : ""
        }`}
      >
        <div className="section-container flex items-center justify-between py-4">
          <div className="flexCenter">
            <div className="h-24 w-40 xxl:h-36 xxl:w-52">
              <Suspense fallback={<div>Cargando...</div>}>
                <SplineModel
                  splineModelUrl={
                    "https://prod.spline.design/jbbME-z8f2ozAgpR/scene.splinecode"
                  }
                />
              </Suspense>
            </div>
          </div>

          {windowWidth > 768 ? (
            <div className="flex items-center gap-4">
              <ul className="flex items-center gap-5 font-zenKaku text-xl">
                <li>
                  <ScrollTo id="about">{t("navbar_about")}</ScrollTo>
                </li>
                <li>
                  <ScrollTo id="services">{t("navbar_services")}</ScrollTo>
                </li>
                <li>
                  <ScrollTo id="jobs">{t("navbar_jobs")}</ScrollTo>
                </li>
              </ul>

              <LanguageSelector />
            </div>
          ) : (
            <div className="menu-toggle xs:flex sm:flex md:hidden">
              <div
                onClick={openNav}
                id="menu-toggle-btn"
                className={isActive ? "active" : ""}
              >
                <span className={"white"}></span>
              </div>
            </div>
          )}
        </div>
      </header>

      {windowWidth < 768 ? (
        <nav
          className={`${
            isActive
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          } backdrop-blur-md z-40 transition-all fixed top-0 left-0 w-screen h-max p-4 flex flex-col items-center`}
        >
          <ul className="flex flex-col h-max items-center gap-5 font-zenKaku text-3xl mb-8 pt-20">
            <li>
              <ScrollTo id="about">{t("navbar_about")}</ScrollTo>
            </li>
            <li>
              <ScrollTo id="services">{t("navbar_services")}</ScrollTo>
            </li>
            <li>
              <ScrollTo id="jobs">{t("navbar_jobs")}</ScrollTo>
            </li>
          </ul>

          <LanguageSelector onLanguageChange={() => setIsActive(false)} />
        </nav>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
