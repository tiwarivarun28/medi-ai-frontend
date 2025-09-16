import React from "react";
import ReactDOM from "react-dom/client";
// import './index.css';
import "./styles/base.css";
import "./styles/chatbot.css";
import "./styles/layout.css";
import "./styles/header.css";
import "./styles/home.css";
import "./styles/loadingPlane.css";
import "./styles/main.css";
import "./styles/footer.css";
import "./styles/features.css";
import "./styles/animations.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
