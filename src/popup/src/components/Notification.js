import React from "react";
import "../styles/Notification.css";

// type = green, red, neutral

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: this.props.msg,
      type: this.props.type,
      duration: this.props.duration ? this.props.duration : 4000,
    };
  }
  render() {
    const styles = {
      green: {
        backgroundColor: "rgb(50, 127, 54)",
        color: "white",
      },
      red: {
        backgroundColor: "rgb(204, 70, 60)",
        color: "white",
      },
      neutral: {
        backgroundColor: "rgb(253, 210, 134)",
        color: "black",
      },
    };
    return (
      <div className="notification-wrapper">
        <div
          className="notification"
          style={{ backgroundColor: styles[this.state.type].backgroundColor, animation: `width-animation ${this.state.duration / 1000}s` }}
        ></div>
        <p
          className="notification-msg"
          style={{
            color: styles[this.state.type].color,
            animation: `text-animation ${this.state.duration / 1000}s`,
          }}
        >
          {this.state.msg}
        </p>
      </div>
    );
  }
}

export default Notification;
