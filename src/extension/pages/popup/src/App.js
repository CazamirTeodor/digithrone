/*global chrome*/
import React from "react";
import MustLogin from "./components/MustLogin";
import CloseImage from "./assets/close_image.png";
import "./App.css";

var type = "must-login";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: undefined,
      show: undefined,
    };
  }

  componentDidMount() {
    console.log("App mounted");
    if (chrome?.runtime) {
      chrome.runtime.onMessage.addListener(function (
        request,
        sender,
        sendResponse
      ) {
        if (request.message === "render_popup") {
          this.setState({ show: true, type: request.type });
        }
      });
    } else {
      setTimeout(
        () =>
          this.setState({ show: true }, () => {
            this.setState({ type: type });
          }),
        1000
      );
    }
  }

  removePopup = () => {
    this.setState({ type: undefined }, () => {
      setTimeout(() => {
        this.setState({ show: false });
      }, 280);
    });
  };

  render() {
    var component_to_render;
    if (this.state.type) {
      switch (this.state.type) {
        case "must-login":
          component_to_render = <MustLogin />;
          break;
        default:
          break;
      }
    }

    return (
      <div
        className="App"
        style={{
          display: this.state.show ? "block" : "none",
          animation: this.state.type
            ? "fade-in 0.3s ease-in-out"
            : "fade-out 0.3s ease-in-out",
        }}
      >
        <div className="popup">
          <div className="close-btn" onClick={this.removePopup}>
            <img src={CloseImage} alt="close-btn" />
          </div>
          {component_to_render}
        </div>
      </div>
    );
  }
}

export default App;
