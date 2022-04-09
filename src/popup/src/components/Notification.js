import React from "react";
import "../styles/Notification.css";

// type = green, red, neutral

class Notification extends React.Component {
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
          style={{ backgroundColor: styles[this.props.type].backgroundColor }}
        ></div>
        <p
          className="notification-msg"
          style={{ color: styles[this.props.type].color }}
        >
          {this.props.msg}
        </p>
      </div>
    );
  }
}

export default Notification;
