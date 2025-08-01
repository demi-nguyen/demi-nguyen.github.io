import "../css/Navbar.css";
import hamburgerMenu from "../assets/hamburger-menu.svg";
import closeMenu from "../assets/close.svg";
import { useState } from "react";

export default function Navbar({ handlePageIndex }) {
  const [isShow, setIsShow] = useState(false);

  function toggleIsShow() {
    setIsShow(!isShow);
  }

  return (
    <nav>
      <button
        className="nav-dropdown-button"
        onClick={toggleIsShow}
        aria-label="toggle-menu"
      >
        <img
          src={!isShow ? hamburgerMenu : closeMenu}
          alt="hamburger menu"
          width={75}
        />
      </button>
      <div className={`nav-dropdown${isShow ? "" : " hidden"}`}>
        <ul>
          <li>
            <button onClick={() => handlePageIndex(0)}>Info</button>
          </li>
          <li>
            <button onClick={() => handlePageIndex(1)}>Video Editing</button>
          </li>
          <li>
            <button onClick={() => handlePageIndex(2)}>Posters</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
