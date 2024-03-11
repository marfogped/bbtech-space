import {
  LandingPage,
  MatrixRain,
  JobsPage,
  InitialTransition,
  Transition,
  NotFound,
} from "./components";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./lib/i18n";

const routes = [
  { path: "/", element: <LandingPage /> },
  { path: "/jobs", element: <JobsPage /> },
  { path: "*", element: <NotFound /> },
];

function App() {
  const location = useLocation();

  return (
    <>
      <MatrixRain />
      <InitialTransition />
      <main>
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} className="h-full">
            <Transition />
            <Routes location={location} key={location.pathname}>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
}

export default App;
