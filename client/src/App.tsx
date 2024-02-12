import { Hero, About, Navbar, MatrixRain } from "./components";

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
