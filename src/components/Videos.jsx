import "../css/Videos.css";
import pause from "../assets/pause.png";
import next from "../assets/next.png";
import lessVolume from "../assets/less-volume.png";
import moreVolume from "../assets/more-volume.png";
import { useEffect, useRef, useState } from "react";
import LightButton from "./LightButton";
import useLight from "../hooks/useLight";

export default function Videos() {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [videoIndex, setVideoIndex] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isVert, setIsVert] = useState(true);
  const videosLengthRef = useRef(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 560);
  const { isLightOn, setIsLightOn } = useLight();

  function toggleIsLightOn() {
    if (isLightOn) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    setIsLightOn(!isLightOn);
  }

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 560);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const videos = [
      { id: "89tLbgraZf8", style: { transform: "scale(1)" } },
      { id: "kRi_nMP03Ao", style: { transform: "scale(1)" } },
      {
        id: "UmyJGay4CR4",
        style: { transform: "scale(1)" },
      },
      { id: "Sd5NrsKSVKc", style: { transform: "scale(1)" } },
    ];
    const vertVideos = [
      {
        id: "9g_7z3eXuJI",
        style: { transform: "scale(1.8) rotate(90deg)" },
      },
      { id: "jtyp5CFY6ZM", style: { transform: "scale(1.8) rotate(90deg)" } },
      { id: "I9oq3-QqqCg", style: { transform: "scale(1.8) rotate(90deg)" } },
    ];
    videosLengthRef.current = !isVert ? videos.length : vertVideos.length;

    const loadPlayer = () => {
      if (videoIndex > videosLengthRef.current - 1) setVideoIndex(0);
      const video = !isVert ? videos[videoIndex] : vertVideos[videoIndex];
      const videoId = video.id;

      const iframeStyle = {
        width: "100%",
        height: "100%",
        ...video.style,
      };

      if (playerRef.current)
        Object.assign(playerRef.current.style, iframeStyle);

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

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      window.onYouTubeIframeAPIReady = loadPlayer;
      document.body.appendChild(tag);
    } else {
      setTimeout(() => {
        loadPlayer();
      }, 150);
    }
  }, [videoIndex, isVert]);

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
    if (videoIndex === videosLengthRef.current - 1) return;
    setVideoIndex(videoIndex + 1);
  };

  const prevVideo = () => {
    if (videoIndex === 0) return;
    setVideoIndex(videoIndex - 1);
  };

  const handlePlay = () => {
    !isPlaying ? playPlayer() : pausePlayer();
  };

  const pausePlayer = () => {
    setTimeout(() => player?.pauseVideo(), 100);
  };

  const playPlayer = () => {
    player?.playVideo();
  };

  return (
    <>
      <div className={`frame${isVert ? " vert" : ""}`}>
        <div className="paper-border">
          <div className="paper">
            <div ref={playerRef} tabIndex={-1}></div>
          </div>
          {!isLightOn && !isPlaying && <div className="light-overlay"></div>}
          {!isLightOn && <div className="light-shadow-overlay"></div>}
        </div>
        {isVert && <Info />}
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
            <DraggableParameter
              player={player}
              pausePlayer={pausePlayer}
              playPlayer={playPlayer}
              isVert={isVert}
              isSmallScreen={isSmallScreen}
            />
            <LightButton isOn={isLightOn} toggleIsOn={toggleIsLightOn} />
            {!isVert && <p className="selected-works-text">SELECTED WORKS</p>}
          </div>
          <div className="frame-bottom-left"></div>
          <div className="frame-bottom"></div>
          <div className="frame-bottom-right"></div>
        </div>
      </div>
      <div className="view-switch">
        <button
          className={`toggle-vert${isVert ? " active" : ""}`}
          onClick={() => setIsVert(true)}
        >
          VERT
        </button>
        <button
          className={`toggle-horz${!isVert ? " active" : ""}`}
          onClick={() => setIsVert(false)}
        >
          HORZ
        </button>
      </div>
    </>
  );
}

