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
        var chrome_cookies = {};

        result.forEach((cookie) => {
          var cookie_data = parseCookie(cookie);
          var host = cookie_data.host;
          var tld = cookie_data.tld;
          if (host === undefined) return;
          if (!(host in chrome_cookies))
            chrome_cookies[host] = {
              enabled: true,
              logo_url: `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&size=32&url=http://www.${host}.${tld}`,
            };
        });
        this.setState({ cookies: data.prefferences.cookies });
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
              {
                Object.keys(this.state.cookies)
                  .sort()
                  .map((platform) => {
                    if (
                      platform
                        .toLowerCase()
                        .startsWith(this.state.searchTerm.toLowerCase())
                    ) {
                      return (
                        <WebsiteCard
                          key={platform}
                          active={this.state.cookies[platform].enabled}
                          disabled={
                            "forced" in this.state.cookies[platform]
                              ? true
                              : false
                          }
                          logo_url={
                            this.state.cookies[platform].logo_url
                          }
                          platform={platform}
                        />
                      );
                    } else {
                      return null;
                    }
                  })

                
              }
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default CookiesPage;
