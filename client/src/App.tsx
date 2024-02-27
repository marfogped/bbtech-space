import { LandingPage, MatrixRain, Navbar } from "./components";
import { Route, Routes, useLocation } from "react-router-dom";
import "./lib/i18n";

const routes = [
  { path: "/", element: <LandingPage /> },
  { path: "*", element: <div>Error</div> },
];

function App() {

  const location = useLocation();

  return (
    <>
      <MatrixRain />
      <Navbar />
      <main>
      <Routes location={location} key={location.pathname}>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
      </main>
    </>
  );
}

export default App;
