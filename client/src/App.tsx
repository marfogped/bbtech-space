import { Hero, About, Navbar, MatrixRain, Services, Jobs, Testimonials, Footer } from "./components";
import "./lib/i18n";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {

  const location = useLocation();

  return (
    <>
      <MatrixRain />
      <Navbar />
      <main>
      <Routes location={location} key={location.pathname}>
        <Route 
        index 
        element={ 
          <>
            <Hero />
            <About />
            <Services />
            <Jobs />
            <Testimonials />
            <Footer />
          </>
        } 
        />
        <Route path="*" element={ <div>Error</div>} />
      </Routes>
      </main>
    </>
  );
}

export default App;
