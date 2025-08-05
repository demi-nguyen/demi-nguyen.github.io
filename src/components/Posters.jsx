import { useState, useRef, useEffect } from "react";
import "../css/Posters.css";
import LightButton from "./LightButton";
import routine from "../assets/posters/routine.webp";
import questions from "../assets/posters/Questions.png";
import moss from "../assets/posters/Moss-final.png";
import consuming from "../assets/posters/Consuming.png";
import breath from "../assets/posters/Breathe-Ps.png";
import porsche from "../assets/posters/Porsche.png";
import yakult from "../assets/posters/Yakult-Ps.png";
import rotate from "../assets/rotate.png";
import wheel from "../assets/wheel.png";

export default function Posters() {
  const [isLightOn, setIsLightOn] = useState(true);
  const [xAxis, setXAxis] = useState(0);
  const [yAxis, setYAxis] = useState(0);
  const [containerYAxis, setContainerYAxis] = useState(0);
  const [zoom, setZoom] = useState(0);
  const xLimit = { min: -200, max: 200 };
  const yLimit = { min: -300, max: 300 };
  const maxZoom = 5;

  function toggleIsLightOn() {
    if (isLightOn) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    setIsLightOn(!isLightOn);
  }

  useEffect(() => {
    function updateClipPath() {
      const element = document.querySelector(".poster-frame");
      const rect = element.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Scale the coordinates based on actual dimensions
      const scaledPath = `path("M0,0 H${width} V${height} H0 Z M0,${
        height * 0.3
      } Q${width * 0.1},${height * 0.19} 0,${height * 0.1} Z")`;

      element.style.clipPath = scaledPath;
    }

    updateClipPath();

    // Update on load and resize
    window.addEventListener("resize", updateClipPath);
    return () => {
      window.removeEventListener("resize", updateClipPath);
    };
  }, []);

  const scale = 1 + zoom;
  const posterStyle = {
    transform: `scaleX(-${scale}) scaleY(${scale}) translateX(${xAxis}px) translateY(${yAxis}px)`,
  };

  return (
    <div className="poster-wrapper">
      <div className="poster-frame">
        <div className="paper-border">
          <div className="paper">
            <div
              className="poster-container"
              style={{ transform: `translateY(-${containerYAxis}px)` }}
            >
              <div className="poster-viewer">
                <img src={routine} className="poster" style={posterStyle} />
              </div>
              <div className="poster-viewer">
                <img src={questions} className="poster" style={posterStyle} />
              </div>
              <div className="poster-viewer">
                <img src={consuming} className="poster" style={posterStyle} />
              </div>
              <div className="poster-viewer">
                <img src={moss} className="poster" style={posterStyle} />
              </div>
              <div className="poster-viewer">
                <img src={breath} className="poster" style={posterStyle} />
              </div>
              <div className="poster-viewer">
                <img src={porsche} className="poster" style={posterStyle} />
              </div>
              <div className="poster-viewer">
                <img src={yakult} className="poster" style={posterStyle} />
              </div>
            </div>
          </div>
          {!isLightOn && <div className="light-overlay"></div>}
          {!isLightOn && <div className="light-shadow-overlay"></div>}
        </div>
        <LightButton isOn={isLightOn} toggleIsOn={toggleIsLightOn} />
        <ZoomParameter setZoom={setZoom} max={maxZoom} />
        <div className="rotate-buttons">
          <RotatableButton
            handleAxis={setXAxis}
            imgUrl={rotate}
            minPx={xLimit.min}
            maxPx={xLimit.max}
          />
          <RotatableButton
            handleAxis={setYAxis}
            imgUrl={rotate}
            minPx={yLimit.min}
            maxPx={yLimit.max}
          />
        </div>
      </div>
      <RotatableButton
        handleAxis={setContainerYAxis}
        imgUrl={wheel}
        minPx={0}
        maxPx={4350}
      />
      <div className="frame-bottom-left"></div>
      <div className="frame-bottom">
        <p>Y-Axis</p>
        <p>X-Axis</p>
      </div>
      <div className="frame-bottom-right"></div>
    </div>
  );
}

function RotatableButton({ handleAxis, imgUrl, minPx, maxPx }) {
  const [rotation, setRotation] = useState(0);
  const isDragging = useRef(false);
  const center = useRef({ x: 0, y: 0 });
  const prevAngle = useRef(0);
  const buttonRef = useRef(null);
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
    <div
      ref={buttonRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onDoubleClick={handleReset}
      className="rotatable-button"
    >
      <img
        src={imgUrl}
        alt=""
        draggable={false}
        style={{ transform: `rotate(${rotation}deg)` }}
      />
    </div>
  );
}

function ZoomParameter({ setZoom, max }) {
  const draggableRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startRef = useRef(0);

  const paramHeight = 17.5;
  const zoomPerDistance = max / paramHeight;
  const remValue = 16;

  const handleMouseDown = (e) => {
    if (!draggableRef.current) return;
    isDraggingRef.current = true;
    draggableRef.current.style.cursor = "grabbing";
    const rect = draggableRef.current.getBoundingClientRect();
    startRef.current = rect.bottom;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const distance = (startRef.current - e.clientY) / remValue;
    if (distance < paramHeight && distance >= 0) {
      draggableRef.current.style.bottom = `${distance}rem`;
      setZoom(distance * zoomPerDistance);
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="zoom-container">
      <p>ZOOM</p>
      <div className="zoom-parameter"></div>
      <div
        className="zoom-draggable"
        ref={draggableRef}
        onMouseDown={handleMouseDown}
      ></div>
      {[...Array(5)].map((_, index) => (
        <div className="zoom-meter" key={index}></div>
      ))}
    </div>
  );
}
