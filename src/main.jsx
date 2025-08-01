import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Navbar from "./components/Navbar.jsx";
import App from "./components/App.jsx";
import "./css/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Navbar />
    <App />
  </StrictMode>
);
