import { useState } from "react";
import LightContext from "./LightContext";

export const LightProvider = ({ children }) => {
  const [isLightOn, setIsLightOn] = useState(true);

  return (
    <LightContext.Provider value={{ isLightOn, setIsLightOn }}>
      {children}
    </LightContext.Provider>
  );
};
