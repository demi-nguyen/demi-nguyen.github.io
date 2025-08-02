import "../css/Videos.css";
import pause from "../assets/pause.png";
import next from "../assets/next.png";
import light from "../assets/light.png";
import lessVolume from "../assets/less-volume.png";
import moreVolume from "../assets/more-volume.png";
import { useState } from "react";

export default function Videos() {
  const [isPlaying, setIsPlaying] = useState(false);

  function togglePlaying() {
    setIsPlaying(!isPlaying);
  }

  return (
    <div className="frame">
      <div className="paper-border">
        <div className="paper"></div>
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
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="-2.4 -2.4 28.80 28.80"
                  xml:space="preserve"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="#CCCCCC"
                    stroke-width="0.144"
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
