/*global chrome*/
import React from "react";
import Dropdown from "./Dropdown";
import CountUp from "react-countup";

class BrowsingCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
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

  handleInput = (e) => {
    e.preventDefault();
    console.log("Input changed");
    this.setState({
      searchTerm: e.target.value,
    });
  };

  redirectToUrl = (url) => {
    chrome.tabs.create({ url: url, active: true });
  };

  render() {
    let filtered_items = [];
    if (this.props.items) {
      filtered_items = this.props.items.filter((item) => {
        if (
          item.title
            .toLowerCase()
            .indexOf(this.state.searchTerm.toLowerCase()) !== -1 ||
          item.url.indexOf(this.state.searchTerm.toLowerCase()) !== -1
        )
          return true;
        return false;
      });

      var matching_items = [];
      if (filtered_items.length > 0) {
        filtered_items.forEach((item) => {
          let date = this.extractFullDate(item.lastVisitTime);

          if (!matching_items.find((obj) => obj.date === date)) {
            matching_items.push({
              date: date,
              time: item.lastVisitTime,
              items: [item],
            });
          } else {
            matching_items.find((obj) => obj.date === date).items.push(item);
          }
        });

        matching_items.sort((a, b) => {
          return b.time - a.time;
        });

        matching_items.forEach((obj) => {
          obj.items.sort((a, b) => {
            return b.lastVisitTime - a.lastVisitTime;
          });
        });
      }
    }

    return (
      <div className="browsing-card card">
        <CountUp
          className="title-number"
          end={this.props.items.length}
          duration={1}
        />

        <p>Websites visited</p>
        <input
          onChange={this.handleInput}
          type={"text"}
          className="search"
          placeholder="Search"
        />
        <div className="results">
          {filtered_items.length > 0 ? (
            matching_items.map((obj, index) => {
              return (
                <Dropdown
                  key={index}
                  expanded={index === 0 ? true : false}
                  items={obj.items}
                  onClickFunction={this.redirectToUrl}
                  type="browsing"
                />
              );
            })
          ) : (
            <p className="no-results">No matching websites!</p>
          )}
        </div>
      </div>
    );
  }
}

export default BrowsingCard;
