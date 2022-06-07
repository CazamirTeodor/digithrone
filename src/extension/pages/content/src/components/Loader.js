import React from "react";
import Logo from "../assets/logo_fill_blue.png";
import "./Loader.css";
import { solveResourceURL } from "./Utils";

class Loader extends React.Component {
  render() {
    return (
      <div className="loader">
        <img src={solveResourceURL(Logo)} alt="logo" />
      </div>
    );
  }
}

export default Loader;
