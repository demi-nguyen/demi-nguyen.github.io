import { useState, useRef, useEffect } from "react";
import "../css/Posters.css";
import LightButton from "./LightButton";
import rotate from "../assets/rotate.png";
import wheel from "../assets/wheel.png";
import routine from "../assets/posters/routine.webp";
import questions from "../assets/posters/Questions.png";
import moss from "../assets/posters/Moss-final.png";
import consuming from "../assets/posters/Consuming.png";
import breath from "../assets/posters/Breathe-Ps.png";
import porsche from "../assets/posters/Porsche.png";
import yakult from "../assets/posters/Yakult-Ps.png";

export default function Posters() {
  const [isLightOn, setIsLightOn] = useState(true);
  const [containerYAxis, setContainerYAxis] = useState(0);
  const xLimit = { min: -10, max: 10 };
  const yLimit = { min: -10, max: 10 };
  const maxZoom = 0.5;
  const postersRefs = useRef([]);
  const currentEntryRef = useRef(0);

  const [posters, setPosters] = useState([
    { id: crypto.randomUUID(), url: routine, xAxis: 0, yAxis: 0, zoom: 0 },
    { id: crypto.randomUUID(), url: questions, xAxis: 0, yAxis: 0, zoom: 0 },
    { id: crypto.randomUUID(), url: moss, xAxis: 0, yAxis: 0, zoom: 0 },
    { id: crypto.randomUUID(), url: consuming, xAxis: 0, yAxis: 0, zoom: 0 },
    { id: crypto.randomUUID(), url: breath, xAxis: 0, yAxis: 0, zoom: 0 },
    { id: crypto.randomUUID(), url: porsche, xAxis: 0, yAxis: 0, zoom: 0 },
    { id: crypto.randomUUID(), url: yakult, xAxis: 0, yAxis: 0, zoom: 0 },
  ]);

  function handleXAxis(index, value) {
    setPosters((prevPosters) =>
      prevPosters.map((poster, i) =>
        i === index ? { ...poster, xAxis: value } : poster
      )
    );
  }

  function handleYAxis(index, value) {
    setPosters((prevPosters) =>
      prevPosters.map((poster, i) =>
        i === index ? { ...poster, yAxis: value } : poster
      )
    );
  }

  function handleZoom(index, value) {
    setPosters((prevPosters) =>
      prevPosters.map((poster, i) =>
        i === index ? { ...poster, zoom: value } : poster
      )
    );
  }

  function handleResetYAxis() {
    setPosters(
      posters.map((poster) => {
        return { ...poster, yAxis: 0 };
      })
    );
  }

  function handleResetXAxis() {
    setPosters(
      posters.map((poster) => {
        return { ...poster, xAxis: 0 };
      })
    );
  }

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newIndex = parseInt(entry.target.dataset.index, 10);
            if (newIndex !== currentEntryRef.current) {
              currentEntryRef.current = newIndex;
            }
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    postersRefs.current.forEach((poster) => {
      if (poster && poster instanceof Element) observer.observe(poster);
    });

    return () => observer.disconnect();
  }, [postersRefs]);

  return (
    <div className="poster-wrapper">
      <div className="poster-frame">
        <div className="paper-border">
          <div className="paper">
            <div
              className="poster-container"
              style={{ transform: `translateY(-${containerYAxis}rem)` }}
            >
              {posters.map((poster, index) => (
                <div
                  className="poster-viewer"
                  key={poster.id}
                  ref={(el) => (postersRefs.current[index] = el)}
                  data-index={index}
                >
                  <Poster
                    url={poster.url}
                    index={index}
                    xAxis={poster.xAxis}
                    yAxis={poster.yAxis}
                    zoom={poster.zoom}
                  />
                </div>
              ))}
            </div>
          </div>
          {!isLightOn && <div className="light-overlay"></div>}
          {!isLightOn && <div className="light-shadow-overlay"></div>}
        </div>
        <LightButton isOn={isLightOn} toggleIsOn={toggleIsLightOn} />
        <ZoomParameter
          setZoom={handleZoom}
          index={currentEntryRef.current}
          max={maxZoom}
        />
        <div className="rotate-buttons">
          <RotatableButton
            handleAxis={handleXAxis}
            handleResetAxis={handleResetXAxis}
            index={currentEntryRef.current}
            imgUrl={rotate}
            min={xLimit.min}
            max={xLimit.max}
          />
          <RotatableButton
            handleAxis={handleYAxis}
            handleResetAxis={handleResetYAxis}
            index={currentEntryRef.current}
            imgUrl={rotate}
            min={yLimit.min}
            max={yLimit.max}
          />
        </div>
      </div>
      <RotatableButton
        handleAxis={setContainerYAxis}
        imgUrl={wheel}
        min={0}
        max={270}
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

function Poster({ url, index, xAxis, yAxis, zoom }) {
  const scale = 1 + zoom;
  const posterStyle = {
    width: "100%",
    objectFit: "contain",
    transform: `scaleX(-${scale}) scaleY(${scale}) translateX(${xAxis}rem) translateY(${yAxis}rem)`,
  };

  return (
    <img
      className="poster"
      src={url}
      alt=""
      loading={`${index > 0 ? "lazy" : "eager"}`}
      style={posterStyle}
    />
  );
}

function RotatableButton({
  handleAxis,
  handleResetAxis,
  index = -1,
  imgUrl,
  min,
  max,
}) {
  const [rotation, setRotation] = useState(0);
  const isDragging = useRef(false);
  const center = useRef({ x: 0, y: 0 });
  const prevAngle = useRef(0);
  const buttonRef = useRef(null);
  const remValue = 16;
  const remPerDeg = ((max - min) / 360 / remValue) * 2; // x2 to improve UX

  // Given a current angle (degrees)
  const mapDegToRem = (deg) => {
    const rem = deg * remPerDeg;
    return Math.max(min, Math.min(max, rem));
  };

  const getAngle = (x, y) => {
    return (
      Math.atan2(y - center.current.y, x - center.current.x) * (180 / Math.PI)
    );
  };

  const handleRotation = (rotation) => {
    setRotation(rotation);
  };

  const handleReset = () => {
    setRotation(0);
    handleResetAxis();
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
    e.preventDefault();
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
    const rem = mapDegToRem(newRotation);
    if (index >= 0) {
      handleAxis(index, rem);
      console.log(`change poster ${index} value to ${rem}`);
    } else {
      handleAxis(rem);
      console.log(`change value to ${rem}`);
    }

    prevAngle.current = currentAngle;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    setBodyUserSelect("");
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

function ZoomParameter({ setZoom, index, max }) {
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
      setZoom(index, distance * zoomPerDistance);
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
