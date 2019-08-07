import React from "react";
import { render } from "react-dom";
import Home from "./scenes/Home";
import "./index.css";
// import './styles/reset.scss';
// import './styles/common.scss';

const target = document.getElementById("root");
render(<Home />, target);
