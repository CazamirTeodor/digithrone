import React from "react";
import "./Heart.css";

class Heart extends React.Component {
  render() {
    return (
      <div
        id="wrapper"
        style={{ animation: this.props.beating ? null : "none" }}
      >
        <div id="pulsingheart">
          <div
            id="before"
            style={
              this.props.beating
                ? { animation: null }
                : { animation: "none", filter: "grayscale(100%) contrast(0.5)" }
            }
          ></div>
          <div
            id="after"
            style={
              this.props.beating
                ? { animation: null }
                : { animation: "none", filter: "grayscale(100%) contrast(0.5)" }
            }
          ></div>
        </div>
      </div>
    );
  }
}

export default Heart;
