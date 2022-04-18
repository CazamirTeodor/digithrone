import React from "react";
import BackButton from "../BackButton";
import WebsiteCard from "../WebsiteCard";
import "../../styles/CookiesPage.css";
import Loader from "../Loader";
import { getData, setData, parseCookie, getCookies } from "../Utils";

class CookiesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cookies: undefined,
      searchTerm: "",
    };
  }

  componentDidMount() {
    getData(["prefferences"], (data) => {
      getCookies(async (result) => {
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
        <p className="Title">WEBSITES</p>
        <input
          name="searchTerm"
          type="text"
          placeholder="Search platform"
          value={this.state.searchTerm}
          onChange={this.inputHandler}
        />
        {!this.state.cookies ? (
          <Loader />
        ) : (
          <div>
            <div className="websitesList">
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
        )}
      </div>
    );
  }
}
export default CookiesPage;
