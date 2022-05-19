import React from "react";
import Logo from "../../assets/logo_w.png";
import CookiesIcon from "../../assets/cookies-colored.png";
import GlobeIcon from "../../assets/globe.png";
import DownloadsIcon from "../../assets/downloads.png";
import { Link, withRouter } from "react-router-dom";
import "../../styles/MainPage.css";

import { getData, setData, sendMessage } from "../Utils";
import Notification from "../Notification";

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.location.state) {
      this.state = {
        active: this.props.location.state.active,
        name: this.props.location.state.name,
        backendUp: this.props.location.state.backendUp,
        notificationMsg: this.props.location.state.notificationMsg,
        heartbeatFunction: undefined,
      };
    } else {
      this.state = {
        active: this.props.data.active,
        name: this.props.data.name,
        notificationMsg: undefined,
        backendUp: this.props.data.backendUp,
      };
    }
  }

  componentDidMount() {
    if (this.props.location.state) {
      var state = this.props.location.state;
      state.notificationMsg = undefined;
      this.props.history.replace(this.props.location.pathname, state);
    }
    console.log("this.state :>> ", this.state);

    if (!this.state.heartbeatFunction)
      this.setState({ heartbeatFunction: setInterval(this.heartbeat, 2500) });
  }

  heartbeat = () => {
    getData(["backendUp"], (data) => {
      if (data.backendUp && !this.state.backendUp) {
        this.setState({ backendUp: true, notificationMsg: "backend-up" });
      } else if (!data.backendUp && this.state.backendUp) {
        this.setState({ backendUp: false, notificationMsg: "backend-down" });
      }
    });
  };

  logout = () => {
    sendMessage({ action: "LoggedOut" }, () => {
      setData({ logged_in: false }, () => {
        clearInterval(this.state.heartbeatFunction);
        this.props.history.push("/login");
      });
    });
  };

  switchToggle = () => {
    setData({ active: !this.state.active }, () => {
      if (!this.state.active) {
        sendMessage({ action: "Activate" }, null);
      } else {
        sendMessage({ action: "Deactivate" }, null);
      }
      if (this.props.location.state) {
        var state = this.props.location.state;
        state.active = !this.props.location.state.active;
        this.props.history.replace(this.props.location.pathname, state);
      }
      this.setState({ active: !this.state.active });
    });
  };

  render() {
    const styles = {
      toggle: {
        active: { backgroundColor: "#AFF8CE" },
        inactive: { backgroundColor: "#F8AFAF" },
      },
      connectionIndicator: {
        online: { backgroundColor: "#15BF3A" },
        offline: { backgroundColor: "#D21D1D" },
      },
    };
    var notification;
    if (this.state.notificationMsg) {
      switch (this.state.notificationMsg) {
        case "logged-in":
          notification = (
            <Notification
              msg={
                "Your session will be invalidated on logout or on browser close!"
              }
              type="neutral"
            />
          );
          break;
        case "backend-up":
          notification = (
            <Notification msg="Backend went online!" type="green" />
          );
          break;
        case "backend-down":
          notification = (
            <Notification msg="Backend went offline!" type="red" />
          );
          break;
        default:
          break;
      }
      // Removes element after notification shown
      setTimeout(() => {
        this.setState({ notificationMsg: undefined });
      }, 4000);
    } else notification = null;

    return (
      <div className="page mainPage">
        <section className="header">
          <div className="Title">
            <img className="Logo" src={Logo} alt="Logo" />
            <p>DIGITHRONE</p>
          </div>
          <p className="Username">{this.state.name}</p>
          <div className="logoutBtn" onClick={this.logout}>
            <p>LOG OUT</p>
          </div>
        </section>
        <section className="center-section">
          <p className="title">Statistics</p>
          <div className="row">
            <div className="separator" />
            <div>
              <p className="backend-status">
                Backend is {this.state.backendUp ? "UP" : "DOWN"}
              </p>
              <div
                id="wrapper"
                style={{ animation: this.state.backendUp ? null : "none" }}
              >
                <div id="pulsingheart">
                  <div
                    id="before"
                    style={
                      this.state.backendUp
                        ? { animation: null }
                        : { animation: "none", filter: "grayscale(100%)" }
                    }
                  ></div>
                  <div
                    id="after"
                    style={
                      this.state.backendUp
                        ? { animation: null }
                        : { animation: "none", filter: "grayscale(100%)" }
                    }
                  ></div>
                </div>
              </div>
            </div>
            <div className="separator" />
          </div>
        </section>
        <section className="settings">
          <Link to="/history">
            <div className="settingsBtn">
              <img className="btnIcon" src={GlobeIcon} alt="historyIcon" />
              <p>Browsing</p>
            </div>
          </Link>
          <Link to="/cookies">
            <div className="settingsBtn">
              <img className="btnIcon" src={CookiesIcon} alt="cookiesIcon" />
              <p>Cookies</p>
            </div>
          </Link>
          <Link to="/history">
            <div className="settingsBtn">
              <img className="btnIcon" src={DownloadsIcon} alt="historyIcon" />
              <p>Downloads</p>
            </div>
          </Link>
        </section>
        {notification}
      </div>
    );
  }
}

export default withRouter(MainPage);
