import React from "react";
import DropdownIcon from "../assets/dropdown-icon-b.png";
import "../styles/DropdownList.css";

class DropdownList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      selectedOption: this.props.default,
    };
  }

  componentDidUpdate(prev_props) {
    if (this.props !== prev_props) {
      this.setState({
        selectedOption: this.props.default,
      });
    }
  }

  setOption = (option) => {
    this.props.setOption(option);
    this.setState({
      show: false,
      selectedOption: option,
    });
  };

  toggleSelect = (_) => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    return (
      <div className="dropdown" onClick={this.toggleSelect}>
        <div className="chosen-option">
          <p>{this.state.selectedOption}</p>
        </div>
        <div
          className="all-options"
          style={{
            width: this.state.show ? "93px" : "0px",
            maxHeight: this.state.show ? "90px" : "0px",
            bottom: this.props.direction === "down" ? "" : "20px",
            top: this.props.direction === "down" ? "20px" : "",
          }}
        >
          {this.props.options.map((option) => {
            return (
              <p className="option" onClick={() => this.setOption(option)}>
                {option}
              </p>
            );
          })}
        </div>
        <img src={DropdownIcon} className="dropdown-icon" alt="dropdown-icon" />
      </div>
    );
  }
}

export default DropdownList;
