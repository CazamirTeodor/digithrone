import React from "react";
import logo from "../Assets/file.png";
import { solveResourceURL } from "./Utils";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: this.props.expanded,
    };
  }

  extractFullDate = (date) => {
    let date_obj = new Date(date);
    let day = date_obj.getDay();
    let day_of_month = date_obj.getDate();
    let month = date_obj.getMonth();
    let year = date_obj.getFullYear();
    let day_of_week = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let month_names = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${day_of_week[day]}, ${day_of_month} ${month_names[month]} ${year}`;
  };

  extractClockTime = (date) => {
    let date_obj = new Date(date);
    let hours = date_obj.getHours();
    let minutes = date_obj.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes}`;
  };

  render() {
    let full_date =
      this.props.type === "browsing"
        ? this.extractFullDate(this.props.items[0].lastVisitTime)
        : this.extractFullDate(this.props.items[0].startTime);

    return (
      <div className="dropdown">
        <section
          onClick={() => this.setState({ expanded: !this.state.expanded })}
          className="header"
        >
          <p className="header-text">{full_date}</p>
        </section>

        <div style={{ height: this.state.expanded ? "auto" : "0", transition: "0.3s" }}>
          <div className="separator"></div>
          {this.props.items.map((item) => {
            return (
              <div
                key={item.id}
                className="dropdown-item"
                style={{
                  backgroundColor: item.canceled ? "#570303" : "#202124",
                }}
                onClick={
                  this.props.onClickFunction
                    ? () => this.props.onClickFunction(item.url)
                    : null
                }
              >
                <img
                  alt="item-logo"
                  src={
                    this.props.type === "downloads"
                      ? solveResourceURL(logo)
                      : `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&size=32&url=${new URL(item.url).origin}`
                  }
                />
                <div className="item-text-wrapper">
                  <p className="item-name">
                    {this.props.type === "browsing"
                      ? item.title
                      : item.filename.split("/").pop()}
                  </p>
                  <p className="item-url">{item.url}</p>
                </div>
                <p className="time">
                  {this.props.type === "browsing"
                    ? this.extractClockTime(item.lastVisitTime)
                    : this.extractClockTime(item.startTime)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Dropdown;
