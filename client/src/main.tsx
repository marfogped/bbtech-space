import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SanityProvider } from "./contexts/SanityContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SanityProvider>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </SanityProvider>
);
