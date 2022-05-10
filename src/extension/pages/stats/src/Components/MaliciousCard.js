import React from "react";
import CountUp from "react-countup";

class MaliciousCard extends React.Component {
  render() {
    return (
      <div className="malicious-card">
        <CountUp className="number" end={this.props.number} duration={1}/>
        <p>{this.props.text}</p>
      </div>
    );
  }
}

export default MaliciousCard;
