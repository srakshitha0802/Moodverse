import React from "react";
import ReactDOM from "react-dom/client";
import WebApp from "./WebApp";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WebApp />
  </React.StrictMode>
);

// Hot reload placeholders: ensure that if no assets are present we have visible placeholders
if(import.meta.hot){
  import.meta.hot.accept();
}