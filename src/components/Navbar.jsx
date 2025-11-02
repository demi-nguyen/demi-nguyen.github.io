import "../css/Navbar.css";
import hamburgerMenu from "../assets/hamburger-menu.svg";
import closeMenu from "../assets/close.svg";
import { useState } from "react";
import { Link, useLocation } from "react-router";

export default function Navbar() {
  const [isShow, setIsShow] = useState(false);
  const location = useLocation();
  const path = location.pathname;

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
            <NavLink to="/" title="Info" isActive={path === "/"} />
          </li>
          <li>
            <NavLink
              to="/videos"
              title="Video Editing"
              isActive={path === "/videos"}
            />
          </li>
          <li>
            <NavLink
              to="/posters"
              title="Posters"
              isActive={path === "/posters"}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
}

function NavLink({ to, title, isActive }) {
  return (
    <Link to={to} disabled={isActive}>
      {title}
    </Link>
  );
}