function DraggableParameter({
  player,
  pausePlayer,
  playPlayer,
  isVert,
  isSmallScreen,
}) {
  const remValue = 16;
  const paramWidth = !isVert ? 32.5 : isSmallScreen ? 30.5 : 15.5;
  const marginTop = !isVert ? 4.5 : 4;
  const draggableRef = useRef(null);
  const paramFillRef = useRef(null);
  const paramBarRef = useRef(null);
  const startRef = useRef(0);
  const isDraggingRef = useRef(false);

  const videoParamStyle = {
    position: "absolute",
    height: "0.25rem",
    width: `${paramWidth}rem`,
    top: `${marginTop}rem`,
    left: "26rem",
    borderRadius: "0.1rem",
    backgroundColor: "var(--param-background)",
    zIndex: "2",
  };

  const videoParamFillStyle = {
    position: "absolute",
    height: "0.25rem",
    width: `0rem`,
    top: `${marginTop}rem`,
    left: "26rem",
    borderRadius: "0.1rem",
    backgroundColor: "var(--param-fill)",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    zIndex: "2",
  };

  const videoDraggableStyle = {
    position: "absolute",
    top: `${marginTop - 0.5}rem`,
    left: `26rem`,
    height: "1.25rem",
    width: "1.25rem",
    backgroundColor: "transparent",
    borderRadius: "0.1rem",
    cursor: "pointer",
    zIndex: "2",
  };

  useEffect(() => {
    if (!player) return;
    function updateProgressBar(progress) {
      const maxWidth = paramWidth;
      const valueInRem = progress * maxWidth;

      draggableRef.current.style.left = `${26 + valueInRem}rem`;
      paramFillRef.current.style.width = `${valueInRem}rem`;
    }

    const interval = setInterval(() => {
      if (isDraggingRef.current) return;
      const current = player.getCurrentTime?.() || 0;
      const duration = player.getDuration?.() || 1;
      const progress = current / duration;
      updateProgressBar(progress);
    }, 50);

    return () => clearInterval(interval);
  }, [player, paramWidth]);

  const handlePointerDown = (e) => {
    pausePlayer();

    setTimeout(() => {
      isDraggingRef.current = true;
      const rect = paramBarRef.current.getBoundingClientRect();
      startRef.current = !isVert ? rect.left : rect.bottom;
      draggableRef.current.style.cursor = "grabbing";

      draggableRef.current.getBoundingClientRect();

      draggableRef.current.setPointerCapture(e.pointerId);
    }, 250);

    e.preventDefault();
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const distance = !isVert
      ? e.clientX - startRef.current
      : startRef.current - e.clientY;
    const remDistance = distance / remValue > 0.1 ? distance / remValue : 0;
    if (remDistance < paramWidth && remDistance >= 0) {
      draggableRef.current.style.left = `${26 + remDistance}rem`;
      paramFillRef.current.style.width = `${remDistance}rem`;
    }
  };

  const handlePointerUp = (e) => {
    isDraggingRef.current = false;
    draggableRef.current.style.cursor = "grab";
    const progress =
      (parseFloat(paramFillRef.current.style.width) || 0) / paramWidth;
    player?.seekTo(player.getDuration() * progress, true);
    playPlayer();

    if (draggableRef.current) {
      draggableRef.current.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <>
      <div
        className="video-parameter"
        ref={paramBarRef}
        style={videoParamStyle}
      ></div>
      <div
        className="video-parameter-fill"
        ref={paramFillRef}
        style={videoParamFillStyle}
      ></div>
      <div
        className="video-parameter-draggable"
        ref={draggableRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={videoDraggableStyle}
      ></div>
    </>
  );
}

function Info() {
  // const [isShow, setIsShow] = useState(false);

  // function toggleIsShow() {
  //   setIsShow(!isShow);
  // }

  return (
    <div className="info-video">
      <div className="info-container">
        {/* <button onClick={toggleIsShow}>
          {" "}
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#6f6f71"
            transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.6 3H10V6.6H13.6V3ZM13.6 10.2H10V21H13.6V10.2Z"
                fill="#6f6f71"
              ></path>{" "}
            </g>
          </svg>
        </button> */}
        <p>Researched, scripted and edited independently</p>
      </div>
    </div>
  );
}
