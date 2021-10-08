import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { products } from "./data/data";

// set product data to localstorage on start
// window.localStorage.setItem("productList", JSON.stringify(products));
// window.localStorage.setItem("cart", JSON.stringify([]));

ReactDOM.render(<App />, document.getElementById("root"));
