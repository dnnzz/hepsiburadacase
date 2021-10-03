import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { products } from "./data/data";
import Context from "./components/Context/Context";

// set product data to localstorage on start
window.localStorage.setItem("productList", JSON.stringify(products));

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <App />
    </Context>
  </React.StrictMode>,
  document.getElementById("root"),
);
