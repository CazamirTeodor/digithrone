import React from "react";
import Loader from "./Loader";
import axios from "axios";
import { setData, sendMessage, sendRequest, getAuthCookie } from "./Utils";
import Notification from "./Notification";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      server: "",
      showModal: false,
      loading: false,
      notificationMsg: undefined, // When backend is down, username/password incorrect, etc.
    };
  }

  login = async (e) => {
    e.preventDefault();

    if (this.state.server.length === 0) {
      this.setState({ notificationMsg: "empty-backend" });
      return;
    }
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ notificationMsg: "empty-credentials" });
      return;
    }

    const body = {
      email: this.state.email,
      password: this.state.password,
    };

    this.setState({ loading: true });
    sendRequest(
      { server: this.state.server, route: "/user/login", body: body },
      async (res) => {
        if (res) {
          var json = await res.json();
          if (json.message === "Success!") {
            console.log("Success!");

            var updated = json.data;
            updated.logged_in = true;
            updated.active = false;
            updated.server = this.state.server;
            updated.blacklist.reports = {};
            updated.backendUp = true;
            setData(updated, () => {
              sendMessage({ action: "LoggedIn" }, null);

              getAuthCookie((cookie) => {
                const expiration_time = new Date(cookie.expirationDate);
                const now_time = new Date(Date.now());
                var seconds = Math.floor((expiration_time - now_time) / 1000);
                var minutes = Math.floor(seconds / 60);
                var hours = Math.floor(minutes / 60);
                var days = Math.floor(hours / 24);
                hours = hours - days * 24;

                this.props.history.push({
                  pathname: "/dashboard",
                  state: {
                    active: false,
                    backendUp: true,
                    name: json.data.name,
                    notificationMsg: "logged-in",
                    cookieExpires: hours,
                  },
                });
              });
            });
          } else {
            console.log("Incorrect credentials");
            this.setState({
              loading: false,
              notificationMsg: "incorrect-credentials",
            });
          }
        } else {
          console.log("Server down");
          this.setState({ loading: false, notificationMsg: "backend-down" });
        }
      }
    );
  };

  inputHandler = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  render() {
    var notification;
    if (this.state.notificationMsg) {
      switch (this.state.notificationMsg) {
        case "incorrect-credentials":
          notification = (
            <Notification
              type="red"
              msg="Incorrect email or password! Please try again."
            />
          );
          break;
        case "empty-credentials":
          notification = (
            <Notification type="red" msg="Email or password cannot be empty!" />
          );
          break;
        case "empty-backend":
          notification = (
            <Notification type="red" msg="Please input server's address!" />
          );
          break;
        case "backend-down":
          notification = (
            <Notification
              type="red"
              msg="Server is currently down. Try again later!"
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
      <form className="loginForm" onSubmit={this.login}>
        <input
          type="text"
          value={this.state.email}
          name="email"
          placeholder="Email"
          onChange={this.inputHandler}
        ></input>
        <input
          type="password"
          value={this.state.password}
          name="password"
          placeholder="Password"
          onChange={this.inputHandler}
        ></input>
        <input
          type="text"
          value={this.state.server}
          name="server"
          placeholder="Server"
          onChange={this.inputHandler}
        ></input>
        <button type="submit" className="loginBtn">
          <p>LOG IN</p>
        </button>
        {notification}

        {this.state.loading ? (
          <div>
            <Loader />
            <p className="loaderStatus">Contacting...</p>
          </div>
        ) : null}
      </form>
    );
  }
}

export default LoginForm;
