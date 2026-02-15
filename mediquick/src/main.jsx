import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ERPProvider } from "./context/ERPContext";
import "leaflet/dist/leaflet.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ERPProvider>
      <App />
    </ERPProvider>
  </React.StrictMode>
);
