import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import "./style.scss";
import App from "./App.jsx";
import "../node_modules/flowbite/dist/flowbite.min.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
