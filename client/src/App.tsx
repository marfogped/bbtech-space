import { Hero, About, Navbar, MatrixRain, Services } from "./components";
import "./lib/i18n";

function App() {
  return (
    <>
      <MatrixRain />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
      </main>
    </>
  );
}

export default App;
