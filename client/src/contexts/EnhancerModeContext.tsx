/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, createContext, ReactNode } from "react";

interface EnhancerModeContextType {
  internetSpeed: string | null;
  devicePerformance: boolean | null;
  enhancedMode: boolean;
}

export const EnhancerModeContext = createContext<EnhancerModeContextType>({
  internetSpeed: null,
  devicePerformance: null,
  enhancedMode: true,
});

interface EnhancerModeProps {
  children: ReactNode;
}

const EnhancerMode: React.FC<EnhancerModeProps> = ({ children }) => {
  const [internetSpeed, setInternetSpeed] = useState<string | null>(null);
  const [devicePerformance, setDevicePerformance] = useState<boolean | null>(
    null
  );
  const [enhancedMode, setEnhancedMode] = useState<boolean>(true);

  useEffect(() => {
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;
    const speed: string = connection ? connection.effectiveType : "unknown";
    setInternetSpeed(speed);

    const measureGraphicPerformance = (
      callback: (performance: boolean) => void
    ) => {
      const start = performance.now();

      requestAnimationFrame(() => {
        const end = performance.now();
        const duration = end - start;
        const thresholdTime = 100;
        const acceptablePerformance = duration < thresholdTime;
        callback(acceptablePerformance);
      });
    };

    measureGraphicPerformance((graphicPerformance: boolean) => {
      const isEnhancedMode = checkConnectionSpeed(speed) && graphicPerformance;
      setDevicePerformance(graphicPerformance);
      setEnhancedMode(isEnhancedMode);
    });

    function checkConnectionSpeed(speed: string): boolean {
      return !(speed === "slow-2g" || speed === "2g" || speed === "3g");
    }
  }, []);

  return (
    <EnhancerModeContext.Provider
      value={{ internetSpeed, devicePerformance, enhancedMode }}
    >
      {children}
    </EnhancerModeContext.Provider>
  );
};

export default EnhancerMode;
