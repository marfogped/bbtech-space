import React from "react";
import Spline from "@splinetool/react-spline";

interface SplineModelProps {
  splineModelUrl: string;
}

const SplineModel: React.FC<SplineModelProps> = ({ splineModelUrl }) => {
  return <Spline scene={splineModelUrl} />;
};

export default SplineModel;
