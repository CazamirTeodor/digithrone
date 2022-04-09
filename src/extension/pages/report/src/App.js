/*global chrome*/
import React from "react";
import "./App.css";
import SuccessIcon from "./success.png";
import FailedIcon from "./failed.png";
import Loader from "./Loader";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: true,
      description: "",
      sending: false,
      sent: false,
      successful: false,
    };
  }

  componentDidMount() {
    /*
    chrome.storage.local.get(["data"], (result) => {
      this.setState({
        data: {
          url: result.data.url,
          server: result.data.server,
          timeStamp: result.data.timeStamp,
        },
      });
    });
    */
  }

  descriptionHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  sendReport = async (e) => {

    if (this.state.description.split().length < 10){
      console.log("Please provide a minimum of 10 words in your description!");
      return;
    }

    e.preventDefault();
    this.setState({ sending: true, sent: false });

    var tries = 0;
    const max_tries = 3;
    const retryInterval = 3000; // ms

    while (tries < max_tries) {
      console.log(`Try #${tries + 1}`);

      try {
        const res = await fetch(
          `http://${this.state.data.server}:3001/report`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              url: this.state.data.url,
              description: this.state.description,
              timestamp: this.state.data.timeStamp,
            }),
          }
        );

        if (res.status === 200) {
          console.log(res);
          this.setState({ sending: false, successful: true, sent: true });
          console.log("Website successfully reported!");
          chrome.storage.local.get(["data"], (result) => {
            console.log("result.data :>> ", result.data);
            if (!result.data.blacklist.reports)
              result.data.blacklist.reports = {};
            var url;
            url = this.state.data.url.replace(/^[a-zA-Z]+:\/\//, "");
            url = url.replace(/^www\./, "");
            url = url.replace(/\/$/, "");
            console.log("url :>> ", url);
            if (!Object.keys(result.data.blacklist.reports).includes(url)) {
              result.data.blacklist.reports[url] = {
                timeStamp: this.state.data.timeStamp,
                description: this.state.description,
              };
              chrome.storage.local.set({ data: result.data }, () =>
                console.log("Blacklist updated!", result.data.blacklist)
              );
            }
          });
          return;
        }
      } catch (e) {}

      await new Promise((resolve) => setTimeout(resolve, retryInterval));
      tries += 1;
    }

    console.log("An error has occured!");
    this.setState({ sending: false, successful: false, sent: true });
  };

  render() {
    return (
      <div className="App">
        {this.state.data ? (
          this.state.sent ? (
            this.state.successful ? (
              <div className="status">
                <img
                  className="status-icon"
                  src={SuccessIcon}
                  alt="success-icon"
                />
                <p>
                  The report has been sent! Meanwhile the url has been
                  blacklisted.
                </p>
              </div>
            ) : (
              <div className="status">
                <img
                  className="status-icon"
                  src={FailedIcon}
                  alt="failed-icon"
                />
                <p>An error has occured :( Please try again!</p>
                <div onClick={this.sendReport} className="retryBtn">
                  <p>Retry</p>
                </div>
              </div>
            )
          ) : this.state.sending ? (
            <Loader />
          ) : (
            <div className="report-form">
              <div className="url">
                <p>{this.state.data.url? this.state.data.url: '<url>'}</p>
              </div>
              <textarea
                name="description"
                className="description"
                placeholder="Briefly describe the reason of your report..."
                onChange={this.descriptionHandler}
              ></textarea>
              <div onClick={this.sendReport} className="reportBtn">
                <p>Report</p>
              </div>
            </div>
          )
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default App;
