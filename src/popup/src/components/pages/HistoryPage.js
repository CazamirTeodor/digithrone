import React from "react";
import BackButton from "../BackButton";
import BrowsingIcon from "../../assets/browsing-icon.png";
import DownloadIcon from "../../assets/download-icon.png";
import "../../styles/HistoryPage.css";
class HistoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      browsing: false,
      downloads: false,
    };
  }

  toggle = (option) => {
    if (option === "browsing") {
      this.setState({
        browsing: !this.state.browsing,
      });
    } else if (option === "downloads") {
      this.setState({
        downloads: !this.state.downloads,
      });
    }
  };

  render() {
    var styles = {
      active: { backgroundColor: "#AFF8CE" },
      inactive: { backgroundColor: "#F8AFAF" },
    };

    return (
      <div className="page historyPage">
        <BackButton {...this.props} />
        <p className="Title">HISTORY</p>
        <div className="row">
          <div className="column">
            <p className="option Title">BROWSING</p>
            <div
              className="optionBtn browsing"
              onClick={() => this.toggle("browsing")}
              style={this.state.browsing ? styles.active : styles.inactive}
            >
              <img
                className="optionBtnIcon"
                src={BrowsingIcon}
                alt="optionIcon"
              />
            </div>
          </div>
          <div className="separator"></div>
          <div className="column">
            <p className="option Title">DOWNLOADS</p>
            <div
              className="optionBtn download"
              onClick={() => this.toggle("downloads")}
              style={this.state.downloads ? styles.active : styles.inactive}
            >
              <img
                className="optionBtnIcon"
                src={DownloadIcon}
                alt="optionIcon"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HistoryPage;
