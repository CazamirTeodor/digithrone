import React from "react";
import "./DropdownList.css";

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
            width: this.state.show ? "7vw" : "0px",
            border: this.state.show ? "1px solid white" : "none",
            maxHeight: this.state.show ? "15vw" : "0px",
            bottom: this.props.direction === "down" ? "" : "2.1vw",
            top: this.props.direction === "down" ? "2.1vw" : "",
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
        
      </div>
    );
  }
}

export default DropdownList;
