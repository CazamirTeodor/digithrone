import React from "react";
import Lock from "../assets/lock.png";
import NoLogoWhite from "../assets/no-icon-w.png";
import NoLogoBlack from "../assets/no-icon-b.png";
import BinIcon from "../assets/bin.png";
import "../styles/WebsiteCard.css";

import { getData, setData } from "./Utils";

class WebsiteCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active,
      hovering: false,
      disabled: this.props.disabled,
      logo_data: undefined,
      hoverFunctionId: undefined,
    };
  }

  async componentDidMount() {
    const url = this.props.logo_url;
    var response_status;
    const data = await fetch(url)
      .then((response) => {
        response_status = response.status;
        return response.blob();
      })
      .then(
        (blob) =>
          new Promise((callback) => {
            let reader = new FileReader();
            reader.onload = function () {
              callback(this.result);
            };
            reader.readAsDataURL(blob);
          })
      );
    if (response_status === 200) this.setState({ logo_data: data });
  }

  componentDidUpdate(prev_props) {
    if (this.props !== prev_props) {
      this.setState({
        active: this.props.active,
        disabled: this.props.disabled,
      });
    }
  }

  toggle = (e) => {
    getData("prefferences", (data) => {
      data.prefferences.cookies.platforms[this.props.platform].active =
        !this.state.active;
      setData(data, () => {
        console.log("Updated! New state:", !this.state.active);
        this.setState({
          active: !this.state.active,
          hovering: false,
        });
      });
    });
  };

  deleteCookies = (e) => {
    console.log("Cookies deleted!");
  };

  startHovering = () => {
    if (!this.state.hovering && !this.state.hoverFunctionId) {
      this.setState({
        hoverFunctionId: setTimeout(() => {
          this.setState({ hovering: true });
        }, 1000),
      });
    }
  };

  cancelHovering = () => {
    clearTimeout(this.state.hoverFunctionId);
    if (this.state.hovering) {
      this.setState({ hovering: false, hoverFunctionId: undefined });
    } else {
      this.setState({ hoverFunctionId: undefined });
    }
  };

  render() {
    return (
      <div
        className="website-card"
        onMouseOver={this.state.disabled ? null : this.startHovering}
        onMouseLeave={this.state.disabled ? null : this.cancelHovering}
      >
        <div
          className="website-card-content"
          onClick={
            this.state.disabled
              ? null
              : () => {
                  this.cancelHovering();
                  this.toggle();
                }
          }
          style={{
            backgroundColor: this.state.disabled
              ? "rgb(50, 50, 50)"
              : this.state.active
              ? "white"
              : "rgb(128, 128, 128)",
            color: this.state.disabled
              ? "white"
              : this.state.active
              ? "black"
              : "white",
          }}
        >
          <img
            className="website-logo"
            src={
              this.state.disabled
                ? Lock
                : this.state.logo_data === undefined
                ? this.state.active
                  ? NoLogoBlack
                  : NoLogoWhite
                : this.state.logo_data
            }
            style={{
              filter: this.state.active ? null : "grayscale(1)",
            }}
            alt="logo"
          />
          <p>{this.props.platform}</p>
        </div>
        <div
          className="card-image"
          style={
            this.state.hovering
              ? {
                  width: "100px",
                  height: "100px",
                }
              : {
                  width: "0%",
                  height: "0%",
                }
          }
          onClick={
            this.state.disabled
              ? null
              : () => {
                  this.cancelHovering();
                  this.toggle();
                  this.deleteCookies();
                }
          }
        >
          <img
            src={BinIcon}
            alt="bin"
            style={
              this.state.hovering
                ? {
                    width: "20px",
                    height: "20px",
                  }
                : {
                    width: "0%",
                    height: "0%",
                  }
            }
          />
        </div>
      </div>
    );
  }
}
export default WebsiteCard;
