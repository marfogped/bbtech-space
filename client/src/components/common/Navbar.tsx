import React, { useEffect, useState } from "react";
import { Logo } from "../../lib/images";
import { LanguageSelector, ScrollTo } from "..";
import useWindowDimensions from "../../lib/useWindowDimensions";
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [color, setColor] = useState<boolean>(false);
  const { windowWidth } = useWindowDimensions();
  const { t } = useTranslation('navbar');

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
  return (
    <nav
      className={`z-50 w-screen h-max fixed transition-all duration-300 ${
        color ? "backdrop-blur-md" : ""
      }`}
    >
      <div className="section-container flex items-center justify-between py-4">
        <div className="flexCenter">
          <img src={Logo} alt="bbtech logo" className="h-14 w-auto" />
        </div>

        {windowWidth > 768 ? (
          <div className="flex items-center gap-4">
            <ul className="flex items-center gap-5 font-zenKaku text-xl">
              <li>
                <ScrollTo id="about">
                  {t('about')}
                </ScrollTo>
              </li>
              <li>
                <ScrollTo id="services">
                  {t('services')}
                </ScrollTo>
              </li>
              <li>
                <ScrollTo id="jobs">
                  {t('jobs')}
                </ScrollTo>
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
    </nav>
  );
};

export default Navbar;
