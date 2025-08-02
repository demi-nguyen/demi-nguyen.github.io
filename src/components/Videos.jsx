import "../css/Videos.css";
import pause from "../assets/pause.png";
import next from "../assets/next.png";
import light from "../assets/light.png";
import lessVolume from "../assets/less-volume.png";
import moreVolume from "../assets/more-volume.png";
import { useEffect, useRef, useState } from "react";

export default function Videos() {
  const [isPlaying, setIsPlaying] = useState(false);

  function togglePlaying() {
    setIsPlaying(!isPlaying);
  }

  return (
    <div className="frame">
      <div className="paper-border">
        <div className="paper">
          <iframe
            src="https://www.youtube.com/embed/emMwV8KdneA?autoplay=0&mute=0&rel=0&controls=0"
            title="YouTube video player"
            frameborder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <div className="button-bar">
        <div className="button-bar-frame">
          <div className="buttons-attachment">
            <button className="play-button" onClick={togglePlaying}>
              {isPlaying ? (
                <img src={pause} />
              ) : (
                <svg
                  fill="#FFFFFF"
                  version="1.1"
                  id="XMLID_213_"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="-2.4 -2.4 28.80 28.80"
                  xmlSpace="preserve"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#CCCCCC"
                    strokeWidth="0.144"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g id="play">
                      {" "}
                      <g>
                        {" "}
                        <path d="M4,24v-24l16.7,11.9L4,24z M6,4.1v16L17.3,12L6,4.1z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
              )}
            </button>
            <button className="prev-button">
              <img src={next} />
            </button>
            <button className="next-button">
              <img src={next} />
            </button>
            <button className="less-volume-button">
              <img src={lessVolume} />
            </button>
            <button className="more-volume-button">
              <img src={moreVolume} />
            </button>
          </div>
          <div className="button-labels">
            <p className="play-label">PLAY</p>
            <p className="prev-label">PREV</p>
            <p className="next-label">NEXT</p>
            <p className="vol-down-label">VOL DOWN</p>
            <p className="vol-up-label">VOL UP</p>
          </div>
          <DraggableParameter />
          <LightButton />
        </div>
        <div className="frame-bottom-left"></div>
        <div className="frame-bottom"></div>
        <div className="frame-bottom-right"></div>
      </div>
    </div>
  );
}

function LightButton() {
  const [isOn, setIsOn] = useState(false);

  function toggleIsOn() {
    setIsOn(!isOn);
  }

  return (
    <button
      className={`light-button${isOn ? " active" : ""}`}
      onClick={toggleIsOn}
    >
      <img src={light} />
    </button>
  );
}

function DraggableParameter() {
  const remValue = 16;
  const paramWidth = 32.5;
  const draggableRef = useRef(null);
  const paramFillRef = useRef(null);

  const videoParamStyle = {
    position: "absolute",
    height: "0.25rem",
    width: `${paramWidth}rem`,
    top: "4.5rem",
    left: "26rem",
    borderRadius: "0.1rem",
    backgroundColor: "#bec2c4",
    zIndex: "2",
  };

  const videoParamFillStyle = {
    position: "absolute",
    height: "0.25rem",
    width: `0rem`,
    top: "4.5rem",
    left: "26rem",
    borderRadius: "0.1rem",
    backgroundColor: "#8c8c8c",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    zIndex: "2",
  };

  const videoDraggableStyle = {
    position: "absolute",
    top: "4rem",
    left: `26rem`,
    height: "1.25rem",
    width: "0.125rem",
    backgroundColor: "#8c8c8c",
    borderRadius: "0.1rem",
    cursor: "pointer",
    padding: "0.5rem 0.25rem",
    zIndex: "2",
  };

  useEffect(() => {
    const draggableDiv = draggableRef.current;
    const paramFill = paramFillRef.current;
    let isFirstX = false;
    if (!draggableDiv || !paramFill) return;

    let isDragging = false;
    let startX = 0;

    const handleMouseDown = (e) => {
      isDragging = true;
      if (!isFirstX) {
        startX = e.clientX;
        isFirstX = true;
      }
      draggableDiv.style.cursor = "grabbing";
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      e.preventDefault();
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const remDx = dx / remValue > 0.1 ? dx / remValue : 0;
      if (remDx < paramWidth && remDx >= 0) {
        draggableDiv.style.left = `${26 + remDx}rem`;
        paramFill.style.width = `${remDx}rem`;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      draggableDiv.style.cursor = "grab";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    draggableDiv.addEventListener("mousedown", handleMouseDown);

    return () => {
      draggableDiv.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      <div className="video-parameter" style={videoParamStyle}></div>
      <div
        className="video-parameter-fill"
        ref={paramFillRef}
        style={videoParamFillStyle}
      ></div>
      <div
        className="video-parameter-draggable"
        ref={draggableRef}
        style={videoDraggableStyle}
      ></div>
    </>
  );
}
