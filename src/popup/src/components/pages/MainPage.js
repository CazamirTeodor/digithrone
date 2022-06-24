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

import {
  getData,
  setData,
  sendMessage,
  getBrowserData,
  sendRequest,
} from "../Utils";
import Notification from "../Notification";
import AnimatedButton from "../AnimatedButton";
import Loader from "../Loader";

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.location.state) {
      this.state = { ...this.props.location.state };
      this.state.heartbeatFunction = undefined;
      this.state.loading = false;
    } else {
      this.state = { ...this.props.data };
      this.state.notificationMsg = undefined;
      this.state.loading = false;
    }
  }

  componentDidMount() {
    if (this.props.location.state) {
      var state = this.props.location.state;
      state.notificationMsg = undefined;
      state.loading = false;
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
    this.setState({ loading: true }, () => {
      getBrowserData((data) => {
        console.log("Logging user out...");
        chrome.storage.local.get(["server", "prefferences"], (res) => {
          const server = res.server;

          var sync_data = {
            prefferences: res.prefferences,
            data: {
              cookies: {},
              history: {
                browsing: [],
                downloads: [],
              },
            },
          };

          // Append forced cookies
          Object.keys(res.prefferences.cookies.platforms).forEach(
            (platform) => {
              if (res.prefferences.cookies.platforms[platform].forced) {
                if (platform in data.cookies) {
                  console.log("Appending forced platform", platform);
                  sync_data.data.cookies[platform] = data.cookies[platform];
                }
              }
            }
          );

          // Append active platforms cookies
          if (res.prefferences.cookies.active) {
            Object.keys(res.prefferences.cookies.platforms).forEach(
              (platform) => {
                if (
                  res.prefferences.cookies.platforms[platform].active &&
                  !res.prefferences.cookies.platforms[platform].forced
                ) {
                  if (platform in data.cookies) {
                    console.log("Appending active platform", platform);
                    sync_data.data.cookies[platform] =
                      data.cookies[platform];
                  }
                }
              }
            );
          }

          // Apend browsing history
          if (res.prefferences.history.browsing) {
            sync_data.data.history.browsing = data.history.browsing;
          }

          // Append downloads history
          if (res.prefferences.history.downloads) {
            sync_data.data.history.downloads = data.history.downloads;
          }

          sendRequest(
            { server: server, route: "/user/sync", body: sync_data },
            (res) => {
              if (res) {
                console.log("Sent synchronization data:", sync_data);
                setData({ logged_in: false }, () => {
                  sendMessage({ action: "LoggedOut" }, () => {
                    clearInterval(this.state.heartbeatFunction);
                    this.props.history.push("/login");
                    console.log("Logged out!");
                  });
                });
              } else {
                this.setState({
                  loading: false,
                  notificationMsg: "logout-error",
                });
                console.log("Logging out failed!");
              }
            }
          );
        });
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
              res.prefferences.history.browsing =
                !res.prefferences.history.browsing;
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
              res.prefferences.cookies.active =
                !res.prefferences.cookies.active;
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
              res.prefferences.history.downloads =
                !res.prefferences.history.downloads;
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
        case "logout-error":
          notification = (
            <Notification
              msg={
                "An error has occured during logout! Please try again later."
              }
              type="red"
              duration={4000}
            />
          );
          break;

        case "logged-in":
          notification = (
            <Notification
              msg={
                "Your session will be invalidated on logout or on browser close!"
              }
              type="neutral"
              duration={4000}
            />
          );
          break;
        case "backend-up":
          notification = (
            <Notification
              msg="Backend went online! You can make requests now!"
              type="green"
              duration={4000}
            />
          );
          break;
        case "backend-down":
          notification = (
            <Notification
              msg="Backend went offline! Requests will be blocked!"
              type="red"
              duration={4000}
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
        {this.state.loading ? <Loader /> : null}
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
