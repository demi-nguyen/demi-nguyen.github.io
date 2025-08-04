import "../css/Navbar.css";
import hamburgerMenu from "../assets/hamburger-menu.svg";
import closeMenu from "../assets/close.svg";
import { useState } from "react";

export default function Navbar({ handlePageIndex, pageIndex }) {
  const [isShow, setIsShow] = useState(false);

  function toggleIsShow() {
    setIsShow(!isShow);
  }

  function handleNavLinkClicked(index) {
    handlePageIndex(index);
    toggleIsShow(false);
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
            <NavLink
              index={0}
              title="Info"
              pageIndex={pageIndex}
              handleNavLinkClicked={handleNavLinkClicked}
            />
          </li>
          <li>
            <NavLink
              index={1}
              title="Video Editing"
              pageIndex={pageIndex}
              handleNavLinkClicked={handleNavLinkClicked}
            />
          </li>
          <li>
            <NavLink
              index={2}
              title="Posters"
              pageIndex={pageIndex}
              handleNavLinkClicked={handleNavLinkClicked}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
}

function NavLink({ index, pageIndex, handleNavLinkClicked, title }) {
  const isCurrent = index === pageIndex;
  return (
    <button onClick={() => handleNavLinkClicked(index)} disabled={isCurrent}>
      {title}
    </button>
  );
}
