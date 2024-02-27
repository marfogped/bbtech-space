import React from 'react'
import { About, Footer, Hero, InitialTransition, Jobs, Services, Testimonials } from '..'

const LandingPage: React.FC = () => {
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