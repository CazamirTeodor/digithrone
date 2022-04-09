import React from "react";
import Logo from "../../assets/logo_b.png";
import CookiesIcon from "../../assets/cookies-colored.png";
import HistoryIcon from "../../assets/history-colored.png";
import PasswordsIcon from "../../assets/lock.png";
import SwitchComponent from "../SwitchComponent";
import { Link, withRouter } from "react-router-dom";
import "../../styles/MainPage.css";

import {
  getData,
  setCookies,
  setData,
  sendMessage,
} from "../Utils";
import Notification from "../Notification";

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.location.state) {
      this.state = {
        active: this.props.location.state.active,
        name: this.props.location.state.name,
        backendUp: this.props.location.state.backendUp,
        notificationMsg: this.props.location.state.notificationMsg, // Notifies the user that the cookie is available for a limited ammount of time
        heartbeatFunction: undefined,
        cookieExpires: this.props.location.state.cookieExpires
      };
      console.log("State set from location.state");
    } else {
      this.state = {
        active: this.props.data.active,
        name: this.props.data.name,
        notificationMsg: undefined,
        backendUp: this.props.data.backendUp,
      };
      console.log("State set from data");
    }
  }

  componentDidMount() {
    if (this.props.location.state){
      var state = this.props.location.state;
      state.notificationMsg = undefined;
      this.props.history.replace(this.props.location.pathname, state);
    }
    this.setState({heartbeatFunction: setInterval(this.heartbeat, 2500)});
  }

  heartbeat = () => {
    getData((data) => {
      if (data.backendUp && !this.state.backendUp) {
        this.setState({ backendUp: true, notificationMsg: "backend-up" });
      } else if (!data.backendUp && this.state.backendUp) {
        this.setState({ backendUp: false, notificationMsg: "backend-down" });
      }
    });
  };

  logout = () => {
    var data = {};
    data.logged_in = false;

    sendMessage({ action: "LoggedOut" }, () => {
      setData(data, () => {
        clearInterval(this.state.heartbeatFunction);
        setData(data, () => {
          this.props.history.push("/login");
        });
      });
    });
  };

  switchToggle = () => {
    getData((data) => {
      data.active = !this.state.active;

      setData(data, () => {
        if (!this.state.active) {
          setCookies(data.cookies, true);
          sendMessage({ action: "Activate" }, null);
        } else {
          setCookies(data.cookies, false);
          sendMessage({ action: "Deactivate" }, null);
        }
        this.setState({ active: !this.state.active });
      });
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
    console.log("this.state.notificationMsg :>> ", this.state.notificationMsg);
    if (this.state.notificationMsg) {
      switch (this.state.notificationMsg) {
        case "logged-in":
          notification = (
            <Notification
              msg={`${this.state.cookieExpires} hours until authentication cookie is invalidated!`}
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
      <div
        className="page mainPage"
        style={
          this.state.active ? styles.toggle.active : styles.toggle.inactive
        }
      >
        <section className="header">
          <div
            className="ConnectionIndicator"
            style={
              this.state.backendUp
                ? styles.connectionIndicator.online
                : styles.connectionIndicator.offline
            }
          ></div>
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
          <SwitchComponent
            id="status"
            active={this.state.active}
            toggleFunction={this.switchToggle}
          />
        </section>
        <section className="settings">
          <Link to="/history">
            <div className="settingsBtn">
              <img className="btnIcon" src={HistoryIcon} alt="historyIcon" />
              <p>History</p>
            </div>
          </Link>
          <Link to="/cookies">
            <div className="settingsBtn">
              <img className="btnIcon" src={CookiesIcon} alt="cookiesIcon" />
              <p>Cookies</p>
            </div>
          </Link>
          <Link to="/passwords">
            <div className="settingsBtn">
              <img
                className="btnIcon"
                src={PasswordsIcon}
                alt="passwordsIcon"
              />
              <p>Passwords</p>
            </div>
          </Link>
        </section>
        {notification}
      </div>
    );
  }
}

export default withRouter(MainPage);
