import React, { useEffect, useState } from 'react';
import { About, Footer, Hero, InitialTransition, Jobs, Services, Testimonials } from '..';
import { useSanity } from '../../lib/useSanity';
import { HomeProps } from '../../lib/types';

const LandingPage: React.FC = () => {
  const { getHomePage, language } = useSanity();
  const [home, setHome] = useState<HomeProps[] | null>(null)
  console.log(home)

  useEffect(() => {
    if(!home){
      getHomePage(language)
      .then(( response ) => {
        setHome(response)
      });
    }
  }, [language, getHomePage, home])
  

  return (
    <>
        <InitialTransition />
        <Hero />
        <About />
        <Services />
        <Jobs />
        <Testimonials />
        <Footer />
    </>
  )
}

export default LandingPage