import { HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useSanity } from "../../lib/useSanity";

const NotFound = () => {
  const { language } = useSanity();
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <div className="text-9xl font-bold font-vt323">404</div>
      <div className="text-3xl font-medium font-zenKaku">
        {language === "en" && "Page not found"}
        {language === "es" && "Página no encontrada"}{" "}
        {language === "it" && "Pagina non trovata"}
      </div>
      <p className="text-neutral/80 mt-3 text-xl font-normal font-zenKaku">
        {language === "en" &&
          "Sorry, we couldn't find the page you're looking for."}
        {language === "es" &&
          "Lo siento, no pudimos encontrar la página que estás buscando."}{" "}
        {language === "it" &&
          "Siamo spiacenti, non siamo riusciti a trovare la pagina che stai cercando."}
      </p>
      <div className="flex space-x-4 mt-6">
        <Link
          to={"/"}
          className="flex font-zenKaku items-center px-4 py-2 border border-transparent text-base font-medium shadow-sm text-white bg-purplePrimary/80 hover:bg-purplePrimary"
        >
          <HomeIcon className="mr-2" /> {language === "en" && "Back Home"}
          {language === "es" && "Volver al Inicio"}{" "}
          {language === "it" && "Ritorno a casa"}
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
