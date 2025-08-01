import { useState } from "react";
import Navbar from "./Navbar";

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
      return <p>Info</p>;
    }

    if (pageIndex === 1) {
      return <p>Videos</p>;
    }

    return <p>Posters</p>;
  }

  return (
    <>
      <Navbar handlePageIndex={handlePageIndex} />
      <Content />
    </>
  );
}

export default App;
