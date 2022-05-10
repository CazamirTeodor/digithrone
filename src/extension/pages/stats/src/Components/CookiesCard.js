import React from "react";
import CountUp from "react-countup";

class CookiesCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
    };
  }

  handleInput = (e) => {
    e.preventDefault();
    console.log("Input changed");
    this.setState({
      searchTerm: e.target.value,
    });
  };

  render() {
    let matching_items = [];
    let cookies_length = 0;
    if (this.props.items) {
      var cookies = Object.keys(this.props.items).map((platform) => [
        platform,
        this.props.items[platform].length,
      ]);

      cookies.sort((a, b) => b[1] - a[1]);

      cookies.forEach((item) => {
        cookies_length += item[1];
      });

      matching_items = cookies.filter((item) =>
        item[0].toLowerCase().startsWith(this.state.searchTerm.toLowerCase())
      );
    }

    console.log('cookies_length :>> ', cookies_length);
    return (
      <div className="cookies-card card">
        <CountUp className="title-number" end={cookies_length}/>
        <p>Cookies</p>
        <input
          onChange={this.handleInput}
          type={"text"}
          className="search"
          placeholder="Search"
        />
        <div className="results-cookies">
          {matching_items.length > 0 ? (
            matching_items.map((item) => {
              var url = this.props.items[item[0]][0].domain
                .replace(/\./, "")
                .replace(/^www\./, "");
              return (
                <div className="cookie-container">
                  <p className="number">{item[1]}</p>
                  <div className="platform">
                    <p>{item[0]}</p>
                    <div className="platform-icon-wrapper">
                      <img
                        id="platform-icon"
                        alt="platform-logo"
                        src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&size=32&url=http://${url}`}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="no-results">No matching cookies!</p>
          )}
        </div>
      </div>
    );
  }
}

export default CookiesCard;
