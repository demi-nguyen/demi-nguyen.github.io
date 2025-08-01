import "../css/Videos.css";
import pause from "../assets/pause.png";
import next from "../assets/next.png";
import light from "../assets/light.png";
import lessVolume from "../assets/less-volume.png";
import moreVolume from "../assets/more-volume.png";
import { useEffect, useRef, useState } from "react";

export default function Videos() {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const videos = [
    { id: "VAmACbJgl8g", scaleX: 1.3, scaleY: 1.3 },
    { id: "emMwV8KdneA", scaleX: 1.5, scaleY: 1.5 },
    { id: "q3XTGZ6HuM8", scaleX: 1.5, scaleY: 1.5 },
    { id: "hnV57V3CB0M", scaleX: 1.3, scaleY: 1.3 },
  ];
  const [videoIndex, setVideoIndex] = useState(0);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      window.onYouTubeIframeAPIReady = loadPlayer;
      document.body.appendChild(tag);
    } else {
      loadPlayer();
    }
  }, [videoIndex]);

  const increaseVolume = () => {
    const newVolume = Math.min(volume + 10, 100);
    setVolume(newVolume);
    player?.setVolume(newVolume);
  };

  const decreaseVolume = () => {
    const newVolume = Math.max(volume - 10, 0);
    setVolume(newVolume);
    player?.setVolume(newVolume);
  };

  const nextVideo = () => {
    if (videoIndex === videos.length - 1) return;
    setVideoIndex(videoIndex + 1);
  };

  const prevVideo = () => {
    if (videoIndex === 0) return;
    setVideoIndex(videoIndex - 1);
  };

  const loadPlayer = () => {
    const videoId = videos[videoIndex].id;

    if (playerRef.current && player) {
      player.destroy();
    }

    const ytPlayer = new window.YT.Player(playerRef.current, {
      videoId,
      playerVars: {
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
      },
      events: {
        onReady: (event) => {
          const playerInstance = event.target;
          playerInstance.seekTo(0.01); // Move off the very start
          setPlayer(playerInstance);
        },
        onStateChange: (event) => {
          const state = event.data;
          if (state === window.YT.PlayerState.ENDED) {
            ytPlayer.seekTo(0);
            ytPlayer.pauseVideo();
          } else if (state === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
          } else if (state === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
          }
        },
      },
    });
  };

  const handlePlay = () => {
    if (player) {
      !isPlaying ? player.playVideo() : player.pauseVideo();
    }
  };

  const iframeStyle = {
    width: "100%",
    height: "100%",
    transform: `scaleX(${videos[videoIndex].scaleX}) scaleY(${videos[videoIndex].scaleY})`,
  };

  return (
    <div className="frame">
      <div className="paper-border">
        <div className="paper">
          <div ref={playerRef} style={iframeStyle}></div>
        </div>
      </div>
      <div className="button-bar">
        <div className="button-bar-frame">
          <div className="buttons-attachment">
            <button className="play-button" onClick={handlePlay}>
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
            <button className="prev-button" onClick={prevVideo}>
              <img src={next} />
            </button>
            <button className="next-button" onClick={nextVideo}>
              <img src={next} />
            </button>
            <button className="less-volume-button" onClick={decreaseVolume}>
              <img src={lessVolume} />
            </button>
            <button className="more-volume-button" onClick={increaseVolume}>
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
