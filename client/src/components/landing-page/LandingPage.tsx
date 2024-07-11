import React, { useEffect, useState } from "react";
import {
  About,
  Footer,
  Hero,
  Jobs,
  Services,
  Testimonials,
  Navbar,
  Contact,
} from "..";
import { useSanity } from "../../lib/useSanity";
import { HomeProps } from "../../lib/types";

const LandingPage: React.FC = () => {
  const { getHomePage, language } = useSanity();
  const [home, setHome] = useState<HomeProps[] | null>(null);

  useEffect(() => {
    if (!home) {
      getHomePage(language).then((response) => {
        setHome(response);
      });
    }
  }, [language, getHomePage, home]);

  return (
    <>
      <Navbar />
      <main className="max-w-screen overflow-hidden">
        <Hero home={home} />
        <About home={home} />
        <Services home={home} />
        <Jobs home={home} />
        <Testimonials home={home} />
        <Contact home={home} />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
