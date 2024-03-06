/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, createContext, ReactNode } from "react";

interface EnhancerModeContextType {
  internetSpeed: string | null;
  enhancedMode: boolean;
}

export const EnhancerModeContext = createContext<EnhancerModeContextType>({
  internetSpeed: null,
  enhancedMode: true,
});

interface EnhancerModeProps {
  children: ReactNode;
}

const EnhancerMode: React.FC<EnhancerModeProps> = ({ children }) => {
  const [internetSpeed, setInternetSpeed] = useState<string | null>(null);
  const [enhancedMode, setEnhancedMode] = useState<boolean>(true);

  useEffect(() => {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const speed: string = connection ? connection.effectiveType : "unknown";
    setInternetSpeed(speed);

    const measureDevicePerformance = async (callback: (performance: boolean) => void) => {
      
      const load = performance.now();
      const threshold = 200;
      const acceptablePerformance = load < threshold;
      console.log(load, acceptablePerformance)
      callback(acceptablePerformance);
    };

    measureDevicePerformance((devicePerformance: boolean) => {
      const isEnhancedMode = checkConnectionSpeed(speed) && devicePerformance;
      setEnhancedMode(isEnhancedMode);
    });

    function checkConnectionSpeed(speed: string): boolean {
      return !(speed === "slow-2g" || speed === "2g" || speed === "3g" || speed === "slow-3g");
    }
  }, []);

  return (
    <EnhancerModeContext.Provider value={{ internetSpeed, enhancedMode }}>
      {children}
    </EnhancerModeContext.Provider>
  );
};

export default EnhancerMode;
