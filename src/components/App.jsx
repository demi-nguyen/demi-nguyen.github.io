import Navbar from "./Navbar";
import cursorImage from "../assets/cursor.png";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="wrapper" style={{ cursor: `url(${cursorImage}), auto` }}>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
