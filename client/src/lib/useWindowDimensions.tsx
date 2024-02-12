import { useEffect, useState } from "react";

export default function useWindowDimensions() {
  const [windowWidth, setwindowWidth] = useState<number>(0);
  const [windowHeight, setwindowHeight] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setwindowWidth(window.innerWidth);
      setwindowHeight(window.innerHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    windowWidth,
    windowHeight,
  };
}
