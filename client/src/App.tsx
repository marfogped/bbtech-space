import { Hero, About, Navbar, MatrixRain } from "./components";
import "./lib/i18n";

function App() {
  return (
    <>
      <MatrixRain />
      <Navbar />
      <main>
        <Hero />
        <About />
      </main>
    </>
  );
}

export default App;
