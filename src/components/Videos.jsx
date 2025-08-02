import "../css/Videos.css";
import prev from "../assets/prev.svg";
import next from "../assets/next.svg";
import lessVolume from "../assets/less-volume.svg";
import moreVolume from "../assets/more-volume.svg";

export default function Videos() {
  return (
    <div className="frame">
      <div className="paper-border">
        <div className="paper"></div>
      </div>
      <div className="button-bar">
        <div className="button-bar-frame">
          <div className="buttons-attachment">
            <button className="play-button">
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
            </button>
            <button className="prev-button">
              <img src={prev} />
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
        </div>
        <div className="frame-bottom-left"></div>
        <div className="frame-bottom"></div>
        <div className="frame-bottom-right"></div>
      </div>
    </div>
  );
}
