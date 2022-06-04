import React from "react";
import BackButton from "../BackButton";
import WebsiteCard from "../WebsiteCard";
import "../../styles/CookiesPage.css";
import Loader from "../Loader";
import DropdownList from "../DropdownList";
import BinIcon from "../../assets/bin.png";
import InfoIcon from "../../assets/info-icon-b.png";
import CloseIcon from "../../assets/close.png";
import Notification from "../Notification";
import { getData, setData, sendRequest } from "../Utils";

class CookiesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cookies: undefined,
      searchTerm: "",
      showInfo: false,
      notificationMsg: undefined,
      notificationType: undefined,

      // Settings
      delete_policy: undefined,
      new_platforms_policy: undefined,
    };
  }

  componentDidMount() {
    getData(["prefferences"], (res) => {
      this.setState({
        cookies: res.prefferences.cookies.platforms,
        delete_policy: res.prefferences.cookies.delete_policy,
        new_platforms_policy: res.prefferences.cookies.new_platforms_policy,
      });
    });
  }

  inputHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  setDeleteFreqPolicy = (delete_policy) => {
    getData(["prefferences"], (res) => {
      res.prefferences.cookies.delete_policy = delete_policy;
      console.log(res);
      setData(res, () => {
        console.log("Delete policy set to: ", delete_policy);
      });
    });
  };

  setNewPlatformsPolicy = (new_platforms_policy) => {
    getData(["prefferences"], (res) => {
      res.prefferences.cookies.new_platforms_policy = new_platforms_policy;
      console.log(res);
      setData(res, () => {
        console.log("New platform cookies set to: ", new_platforms_policy);
      });
    });
  };

  deleteCookies = async (platforms) => {
    getData(["prefferences", "server"], (result) => {
      sendRequest(
        {
          server: result.server,
          route: "/user/delete",
          body: { platforms: platforms },
        },
        async (res) => {
          if (res) {
            res = await res.json();
            console.log(res);
            if (res.message === "Deleted!") {
              var new_cookies = this.state.cookies;
              if (platforms.length === 1)
                new_cookies[platforms[0]].active = false;
              else {
                for (var i = 0; i < platforms.length; i++)
                  new_cookies[platforms[i]].active = false;
              }
              this.setState(
                {
                  notificationMsg: `${
                    platforms.length > 1 ? "All" : platforms[0]
                  } backend cookies deleted successfully!`,
                  notificationType: "green",
                  cookies: new_cookies,
                },
                () =>
                  setTimeout(
                    () =>
                      this.setState({
                        notificationMsg: undefined,
                        deleteSuccessful: undefined,
                      }),
                    2000
                  )
              );
            } else {
              this.setState(
                {
                  notificationMsg: `${
                    platforms.length > 1 ? "All" : platforms[0]
                  } backend cookies could not be deleted!`,
                  notificationType: "red",
                },
                () =>
                  setTimeout(
                    () =>
                      this.setState({
                        notificationMsg: undefined,
                        deleteSuccessful: undefined,
                      }),
                    2000
                  )
              );
              console.log("Cookies could not be deleted!");
            }
          } else {
            this.setState(
              {
                notificationMsg: `Backend is currently down. Please try again later!`,
                notificationType: "red",
              },
              () =>
                setTimeout(
                  () =>
                    this.setState({
                      notificationMsg: undefined,
                      deleteSuccessful: undefined,
                    }),
                  2000
                )
            );
          }
        }
      );
    });
  };

  render() {
    if (this.state.cookies) {
      var matching_platforms = Object.keys(this.state.cookies).filter(
        (platform) => {
          return platform
            .toLowerCase()
            .includes(this.state.searchTerm.toLocaleLowerCase());
        }
      );
      var active_platforms = matching_platforms
        .filter(
          (platform) =>
            this.state.cookies[platform].active &&
            isNaN(this.state.cookies[platform].forced)
        )
        .sort();
      var inactive_platforms = matching_platforms
        .filter(
          (platform) =>
            !this.state.cookies[platform].active &&
            isNaN(this.state.cookies[platform].forced)
        )
        .sort();
      var locked_platforms = matching_platforms
        .filter((platform) => this.state.cookies[platform]?.forced)
        .sort();
      var all_matching_platforms = [
        ...active_platforms,
        ...inactive_platforms,
        ...locked_platforms,
      ];
    }

    return (
      <div className="page cookiesPage">
        <BackButton {...this.props} />
        {this.state.showInfo ? (
          <div className="info-msg">
            <div
              className="close-btn"
              onClick={() => this.setState({ showInfo: !this.state.showInfo })}
            >
              <img src={CloseIcon} alt="bin-icon" />
            </div>
            <p>
              Cookies are text files with small pieces of data — like a username
              and password — that are used to identify your computer as you use
              a computer network. Specific cookies known as HTTP cookies are
              used to identify specific users and improve your web browsing
              experience.
            </p>
          </div>
        ) : null}
        <div className="title-wrapper">
          <p className="Title">COOKIES</p>
          <div
            className="info-btn"
            onClick={() => this.setState({ showInfo: !this.state.showInfo })}
          >
            <img src={InfoIcon} alt="info-icon" />
          </div>
        </div>
        <div className="settings-column">
          {/* <div className="settings-btn">
            <img src={SettingsIcon} alt="settings-icon" />
          </div> */}
          <div
            className="delete-all-btn"
            onClick={() => this.deleteCookies(Object.keys(this.state.cookies))}
          >
            <p>Delete all cookies saved in the backend</p>
            <img src={BinIcon} alt="icon" />
          </div>
          <div className="delete-frequency setting">
            <p>Delete browser cookies on</p>
            <DropdownList
              default={this.state.delete_policy}
              setOption={this.setDeleteFreqPolicy}
              options={["session end", "tab close"]}
              direction="down"
            />
          </div>
          <div className="new-platforms-policy setting">
            <p>Cookies behaviour on new platforms</p>
            <DropdownList
              default={this.state.new_platforms_policy}
              setOption={this.setNewPlatformsPolicy}
              options={["store", "ignore"]}
              direction="up"
            />
          </div>
        </div>

        {!this.state.cookies ? (
          <Loader />
        ) : (
          <div>
            <div className="cookies">
              <input
                className="website-search"
                name="searchTerm"
                type="text"
                placeholder="Search..."
                value={this.state.searchTerm}
                onChange={this.inputHandler}
              />

              {all_matching_platforms.length > 0 ? (
                <div className="cookies-grid">
                  {all_matching_platforms.map((platform) => {
                    const domain = this.state.cookies[platform].domain;
                    var logo_url = domain.replace(/^\.*www\./, "");
                    logo_url = logo_url.replace(/^\./, "");
                    var fields = logo_url.split(".");

                    // Concat the last 2 fields
                    logo_url =
                      fields[fields.length - 2] +
                      "." +
                      fields[fields.length - 1];
                    return (
                      <WebsiteCard
                        key={platform}
                        active={this.state.cookies[platform].active}
                        disabled={
                          "forced" in this.state.cookies[platform]
                            ? true
                            : false
                        }
                        logo_url={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&size=32&url=http://www.${logo_url}`}
                        platform={platform}
                        deleteFunction={this.deleteCookies}
                      />
                    );
                  })}
                </div>
              ) : (
                <p className="no-platforms">No matching platforms!</p>
              )}
            </div>
          </div>
        )}
        {this.state.notificationMsg ? (
          <Notification
            msg={this.state.notificationMsg}
            type={this.state.notificationType}
            duration={2000}
          />
        ) : null}
      </div>
    );
  }
}
export default CookiesPage;
