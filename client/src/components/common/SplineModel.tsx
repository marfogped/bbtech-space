import React, { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";

interface SplineModelProps {
  splineModelUrl: string;
  delay?: number;
}

const SplineModel: React.FC<SplineModelProps> = ({
  splineModelUrl,
  delay = 500,
}) => {
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModel(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return <>{showModel && <Spline scene={splineModelUrl} />}</>;
};

export default SplineModel;
