import React from "react";
import "../styles/AnimatedButton.css";
import { Link } from "react-router-dom";

class AnimatedButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      hoverFuntionId: undefined,
    };
  }

  startHovering = () => {
    if (!this.state.hovering) {
      this.setState({
        hoverFunctionId: setTimeout(() => {
          this.setState({ hovering: true });
        }, 500),
      });
    }
  };

  cancelHovering = () => {
    clearTimeout(this.state.hoverFunctionId);
    if (this.state.hovering) {
      this.setState({ hovering: false });
    }
  };

  componentDidUpdate(prev_props) {
    if (this.props !== prev_props) {
      this.setState({
        active: this.props.active,
      });
    }
  }

  render() {
    return (
      <div
        className="animated-btn"
        onClick={() => {
          this.props.toggleFunction();
          this.setState({ active: !this.props.active, hovering: false });
        }}
      >
        <img
          className="btnIcon"
          src={this.props.icon}
          alt="icon"
          style={{ filter: this.props.active ? null : "grayscale(1)" }}
        />
        <p>{this.props.name}</p>

        <div
          onMouseOver={this.startHovering}
          onMouseLeave={this.cancelHovering}
          style={
            this.props.active
              ? this.state.hovering && this.props.route
                ? {
                    backgroundColor: "rgba(0, 0, 0, 0.588)",
                  }
                : null
              : {
                  backgroundColor: "rgba(0, 0, 0, 0.588)",
                }
          }
          className="settings-background"
        >
          {this.props.route ? (
            <Link to={this.props.route}>
              <div
                className="settings-text"
                style={
                  this.state.hovering ? { height: "20px" } : { height: "0px" }
                }
              >
                <p>Settings</p>
              </div>
            </Link>
          ) : null}
        </div>
      </div>
    );
  }
}

export default AnimatedButton;
