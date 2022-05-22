import React from "react";
import BackButton from "../BackButton";
import WebsiteCard from "../WebsiteCard";
import "../../styles/CookiesPage.css";
import Loader from "../Loader";
import DropdownList from "../DropdownList";
import BinIcon from "../../assets/bin.png";
import InfoIcon from "../../assets/info-icon-b.png";
import CloseIcon from "../../assets/close.png";
import SettingsIcon from "../../assets/settings.png";
import { getData, setData, parseCookie, getCookies } from "../Utils";

class CookiesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cookies: undefined,
      searchTerm: "",
      showInfo: false,
    };
  }

  componentDidMount() {
    getData(["prefferences"], (data) => {
      getCookies((result) => {
        console.log("result :>> ", result);
        result.forEach((cookie) => {
          var cookie_data = parseCookie(cookie);

          const host = cookie_data.host
            ? cookie_data.host.charAt(0).toUpperCase() +
              cookie_data.host.substring(1).toLowerCase()
            : null;
          if (host) {
            if (host in data.prefferences.cookies) return;

            data.prefferences.cookies[host] = {
              domain: cookie_data.domain,
              active: true,
            };
          }
        });
        setData(data, () => {
          this.setState({ cookies: data.prefferences.cookies });
          console.log("state set ", data.prefferences.cookies);
        });
      });
    });
  }

  inputHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div className="page cookiesPage">
        <BackButton {...this.props} />
        <div
          className="info-btn"
          onClick={() => this.setState({ showInfo: !this.state.showInfo })}
        >
          <img src={InfoIcon} alt="info-icon" />
        </div>
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
        <p className="Title">COOKIES</p>
        <div className="settings-column">
          <div className="settings-btn">
            <img src={SettingsIcon} alt="settings-icon" />
          </div>
          <div className="delete-frequency setting">
            <p>Delete browser cookies on</p>
            <DropdownList options={["logout / browser close", "tab close"]} direction="down" />
          </div>
          <div className="new-platforms-policy setting">
            <p>Cookies behaviour on new platforms</p>
            <DropdownList options={["store", "ignore"]} direction="up" />
          </div>
        </div>
        <div className="delete-all-btn">
                  <p>Delete all cookies saved in the backend</p>
                  <img src={BinIcon} alt="icon" />
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
                
              <div className="cookies-grid">
                {Object.keys(this.state.cookies)
                  .sort()
                  .map((platform) => {
                    if (
                      platform
                        .toLowerCase()
                        .startsWith(this.state.searchTerm.toLowerCase())
                    ) {
                      const domain = this.state.cookies[platform].domain;
                      var logo_url = domain.replace(/^www\./, "");
                      logo_url = domain.replace(/^\./, "");
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
                        />
                      );
                    } else {
                      return null;
                    }
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default CookiesPage;
