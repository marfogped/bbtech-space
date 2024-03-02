import React from "react";
import { EnhancerModeContext } from "../contexts/EnhancerModeContext";

export const useEnhancerMode = () => React.useContext(EnhancerModeContext);
