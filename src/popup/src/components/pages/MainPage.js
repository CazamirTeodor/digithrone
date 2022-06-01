/*global chrome*/
import React from "react";
import Logo from "../../assets/logo_w.png";
import CookiesIcon from "../../assets/cookies-colored.png";
import GlobeIcon from "../../assets/globe.png";
import DownloadsIcon from "../../assets/downloads.png";
import GreenLockIcon from "../../assets/green-lock.png";
import RedShieldIcon from "../../assets/red-shield.png";
import { withRouter } from "react-router-dom";
import "../../styles/MainPage.css";

import { getData, setData, sendMessage, getCookies } from "../Utils";
import Notification from "../Notification";
import AnimatedButton from "../AnimatedButton";

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.location.state) {
      this.state = { ...this.props.location.state };
      this.state.heartbeatFunction = undefined;
    } else {
      this.state = { ...this.props.data };
      this.state.notificationMsg = undefined;
    }
  }

  componentDidMount() {
    if (this.props.location.state) {
      var state = this.props.location.state;
      state.notificationMsg = undefined;
      this.props.history.replace(this.props.location.pathname, state);
    }

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

  toggleSetting = (setting) => {
    getData(["prefferences"], (res) => {
      switch (setting) {
        case "browsing":
          this.setState(
            {
              prefferences: {
                ...res.prefferences,
                history: {
                  ...res.prefferences.history,
                  browsing: !res.prefferences.history.browsing,
                },
              },
            },
            () => {
              res.prefferences.history.browsing = !res.prefferences.history.browsing;
              setData(res, () => {
                console.log(res.prefferences);
                this.props.history.replace(
                  this.props.location.pathname,
                  this.state
                );
              });
            }
          );
          break;
        case "cookies":
          this.setState(
            {
              prefferences: {
                ...res.prefferences,
                cookies: {
                  ...res.prefferences.cookies,
                  active: !res.prefferences.cookies.active,
                },
              },
            },
            () => {
              res.prefferences.cookies.active = !res.prefferences.cookies.active;
              setData(res, () => {
                console.log(res.prefferences);
                this.props.history.replace(
                  this.props.location.pathname,
                  this.state
                );
              });
            }
          );
          break;
        case "downloads":
          this.setState(
            {
              prefferences: {
                ...res.prefferences,
                history: {
                  ...res.prefferences.history,
                  downloads: !res.prefferences.history.downloads,
                },
              },
            },
            () => {
              res.prefferences.history.downloads = !res.prefferences.history.downloads;
              setData(res, () => {
                console.log(res.prefferences);
                this.props.history.replace(
                  this.props.location.pathname,
                  this.state
                );
              });
            }
          );
          break;
        default:
          return;
      }
    });
  };

  redirectToStats = () => {
    if (chrome?.tabs) {
      chrome.tabs.create({
        url: chrome.runtime.getURL("/pages/stats/build/index.html"),
      });
    }
  };

  render() {
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
            <Notification
              msg="Backend went online! You can make requests now!"
              type="green"
            />
          );
          break;
        case "backend-down":
          notification = (
            <Notification
              msg="Backend went offline! Requests will be blocked!"
              type="red"
            />
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
        <section className="center-section" onClick={this.redirectToStats}>
          <p className="title">Statistics</p>
          <div className="row">
            <div className="section">
              <img
                src={GreenLockIcon}
                alt="green-lock"
                style={{
                  filter: this.state.backendUp ? null : "grayscale(100%)",
                }}
              />
              <p>Auto-HTTPS {this.state.backendUp ? "ON" : "OFF"}</p>
            </div>
            <div className="separator" />
            <div className="section">
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
            <div className="section">
              <img
                src={RedShieldIcon}
                alt="red-shield"
                style={{
                  filter: this.state.backendUp ? null : "grayscale(100%)",
                }}
              />
              <p>Blacklist {this.state.backendUp ? "ON" : "OFF"}</p>
            </div>
          </div>
        </section>
        <section className="settings">
          <AnimatedButton
            toggleFunction={() => this.toggleSetting("browsing")}
            active={this.state.prefferences.history.browsing}
            name="Browsing"
            icon={GlobeIcon}
          />
          <AnimatedButton
            toggleFunction={() => this.toggleSetting("cookies")}
            active={this.state.prefferences.cookies.active}
            name="Cookies"
            icon={CookiesIcon}
            route="/cookies"
          />
          <AnimatedButton
            toggleFunction={() => this.toggleSetting("downloads")}
            active={this.state.prefferences.history.downloads}
            name="Downloads"
            icon={DownloadsIcon}
          />
        </section>
        {notification}
      </div>
    );
  }
}

export default withRouter(MainPage);
