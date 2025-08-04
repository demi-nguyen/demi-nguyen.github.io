import { useState } from "react";
import "../css/Posters.css";
import LightButton from "./LightButton";
import poster1 from "../assets/poster1.webp";

export default function Posters() {
  const [isLightOn, setIsLightOn] = useState(true);

  function toggleIsLightOn() {
    if (isLightOn) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    setIsLightOn(!isLightOn);
  }

  return (
    <div className="poster-frame">
      <div className="paper-border">
        <div className="paper">
          <img src={poster1} className="poster" />
          <img src={poster1} className="poster" />
          <img src={poster1} className="poster" />
        </div>
        {!isLightOn && <div className="light-overlay"></div>}
        {!isLightOn && <div className="light-shadow-overlay"></div>}
      </div>
      <div className="side-bar"></div>
      <LightButton isOn={isLightOn} toggleIsOn={toggleIsLightOn} />
    </div>
  );
}
