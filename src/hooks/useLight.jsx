import { useContext } from "react";
import LightContext from "../context/LightContext";

const useLight = () => {
  return useContext(LightContext);
};

export default useLight;
