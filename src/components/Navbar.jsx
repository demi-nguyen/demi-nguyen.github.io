import "../css/Navbar.css";
import hamburgerMenu from "../assets/hamburger-menu.svg";
import closeMenu from "../assets/close.svg";
import { useState } from "react";

export default function Navbar() {
  const [isShow, setIsShow] = useState(false);

  function toggleIsShow() {
    setIsShow(!isShow);
  }

  return (
    <nav>
      <button className="nav-dropdown-button" onClick={toggleIsShow}>
        <img
          src={!isShow ? hamburgerMenu : closeMenu}
          alt="hamburger menu"
          width={75}
        />
      </button>
      <div className={`nav-dropdown${isShow ? "" : " hidden"}`}>
        <ul>
          <li>
            <button>Info</button>
          </li>
          <li>
            <button>Video Editing</button>
          </li>
          <li>
            <button>Posters</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
