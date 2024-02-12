import React from "react";
import { Logo } from "../../lib/images";
// import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  // const { t } = useTranslation();

  return (
    <nav className="z-50 w-full h-max fixed">
      <div className="section-container flex items-center justify-between py-4">
        <div className="flexCenter">
          <img src={Logo} alt="bbtech logo" className="h-14 w-auto" />
        </div>
        <ul className="flex items-center gap-5 font-zenKaku">
          <li>What We Do</li>
          <li>Services</li>
          <li>Jobs</li>
          <li>Sponsors</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
