import React from "react";
import Logo from "../../assets/logo_b.png";
import CookiesIcon from "../../assets/cookies-colored.png";
import HistoryIcon from "../../assets/history-colored.png";
import SwitchComponent from "../SwitchComponent";
import { Link, withRouter } from "react-router-dom";
import "../../styles/MainPage.css";

import { getData, setCookies, setData, sendMessage } from "../Utils";

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.location.state) {
      this.state = {
        active: this.props.location.state.active,
        name: this.props.location.state.name,
        backendUp: this.props.location.state.backendUp,
        heartbeatFunction: undefined,
      };
    } else {
      this.state = {
        active: this.props.data.active,
        name: this.props.data.name,
        backendUp: this.props.data.backendUp,
      };
    }
  }

  componentDidMount() {
    this.setState({ heartbeatFunction: setInterval(this.heartbeat, 2500) });
  }

  heartbeat = () => {
    getData((data) => {
      if (data.backendUp && !this.state.backendUp) {
        this.setState({ backendUp: true });
        console.log("Backend is online!");
      } else if (!data.backendUp && this.state.backendUp) {
        this.setState({ backendUp: false });
        console.log("Backend is offline!");
      }
    });
  };

  logout = () => {
    getData((data) => {
      var updated = data;
      updated.logged_in = false;
      updated.active = false;
      delete updated.server;
      clearInterval(this.state.heartbeatFunction);
      sendMessage({ action: "Deactivate" }, null);
      setData(updated, () => {
        this.props.history.push("/login");
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
              <img
                className="historyIcon"
                src={HistoryIcon}
                alt="historyIcon"
              />
              <p>History</p>
            </div>
          </Link>
          <Link to="/cookies">
            <div className="settingsBtn">
              <img
                className="cookiesIcon"
                src={CookiesIcon}
                alt="cookiesIcon"
              />
              <p>Cookies</p>
            </div>
          </Link>
        </section>
      </div>
    );
  }
}

export default withRouter(MainPage);
