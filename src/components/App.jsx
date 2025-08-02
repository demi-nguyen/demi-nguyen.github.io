import { useState } from "react";
import Navbar from "./Navbar";
import Info from "./Info";
import Videos from "./Videos";
import cursorImage from "../assets/cursor.png";

function App() {
  const [pageIndex, setPageIndex] = useState(0);

  function handlePageIndex(index) {
    if (index === pageIndex) {
      return;
    }
    setPageIndex(index);
  }

  function Content() {
    if (pageIndex === 0) {
      return <Info />;
    }

    if (pageIndex === 1) {
      return <Videos />;
    }

    return <p>Posters</p>;
  }

  return (
    <div className="wrapper" style={{ cursor: `url(${cursorImage}), auto` }}>
      <Navbar handlePageIndex={handlePageIndex} pageIndex={pageIndex} />
      <Content />
    </div>
  );
}

export default App;
