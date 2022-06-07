import React from "react";
// import MustLogin from "./components/MustLogin";
import CloseImage from "./assets/close_image.png";
import PadlockImage from "./assets/padlock.png";
import InvalidCertificateImage from "./assets/invalid_certificate.png";
import BlacklistImage from "./assets/blacklist.png";
import UserImage from "./assets/user.png";
import ArrowImage from "./assets/arrow.png";
import MaliciousDownloadImage from "./assets/download.png";
import { solveResourceURL } from "./components/Utils";
import "./App.css";
import Heart from "./components/Heart";
import Loader from "./components/Loader";
import DropdownList from "./components/DropdownList";

var type = "report-page";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: undefined,
      show: undefined,
      closable: undefined,

      status: undefined,
      loading: false,
      sent: false,
      success: false,
      reportOption: undefined,
      reportDescription: "",
    };
  }

  componentDidMount() {
    console.log("Content injected!");
    if (window?.chrome) {
      window.chrome.runtime.onMessage.addListener(
        (request, sender, sendResponse) => {
          console.log("Received message:", request);
          this.setState(
            { show: true, info: request.info, closable: request.closable },
            () => this.toggleScroll(false)
          );
        }
      );
    } else {
      console.log("No chrome detected!");
      this.setState({ show: true, info: { type }, closable: true }, () =>
        this.toggleScroll(false)
      );
    }
  }

  removePopup = () => {
    this.setState({ type: undefined }, () => {
      setTimeout(() => {
        this.setState({ show: false }, () => this.toggleScroll(true));
      }, 280);
    });
  };

  toggleScroll = (status) => {
    if (status) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  cancelReport = (url) => {};
  reportPage = async () => {
    if (!this.state.reportOption) {
      this.setState({ status: "Please select a reason first!" });
      return;
    }

    if (
      this.state.reportOption === "Other" &&
      this.state.reportDescription.split("").length < 10
    ) {
      this.setState({ status: "Description must have at least 10 words!" });
      return;
    }

    window.chrome.storage.local.get(["server"], async (result) => {
      var tries = 0;
      const max_tries = 3;
      const retryInterval = 3000; // ms

      this.setState({ loading: true, status: undefined, sent: false });

      while (tries < max_tries) {
        console.log(`Try #${tries + 1}`);

        try {
          const res = await fetch(`http://${result.server}:3001/report`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              url: this.state.info.url,
              reason: this.state.reportOption,
              description: this.state.reportDescription,
              timestamp: Date.now(),
            }),
          });

          if (res.status === 200) {
            console.log(res);
            this.setState({ sent: true, success: true, loading: false });
            return;
          }
        } catch (e) {
          console.log(e);
        }

        await new Promise((resolve) => setTimeout(resolve, retryInterval));
        tries += 1;
      }

      console.log("An error has occured!");
      this.setState({ loading: false, success: false, sent: true });
    });
  };

  render() {
    var component_to_render;
    if (this.state.info) {
      switch (this.state.info.type) {
        case "report-page":
          var report_options = [
            "Malware",
            "Phishing",
            "XSS",
            "Trackers",
            "Spyware",
            "Other",
          ];
          component_to_render = (
            <div className="report-page">
              <div className="report-page-form">
                <div className="report-page-url">
                  <p>{this.state.info.url}</p>
                </div>
                <div className="separator" />
                <div className="report-reason">
                  <p>Reason of report: </p>
                  <DropdownList
                    options={report_options}
                    default={
                      this.state.reportOption
                        ? this.state.reportOption
                        : "Select..."
                    }
                    direction="down"
                    setOption={(option) =>
                      this.setState({ reportOption: option })
                    }
                  />
                </div>
                <div
                  className="report-description"
                  style={{
                    height:
                      this.state.reportOption &&
                      this.state.reportOption === "Other"
                        ? "10vw"
                        : "0px",
                  }}
                >
                  <div className="separator" />
                  <textarea
                    className="description"
                    placeholder="Briefly describe the reason..."
                  ></textarea>
                </div>
              </div>

              <div
                className={`report-btn ${
                  this.state.loading ? "pulsing-btn" : null
                }`}
                onClick={this.reportPage}
                style={
                  this.state.sent
                    ? this.state.success
                      ? { backgroundColor: "green" }
                      : { backgroundColor: "red" }
                    : this.state.loading
                    ? { backgroundColor: "orange" }
                    : { backgroundColor: "gray" }
                }
              >
                <p>
                  {this.state.loading
                    ? "Sending..."
                    : this.state.sent
                    ? this.state.success
                      ? "Success!"
                      : "Failed!"
                    : "Report"}
                </p>
              </div>
              <p className="status">
                {this.state.status
                  ? this.state.sent
                    ? this.state.success
                      ? "The report has been successfully sent! This tab will be closed soon!"
                      : "Failed to send the report! " + this.state.status
                    : this.state.loading
                    ? null
                    : this.state.status
                  : null}
              </p>
            </div>
          );
          break;

        case "page-reported":
          break;

        case "malicious-download":
          component_to_render = (
            <div className="popup-content">
              <p>
                The file you are trying to download is considered malicious.
              </p>
              <p>Download has been automatically canceled!</p>
              <img
                src={solveResourceURL(MaliciousDownloadImage)}
                alt="download"
              />
            </div>
          );
          break;
        case "page-loading":
          component_to_render = (
            <div className="popup-content">
              <Loader />
            </div>
          );
          break;
        case "must-login":
          component_to_render = (
            <div className="popup-content">
              <p>
                In order to use this extension, you must first log in to your
                account.
              </p>
              <img src={solveResourceURL(UserImage)} alt="user" />
            </div>
          );
          break;
        case "session-invalid":
          component_to_render = (
            <div className="popup-content">
              <p>Your session has expired / is invalid. Please log in again.</p>
              <img src={solveResourceURL(UserImage)} alt="user" />
            </div>
          );
          break;
        case "page-blacklisted":
          component_to_render = (
            <div className="popup-content">
              <p>
                The page you are trying to access has been flagged as malicious.
              </p>
              <p>Access has been automatically blocked!</p>
              <img src={solveResourceURL(BlacklistImage)} alt="blacklist" />
            </div>
          );
          break;
        case "backend-offline":
          component_to_render = (
            <div className="popup-content">
              <p>Unfortunatelly the backend is offline.</p>
              <p>You are not able to do any requests for the moment.</p>
              <Heart beating={false}></Heart>
            </div>
          );
          break;
        case "backend-online":
          component_to_render = (
            <div className="popup-content">
              <p>Backend is online!</p>
              <p>You can start making requests.</p>
              <Heart beating={true}></Heart>
            </div>
          );
          break;
        case "invalid-certificate":
          component_to_render = (
            <div className="popup-content">
              <p>The requested website has no valid TLS certificate.</p>
              <p>Access has been automatically blocked!</p>
              <img
                src={solveResourceURL(InvalidCertificateImage)}
                alt="certificate"
              />
            </div>
          );
          break;
        case "no-https":
          component_to_render = (
            <div className="popup-content">
              <p>The requested website has no HTTPS version.</p>
              <p>Access has been automatically blocked!</p>
              <img src={solveResourceURL(PadlockImage)} alt="padlock" />
            </div>
          );
          break;
        default:
          break;
      }
    }
    console.log(this.state);
    console.log(component_to_render);
    return (
      <div
        className="App"
        style={{
          display: this.state.show ? "block" : "none",
          animation: this.state.info?.type
            ? "fade-in 0.3s ease-in-out"
            : "fade-out 0.3s ease-in-out",
        }}
      >
        <div className="popup">
          {this.state.info?.type === "must-login" ||
          this.state.info?.type === "session-invalid" ? (
            <img
              id="pointing-arrow"
              src={solveResourceURL(ArrowImage)}
              alt="arrow"
            />
          ) : this.state.closable ? (
            <div className="close-btn" onClick={this.removePopup}>
              <img src={solveResourceURL(CloseImage)} alt="close-btn" />
            </div>
          ) : null}

          {component_to_render}
        </div>
      </div>
    );
  }
}

export default App;
