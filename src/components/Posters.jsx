import { useState, useRef } from "react";
import "../css/Posters.css";
import LightButton from "./LightButton";
import poster1 from "../assets/poster1.webp";
import rotate from "../assets/rotate.png";

export default function Posters() {
  const [isLightOn, setIsLightOn] = useState(true);
  const [xAxis, setXAxis] = useState(0);
  const [yAxis, setYAxis] = useState(0);

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
          <img
            src={poster1}
            className="poster"
            style={{
              transform: `scaleX(-1) translateX(${xAxis}px) translateY(${yAxis}px)`,
            }}
          />
        </div>
        {!isLightOn && <div className="light-overlay"></div>}
        {!isLightOn && <div className="light-shadow-overlay"></div>}
      </div>
      <LightButton isOn={isLightOn} toggleIsOn={toggleIsLightOn} />
      <div className="rotate-buttons">
        <RotatableButton handleAxis={setXAxis} />
        <RotatableButton handleAxis={setYAxis} />
      </div>
      <div className="frame-bottom-left"></div>
      <div className="frame-bottom">
        <p>Y-Axis</p>
        <p>X-Axis</p>
      </div>
      <div className="frame-bottom-right"></div>
    </div>
  );
}

function RotatableButton({ handleAxis }) {
  const [rotation, setRotation] = useState(0);
  const isDragging = useRef(false);
  const center = useRef({ x: 0, y: 0 });
  const prevAngle = useRef(0);
  const buttonRef = useRef(null);
  const minPx = -200;
  const maxPx = 200;
  const pxPerDeg = (maxPx - minPx) / 360;

  // Given a current angle (degrees)
  const mapDegToPx = (deg) => {
    const px = deg * pxPerDeg;
    return Math.max(minPx, Math.min(maxPx, px));
  };

  const getAngle = (x, y) => {
    return (
      Math.atan2(y - center.current.y, x - center.current.x) * (180 / Math.PI)
    );
  };

  const handleRotation = (rotation) => {
    setRotation(rotation);
  };

  const handlePointerDown = (e) => {
    isDragging.current = true;
    setBodyUserSelect("none");

    const rect = buttonRef.current.getBoundingClientRect();
    center.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    prevAngle.current = getAngle(e.clientX, e.clientY);
    buttonRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;

    const currentAngle = getAngle(e.clientX, e.clientY);
    let delta = currentAngle - prevAngle.current;

    // normalize the delta angle wrapping
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    const newRotation = rotation + delta;

    handleRotation(newRotation);
    const px = mapDegToPx(newRotation);
    handleAxis(px);

    prevAngle.current = currentAngle;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    setBodyUserSelect("");
  };

  const handleReset = () => {
    setRotation(0);
    handleAxis(0);
  };

  const setBodyUserSelect = (value) => {
    // prevent selecting texts
    document.body.style.userSelect = value;
  };

  return (
    <div>
      <div
        ref={buttonRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onDoubleClick={handleReset}
        className="rotatable-button"
      >
        <img
          src={rotate}
          alt=""
          draggable={false}
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      </div>
    </div>
  );
}
